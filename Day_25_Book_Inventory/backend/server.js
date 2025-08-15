const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const bookRoutes = require('./routes/bookRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// View or Download PDF by book ID
app.get('/file/:id/:mode', async (req, res) => {
  try {
    const { id, mode } = req.params;
    const Book = require('./models/Book');
    const book = await Book.findById(id);

    if (!book || !book.pdf) return res.status(404).send('File not found');

    // Normalize file path
    const relativePath = book.pdf.startsWith('/') ? book.pdf.slice(1) : book.pdf;
    const filePath = path.join(__dirname, relativePath);

    if (!fs.existsSync(filePath)) return res.status(404).send('File not found');

    const safeFilename = book.originalPdfName || 'book.pdf';
    const encodedFilename = encodeURIComponent(safeFilename).replace(/['()]/g, escape);

    res.setHeader('Content-Type', 'application/pdf');

    if (mode === 'view') {
      // Include both filename and filename* for maximum browser compatibility
      res.setHeader(
        'Content-Disposition',
        `inline; filename="${safeFilename}"; filename*=UTF-8''${encodedFilename}`
      );
    } else if (mode === 'download') {
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${safeFilename}"; filename*=UTF-8''${encodedFilename}`
      );
    } else {
      return res.status(400).send('Invalid mode');
    }

    res.sendFile(filePath, { dotfiles: 'deny' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Routes
app.use('/api/books', bookRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Book Inventory API Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
