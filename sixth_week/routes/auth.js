const express = require('express');
const { generateToken, hashPassword, comparePassword } = require('../auth');

const router = express.Router();

let users = []; // In-memory user storage, use a database in a real application

// Register a new user
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = hashPassword(password);
  const user = { id: users.length + 1, username, password: hashedPassword };
  users.push(user);
  res.status(201).send({ message: 'User registered successfully' });
});

// Login a user
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (user && comparePassword(password, user.password)) {
    const token = generateToken(user);
    res.send({ token });
  } else {
    res.status(401).send({ message: 'Invalid credentials' });
  }
});

module.exports = router;
