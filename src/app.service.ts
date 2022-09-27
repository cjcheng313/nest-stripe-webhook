import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class AppService {
  private stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2020-08-27',
    });
  }

  public async constructEventFromPayload(signature: string, payload: Buffer) {
    return this.stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  }

  public getHello() {
    return 'hello';
  }
}
