# 🚀 Oil Mill Management System - Quick Start Guide

## ⚡ Quick Setup (5 minutes)

### Step 1: MongoDB Setup
Choose one option:

**Option A: Local MongoDB**
```bash
# Windows: Download from https://www.mongodb.com/try/download/community
# Mac: brew install mongodb-community
# Start MongoDB
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Copy your connection string
5. Update `MONGO_URI` in backend `.env`

### Step 2: Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Setup environment
# Make sure .env file has:
# MONGO_URI=mongodb://localhost:27017/oil-mill-management
# JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
# PORT=5000

# Seed the database with default admin user and stock categories
npm run seed

# Start the server
npm run dev
```

✅ Backend running at: `http://localhost:5000`

### Step 3: Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

✅ Frontend running at: `http://localhost:3000`

### Step 4: Login
1. Open http://localhost:3000
2. You'll be redirected to login page
3. Use credentials:
   - Username: `admin`
   - Password: `admin123`

## 📊 First Time Using

After logging in:
1. Click "Initialize Stock Categories" button (appears if no stocks exist)
2. This creates the 5 oil categories
3. Start adding stock using the "+ Add" buttons

## 📁 File Structure Overview

```
backend/
├── server.js           ← Main server file
├── seed.js             ← Database initialization script
├── .env                ← Environment variables
├── package.json
└── models/
    ├── User.js         ← Admin user schema
    ├── Stock.js        ← Stock items schema
    └── StockTransaction.js ← History schema

frontend/
├── src/app/
│   ├── page.js         ← Home (redirects to login/dashboard)
│   ├── layout.js       ← Root layout
│   ├── login/
│   │   └── page.js     ← Login page
│   └── dashboard/
│       ├── page.js     ← Dashboard
│       └── layout.js   ← Protected layout
├── src/components/
│   ├── Dashboard.js    ← Main dashboard logic
│   ├── StockCard.js    ← Individual stock display
│   ├── AddStockModal.js← Add/Remove modal
│   └── Header.js       ← Navigation
└── package.json
```

## 🔑 Key Features

### Add/Remove Stock
- Click ➕ **Add** or ➖ **Remove** on any stock card
- Enter quantity (supports decimals)
- Add optional remarks
- System prevents negative stock

### View History
- Scroll down to see all transactions
- Shows: Item, Type (Add/Remove), Quantity, Date, Remarks
- History is real-time

### Dashboard Info
- **Green** cards = Sufficient stock
- **Yellow** cards = Low stock
- **Red** cards = Out of stock

## 🔒 Password Change

To change admin password:
1. Use MongoDB Compass or Atlas UI
2. Find the user in `users` collection
3. Or create a new admin user via API:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"newadmin","password":"newpassword123"}'
```

## 🐛 Common Issues & Solutions

### "Cannot connect to MongoDB"
```bash
# Check if MongoDB is running
# Windows: Services → MongoDB Server
# Mac: brew services list
# Linux: sudo systemctl status mongodb

# Or check your MONGO_URI in .env
```

### "API calls failing / CORS error"
- Make sure backend is running on port 5000
- Check `NEXT_PUBLIC_API_URL=http://localhost:5000/api` in frontend

### "Stuck on loading / blank page"
- Clear browser cache: Ctrl+Shift+Delete (Windows) / Cmd+Shift+Delete (Mac)
- Or open in incognito/private mode

### "Port 5000 already in use"
```bash
# Kill the process using port 5000
# Windows: netstat -ano | findstr :5000
# Mac/Linux: lsof -i :5000
```

## 📊 API Testing (with Postman)

### 1. Register/Login
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

Save the `token` from response.

### 2. Get All Stocks
```
GET http://localhost:5000/api/stock
Headers: x-auth-token: [paste token here]
```

### 3. Add Stock
```
POST http://localhost:5000/api/stock/transaction
Headers: x-auth-token: [paste token here]
Content-Type: application/json

{
  "stockId": "[stock id from step 2]",
  "type": "add",
  "quantity": 100,
  "remarks": "Initial stock"
}
```

## 📱 Mobile Responsiveness

The app is fully responsive:
- ✅ Desktop (1920px+)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (320px - 767px)

## 🚀 Production Deployment

### Backend
```bash
# Build for production
npm run build

# Set production environment variables
# MONGO_URI: Your production MongoDB
# JWT_SECRET: Strong random key
# NODE_ENV: production
# PORT: Your production port

# Deploy to Heroku, AWS, etc.
```

### Frontend
```bash
# Build
npm run build

# Deploy to Vercel, Netlify, etc.
# Or run: npm start
```

## 📚 Next Steps

After setup, explore:
1. Add stock from different categories
2. Test the add/remove functionality
3. Check the history table
4. Logout and login again
5. Try different quantities and remarks

## 💡 Pro Tips

- 💾 Data is persisted in MongoDB automatically
- 🔐 Each user has their own JWT token
- 📝 All transactions are recorded with timestamps
- 📊 History shows all movements (not just current session)
- 🔄 Logout and login to test authentication

## 📞 Need Help?

Check the main README.md for:
- Detailed API documentation
- Database models
- Full feature list
- Deployment guide

---

**Happy inventory management! 🎉**
