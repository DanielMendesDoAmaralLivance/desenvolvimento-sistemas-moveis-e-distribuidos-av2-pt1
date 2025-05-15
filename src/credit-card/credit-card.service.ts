import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreditCard, Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CreditCardService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('NOTIFICATION_SERVICE')
    private readonly notificationClient: ClientProxy,
  ) {}

  async create(data: Prisma.CreditCardCreateInput): Promise<CreditCard> {
    const creditCard = await this.registerPayment(data);

    await this.processPayment(creditCard);

    return creditCard;
  }

  private async registerPayment(
    data: Prisma.CreditCardCreateInput,
  ): Promise<CreditCard> {
    const creditCard = await this.prisma.creditCard.create({ data });

    this.sendRegisteredPaymentNotification(creditCard);

    return creditCard;
  }

  private async processPayment(creditCard: CreditCard): Promise<void> {
    setTimeout(async () => {
      await this.prisma.creditCard.update({
        where: {
          id: creditCard.id,
        },
        data: {
          paymentConfirmed: true,
        },
      });

      this.sendConfirmationPaymentNotification(creditCard);
    }, 5000);
  }

  private sendRegisteredPaymentNotification(creditCard: CreditCard): void {
    this.sendNotification('payment_registered', creditCard);
  }

  private sendConfirmationPaymentNotification(creditCard: CreditCard): void {
    this.sendNotification('payment_confirmed', creditCard);
  }

  private sendNotification(
    type: NotificationType,
    creditCard: CreditCard,
  ): void {
    this.notificationClient
      .emit(type, {
        message: JSON.stringify(creditCard),
      })
      .subscribe({
        next: () => console.log(`[${type}] notification sent.`),
        error: (err) =>
          console.error(`[${type}] failed to send notification:`, err),
      });
  }
}

type NotificationType = 'payment_registered' | 'payment_confirmed';
