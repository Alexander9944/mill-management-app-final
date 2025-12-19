const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Stock = require('./models/Stock');

const STOCK_CATEGORIES = [
    { name: 'White Oil', unit: 'Liters' },
    { name: 'Second Quality Oil', unit: 'Liters' },
    { name: 'Lamp Oil', unit: 'Liters' },
    { name: 'Kopra Stock', unit: 'Kg' },
    { name: 'Diesel', unit: 'Liters' },
];

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✓ Connected to MongoDB');

        // Create default admin user
        const adminExists = await User.findOne({ username: 'admin' });
        if (!adminExists) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('admin123', salt);
            
            const admin = new User({
                username: 'admin',
                password: hashedPassword,
                role: 'admin'
            });
            
            await admin.save();
            console.log('✓ Created default admin user (username: admin, password: admin123)');
        } else {
            console.log('✓ Admin user already exists');
        }

        // Create stock categories
        for (const category of STOCK_CATEGORIES) {
            const stockExists = await Stock.findOne({ name: category.name });
            if (!stockExists) {
                const stock = new Stock({
                    name: category.name,
                    quantity: 0,
                    unit: category.unit,
                    notes: `Initial ${category.name} stock`
                });
                await stock.save();
                console.log(`✓ Created stock: ${category.name}`);
            } else {
                console.log(`✓ Stock already exists: ${category.name}`);
            }
        }

        console.log('\n✅ Database seeding completed successfully!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Database seeding failed:', err.message);
        process.exit(1);
    }
}

seedDatabase();
