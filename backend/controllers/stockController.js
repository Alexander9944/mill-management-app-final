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
// Edit a stock transaction
exports.editTransaction = async (req, res) => {
    const { quantity, remarks } = req.body;
    try {
        const transaction = await StockTransaction.findById(req.params.id);
        if (!transaction) return res.status(404).json({ msg: 'Transaction not found' });

        const stock = await Stock.findById(transaction.stockId);
        if (!stock) return res.status(404).json({ msg: 'Linked stock not found' });

        const oldQty = transaction.quantity;
        const newQty = Number(quantity);
        const diff = newQty - oldQty;

        // Revert old and apply new:
        // If 'add': stock = stock - old + new => stock + (new - old) => stock + diff
        // If 'remove': stock = stock + old - new => stock - (new - old) => stock - diff
        if (transaction.type === 'add') {
            stock.quantity += diff;
        } else {
            if (stock.quantity < diff) return res.status(400).json({ msg: 'Insufficient stock for this adjustment' });
            stock.quantity -= diff;
        }

        transaction.quantity = newQty;
        transaction.remarks = remarks !== undefined ? remarks : transaction.remarks;
        stock.lastUpdated = Date.now();

        await stock.save();
        await transaction.save();

        res.json({ stock, transaction });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete a stock transaction
exports.deleteTransaction = async (req, res) => {
    try {
        const transaction = await StockTransaction.findById(req.params.id);
        if (!transaction) return res.status(404).json({ msg: 'Transaction not found' });

        const stock = await Stock.findById(transaction.stockId);
        if (stock) {
            // Revert the stock change
            if (transaction.type === 'add') {
                stock.quantity -= transaction.quantity;
            } else {
                stock.quantity += transaction.quantity;
            }
            await stock.save();
        }

        await transaction.deleteOne();
        res.json({ msg: 'Transaction deleted and stock reverted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
