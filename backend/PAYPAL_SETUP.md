# PayPal Integration Setup

## Backend Setup

1. Create a `.env` file in the backend directory with the following variables:

```env
# Database
MONGO_URI="mongodb+srv://sathishskr371:sathish2004@pythonpro.hpd10yr.mongodb.net/petstore"

# JWT Secret
JWT_SECRET="sathishskr371"

# PayPal Configuration

PAYPAL_CLIENT_ID=AaidrgQYcA3b_VLnkbLQFVUfqpF8wTTa1SJwGqH31qLpHnGNwh59FzPfm1FiZHwFJpAmJcGRE8vJyE0v  # Your actual ID
PAYPAL_CLIENT_SECRET=EKE3MGuQS5_Q-9LfjBCOLeRe_HatC0G6BcCDKQMz-LUofM4Xsqz4ORzgp5jrk4C-8sPssY_j8WJptsK6    # Your actual secret
PAYPAL_API=https://api-m.sandbox.paypal.com



# Email Configuration (for OTP)
EMAIL_USER="sathishsathish75363@gmail.com"
EMAIL_PASS="kimv taag ollc kusf"

# Server Port
PORT=3000
```

## Frontend Setup

1. Create a `.env` file in the frontend directory:

```env

```

**Important**: Make sure to restart your development server after adding the environment variable.

## PayPal Developer Account Setup

1. Go to [PayPal Developer Portal](https://developer.paypal.com/)
2. Create a developer account
3. Create a new app to get your Client ID and Client Secret
4. Use Sandbox credentials for testing
5. Replace `YOUR_PAYPAL_CLIENT_ID` in the frontend code with your actual Client ID

## Testing

- Use PayPal Sandbox accounts for testing
- Create test buyer and seller accounts in PayPal Developer Portal
- Test the complete payment flow from cart to order confirmation

## Troubleshooting

### Common Issues:

1. **"process is not defined" error**: 
   - This happens when using `process.env` instead of `import.meta.env` in Vite
   - Solution: Use `import.meta.env.VITE_PAYPAL_CLIENT_ID`

2. **PayPal button not loading**:
   - Check if `VITE_PAYPAL_CLIENT_ID` is set correctly
   - Restart the development server after adding environment variables
   - Check browser console for network errors

3. **"PayPal Client ID not configured" error**:
   - Add `VITE_PAYPAL_CLIENT_ID=your_actual_client_id` to frontend `.env` file
   - Make sure the client ID is from PayPal Developer Portal

## Production

- Switch to PayPal Live API endpoints
- Update environment variables with production credentials
- Ensure proper error handling and logging 