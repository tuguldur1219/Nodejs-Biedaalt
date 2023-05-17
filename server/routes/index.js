const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const NodeCache = require('node-cache');

// Create a new cache instance
const cache = new NodeCache();

/**
 * App Routes 
*/
router.get('/', (req, res) => {
  const cachedData = cache.get('homepageData'); // Check if data exists in cache
  if (cachedData) {
    res.send(cachedData); // Send cached data
  } else {
    mainController.homepage(req, res); // Call controller method to fetch data
  }
});

router.get('/about', (req, res) => {
  const cachedData = cache.get('aboutData'); // Check if data exists in cache
  if (cachedData) {
    res.send(cachedData); // Send cached data
  } else {
    mainController.about(req, res); // Call controller method to fetch data
  }
});

module.exports = router;
