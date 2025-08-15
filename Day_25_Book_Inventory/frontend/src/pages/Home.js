import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookList from '../components/BookList';

const Home = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const res = await axios.get('http://localhost:5000/api/books');
    setBooks(res.data);
  };

  const deleteBook = async (id) => {
    await axios.delete(`http://localhost:5000/api/books/${id}`);
    fetchBooks();
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <h2>Book Inventory</h2>
      <BookList books={books} onDelete={deleteBook} />
    </div>
  );
};

export default Home;
