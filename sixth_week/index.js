const express = require('express');
const bodyParser = require('body-parser');
const authMiddleware = require('./middleware/authMiddleware');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const productsRouter = require('./routes/products');
const authRouter = require('./routes/auth');
const githubRouter = require('./routes/github');

app.use('/auth', authRouter);
app.use('/products', authMiddleware, productsRouter);
app.use('/github', githubRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
