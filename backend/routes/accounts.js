const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const auth = require('../middleware/auth');

router.get('/', auth, accountController.getTransactions);
router.post('/', auth, accountController.createTransaction);
router.get('/summary', auth, accountController.getSummary);
router.delete('/:id', auth, accountController.deleteTransaction);
router.put('/:id', auth, accountController.updateTransaction);

module.exports = router;
