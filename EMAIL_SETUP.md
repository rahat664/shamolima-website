# Email Configuration Setup Guide

This guide explains how to configure email functionality for the contact and quote request forms in the Shamolima website.

## Overview

The application uses **Nodemailer** to send emails from the contact form (`/contact`) and quote request form (`/quote`). When a user submits either form, the server sends an email to your specified recipient address.

## Features

- **Contact Form**: Sends customer inquiries with name, email, phone, subject, and message
- **Quote Request Form**: Sends quote requests with shipment details (pickup, dropoff, date, cargo, notes)
- **Email Templates**: Professional HTML and plain text email formatting
- **Form Validation**: Client-side and server-side validation
- **User Feedback**: Success/error messages with loading states
- **Reply-To Headers**: Emails include customer's email for easy replies

## Setup Instructions

### 1. Create Environment File

Copy the example environment file and configure your SMTP settings:

```bash
cp .env.example .env
```

### 2. Configure Email Settings

Edit the `.env` file with your email provider's settings:

```env
# SMTP Server Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false

# Email Authentication
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password-here

# Email Recipient (where form submissions will be sent)
EMAIL_TO=info@shamolima.com
```

### 3. Provider-Specific Setup

#### Using Gmail

1. **Enable 2-Factor Authentication**
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification

2. **Generate App Password**
   - Visit [App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and your device
   - Copy the generated 16-character password
   - Use this as `SMTP_PASS` (not your regular Gmail password)

3. **Configuration**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=xxxx-xxxx-xxxx-xxxx  # Your App Password
   EMAIL_TO=info@shamolima.com
   ```

#### Using Outlook/Office365

```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
EMAIL_TO=info@shamolima.com
```

#### Using Custom SMTP Server

```env
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=465
SMTP_SECURE=true  # Set to true for port 465
SMTP_USER=noreply@yourdomain.com
SMTP_PASS=your-password
EMAIL_TO=info@shamolima.com
```

### 4. Start the Server

The email functionality requires the SSR (Server-Side Rendering) server to be running:

```bash
# Build and start production server
npm run build:ssr
npm run serve:ssr

# Or use the combined command
npm run start:ssr
```

The server will start on `http://localhost:4000` (or the port specified in `PORT` environment variable).

### 5. Test the Forms

1. Navigate to `http://localhost:4000/contact` or `http://localhost:4000/quote`
2. Fill out the form with test data
3. Submit the form
4. Check the configured `EMAIL_TO` address for the email

## API Endpoints

### POST /api/contact

Sends a contact form submission.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+880-123-456789",
  "subject": "General Inquiry",
  "message": "Your message here"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

### POST /api/quote

Sends a quote request submission.

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+880-123-456789",
  "pickup": "Dhaka",
  "dropoff": "Chattogram",
  "date": "2025-11-01",
  "cargo": "Industrial Equipment",
  "notes": "Requires special handling"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Quote request sent successfully"
}
```

## Troubleshooting

### Emails Not Sending

1. **Check Console Logs**: Look for error messages in the server console
2. **Verify Credentials**: Ensure `SMTP_USER` and `SMTP_PASS` are correct
3. **Check Firewall**: Ensure port 587 or 465 is not blocked
4. **Test SMTP Settings**: Use a tool like [SMTP Tester](https://www.smtper.net/) to verify your SMTP credentials

### Gmail "Less Secure Apps" Error

- Gmail no longer supports "less secure apps"
- You **must** use an App Password (see Gmail setup instructions above)
- Regular Gmail passwords will not work

### "Email service not configured" Error

This error occurs when `SMTP_USER`, `SMTP_PASS`, or `EMAIL_TO` environment variables are not set. Check your `.env` file.

### Form Validation Errors

Both forms require:
- **Contact Form**: name, email, and message
- **Quote Form**: name, email, pickup location, and dropoff location

## Email Templates

### Contact Form Email

Subject: `Contact Form: Message from [Name]` or custom subject

Content includes:
- Customer name, email, phone
- Subject line
- Message body

### Quote Request Email

Subject: `Quote Request: [Name] - [Pickup] to [Dropoff]`

Content includes:
- Customer information
- Shipment details (pickup, dropoff, date, cargo)
- Additional notes

## Security Considerations

1. **Never commit `.env` file**: The `.env` file is already in `.gitignore`
2. **Use App Passwords**: For Gmail, always use App Passwords, not regular passwords
3. **Environment Variables**: In production, set environment variables through your hosting platform (Vercel, Heroku, AWS, etc.)
4. **Rate Limiting**: Consider adding rate limiting to prevent spam (not included in current implementation)

## Production Deployment

When deploying to production:

1. **Set Environment Variables** in your hosting platform (not in `.env` file):
   - Vercel: Project Settings → Environment Variables
   - Heroku: Config Vars
   - AWS: Parameter Store or Secrets Manager

2. **Build the Application**:
   ```bash
   npm run build:ssr
   ```

3. **Start the Server**:
   ```bash
   npm run serve:ssr
   ```

4. **Set PORT Variable** (optional):
   ```bash
   PORT=8080 npm run serve:ssr
   ```

## Architecture

### Server-Side (src/server.ts)

- Express server with two POST endpoints: `/api/contact` and `/api/quote`
- Nodemailer transporter configured from environment variables
- Email validation and error handling
- HTML and plain text email templates

### Client-Side

- **EmailService** (`src/app/shared/email.service.ts`): Angular service for form submissions
- **Contact Component** (`src/app/features/contact/`): Contact form with email integration
- **Quote Component** (`src/app/features/quote/`): Quote request form with email integration
- Uses Angular signals for reactive state management
- Displays success/error messages to users

## Support

For issues or questions:
- Check server logs for detailed error messages
- Verify SMTP settings with your email provider
- Ensure the server is running (`npm run serve:ssr`)
- Test the API endpoints directly using tools like Postman or curl

## Example Test with curl

```bash
# Test contact form
curl -X POST http://localhost:4000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+880-123-456789",
    "subject": "Test",
    "message": "This is a test message"
  }'

# Test quote form
curl -X POST http://localhost:4000/api/quote \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+880-123-456789",
    "pickup": "Dhaka",
    "dropoff": "Chattogram",
    "date": "2025-11-01",
    "cargo": "Test Cargo",
    "notes": "Test notes"
  }'
```
