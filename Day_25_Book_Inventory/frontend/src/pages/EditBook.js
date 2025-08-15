import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BookForm from '../components/BookForm';
import { Button, Stack, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookData, setBookData] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const res = await axios.get(`http://localhost:5000/api/books`);
      const book = res.data.find(b => b._id === id);
      setBookData(book);
    };
    fetchBook();
  }, [id]);

  const handleDownload = (url, filename) => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const updateBook = async (data) => {
    await axios.put(`http://localhost:5000/api/books/${id}`, data);
    navigate('/');
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>Edit Book</Typography>

      {bookData?.pdf && (
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<VisibilityIcon />}
            href={`http://localhost:5000${bookData.pdf}`}
            target="_blank"
          >
            View PDF
          </Button>

          <Button
            variant="contained"
            size="small"
            startIcon={<DownloadIcon />}
            onClick={() => handleDownload(
              `http://localhost:5000${bookData.pdf}`,
              `${bookData.title}.pdf`
            )}
          >
            Download PDF
          </Button>
        </Stack>
      )}

      {bookData && <BookForm onSubmit={updateBook} initialData={bookData} />}
    </div>
  );
};

export default EditBook;
