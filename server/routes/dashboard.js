const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/checkAuth');
const dashboardController = require('../controllers/dashboardController');
const NodeCache = require('node-cache');

// Create a new cache instance
const cache = new NodeCache();

/**
 * Dashboard Routes 
*/

// Cached Dashboard Route
router.get('/dashboard', isLoggedIn, (req, res) => {
  const cachedData = cache.get('dashboardData'); // Check if data exists in cache
  if (cachedData) {
    res.send(cachedData); // Send cached data
  } else {
    dashboardController.dashboard(req, res); // Call controller method to fetch data
  }
});

router.get('/dashboard/item/:id', isLoggedIn, dashboardController.dashboardViewNote);
router.put('/dashboard/item/:id', isLoggedIn, dashboardController.dashboardUpdateNote);
router.delete('/dashboard/item-delete/:id', isLoggedIn, dashboardController.dashboardDeleteNote);
router.get('/dashboard/add', isLoggedIn, dashboardController.dashboardAddNote);
router.post('/dashboard/add', isLoggedIn, dashboardController.dashboardAddNoteSubmit);
router.get('/dashboard/search', isLoggedIn, dashboardController.dashboardSearch);
router.post('/dashboard/search', isLoggedIn, dashboardController.dashboardSearchSubmit);


module.exports = router;
