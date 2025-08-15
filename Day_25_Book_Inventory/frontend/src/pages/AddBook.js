import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BookForm from '../components/BookForm';

const AddBook = () => {
  const navigate = useNavigate();

const addBook = async (data) => {
  await axios.post('http://localhost:5000/api/books', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  navigate('/');
};


  return (
    <div>
      <h2>Add Book</h2>
      <BookForm onSubmit={addBook} />
    </div>
  );
};

export default AddBook;
