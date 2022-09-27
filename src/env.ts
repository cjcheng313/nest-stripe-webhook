import * as dotenv from 'dotenv';

/* Load env vars when importing this file*/
dotenv.config();

/**
 * Stripe secret key
 */
export const stripeSecretKey = process.env['STRIPE_SECRET_KEY'];

/**
 * Stripe webhook secret
 */
export const stripeWebhookSecret = process.env['STRIPE_WEBHOOK_SECRET'];
