# Pre-Deployment Checklist for Eatly

## 📋 Before Deploying to Vercel

### 1. Code & Repository

- [ ] All code is committed and pushed to your Git repository
- [ ] Repository is accessible by Vercel (public or granted access)
- [ ] Latest changes are on the main/master branch

### 2. Environment Setup

- [ ] All API endpoints are production-ready
- [ ] Backend server is deployed and accessible
- [ ] Database is set up and configured for production

### 3. Third-Party Services

- [ ] **Mapbox**: Production token obtained and configured
- [ ] **Firebase**: Production project created and configured
- [ ] **Stripe**: Production keys obtained (or test keys for staging)
- [ ] **Backend API**: CORS configured to allow your Vercel domain

### 4. Firebase Configuration

- [ ] Firebase project created for production
- [ ] Authentication methods enabled (if using Firebase Auth)
- [ ] Realtime Database rules configured
- [ ] Storage bucket created (if using Firebase Storage)
- [ ] Security rules properly configured

### 5. Stripe Configuration

- [ ] Stripe account verified
- [ ] Stripe Connect enabled (for restaurant payments)
- [ ] Webhooks configured for your production domain
- [ ] Tax settings configured (if applicable)

### 6. Domain & SSL

- [ ] Custom domain ready (if not using Vercel subdomain)
- [ ] DNS configured to point to Vercel
- [ ] SSL certificate will be auto-provisioned by Vercel

## 🚀 Deployment Steps

### Step 1: Vercel Project Setup

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your Git repository
4. **Important**: Set Root Directory to `Eatly.Client`
5. Framework will be auto-detected as Vite

### Step 2: Environment Variables

Copy from `.env.vercel` file and add to Vercel:

```bash
# In Vercel Dashboard > Settings > Environment Variables
VITE_API_BASE_URL=https://your-production-api.com/api/
VITE_APP_MAPBOX_TOKEN=your_mapbox_token
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
VITE_FIREBASE_DATABASE_URL=https://your-project-rtdb.region.firebasedatabase.app
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_key
```

### Step 3: Build Configuration

Your `vercel.json` is configured with:

- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm ci`

### Step 4: Deploy

1. Click "Deploy" in Vercel
2. Wait for build to complete
3. Test your deployment

## 🔧 Post-Deployment Tasks

### 1. API Configuration

- [ ] Update API CORS settings to include your Vercel domain
- [ ] Test API endpoints from your deployed app
- [ ] Verify authentication flows work

### 2. Firebase Security

- [ ] Update Firebase security rules for production
- [ ] Add your domain to Firebase authorized domains
- [ ] Test real-time features

### 3. Stripe Configuration

- [ ] Update Stripe webhook endpoints to your production domain
- [ ] Test payment flows
- [ ] Verify Stripe Connect onboarding works

### 4. Testing

- [ ] Test all major user flows
- [ ] Verify maps functionality
- [ ] Test payment processing
- [ ] Check real-time chat features
- [ ] Verify file uploads work
- [ ] Test responsive design on mobile

### 5. Performance & SEO

- [ ] Run Lighthouse audit
- [ ] Check Core Web Vitals
- [ ] Verify meta tags and Open Graph
- [ ] Test loading performance

## 🔍 Troubleshooting Common Issues

### Build Failures

- Check if all dependencies are in package.json
- Verify Node.js version compatibility
- Check for TypeScript errors

### Environment Variables Not Working

- Ensure variables start with `VITE_`
- Check they're set in Vercel dashboard
- Verify spelling and case sensitivity

### API Calls Failing

- Check CORS configuration on backend
- Verify API URLs are correct
- Check authentication headers

### Maps Not Loading

- Verify Mapbox token is correct
- Check token permissions
- Ensure billing is set up on Mapbox account

### Payment Issues

- Verify Stripe keys (live vs test)
- Check webhook configurations
- Verify Connect setup for restaurants

## 📊 Monitoring & Maintenance

### Analytics

- [ ] Set up Google Analytics
- [ ] Configure error tracking (Sentry, LogRocket)
- [ ] Monitor Core Web Vitals

### Performance

- [ ] Set up performance monitoring
- [ ] Monitor bundle size
- [ ] Track loading times

### Security

- [ ] Regular security audits
- [ ] Keep dependencies updated
- [ ] Monitor for vulnerabilities

## 🔄 Continuous Deployment

Once deployed, Vercel will automatically:

- Deploy on every push to main branch
- Create preview deployments for pull requests
- Provide deployment logs and analytics

## 📞 Support

- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Firebase Support**: [firebase.google.com/support](https://firebase.google.com/support)
- **Stripe Support**: [stripe.com/support](https://stripe.com/support)
- **Mapbox Support**: [mapbox.com/help](https://mapbox.com/help)
