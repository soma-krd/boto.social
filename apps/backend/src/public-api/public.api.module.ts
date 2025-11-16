import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from '@boto/backend/services/auth/auth.service';
import { StripeService } from '@boto/nestjs-libraries/services/stripe.service';
import { PoliciesGuard } from '@boto/backend/services/auth/permissions/permissions.guard';
import { PermissionsService } from '@boto/backend/services/auth/permissions/permissions.service';
import { IntegrationManager } from '@boto/nestjs-libraries/integrations/integration.manager';
import { UploadModule } from '@boto/nestjs-libraries/upload/upload.module';
import { OpenaiService } from '@boto/nestjs-libraries/openai/openai.service';
import { ExtractContentService } from '@boto/nestjs-libraries/openai/extract.content.service';
import { CodesService } from '@boto/nestjs-libraries/services/codes.service';
import { PublicIntegrationsController } from '@boto/backend/public-api/routes/v1/public.integrations.controller';
import { PublicAuthMiddleware } from '@boto/backend/services/auth/public.auth.middleware';

const authenticatedController = [PublicIntegrationsController];
@Module({
  imports: [UploadModule],
  controllers: [...authenticatedController],
  providers: [
    AuthService,
    StripeService,
    OpenaiService,
    ExtractContentService,
    PoliciesGuard,
    PermissionsService,
    CodesService,
    IntegrationManager,
  ],
  get exports() {
    return [...this.imports, ...this.providers];
  },
})
export class PublicApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PublicAuthMiddleware).forRoutes(...authenticatedController);
  }
}

