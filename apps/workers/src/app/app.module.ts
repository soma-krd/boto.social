import { Module } from '@nestjs/common';

import { DatabaseModule } from '@boto/nestjs-libraries/database/prisma/database.module';
import { PostsController } from '@boto/workers/app/posts.controller';
import { BullMqModule } from '@boto/nestjs-libraries/bull-mq-transport-new/bull.mq.module';
import { PlugsController } from '@boto/workers/app/plugs.controller';
import { SentryModule } from '@sentry/nestjs/setup';
import { FILTER } from '@boto/nestjs-libraries/sentry/sentry.exception';

@Module({
  imports: [SentryModule.forRoot(), DatabaseModule, BullMqModule],
  controllers: [PostsController, PlugsController],
  providers: [FILTER],
})
export class AppModule {}
