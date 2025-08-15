import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';

const BookForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    year: '',
    genre: '',
    pdf: null
  });

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData, pdf: null });
    }
  }, [initialData]);

  const handleChange = (e) => {
    if (e.target.name === "pdf") {
      setFormData({ ...formData, pdf: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null) {
        data.append(key, formData[key]);
      }
    });
    onSubmit(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField name="title" label="Title" value={formData.title} onChange={handleChange} required />
      <TextField name="author" label="Author" value={formData.author} onChange={handleChange} required />
      <TextField name="year" label="Year" value={formData.year} onChange={handleChange} />
      <TextField name="genre" label="Genre" value={formData.genre} onChange={handleChange} />
      <input type="file" name="pdf" accept="application/pdf" onChange={handleChange} />
      <Button type="submit" variant="contained" color="primary">Save</Button>
    </Box>
  );
};

export default BookForm;
