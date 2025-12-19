# 🚀 Deployment Checklist

## Pre-Deployment Tasks

### Code Quality
- [ ] Run linting (if configured)
- [ ] No console.log statements in production code
- [ ] Removed all hardcoded sensitive data
- [ ] Code reviewed
- [ ] No TODOs or FIXMEs left in critical code

### Testing
- [ ] All features tested locally
- [ ] Login functionality works
- [ ] Stock add/remove operations validated
- [ ] History table displays correctly
- [ ] Mobile responsiveness verified
- [ ] Error handling tested
- [ ] API endpoints verified with Postman

### Security
- [ ] JWT_SECRET changed to strong random value
- [ ] No secrets in .env file on repo (use .env.example instead)
- [ ] CORS origins set appropriately
- [ ] HTTPS enabled for production API
- [ ] Password validation rules in place
- [ ] Input sanitization verified

### Documentation
- [ ] README.md updated with current info
- [ ] API documentation complete
- [ ] Setup instructions tested
- [ ] Troubleshooting guide updated

---

## Backend Deployment Checklist

### Environment Setup
- [ ] MONGO_URI set to production MongoDB
- [ ] JWT_SECRET changed from default
- [ ] NODE_ENV set to "production"
- [ ] PORT configured correctly
- [ ] CORS_ORIGIN set to frontend domain

### Database
- [ ] MongoDB database created
- [ ] Authentication enabled on MongoDB
- [ ] Backup strategy in place
- [ ] Indexes created for performance
- [ ] Seed script run to initialize data

### Server Configuration
- [ ] Error logging configured
- [ ] Request logging configured
- [ ] Health check endpoint added
- [ ] CORS properly configured
- [ ] Rate limiting considered

### Dependencies
- [ ] npm audit completed
- [ ] No critical vulnerabilities
- [ ] Security patches applied
- [ ] Dependencies updated where safe

### Deployment Platform (Choose one)

#### Heroku
- [ ] Heroku account created
- [ ] Procfile created
- [ ] Environment variables set in Heroku
- [ ] Buildpacks configured
- [ ] Deploy script prepared

#### AWS
- [ ] EC2 instance provisioned
- [ ] Security groups configured
- [ ] IAM roles set up
- [ ] RDS/MongoDB database configured
- [ ] Load balancer configured (optional)

#### DigitalOcean
- [ ] Droplet created
- [ ] Nginx configured
- [ ] SSL certificate installed
- [ ] Firewall rules configured
- [ ] Database backup configured

#### Google Cloud / Azure
- [ ] Project created
- [ ] VM/App Engine configured
- [ ] Cloud SQL/Cosmos DB configured
- [ ] IAM permissions set
- [ ] Monitoring enabled

### Pre-Flight Checks
- [ ] All environment variables set
- [ ] Database connection tested
- [ ] API endpoints responding
- [ ] Error handling working
- [ ] Logs accessible

### Deployment
- [ ] Code pushed to production repo
- [ ] Build completes without errors
- [ ] Server starts successfully
- [ ] Health check passes
- [ ] API endpoints accessible

### Post-Deployment Verification
- [ ] Login works
- [ ] Stock operations work
- [ ] History displays
- [ ] No console errors
- [ ] Database queries responsive
- [ ] Monitoring alerts configured

---

## Frontend Deployment Checklist

### Environment Setup
- [ ] NEXT_PUBLIC_API_URL set to production backend
- [ ] No localhost references in code
- [ ] Analytics enabled (if using)
- [ ] Feature flags configured

### Build Configuration
- [ ] next.config.js optimized
- [ ] Image optimization enabled
- [ ] API routes configured
- [ ] Redirects configured
- [ ] Environment variables set

### Build Process
- [ ] `npm run build` completes without errors
- [ ] No warnings in build output
- [ ] Static analysis passed
- [ ] Bundle size acceptable
- [ ] Sourcemaps handled (removed from production)

### Performance
- [ ] Lazy loading configured
- [ ] Image optimization working
- [ ] CSS minified
- [ ] JS minified and tree-shaken
- [ ] Caching headers set

### Deployment Platform (Choose one)

#### Vercel (Recommended for Next.js)
- [ ] Project connected to Vercel
- [ ] Environment variables set
- [ ] Build settings configured
- [ ] Domain configured
- [ ] SSL certificate installed
- [ ] Deployment preview working

#### Netlify
- [ ] Build settings configured
- [ ] Environment variables set
- [ ] Netlify.toml created
- [ ] Functions configured (if needed)
- [ ] Redirect rules configured

#### AWS Amplify
- [ ] App connected to repository
- [ ] Build settings configured
- [ ] Environment variables set
- [ ] Domain connected
- [ ] SSL certificate installed

#### Docker + Container Registry
- [ ] Dockerfile created
- [ ] Docker build tested locally
- [ ] Image pushed to registry
- [ ] Container runs successfully

### Pre-Flight Checks
- [ ] Build completes
- [ ] No hydration mismatches
- [ ] API calls to production backend
- [ ] Login redirects correctly
- [ ] Protected routes work

