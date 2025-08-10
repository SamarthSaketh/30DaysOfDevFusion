import React, { useState, useEffect } from 'react';
import { Accordion, Form, Button } from 'react-bootstrap';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const categories = ['Electronics', 'Footwear', 'Accessories', 'Clothing', 'Books'];
const ratings = [4.5, 4, 3, 2, 1];
const presetPriceRanges = [
  { label: 'Under $50', min: 0, max: 50 },
  { label: '$50 to $100', min: 50, max: 100 },
  { label: '$100 to $200', min: 100, max: 200 },
  { label: 'Above $200', min: 200, max: 1000 },
];

function FilterSidebar({ filters, setFilters, showCategoryFilter = true }) {
  // Ensure sliderRange state syncs if filters.priceRange changes externally
  const [sliderRange, setSliderRange] = useState(
    filters.priceRange ? [filters.priceRange.min, filters.priceRange.max] : [0, 1000]
  );

  useEffect(() => {
    if (filters.priceRange) {
      setSliderRange([filters.priceRange.min, filters.priceRange.max]);
    } else {
      setSliderRange([0, 1000]);
    }
  }, [filters.priceRange]);

  const toggleCategory = (category) => {
    // If categories filter is not present, do nothing
    if (!filters.categories) return;

    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    setFilters({ ...filters, categories: newCategories });
  };

  const setRating = (rating) => {
    setFilters({ ...filters, rating });
  };

  const onSliderChange = (values) => {
    setSliderRange(values);
    setFilters({ ...filters, priceRange: { min: values[0], max: values[1] } });
  };

  const onPresetPriceChange = (range) => {
    setSliderRange([range.min, range.max]);
    setFilters({ ...filters, priceRange: { min: range.min, max: range.max } });
  };

  const clearFilters = () => {
    // Reset categories only if they exist in filters
    const clearedFilters = {
      priceRange: null,
      rating: null,
    };
    if (filters.categories) clearedFilters.categories = [];
    setFilters(clearedFilters);
    setSliderRange([0, 1000]);
  };

  return (
    <div className="p-3 border rounded bg-light">
      <h5>Filters</h5>
      <Accordion defaultActiveKey="0" alwaysOpen>
        {showCategoryFilter && (
          <Accordion.Item eventKey="0">
            <Accordion.Header>Category</Accordion.Header>
            <Accordion.Body>
              {categories.map(category => (
                <Form.Check
                  key={category}
                  type="checkbox"
                  id={`cat-${category}`}
                  label={category}
                  checked={filters.categories ? filters.categories.includes(category) : false}
                  onChange={() => toggleCategory(category)}
                />
              ))}
            </Accordion.Body>
          </Accordion.Item>
        )}

        <Accordion.Item eventKey={showCategoryFilter ? "1" : "0"}>
          <Accordion.Header>Price Range</Accordion.Header>
          <Accordion.Body>
            {/* Radio buttons for preset price ranges */}
            {presetPriceRanges.map(range => (
              <Form.Check
                key={range.label}
                type="radio"
                name="presetPrice"
                id={`price-${range.label}`}
                label={range.label}
                checked={
                  filters.priceRange &&
                  filters.priceRange.min === range.min &&
                  filters.priceRange.max === range.max
                }
                onChange={() => onPresetPriceChange(range)}
              />
            ))}

            {/* Draggable slider for custom price range */}
            <div className="mt-3 px-2">
              <Slider
                range
                min={0}
                max={1000}
                value={sliderRange}
                onChange={onSliderChange}
                allowCross={false}
              />
              <div className="d-flex justify-content-between mt-2">
                <small>${sliderRange[0]}</small>
                <small>${sliderRange[1]}</small>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey={showCategoryFilter ? "2" : "1"}>
          <Accordion.Header>Minimum Rating</Accordion.Header>
          <Accordion.Body>
            {ratings.map(r => (
              <Form.Check
                key={r}
                type="radio"
                name="rating"
                id={`rating-${r}`}
                label={`${r} stars & up`}
                checked={filters.rating === r}
                onChange={() => setRating(r)}
              />
            ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Button variant="secondary" size="sm" className="mt-3" onClick={clearFilters}>
        Clear Filters
      </Button>
    </div>
  );
}

export default FilterSidebar;
