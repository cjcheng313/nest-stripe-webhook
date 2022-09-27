import {
  BadRequestException,
  Controller,
  Headers,
  Post,
  Req,
} from '@nestjs/common';

import RequestWithRawBody from './requestWithRawBody.interface';
import { AppService } from '../app.service';

@Controller('webhook')
export default class StripeWebhookController {
  constructor(private readonly paymentService: AppService) {}

  @Post()
  async handleIncomingEvents(
    @Headers('stripe-signature') signature: string,
    @Req() request: RequestWithRawBody,
  ) {
    if (!signature) {
      throw new BadRequestException('Missing stripe-signature header');
    }

    const event = await this.paymentService.constructEventFromPayload(
      signature,
      request.rawBody,
    );

    console.log(event.type);
    console.log(event.data.object);
    console.log(event.data.object.id);

    return { success: true };
  }
}
