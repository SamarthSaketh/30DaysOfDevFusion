import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Button,
  Chip,
  Box,
  Tooltip,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import BookFormDialog from "./BookFormDialog";
import { blue, green, orange, pink, purple, red, teal } from "@mui/material/colors";

const COLORS = [red[500], blue[500], green[500], orange[500], purple[500], pink[500], teal[500]];

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  const [authorFilter, setAuthorFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");

  const genreColors = useMemo(() => {
    const mapping = {};
    let colorIndex = 0;
    books.forEach(book => {
      if (!mapping[book.genre]) {
        mapping[book.genre] = COLORS[colorIndex % COLORS.length];
        colorIndex++;
      }
    });
    return mapping;
  }, [books]);

  const fetchBooks = () => {
    axios.get("http://localhost:5000/api/books").then(res => setBooks(res.data));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Delete confirmation toast
  const handleDelete = (id) => {
    toast.info(
      <div>
        <p>Are you sure you want to delete?</p>
        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={async () => {
              await axios.delete(`http://localhost:5000/api/books/${id}`);
              fetchBooks();
              toast.dismiss();
              toast.success("Book deleted successfully!", { progress: undefined });
            }}
          >
            Yes
          </Button>
          <Button
            size="small"
            variant="outlined"
            onClick={() => toast.dismiss()}
          >
            No
          </Button>
        </Box>
      </div>,
      { autoClose: false }
    );
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingBook(null);
    setDialogOpen(true);
  };

  const filteredBooks = books.filter(book => {
    return (
      (authorFilter ? book.author === authorFilter : true) &&
      (genreFilter ? book.genre === genreFilter : true) &&
      (yearFilter ? String(book.year) === String(yearFilter) : true)
    );
  });

  return (
    <>
      <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>📚 My Library</Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ borderRadius: 3, px: 3 }}
            onClick={handleAdd}
          >
            + Add New Book
          </Button>
        </Box>

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
  <FormControl sx={{ minWidth: 150 }}>
    <InputLabel>Author</InputLabel>
    <Select value={authorFilter} onChange={e => setAuthorFilter(e.target.value)} label="Author">
      <MenuItem value="">All</MenuItem>
      {[...new Set(books.map(b => b.author))].map(author => (
        <MenuItem key={author} value={author}>{author}</MenuItem>
      ))}
    </Select>
  </FormControl>

  <FormControl sx={{ minWidth: 150 }}>
    <InputLabel>Genre</InputLabel>
    <Select value={genreFilter} onChange={e => setGenreFilter(e.target.value)} label="Genre">
      <MenuItem value="">All</MenuItem>
      {[...new Set(books.map(b => b.genre))].map(genre => (
        <MenuItem key={genre} value={genre}>{genre}</MenuItem>
      ))}
    </Select>
  </FormControl>

  <FormControl sx={{ minWidth: 150 }}>
    <InputLabel>Year</InputLabel>
    <Select value={yearFilter} onChange={e => setYearFilter(e.target.value)} label="Year">
      <MenuItem value="">All</MenuItem>
      {[...new Set(books.map(b => b.year))].map(year => (
        <MenuItem key={year} value={year}>{year}</MenuItem>
      ))}
    </Select>
  </FormControl>

  {/* Clear Filters Button */}
  <Button
    variant="outlined"
    color="secondary"
    sx={{ height: 40 }}
    onClick={() => {
      setAuthorFilter("");
      setGenreFilter("");
      setYearFilter("");
    }}
  >
    Clear Filters
  </Button>
</Box>
      </Box>

      <Grid container spacing={3} sx={{ p: 3 }}>
        {filteredBooks.map(book => (
          <Grid item xs={12} sm={6} md={4} key={book._id}>
            <Card sx={{ borderRadius: 4, boxShadow: 4, height: "100%", display: "flex", flexDirection: "column", transition: "0.3s", "&:hover": { transform: "translateY(-5px)", boxShadow: 6 } }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {book.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  ✍️ Author: {book.author}
                </Typography>
                <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
                  <Chip label={book.genre} size="small" sx={{ backgroundColor: genreColors[book.genre], color: "white", fontWeight: "bold" }} />
                  <Chip label={book.year} color="success" variant="outlined" size="small" />
                </Box>
                <Tooltip title={book.originalPdfName}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <PictureAsPdfIcon color="error" fontSize="small" />
                    <Typography variant="body2" sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {book.originalPdfName}
                    </Typography>
                  </Box>
                </Tooltip>
              </CardContent>

              <CardActions sx={{ p: 2, flexWrap: "wrap", gap: 1, justifyContent: "space-between" }}>
                <Button variant="contained" color="info" startIcon={<VisibilityIcon />} href={`http://localhost:5000/file/${book._id}/view`} target="_blank" sx={{ borderRadius: 2, textTransform: "none", flex: 1 }}>View</Button>
                <Button variant="contained" color="success" startIcon={<DownloadIcon />} href={`http://localhost:5000/file/${book._id}/download`} sx={{ borderRadius: 2, textTransform: "none", flex: 1 }}>Download</Button>
                <Button variant="outlined" color="primary" startIcon={<EditIcon />} onClick={() => handleEdit(book)} sx={{ borderRadius: 2, textTransform: "none", flex: 1 }}>Edit</Button>
                <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => handleDelete(book._id)} sx={{ borderRadius: 2, textTransform: "none", flex: 1 }}>Delete</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <BookFormDialog open={dialogOpen} onClose={() => setDialogOpen(false)} editingBook={editingBook} refreshBooks={fetchBooks} />
    </>
  );
};

export default BookList;
