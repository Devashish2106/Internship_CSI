const express = require('express');
const bodyParser = require('body-parser');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const productsRouter = require('./routes/products');
const authRouter = require('./routes/auth');

app.use('/auth', authRouter);
app.use('/products', authMiddleware, productsRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
