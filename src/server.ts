import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import compression from 'compression';
import { join } from 'node:path';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

// Parse JSON request bodies for API endpoints
app.use(express.json());

// ---- Email configuration from environment variables ----
const EMAIL_CONFIG = {
  host: process.env['SMTP_HOST'] ?? 'smtp-relay.brevo.com',
  port: parseInt(process.env['SMTP_PORT'] ?? '587', 10),
  secure: process.env['SMTP_SECURE'] === 'true', // true for 465 (SMTPS), false for 587 (STARTTLS)
  auth: {
    user: process.env['SMTP_USER'] ?? '',
    pass: process.env['SMTP_PASS'] ?? '',
  },
  to: process.env['EMAIL_TO'] ?? 'rahatkabir20@gmail.com',
  from: process.env['EMAIL_FROM'] ?? 'no-reply@yourdomain.com', // fixed verified sender
};

let transporter: nodemailer.Transporter | null = null;

/**
 * Initialize and verify the SMTP transporter once.
 * Uses STARTTLS on 587 (secure=false + requireTLS=true).
 */
async function initTransporter(): Promise<nodemailer.Transporter> {
  if (!transporter) {
    if (!EMAIL_CONFIG.auth.user || !EMAIL_CONFIG.auth.pass) {
      throw new Error(
        'SMTP credentials missing. Set SMTP_USER and SMTP_PASS in your .env'
      );
    }

    transporter = nodemailer.createTransport({
      host: EMAIL_CONFIG.host,
      port: EMAIL_CONFIG.port,
      secure: EMAIL_CONFIG.secure, // false for 587
      auth: EMAIL_CONFIG.auth,
      requireTLS: EMAIL_CONFIG.port === 587 && !EMAIL_CONFIG.secure,
      // Diagnostics
      logger: true,
      debug: process.env['NODE_ENV'] !== 'production',
      // Timeouts help fail fast on blocked ports
      connectionTimeout: 20_000,
      greetingTimeout: 10_000,
      socketTimeout: 30_000,
    });

    try {
      await transporter.verify();
      console.log('✅ SMTP verified: connection/auth OK');
    } catch (e) {
      console.error('❌ SMTP verify failed:', e);
      // Keep throwing so you discover misconfig early
      throw e;
    }
  }
  return transporter;
}

/** Small helpers (no extra dependencies) */
function safeLine(s: unknown, max = 5000): string {
  return String(s ?? '')
    .replace(/[\r\n]+/g, ' ')
    .slice(0, max);
}
function safeBlock(s: unknown, max = 20000): string {
  return String(s ?? '').slice(0, max);
}
function looksLikeEmail(s: string | undefined): boolean {
  if (!s) return false;
  // simple, permissive email check
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

/**
 * API endpoint for contact form submissions
 */
app.post('/api/contact', async (req, res): Promise<any> => {
  try {
    const { name, email, phone, subject, message } = req.body ?? {};

    // Validate required fields
    if (!name || !email || !message || !looksLikeEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Name, valid email, and message are required',
      });
    }

    const tx = await initTransporter();

    // Build email
    const mailOptions: nodemailer.SendMailOptions = {
      from: `"${safeLine(name)}" <${EMAIL_CONFIG.from}>`, // fixed verified sender
      to: EMAIL_CONFIG.to,
      replyTo: safeLine(email),
      subject: safeLine(subject || `Contact Form: Message from ${name}`),
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${safeLine(name)}</p>
        <p><strong>Email:</strong> ${safeLine(email)}</p>
        <p><strong>Phone:</strong> ${safeLine(phone || 'Not provided')}</p>
        <p><strong>Subject:</strong> ${safeLine(subject || 'No subject')}</p>
        <h3>Message:</h3>
        <p>${safeBlock(message).replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Submitted from Shamolima Contact Form</small></p>
      `,
      text:
        `New Contact Form Submission

Name: ${safeLine(name)}
Email: ${safeLine(email)}
Phone: ${safeLine(phone || 'Not provided')}
Subject: ${safeLine(subject || 'No subject')}

Message:
${safeBlock(message)}

---
Submitted from Shamolima Contact Form`,
      headers: {
        // Optional: improves threading / deliverability signals
        'X-Entity-Ref-ID': `contact-${Date.now()}`,
      },
    };

    const info = await tx.sendMail(mailOptions);
    console.log('📨 SMTP response:', info.messageId, info.response);
    return res.json({ success: true, message: 'Email sent', id: info.messageId });
  } catch (error) {
    console.error('Error sending contact email:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to send email',
    });
  }
});

/**
 * API endpoint for quote request form submissions
 */
app.post('/api/quote', async (req, res): Promise<any> => {
  try {
    const { name, email, phone, pickup, dropoff, date, cargo, notes } = req.body ?? {};

    // Validate required fields
    if (!name || !email || !pickup || !dropoff || !looksLikeEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Name, valid email, pickup location, and dropoff location are required',
      });
    }

    const tx = await initTransporter();

    // Build email
    const mailOptions: nodemailer.SendMailOptions = {
      from: `"${safeLine(name)}" <${EMAIL_CONFIG.from}>`, // fixed verified sender
      to: EMAIL_CONFIG.to,
      replyTo: safeLine(email),
      subject: `Quote Request: ${safeLine(name)} - ${safeLine(pickup)} to ${safeLine(dropoff)}`,
      html: `
        <h2>New Quote Request</h2>
        <h3>Customer Information</h3>
        <p><strong>Name:</strong> ${safeLine(name)}</p>
        <p><strong>Email:</strong> ${safeLine(email)}</p>
        <p><strong>Phone:</strong> ${safeLine(phone || 'Not provided')}</p>

        <h3>Shipment Details</h3>
        <p><strong>Pickup Location:</strong> ${safeLine(pickup)}</p>
        <p><strong>Dropoff Location:</strong> ${safeLine(dropoff)}</p>
        <p><strong>Preferred Date:</strong> ${safeLine(date || 'Not specified')}</p>
        <p><strong>Cargo Description:</strong> ${safeLine(cargo || 'Not provided')}</p>

        <h3>Additional Notes</h3>
        <p>${safeBlock(notes || 'No additional notes').replace(/\n/g, '<br>')}</p>

        <hr>
        <p><small>Submitted from Shamolima Quote Request Form</small></p>
      `,
      text:
        `New Quote Request

Customer Information:
Name: ${safeLine(name)}
Email: ${safeLine(email)}
Phone: ${safeLine(phone || 'Not provided')}

Shipment Details:
Pickup Location: ${safeLine(pickup)}
Dropoff Location: ${safeLine(dropoff)}
Preferred Date: ${safeLine(date || 'Not specified')}
Cargo Description: ${safeLine(cargo || 'Not provided')}

Additional Notes:
${safeBlock(notes || 'No additional notes')}

---
Submitted from Shamolima Quote Request Form`,
      headers: {
        'X-Entity-Ref-ID': `quote-${Date.now()}`,
      },
    };

    const info = await tx.sendMail(mailOptions);
    console.log('📨 SMTP response:', info.messageId, info.response);
    return res.json({ success: true, message: 'Quote request sent', id: info.messageId });
  } catch (error) {
    console.error('Error sending quote email:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to send quote request',
    });
  }
});

/**
 * Enable gzip compression for dynamic SSR responses and static files.
 */
app.use(
  compression({
    threshold: 0,
  }),
);

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error?: unknown) => {
    if (error) {
      throw error;
    }
    console.log(`✅ Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
