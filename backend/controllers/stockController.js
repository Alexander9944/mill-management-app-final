const Stock = require('../models/Stock');
const StockTransaction = require('../models/StockTransaction');

// Get all stocks
exports.getStocks = async (req, res) => {
    try {
        const stocks = await Stock.find().sort({ name: 1 });
        res.json(stocks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Add a new stock type (for initial setup)
exports.createStock = async (req, res) => {
    const { name, unit, notes } = req.body;
    try {
        let stock = await Stock.findOne({ name });
        if (stock) {
            return res.status(400).json({ msg: 'Stock already exists' });
        }
        stock = new Stock({ name, unit, notes });
        await stock.save();
        res.json(stock);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Update stock quantity (Add/Remove)
exports.updateStock = async (req, res) => {
    const { stockId, type, quantity, remarks } = req.body; // type: 'add' or 'remove'

    try {
        let stock = await Stock.findById(stockId);
        if (!stock) {
            return res.status(404).json({ msg: 'Stock not found' });
        }

        const qty = Number(quantity);
        if (type === 'remove' && stock.quantity < qty) {
            return res.status(400).json({ msg: 'Insufficient stock' });
        }

        // Update stock quantity
        if (type === 'add') {
            stock.quantity += qty;
        } else if (type === 'remove') {
            stock.quantity -= qty;
        }
        stock.lastUpdated = Date.now();
        await stock.save();

        // Create Transaction Record
        const transaction = new StockTransaction({
            stockId,
            type,
            quantity: qty,
            remarks
        });
        await transaction.save();

        res.json({ stock, transaction });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get History
exports.getHistory = async (req, res) => {
    try {
        // Can filter by stockId if query param present
        const query = {};
        if (req.query.stockId) {
            query.stockId = req.query.stockId;
        }

        const transactions = await StockTransaction.find(query)
            .populate('stockId', ['name', 'unit'])
            .sort({ date: -1 });
        res.json(transactions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
