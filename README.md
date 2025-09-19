# Eatly - Food Delivery Platform

A modern food delivery platform built with React, Vite, and Firebase. Features include real-time order tracking, chat support, payment processing with Stripe, and comprehensive restaurant management.

##Features

- **User Features:**

  - Browse restaurants and menus
  - Real-time order tracking with maps
  - Chat support with restaurants
  - Multiple payment methods via Stripe
  - Address management
  - Order history

- **Restaurant Features:**

  - Restaurant dashboard
  - Menu management
  - Order processing
  - Driver management
  - Payment processing via Stripe Connect
  - Chat support with customers

- **Admin Features:**

  - Restaurant verification
  - Order management
  - Content management (blogs, ingredients)
  - Analytics dashboard

- **Driver Features:**
  - Real-time order assignments
  - GPS tracking
  - Delivery management

## Tech Stack

- **Frontend:** React 18, Vite, TailwindCSS, DaisyUI
- **State Management:** TanStack React Query
- **Forms:** React Hook Form + Yup validation
- **Maps:** Mapbox GL JS
- **Real-time:** Firebase Realtime Database
- **Payments:** Stripe & Stripe Connect
- **Authentication:** JWT with Firebase Custom Auth
- **Routing:** React Router DOM

## Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create environment file:

   ```bash
   cp .env.example .env
   ```

4. Fill in your environment variables in `.env`

5. Start development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env` file with the following variables:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5015/api/

# Mapbox
VITE_APP_MAPBOX_TOKEN=your_mapbox_token

# Firebase
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_FIREBASE_DATABASE_URL=your_firebase_database_url

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React contexts (Auth, Restaurant)
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── queries/            # TanStack Query hooks
├── routes/             # Route protection components
├── schemas/            # Form validation schemas
├── services/           # API and external service integrations
├── styles/             # Global styles and utilities
└── utils/              # Utility functions
```

## Security Considerations

- All API calls are authenticated with JWT tokens
- Environment variables are used for sensitive data
- CORS is configured for production domains
- Input validation on all forms
- Route protection based on user roles

## License

This project is licensed under the MIT License.
