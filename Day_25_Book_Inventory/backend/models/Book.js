const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  year: Number,
  genre: String,
  pdf: String,
  originalPdfName: String  // <-- added field
});


module.exports = mongoose.model('Book', bookSchema);
