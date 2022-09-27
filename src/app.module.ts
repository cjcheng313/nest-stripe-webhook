import { StripeModule } from '@golevelup/nestjs-stripe';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { stripeSecretKey, stripeWebhookSecret } from './env';
import { JsonBodyMiddleware } from './stripeWebhook/json-body.middleware';
import { RawBodyMiddleware } from './stripeWebhook/raw-body.middleware';

@Module({
  imports: [
    StripeModule.forRoot(StripeModule, {
      apiKey: stripeSecretKey,
      webhookConfig: {
        stripeWebhookSecret: stripeWebhookSecret,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(RawBodyMiddleware)
      .forRoutes({
        path: '*',
        method: RequestMethod.POST,
      })
      .apply(JsonBodyMiddleware)
      .forRoutes('*');
  }
}
