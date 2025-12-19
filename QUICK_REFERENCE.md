# 🚀 Quick Reference Card

## 📦 Installation

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

## ⚙️ Configuration

### Backend .env
```env
MONGO_URI=mongodb://localhost:27017/oil-mill-management
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
NODE_ENV=development
```

### Frontend .env.local
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 🗄️ Database Setup

```bash
# Seed database with admin user & stock categories
cd backend
npm run seed
```

## 🎯 Running the Application

### Terminal 1 - Backend
```bash
cd backend
npm run dev    # Development with nodemon
npm start      # Production
```

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev    # Development
npm run build  # Build for production
npm start      # Production
```

## 🌐 Access Points

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:3000 | Web application |
| Backend API | http://localhost:5000/api | REST API |
| MongoDB | localhost:27017 | Database (local) |

## 🔑 Default Login

```
Username: admin
Password: admin123
```

## 📚 Key Files Location

### Backend
- Controllers: `backend/controllers/`
- Models: `backend/models/`
- Routes: `backend/routes/`
- Middleware: `backend/middleware/`
- Main Server: `backend/server.js`

### Frontend
- Pages: `frontend/src/app/`
- Components: `frontend/src/components/`
- Utilities: `frontend/src/lib/`

## 🔌 API Quick Reference

### Auth
```
POST   /api/auth/register    - Register
POST   /api/auth/login       - Login
GET    /api/auth/me          - Current user (protected)
```

### Stock
```
GET    /api/stock            - All stocks (protected)
POST   /api/stock            - Create stock (protected)
POST   /api/stock/transaction - Add/Remove (protected)
GET    /api/stock/history    - History (protected)
```

## 🧪 Testing with cURL

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### Get Stocks
```bash
curl -X GET http://localhost:5000/api/stock \
  -H "x-auth-token: YOUR_TOKEN_HERE"
```

### Add Stock
```bash
curl -X POST http://localhost:5000/api/stock/transaction \
  -H "x-auth-token: YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"stockId":"STOCK_ID","type":"add","quantity":100,"remarks":"Initial"}'
```

## 🐛 Debugging

### Check Backend Logs
```bash
# Look for connection messages
tail -f backend/logs/app.log  # if logging setup
```

### Check Browser Console
```
F12 or Ctrl+Shift+I
Console tab → Check for errors
Network tab → Check API calls
```

### MongoDB Connection
```bash
# Test local MongoDB
mongo  # or mongosh
> use oil-mill-management
> db.users.find()
```

## 🧹 Cleanup

```bash
# Remove dependencies
rm -rf backend/node_modules
rm -rf frontend/node_modules

# Clear npm cache
npm cache clean --force

# Remove build artifacts
rm -rf backend/build
rm -rf frontend/.next
```

## 📦 Build for Production

### Backend
```bash
# No build needed, just run with NODE_ENV=production
NODE_ENV=production node server.js
```

### Frontend
```bash
npm run build
npm start  # Serves optimized build
```

## 🚀 Deploy to Heroku

### Backend
```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create app-name

# Set environment variables
heroku config:set MONGO_URI=your_mongo_uri
heroku config:set JWT_SECRET=your_secret

# Deploy
git push heroku main
```

### Frontend
```bash
# Deploy to Vercel
npm install -g vercel
vercel

# Or use GitHub integration on Vercel
```

## 💡 Useful npm Commands

```bash
# Install specific version
npm install package@1.0.0

# Update all dependencies
npm update

# Check for security issues
npm audit
npm audit fix

# List installed packages
npm list

# Install development dependency
npm install --save-dev package

# Uninstall
npm uninstall package
```

## 📖 Documentation Files

| File | Purpose |
|------|---------|
| README.md | Full documentation |
| SETUP.md | Quick start guide |
| ENV_GUIDE.md | Environment variables |
| COMPLETION_SUMMARY.md | Project status & features |

## 🎨 Tailwind CSS Utilities Used

```css
/* Common classes used */
.container      /* Max width container */
.grid          /* CSS Grid */
.flex          /* Flexbox */
.p-4           /* Padding */
.mb-4          /* Margin bottom */
.bg-blue-600   /* Background color */
.text-white    /* Text color */
.rounded-lg    /* Border radius */
.shadow-lg     /* Box shadow */
.hover:*       /* Hover states */
.responsive    /* Mobile-first responsive */
```

## 🔐 Security Checklist

- [ ] Change JWT_SECRET in production
- [ ] Use HTTPS for frontend API URL
- [ ] Enable MongoDB authentication
- [ ] Set secure CORS origins
- [ ] Use environment variables for secrets
- [ ] Enable HTTPS on backend
- [ ] Set secure password policy
- [ ] Regular security audits

## 📊 File Size Optimization

```bash
# Check bundle size
npm run build
# Frontend: Check .next size

# Optimize images
npm install next-image-optimization
```

## ⚡ Performance Tips

1. Use production builds
2. Enable caching
3. Minimize database queries
4. Use CDN for static files
5. Enable gzip compression
6. Lazy load components

## 🆘 Common Errors & Solutions

| Error | Solution |
|-------|----------|
| Port 5000 in use | Change PORT in .env or kill process |
| Cannot connect to DB | Check MONGO_URI, ensure MongoDB running |
| CORS error | Check NEXT_PUBLIC_API_URL matches backend |
| Token expired | Login again to get new token |
| 404 on API | Verify route path and HTTP method |

## 📞 Getting Help

1. Check README.md - Full documentation
2. Check SETUP.md - Common issues section
3. Check browser console - Debug errors
4. Check backend logs - Server errors
5. Test API with Postman - Verify endpoints

---

**Keep this card handy for quick reference! 📌**

Last updated: 2025-12-16
