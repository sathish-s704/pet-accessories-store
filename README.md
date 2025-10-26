# Pet Accessories Store

A full-stack e-commerce application for pet accessories with PayPal payment integration.

🌐 Live Demo: https://pet-frontend-tau.vercel.app/

## Features

- 🛍️ Product catalog with search and filtering
- 🛒 Shopping cart functionality
- 💳 PayPal payment integration
- 👤 User authentication and profiles
- 📱 Responsive design
- 🎨 Modern, colorful UI
- 🔐 Secure payment processing

## Tech Stack

### Frontend
- React 18
- React Bootstrap
- Vite
- Axios
- React Router DOM
- PayPal JavaScript SDK

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- PayPal REST API

## Setup Instructions

### 1. Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password

# PayPal Configuration
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
PAYPAL_API=https://api-m.sandbox.paypal.com
```

4. Start the backend server:
```bash
npm start
```

### 2. Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```env
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
```

4. Start the frontend development server:
```bash
npm run dev
```

## PayPal Integration Setup

### 1. PayPal Developer Account

1. Go to [PayPal Developer Portal](https://developer.paypal.com/)
2. Create a developer account
3. Navigate to "Apps & Credentials"
4. Create a new app for your application
5. Copy the Client ID and Client Secret

### 2. Environment Variables

**Backend (.env):**
```env
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
PAYPAL_API=https://api-m.sandbox.paypal.com
```

**Frontend (.env):**
```env
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
```

### 3. Testing

- Use PayPal Sandbox for testing
- Create sandbox buyer and seller accounts
- Test the complete payment flow

## Troubleshooting

### Common PayPal Issues

1. **"zoid destroyed all components" Error**
   - This is fixed in the updated PayPalButton component
   - The component now properly manages SDK lifecycle
   - Prevents multiple script loads and component re-renders

2. **"PayPal Client ID not configured" Error**
   - Ensure `VITE_PAYPAL_CLIENT_ID` is set in frontend `.env`
   - Check that the client ID is correct and not placeholder text

3. **"Failed to load PayPal SDK" Error**
   - Check internet connection
   - Verify PayPal client ID is valid
   - Ensure you're using the correct environment (sandbox/live)

4. **Payment Capture Errors**
   - Verify backend environment variables are set correctly
   - Check that PayPal API endpoints are accessible
   - Ensure order ownership verification is working

5. **"process is not defined" Error**
   - Use `import.meta.env` instead of `process.env` in Vite
   - Frontend environment variables must start with `VITE_`

### API Connection Issues

1. **ECONNREFUSED Errors**
   - Ensure backend is running on port 3000
   - Check that frontend proxy is configured correctly
   - Verify all image URLs use the correct backend port

2. **CORS Errors**
   - Backend CORS is configured for localhost:5173
   - Ensure frontend is running on the correct port

### Database Issues

1. **MongoDB Connection**
   - Verify MongoDB connection string is correct
   - Ensure MongoDB service is running
   - Check network connectivity

## Project Structure

```
pet accessories store/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   └── App.jsx
    └── package.json
```

## Features Implemented

- ✅ User authentication (login, register, profile)
- ✅ Product catalog with search and filters
- ✅ Shopping cart functionality
- ✅ PayPal payment integration
- ✅ Admin dashboard
- ✅ Order management
- ✅ Modern, responsive UI
- ✅ Error handling and loading states

## Next Steps

- [ ] Individual product detail pages
- [ ] Wishlist functionality
- [ ] Product reviews and ratings
- [ ] Enhanced admin analytics
- [ ] Email notifications
- [ ] Order tracking

## Support

If you encounter any issues:

1. Check the console for error messages
2. Verify all environment variables are set correctly
3. Ensure both frontend and backend are running
4. Check PayPal developer account configuration
5. Review the troubleshooting section above

For PayPal-specific issues, refer to the [PayPal Developer Documentation](https://developer.paypal.com/docs/). 
