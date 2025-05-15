import { Body, Controller, Post } from '@nestjs/common';
import { CreditCardService } from './credit-card.service';
import { CreditCard, Prisma } from 'generated/prisma';

@Controller('credit-card')
export class CreditCardController {
  constructor(private readonly creditCardService: CreditCardService) {}

  @Post('/send')
  async send(@Body() body: Prisma.CreditCardCreateInput): Promise<CreditCard> {
    try {
      return await this.creditCardService.create(body);
    } catch (e) {
      console.error(e);
    }
  }
}
