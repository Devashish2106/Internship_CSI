// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
const mongoURI = 'your-mongodb-connection-string-here';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const items = require('./routes/items');

app.use('/api/items', items);
