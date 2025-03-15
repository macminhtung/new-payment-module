import type { Stripe } from 'stripe';

export interface IStripeCredential {
  apiKey: string;
  config?: Stripe.StripeConfig;
}

export interface IPayaCredential {
  userId: string;
  userApiKey: string;
  developerId: string;
  locationId: string;
  baseUrl: string;
}
