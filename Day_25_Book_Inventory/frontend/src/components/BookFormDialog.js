import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Typography,
  Paper
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookFormDialog = ({ open, onClose, editingBook, refreshBooks }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [pdf, setPdf] = useState(null);

  // Reset form whenever dialog opens for new book
  useEffect(() => {
    if (editingBook) {
      setTitle(editingBook.title || "");
      setAuthor(editingBook.author || "");
      setGenre(editingBook.genre || "");
      setYear(editingBook.year || "");
      setPdf(null);
    } else if (open) {
      setTitle("");
      setAuthor("");
      setGenre("");
      setYear("");
      setPdf(null);
    }
  }, [editingBook, open]);

  const validateInputs = () => {
    const regex = /^[a-zA-Z0-9\s.,'-]+$/; // Allowed characters
    if (!title || !author || !genre || !year) {
      toast.error("All fields are required!", { position: "top-right", autoClose: 3000 });
      return false;
    }
    if (!regex.test(title) || !regex.test(author) || !regex.test(genre)) {
      toast.error("Invalid characters entered!", { position: "top-right", autoClose: 3000 });
      return false;
    }
    if (isNaN(year) || year < 1000 || year > 9999) {
      toast.error("Enter a valid year!", { position: "top-right", autoClose: 3000 });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
  if (!validateInputs()) return;

  const formData = new FormData();
  formData.append("title", title);
  formData.append("author", author);
  formData.append("genre", genre);
  formData.append("year", year);
  if (pdf) {
    formData.append("pdf", pdf); // only append new file
  }

  try {
    if (editingBook) {
      await axios.put(
        `http://localhost:5000/api/books/${editingBook._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.success("Book updated successfully!");
    } else {
      await axios.post("http://localhost:5000/api/books", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      toast.success("Book added successfully!");
    }

    refreshBooks();
    setPdf(null);           // Clear selected PDF
    onClose();
  } catch (err) {
    toast.error("Something went wrong!");
  }
};


  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
        {editingBook ? "Edit Book" : "Add New Book"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          {/** Card-like input container */}
          <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
            <Stack spacing={2}>
              <TextField
                label="Book Title"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                variant="outlined"
              />
              <TextField
                label="Author"
                fullWidth
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                variant="outlined"
              />
              <TextField
                label="Genre"
                fullWidth
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                variant="outlined"
              />
              <TextField
                label="Year"
                type="number"
                fullWidth
                value={year}
                onChange={(e) => setYear(e.target.value)}
                variant="outlined"
              />

              <div>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                Upload PDF
              </Typography>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setPdf(e.target.files[0])}
              />
              <Typography variant="caption" color="text.secondary">
                {pdf
                  ? `Selected: ${pdf.name}`
                  : editingBook
                  ? `Current: ${editingBook.originalPdfName}`
                  : "No file selected"}
              </Typography>
            </div>

            </Stack>
          </Paper>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, justifyContent: "center", gap: 2 }}>
        <Button onClick={onClose} variant="outlined" color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {editingBook ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookFormDialog;
