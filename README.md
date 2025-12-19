# Oil Mill Management System - Full Stack MERN Application

A comprehensive web application for managing oil mill inventory with secure authentication and real-time stock management.

## 🎯 Features

✅ **Secure Admin Login** - JWT-based authentication  
✅ **Stock Management** - Add, remove, and track stock levels  
✅ **Multiple Oil Categories** - White Oil, Second Quality Oil, Lamp Oil, Kopra Stock, Diesel  
✅ **Real-time Stock Balance** - Automatic calculation and validation  
✅ **Stock History** - Complete transaction history with dates and remarks  
✅ **Responsive Design** - Mobile-friendly Tailwind CSS UI  
✅ **Negative Stock Prevention** - Validation to prevent invalid operations  

## 📊 Predefined Stock Categories

- **White Oil** (Liters)
- **Second Quality Oil** (Liters)
- **Lamp Oil** (Liters)
- **Kopra Stock** (Kg)
- **Diesel** (Liters)

## 🏗️ Tech Stack

### Backend
- **Node.js** & **Express.js** - REST API server
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Secure authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests

### Frontend
- **React 19** & **Next.js 16** - UI framework
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client
- **Client-side routing** with Next.js

## 📁 Project Structure

```
oil-mill-management/
├── backend/
│   ├── config/
│   ├── controllers/
│   │   ├── authController.js      # Auth logic
│   │   └── stockController.js     # Stock operations
│   ├── middleware/
│   │   └── auth.js                # JWT verification
│   ├── models/
│   │   ├── User.js                # User schema
│   │   ├── Stock.js               # Stock schema
│   │   └── StockTransaction.js    # Transaction schema
│   ├── routes/
│   │   ├── auth.js                # Auth endpoints
│   │   └── stock.js               # Stock endpoints
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── login/
    │   │   │   └── page.js         # Login page
    │   │   ├── dashboard/
    │   │   │   ├── layout.js       # Protected layout
    │   │   │   └── page.js         # Dashboard page
    │   │   ├── layout.js           # Root layout
    │   │   ├── page.js             # Home redirect
    │   │   └── globals.css
    │   ├── components/
    │   │   ├── Dashboard.js        # Main dashboard
    │   │   ├── StockCard.js        # Stock display
    │   │   ├── AddStockModal.js    # Add/Remove modal
    │   │   ├── StockHistoryTable.js # History table
    │   │   └── Header.js           # Navigation header
    │   └── lib/
    │       ├── api.js              # API client
    │       └── useAuth.js          # Auth hook
    ├── .env.local
    ├── package.json
    └── next.config.js
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas connection)
- npm or yarn

### Backend Setup

1. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment variables** (`.env`)
   ```env
   MONGO_URI=mongodb://localhost:27017/oil-mill-management
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   PORT=5000
   NODE_ENV=development
   ```

3. **Create initial admin user** (optional)
   - Access the backend routes to register an admin user
   - Or use the `/api/auth/register` endpoint with POST request

4. **Start the backend**
   ```bash
   npm start
   # or for development with auto-reload
   npx nodemon server.js
   ```

   Backend runs at: `http://localhost:5000`

### Frontend Setup

1. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Configure environment variables** (`.env.local`)
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

   Frontend runs at: `http://localhost:3000`

## 🔐 Default Credentials

For initial testing:
- **Username**: `admin`
- **Password**: `admin123`

⚠️ **Change these credentials in production!**

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/me` - Get current user (protected)

### Stock Management
- `GET /api/stock` - Get all stocks (protected)
- `POST /api/stock` - Create new stock category (protected)
- `POST /api/stock/transaction` - Add/Remove stock (protected)
- `GET /api/stock/history` - Get transaction history (protected)
- `GET /api/stock/history?stockId=<id>` - Get specific stock history (protected)

## 💾 Database Models

### User
```javascript
{
  username: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['admin', 'staff'], default: 'admin'),
  createdAt: Date
}
```

### Stock
```javascript
{
  name: String (required, unique),
  quantity: Number (default: 0),
  unit: String (e.g., 'Liters', 'Kg'),
  notes: String,
  lastUpdated: Date
}
```

### StockTransaction
```javascript
{
  stockId: ObjectId (ref: 'Stock'),
  type: String (enum: ['add', 'remove']),
  quantity: Number,
  date: Date,
  remarks: String
}
```

## 🎨 UI Features

### Dashboard
- Clean, card-based layout for each stock item
- Real-time quantity display
- Status indicators (In Stock, Low Stock, Out of Stock)
- Quick action buttons (Add/Remove)

### Stock Cards
- Current quantity display
- Last updated timestamp
- Status badges
- Action buttons

### Add/Remove Modal
- Input validation
- Unit display
- Optional remarks field
- Real-time error handling

### History Table
- Complete transaction log
- Sortable by date
- Shows stock name, type, quantity, date, and remarks
- Responsive on mobile devices

## 🔒 Security Features

✅ Password hashing with bcryptjs  
✅ JWT token-based authentication  
✅ Protected API routes with middleware  
✅ CORS configuration  
✅ Input validation on backend  
✅ Negative stock prevention  

## ✅ Validation Rules

- Stock quantity cannot be negative
- Cannot remove more stock than available
- All required fields must be provided
- Stock names must be unique
- JWT tokens expire after 24 hours

## 🚢 Deployment

### Backend (Express)
- Deploy to Heroku, AWS, DigitalOcean, or similar
- Set production environment variables
- Use production MongoDB URI
- Change JWT_SECRET to a secure value

### Frontend (Next.js)
- Build: `npm run build`
- Start: `npm run start`
- Or deploy to Vercel for automatic deployment

## 📝 Usage Guide

### Admin Dashboard
1. **Login** - Enter admin credentials
2. **Initialize** - Click "Initialize Stock Categories" button (first time only)
3. **Add Stock** - Click "Add" button on any stock card
4. **Remove Stock** - Click "Remove" button on any stock card
5. **View History** - Scroll to see all transactions
6. **Logout** - Click logout button in header

### Adding/Removing Stock
1. Click the respective button on the stock card
2. Enter quantity (with decimals if needed)
3. Add optional remarks
4. Confirm operation

## 🐛 Troubleshooting

**Cannot connect to MongoDB**
- Ensure MongoDB is running: `mongod`
- Check MONGO_URI in `.env`
- Verify MongoDB is accessible

**API calls failing**
- Check backend is running on port 5000
- Verify NEXT_PUBLIC_API_URL in frontend `.env.local`
- Check browser console for CORS errors

**Token expiration**
- Tokens expire after 24 hours
- Login again to get a new token
- Token is stored in localStorage

## 📈 Future Enhancements

- [ ] Automatic low stock email alerts
- [ ] PDF report generation
- [ ] Stock forecasting charts
- [ ] User role-based access control
- [ ] Barcode scanning for quick operations
- [ ] Mobile app version
- [ ] Database backup automation
- [ ] Multi-language support

## 📄 License

MIT License - Feel free to use for personal and commercial projects

## 👨‍💻 Contributing

Feel free to fork and submit pull requests for any improvements!

## 📞 Support

For issues and questions, please create an issue in the repository or contact the development team.

---

**Built with ❤️ using MERN Stack**
