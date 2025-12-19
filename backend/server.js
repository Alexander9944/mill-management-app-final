const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Routes (Placeholder)
app.get('/', (req, res) => {
    res.send('Oil Mill Management API is running');
});

const authRoutes = require('./routes/auth');
const stockRoutes = require('./routes/stock');
const accountRoutes = require('./routes/accounts');
const todoRoutes = require('./routes/todos');

app.use('/api/auth', authRoutes);
app.use('/api/stock', stockRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/todos', todoRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
