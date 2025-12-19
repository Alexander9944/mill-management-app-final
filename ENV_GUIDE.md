# Environment Configuration Guide

## Backend Environment Variables (.env)

### Required Variables

```env
# MongoDB Connection URI
# Format: mongodb://username:password@host:port/database
# For local: mongodb://localhost:27017/oil-mill-management
# For Atlas: mongodb+srv://username:password@cluster.mongodb.net/oil-mill-management
MONGO_URI=mongodb://localhost:27017/oil-mill-management

# JWT Secret Key - Change this in production!
# Generate a strong random key:
# Run: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Server Port
PORT=5000

# Node Environment
NODE_ENV=development
```

### Optional Variables

```env
# CORS allowed origins (comma-separated)
CORS_ORIGIN=http://localhost:3000

# Database pooling
DB_POOL_SIZE=10

# Request timeout (ms)
REQUEST_TIMEOUT=30000

# Logging level
LOG_LEVEL=info
```

## Frontend Environment Variables (.env.local)

### Required Variables

```env
# Backend API URL
# Make sure it matches your backend server URL
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Optional Variables

```env
# Analytics
NEXT_PUBLIC_GA_ID=

# Feature flags
NEXT_PUBLIC_FEATURE_CHARTS=true
NEXT_PUBLIC_FEATURE_ALERTS=true
```

## Local Development Setup

### Quick Copy-Paste for Backend .env

```bash
cd backend
cat > .env << EOF
MONGO_URI=mongodb://localhost:27017/oil-mill-management
JWT_SECRET=dev_key_change_in_production_$(openssl rand -hex 16)
PORT=5000
NODE_ENV=development
EOF
```

### Quick Copy-Paste for Frontend .env.local

```bash
cd frontend
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:5000/api
EOF
```

## MongoDB Connection Strings

### Local MongoDB
```
mongodb://localhost:27017/oil-mill-management
```

### MongoDB with Auth (Local)
```
mongodb://username:password@localhost:27017/oil-mill-management
```

### MongoDB Atlas (Cloud)
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/oil-mill-management
```

#### How to get MongoDB Atlas connection string:
1. Login to https://www.mongodb.com/cloud/atlas
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your password
6. Replace `myFirstDatabase` with `oil-mill-management`

## JWT Secret Generation

### Option 1: Using Node.js
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Option 2: Using OpenSSL
```bash
openssl rand -hex 32
```

### Option 3: Using Python
```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

## Production Environment

### Recommended Values

```env
# Backend
MONGO_URI=mongodb+srv://prod_user:strong_password@cluster.mongodb.net/oil-mill-management
JWT_SECRET=<strong_random_key>
PORT=5000
NODE_ENV=production

# Frontend
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
```

### Security Checklist
- [ ] Change JWT_SECRET to a strong random value
- [ ] Use MongoDB Atlas or managed database
- [ ] Enable MongoDB authentication
- [ ] Set NODE_ENV=production
- [ ] Use HTTPS for API_URL
- [ ] Set appropriate CORS origins
- [ ] Enable environment variable encryption if using CI/CD

## Verification

### Verify Backend Configuration
```bash
cd backend
node -e "require('dotenv').config(); console.log('✓ MONGO_URI:', process.env.MONGO_URI); console.log('✓ PORT:', process.env.PORT); console.log('✓ NODE_ENV:', process.env.NODE_ENV);"
```

### Verify Frontend Configuration
```bash
cd frontend
node -e "require('dotenv').config({ path: '.env.local' }); console.log('✓ NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);"
```

## Troubleshooting

### "Cannot find module 'dotenv'"
```bash
npm install dotenv
```

### "MONGO_URI is undefined"
- Check .env file exists in backend folder
- Verify format: `MONGO_URI=value` (no spaces around =)

### "API calls failing with CORS error"
- Check NEXT_PUBLIC_API_URL matches backend URL
- Make sure backend is running
- Check backend port matches in URL

### "Cannot connect to MongoDB"
- Verify MONGO_URI format
- Check MongoDB service is running
- Test connection with MongoDB Compass
- Verify database credentials (for Atlas)

## Example .env Files

### For Quick Local Testing

**backend/.env**
```env
MONGO_URI=mongodb://localhost:27017/oil-mill-management
JWT_SECRET=test_secret_key_12345
PORT=5000
NODE_ENV=development
```

**frontend/.env.local**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### For Docker Deployment

**backend/.env**
```env
MONGO_URI=mongodb://mongo:27017/oil-mill-management
JWT_SECRET=secure_random_key_here
PORT=5000
NODE_ENV=production
```

**frontend/.env.local**
```env
NEXT_PUBLIC_API_URL=http://backend:5000/api
```

### For Cloud Deployment (Heroku)

**backend**
Set in Heroku Config Vars:
```
MONGO_URI: mongodb+srv://...
JWT_SECRET: <strong_random>
PORT: (automatically set by Heroku)
NODE_ENV: production
```

**frontend**
Set in deployment platform:
```
NEXT_PUBLIC_API_URL: https://your-api.herokuapp.com/api
```

---

Need more help? Check README.md and SETUP.md files!