### Deployment
- [ ] Code deployed
- [ ] Build successful
- [ ] Domain accessible
- [ ] SSL working
- [ ] Redirects working

### Post-Deployment Verification
- [ ] Frontend loads
- [ ] Login works
- [ ] Dashboard displays
- [ ] API calls successful
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Performance metrics good
- [ ] Analytics tracking working

---

## Full Stack Integration Tests

After deploying both backend and frontend:

### Authentication
- [ ] Login with valid credentials works
- [ ] Invalid credentials rejected
- [ ] Token stored in localStorage
- [ ] Logout clears token
- [ ] Session persists on refresh

### Stock Operations
- [ ] Load stocks from API
- [ ] Add stock updates balance
- [ ] Remove stock updates balance
- [ ] Cannot remove more than available
- [ ] History records all transactions

### Data Integrity
- [ ] Stock quantities are accurate
- [ ] History shows correct timestamps
- [ ] Remarks saved and displayed
- [ ] No data loss on refresh

### Performance
- [ ] Page load time < 3 seconds
- [ ] API responses < 500ms
- [ ] Smooth animations/transitions
- [ ] No lag on interactions

### Cross-Browser Testing
- [ ] Chrome latest
- [ ] Firefox latest
- [ ] Safari latest
- [ ] Edge latest
- [ ] Mobile browsers

### Mobile Testing
- [ ] Responsive on all breakpoints
- [ ] Touch interactions work
- [ ] No horizontal scroll
- [ ] Text readable without zoom

---

## Monitoring & Maintenance

### Setup Monitoring
- [ ] Error tracking (Sentry, LogRocket, etc.)
- [ ] Performance monitoring (DataDog, New Relic)
- [ ] Uptime monitoring (Pingdom, UptimeRobot)
- [ ] Log aggregation (CloudWatch, LogLy, etc.)

### Configure Alerts
- [ ] High error rate alert
- [ ] Downtime alert
- [ ] Performance degradation alert
- [ ] Disk space alert
- [ ] Memory usage alert

### Backup Strategy
- [ ] Database backups automated
- [ ] Backup retention policy set
- [ ] Restore tested
- [ ] Disaster recovery plan documented

### Security Monitoring
- [ ] WAF rules configured
- [ ] DDoS protection enabled
- [ ] SSL certificate monitoring
- [ ] Vulnerability scanning enabled
- [ ] Access logs reviewed regularly

---

## Post-Deployment

### Documentation Update
- [ ] Update production deployment guide
- [ ] Update troubleshooting guide
- [ ] Update API documentation with prod URLs
- [ ] Document any configuration changes

### Team Communication
- [ ] Notify team of live deployment
- [ ] Share access credentials securely
- [ ] Document login procedure
- [ ] Share monitoring dashboards

### User Onboarding
- [ ] Create user guide
- [ ] Provide demo credentials (if needed)
- [ ] Setup user training
- [ ] Document reporting process

### Maintenance Schedule
- [ ] Define backup schedule
- [ ] Schedule security updates
- [ ] Plan dependency updates
- [ ] Schedule performance reviews

---

## Rollback Plan

In case of issues:

### Immediate Actions
- [ ] Identify the issue
- [ ] Check error logs
- [ ] Verify API connectivity
- [ ] Check database status

### Rollback to Previous Version
```bash
# Git rollback
git revert <commit-hash>
git push origin main

# Or deploy previous tagged version
git checkout <version-tag>
npm run build && npm start
```

### Communication
- [ ] Notify team of issue
- [ ] Update status page
- [ ] Send user notification if customer-facing
- [ ] Document incident

### Post-Incident
- [ ] Conduct root cause analysis
- [ ] Implement fix
- [ ] Add monitoring for this issue
- [ ] Update documentation

---

## Success Criteria ✅

Your deployment is successful when:

- ✅ Backend API responds at production URL
- ✅ Frontend loads at production domain
- ✅ Login works with valid credentials
- ✅ Stock operations function correctly
- ✅ History displays all transactions
- ✅ No console errors in browser
- ✅ Database persists data
- ✅ Mobile responsive
- ✅ Performance acceptable
- ✅ Monitoring configured
- ✅ Backups enabled
- ✅ Team trained

---

## Deployment Command Reference

### Backend (Node.js)
```bash
# Heroku
git push heroku main

# AWS EC2
ssh -i key.pem ec2-user@ip
git pull origin main
npm install --production
npm start

# Docker
docker build -t oil-mill-backend .
docker run -p 5000:5000 -e MONGO_URI=xxx oil-mill-backend
```

### Frontend (Next.js)
```bash
# Vercel
vercel deploy --prod

# GitHub Pages / Netlify
git push origin main  # Auto-deploys

# Manual
npm run build
npm start
```

---

## Useful Links

- **Vercel Docs**: https://vercel.com/docs
- **Heroku Docs**: https://devcenter.heroku.com/
- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **Express Deployment**: https://expressjs.com/en/advanced/best-practice-performance.html

---

**Print this checklist and check off items as you deploy! 📋**

Last updated: 2025-12-16
