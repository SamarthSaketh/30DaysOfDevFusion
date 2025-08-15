const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const Book = require('../models/Book');

// Multer storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// CREATE with file upload
router.post('/', upload.single('pdf'), async (req, res) => {
    try {
        const { title, author, year, genre } = req.body;
        const newBook = new Book({
            title,
            author,
            year,
            genre,
            pdf: req.file ? `/uploads/${req.file.filename}` : null,
            originalPdfName: req.file ? req.file.originalname : null
        });
        const savedBook = await newBook.save();
        res.json(savedBook);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// READ ALL
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATE with file upload
router.put('/:id', upload.single('pdf'), async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ error: "Book not found" });

        // Update fields
        book.title = req.body.title;
        book.author = req.body.author;
        book.year = req.body.year;
        book.genre = req.body.genre;

        // Handle new PDF
        if (req.file) {
            // Delete old PDF if exists
            if (book.pdf) {
                const oldPath = path.join(__dirname, '..', book.pdf);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
            book.pdf = `/uploads/${req.file.filename}`;
            book.originalPdfName = req.file.originalname;
        }

        const updatedBook = await book.save();
        res.json(updatedBook);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ error: "Book not found" });

        // Delete PDF if exists
        if (book.pdf) {
            const filePath = path.join(__dirname, '..', book.pdf);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }

        await Book.findByIdAndDelete(req.params.id);
        res.json({ message: "Book deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Serve uploaded files
router.use('/uploads', express.static('uploads'));

module.exports = router;
