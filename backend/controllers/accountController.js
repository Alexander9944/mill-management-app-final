const AccountTransaction = require('../models/AccountTransaction');

// Get all transactions
exports.getTransactions = async (req, res) => {
    try {
        const transactions = await AccountTransaction.find().sort({ date: -1 });
        res.json(transactions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Add a transaction
exports.createTransaction = async (req, res) => {
    const { type, category, quantity, pricePerUnit, amount, remarks, date } = req.body;

    try {
        const newTransaction = new AccountTransaction({
            type,
            category,
            quantity,
            pricePerUnit,
            amount,
            remarks,
            date: date || Date.now()
        });

        const transaction = await newTransaction.save();
        res.json(transaction);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete a transaction
exports.deleteTransaction = async (req, res) => {
    try {
        const transaction = await AccountTransaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ msg: 'Transaction not found' });
        }

        await transaction.deleteOne();
        res.json({ msg: 'Transaction removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Update a transaction
exports.updateTransaction = async (req, res) => {
    const { type, category, quantity, pricePerUnit, amount, remarks, date } = req.body;
    try {
        let transaction = await AccountTransaction.findById(req.params.id);
        if (!transaction) return res.status(404).json({ msg: 'Transaction not found' });

        transaction.type = type || transaction.type;
        transaction.category = category || transaction.category;
        transaction.quantity = quantity !== undefined ? quantity : transaction.quantity;
        transaction.pricePerUnit = pricePerUnit !== undefined ? pricePerUnit : transaction.pricePerUnit;
        transaction.amount = amount !== undefined ? amount : transaction.amount;
        transaction.remarks = remarks !== undefined ? remarks : transaction.remarks;
        transaction.date = date || transaction.date;

        await transaction.save();
        res.json(transaction);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get Summary
exports.getSummary = async (req, res) => {
    try {
        const result = await AccountTransaction.aggregate([
            {
                $group: {
                    _id: "$type",
                    total: { $sum: "$amount" }
                }
            }
        ]);

        const summary = {
            credit: 0,
            debit: 0,
            balance: 0
        };

        result.forEach(item => {
            if (item._id === 'credit') summary.credit = item.total;
            if (item._id === 'debit') summary.debit = item.total;
        });

        summary.balance = summary.credit - summary.debit;
        res.json(summary);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
