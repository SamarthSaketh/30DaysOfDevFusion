const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcrypt');

// Middleware to check if user is logged in
function isAuthenticated(req, res, next) {
  if (req.session.userId) return next();
  res.redirect('/login');
}

// Home Page
router.get('/', (req, res) => {
  res.render('home', {
    loggedIn: !!req.session.userId,
    username: req.session.username || null
  });
});

// Register Page
router.get('/register', (req, res) => {
  res.render('register');
});

// Register Logic
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'User already exists' });
    }

    // Let Mongoose schema hash the password
    const newUser = new User({ username, email, password });
    await newUser.save();




    res.status(201).json({ success: true, message: 'User registered' });
} catch (err) {
  console.error('Registration error:', err.message);
  if (err.name === 'ValidationError') {
    console.error('Validation details:', err.errors);
  }
  res.status(500).json({ success: false, message: 'Server error' });
}

});



// Login Page
router.get('/login', (req, res) => {
  res.render('login', { error: null }); // 🟢 Renders login form
});

// Login Logic
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).render('login', { error: 'Invalid username or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).render('login', { error: 'Invalid username or password' });
    }

    req.session.user = user;

    // ✅ This is important
    res.redirect('/');
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).render('login', { error: 'Server error. Try again.' });
  }
});




router.get('/', (req, res) => {
  res.render('home', {
    user: req.session.user || null
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});


module.exports = router;
