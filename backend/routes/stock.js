const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');
const auth = require('../middleware/auth'); // Protect routes

// All routes protected
router.get('/', auth, stockController.getStocks);
router.post('/', auth, stockController.createStock); // Create new stock type
router.post('/transaction', auth, stockController.updateStock); // Add/Remove stock
router.get('/history', auth, stockController.getHistory);
router.put('/transaction/:id', auth, stockController.editTransaction);
router.delete('/transaction/:id', auth, stockController.deleteTransaction);

module.exports = router;
