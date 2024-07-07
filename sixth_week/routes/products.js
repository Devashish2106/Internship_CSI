const express = require('express');
const router = express.Router();

let products = [];

// Create a new product
router.post('/', (req, res) => {
  const product = req.body;
  products.push(product);
  res.status(201).send(product);
});

// Get all products
router.get('/', (req, res) => {
  res.send(products);
});

// Get a product by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
});

// Update a product by ID
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex(p => p.id === id);
  if (productIndex !== -1) {
    const updatedProduct = { ...products[productIndex], ...req.body };
    products[productIndex] = updatedProduct;
    res.send(updatedProduct);
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
});

// Delete a product by ID
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex(p => p.id === id);
  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
});

module.exports = router;
