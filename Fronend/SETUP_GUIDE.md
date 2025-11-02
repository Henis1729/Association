# Frontend Setup Guide

## Prerequisites
- Node.js 14.x or higher
- npm or yarn package manager

## Installation

1. Navigate to the Frontend directory:
```bash
cd Fronend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `Fronend` directory:
```env
REACT_APP_API_URL=http://localhost:3001/api/v1
```

4. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## Backend Configuration

Make sure your backend is running on `http://localhost:3001` (or update `.env` to match your backend URL).

The backend must be configured with:
- CORS enabled for `http://localhost:3000`
- All API endpoints accessible at `/api/v1`

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Runs the test suite
- `npm eject` - Ejects from Create React App (one-way operation)

## Features

### Pages
- **Home** - Landing page with features and CTA
- **Login/Register** - User authentication
- **Dashboard** - User profile and quick actions
- **Browse Owners** - View accommodation listings with filters
- **Browse Tenants** - View roommate listings with filters
- **Post Accommodation** - Create property listings (landlords)
- **Post Roommate** - Create roommate requests (students)
- **About** - Information about the platform
- **Contact** - Contact form
- **Message Generator** - Generate WhatsApp messages

### Key Features
- ✅ Modern, responsive UI with Tailwind CSS
- ✅ User authentication with JWT
- ✅ Protected routes
- ✅ Real-time form validation
- ✅ API integration with backend
- ✅ Mobile-friendly design
- ✅ WhatsApp integration
- ✅ Advanced filtering and search

## Troubleshooting

### API Connection Issues
If you see connection errors:
1. Verify backend is running on the correct port
2. Check CORS settings in backend
3. Verify `.env` file has correct API URL
4. Check browser console for detailed error messages

### Authentication Issues
If login/signup fails:
1. Verify backend authentication endpoints are working
2. Check token storage in browser localStorage
3. Clear localStorage and try again

## Production Build

To create a production build:
```bash
npm run build
```

The `build` folder will contain the optimized production files ready for deployment.

## Deployment

You can deploy to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Any static hosting service

Remember to:
1. Update `REACT_APP_API_URL` to your production backend URL
2. Rebuild the application
3. Upload the `build` folder contents

