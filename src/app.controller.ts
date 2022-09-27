import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  Post,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import RequestWithRawBody from './stripeWebhook/requestWithRawBody.interface';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller('webhook')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  async handleIncomingEvents(
    @Body() rawBody: Buffer,
    @Headers('stripe-signature') signature: string,
    @Req() request: Request,
  ) {
    // if (!signature) {
    //   throw new BadRequestException('Missing stripe-signature header');
    // }
    //const event = JSON.parse(request.body);
    console.log(request.body);
    //console.log(request.rawBody);
    console.log(rawBody);
    const event = await this.appService.constructEventFromPayload(
      signature,
      request.body,
    );

    console.log(event.type);
    console.log(event.data.object);
    console.log(event.data.object.id);

    return { success: true };
  }
}
