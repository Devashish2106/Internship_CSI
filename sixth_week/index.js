const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const productsRouter = require('./routes/products');
app.use('/products', productsRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
