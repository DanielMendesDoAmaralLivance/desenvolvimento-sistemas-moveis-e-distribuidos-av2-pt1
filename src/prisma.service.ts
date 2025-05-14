import { PrismaClient } from 'generated/prisma';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: ['query', 'info', 'warn'],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
