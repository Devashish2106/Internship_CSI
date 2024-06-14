const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware to parse incoming requests
app.use(bodyParser.json());

// Route for the homepage
app.get('/', (req, res) => {
    res.send('Welcome to the Home Page!');
});

// Route for the about page
app.get('/about', (req, res) => {
    res.send('Learn more About Us here.');
});

// Middleware to handle 404 errors
app.use((req, res, next) => {
    res.status(404).send('Sorry, we could not find that.');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
