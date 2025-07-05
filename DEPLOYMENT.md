# Vercel Deployment Guide for Eatly

## 🚀 Deploying to Vercel

### Prerequisites

- Vercel account (sign up at vercel.com)
- Git repository hosted on GitHub, GitLab, or Bitbucket
- Required API keys and credentials

### Step 1: Prepare Your Repository

1. Ensure your code is committed and pushed to your Git repository
2. Make sure the `vercel.json` configuration file is in your project root (`Eatly.Client/` directory)

### Step 2: Import Project to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your Git repository
4. Set the **Root Directory** to `Eatly.Client` (since that's where your React app is located)
5. Vercel will automatically detect it's a Vite project

### Step 3: Configure Environment Variables

In your Vercel project settings, add the following environment variables:

#### Required Environment Variables:

```bash
# API Configuration
VITE_API_BASE_URL=https://your-production-api.com/api/

# Mapbox (for maps functionality)
VITE_APP_MAPBOX_TOKEN=your_mapbox_token_here

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
VITE_FIREBASE_APP_ID=your-firebase-app-id
VITE_FIREBASE_DATABASE_URL=your-firebase-database-url

# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### Step 4: Build Settings

Your `vercel.json` is already configured with the correct settings:

- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm ci`

### Step 5: Domain Configuration

1. After deployment, you'll get a Vercel URL (e.g., `your-app.vercel.app`)
2. Configure your custom domain in Vercel settings if needed
3. Update your API CORS settings to allow your Vercel domain

## 🔧 Getting Required API Keys

### Mapbox Token

1. Go to [Mapbox](https://account.mapbox.com/)
2. Create an account or sign in
3. Go to "Access tokens" section
4. Create a new token with the following scopes:
   - `styles:read`
   - `fonts:read`
   - `datasets:read`
   - `geocoding:read`

### Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing
3. Go to Project Settings > General
4. In "Your apps" section, add a web app
5. Copy the configuration values

### Stripe Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Navigate to Developers > API Keys
3. Copy the "Publishable key" (starts with `pk_`)
4. For Stripe Connect, ensure your platform is set up

## 📋 Deployment Checklist

- [ ] Repository is pushed to Git
- [ ] Root directory set to `Eatly.Client` in Vercel
- [ ] All environment variables configured
- [ ] API backend is accessible from Vercel domain
- [ ] Firebase project is configured for production
- [ ] Stripe keys are for production environment
- [ ] Mapbox token has correct permissions
- [ ] Domain CORS settings updated

## 🔍 Troubleshooting

### Common Issues:

1. **Build Fails**: Check if all dependencies are in `package.json`
2. **Environment Variables Not Working**: Ensure they start with `VITE_`
3. **API Calls Failing**: Check CORS settings on your backend
4. **Maps Not Loading**: Verify Mapbox token and permissions
5. **Stripe Not Working**: Ensure using production keys for production

### Vercel Specific:

- Root directory must be set to `Eatly.Client`
- Environment variables must be set in Vercel dashboard
- Check function logs in Vercel dashboard for errors

## 📝 Production Considerations

1. **API Security**: Ensure your backend API has proper authentication
2. **Firebase Security Rules**: Configure proper security rules
3. **Rate Limiting**: Implement rate limiting on your API
4. **Error Monitoring**: Consider adding error tracking (Sentry, LogRocket)
5. **Analytics**: Add Google Analytics or similar
6. **Performance**: Monitor Core Web Vitals in Vercel

## 🔄 Continuous Deployment

Once configured, Vercel will automatically deploy:

- Every push to your main branch
- Pull requests get preview deployments
- You can configure branch-specific deployments

## 🌐 Custom Domain Setup

1. In Vercel dashboard, go to your project
2. Navigate to "Settings" > "Domains"
3. Add your custom domain
4. Configure DNS records as instructed by Vercel
5. SSL certificate will be automatically provisioned
