# Eatly Vercel Deployment - Quick Start Guide

## 🚀 Quick Deployment Steps

### 1. Repository Setup

- Ensure your code is pushed to GitHub/GitLab/Bitbucket
- Your React app is located in the `Eatly.Client` folder

### 2. Vercel Setup

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "Add New Project"
3. Import your Git repository
4. **Set Root Directory to `Eatly.Client`** (Very Important!)
5. Vercel will detect it as a Vite project

### 3. Environment Variables (Required!)

Add these in Vercel Dashboard > Settings > Environment Variables:

```bash
# API & Services
VITE_API_BASE_URL=https://your-production-api.com/api/
VITE_APP_MAPBOX_TOKEN=your_mapbox_token_here

# Firebase (Current project configuration)
VITE_FIREBASE_API_KEY=AIzaSyB-nSAGhmWg2WAzNw-mK8RbGNFS3SVS6GE
VITE_FIREBASE_AUTH_DOMAIN=eatly-eae0e.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=eatly-eae0e
VITE_FIREBASE_STORAGE_BUCKET=eatly-eae0e.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=808319531419
VITE_FIREBASE_APP_ID=1:808319531419:web:6aaa83b6e587832194893e
VITE_FIREBASE_DATABASE_URL=https://eatly-eae0e-default-rtdb.europe-west1.firebasedatabase.app

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
```

### 4. Deploy

Click "Deploy" and wait for the build to complete!

## 📋 Required API Keys

### 🗺️ Mapbox (for Maps)

- Go to [mapbox.com](https://account.mapbox.com/access-tokens/)
- Create account and get access token
- Required for: Address autocomplete, order tracking, restaurant locations

### 🔥 Firebase (for Real-time features)

- Go to [console.firebase.google.com](https://console.firebase.google.com/)
- Create project and get config
- Required for: Authentication, real-time chat, notifications

### 💳 Stripe (for Payments)

- Go to [dashboard.stripe.com](https://dashboard.stripe.com/apikeys)
- Get publishable key
- Required for: Payment processing, restaurant payouts

## 🏗️ Project Structure

```
Eatly/
├── package.json (root dependencies)
├── README.md
├── DEPLOYMENT.md (detailed guide)
├── PRE_DEPLOYMENT_CHECKLIST.md
└── Eatly.Client/ (React app - SET AS ROOT IN VERCEL)
    ├── vercel.json (Vercel configuration)
    ├── vite.config.js (Build configuration)
    ├── package.json (Frontend dependencies)
    ├── .env.example (Environment template)
    ├── .env.vercel (Vercel environment template)
    └── src/ (React source code)
```

## ⚠️ Important Notes

1. **Root Directory**: Must be set to `Eatly.Client` in Vercel
2. **Environment Variables**: Must start with `VITE_` prefix
3. **Production Keys**: Use production keys for live deployment
4. **CORS**: Configure your backend API to allow your Vercel domain
5. **Firebase**: Add your Vercel domain to Firebase authorized domains

## 📚 Documentation Files Created

1. **DEPLOYMENT.md** - Complete deployment guide
2. **PRE_DEPLOYMENT_CHECKLIST.md** - Detailed checklist
3. **.env.vercel** - Environment variables template
4. **.env.local** - Local development template

## 🔧 Build Configuration

Your project is configured with:

- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm ci`

## 📞 Need Help?

- Check the detailed guides in `DEPLOYMENT.md`
- Review the checklist in `PRE_DEPLOYMENT_CHECKLIST.md`
- Ensure all environment variables are correctly set
- Verify your backend API is accessible
- Check Vercel function logs for errors

## 🚨 Common Issues

1. **Build fails**: Check if all dependencies are in package.json
2. **Blank page**: Check console for errors, verify environment variables
3. **API not working**: Check CORS settings on your backend
4. **Maps not loading**: Verify Mapbox token and billing setup
5. **Payments failing**: Check Stripe keys and webhook configuration

---

Your Eatly app is now ready for deployment! 🍕🚀
