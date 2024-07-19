const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/repos/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const response = await axios.get(`https://api.github.com/users/${username}/repos`);
    res.send(response.data);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch repositories' });
  }
});

module.exports = router;
