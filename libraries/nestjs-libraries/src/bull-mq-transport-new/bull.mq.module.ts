import { Global, Module } from '@nestjs/common';
import { BullMqClient } from '@boto/nestjs-libraries/bull-mq-transport-new/client';

@Global()
@Module({
  providers: [BullMqClient],
  exports: [BullMqClient],
})
export class BullMqModule {}
