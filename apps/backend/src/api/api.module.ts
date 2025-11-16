import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from '@boto/backend/api/routes/auth.controller';
import { AuthService } from '@boto/backend/services/auth/auth.service';
import { UsersController } from '@boto/backend/api/routes/users.controller';
import { AuthMiddleware } from '@boto/backend/services/auth/auth.middleware';
import { StripeController } from '@boto/backend/api/routes/stripe.controller';
import { StripeService } from '@boto/nestjs-libraries/services/stripe.service';
import { AnalyticsController } from '@boto/backend/api/routes/analytics.controller';
import { PoliciesGuard } from '@boto/backend/services/auth/permissions/permissions.guard';
import { PermissionsService } from '@boto/backend/services/auth/permissions/permissions.service';
import { IntegrationsController } from '@boto/backend/api/routes/integrations.controller';
import { IntegrationManager } from '@boto/nestjs-libraries/integrations/integration.manager';
import { SettingsController } from '@boto/backend/api/routes/settings.controller';
import { PostsController } from '@boto/backend/api/routes/posts.controller';
import { MediaController } from '@boto/backend/api/routes/media.controller';
import { UploadModule } from '@boto/nestjs-libraries/upload/upload.module';
import { BillingController } from '@boto/backend/api/routes/billing.controller';
import { NotificationsController } from '@boto/backend/api/routes/notifications.controller';
import { MarketplaceController } from '@boto/backend/api/routes/marketplace.controller';
import { MessagesController } from '@boto/backend/api/routes/messages.controller';
import { OpenaiService } from '@boto/nestjs-libraries/openai/openai.service';
import { ExtractContentService } from '@boto/nestjs-libraries/openai/extract.content.service';
import { CodesService } from '@boto/nestjs-libraries/services/codes.service';
import { CopilotController } from '@boto/backend/api/routes/copilot.controller';
import { AgenciesController } from '@boto/backend/api/routes/agencies.controller';
import { PublicController } from '@boto/backend/api/routes/public.controller';
import { RootController } from '@boto/backend/api/routes/root.controller';
import { TrackService } from '@boto/nestjs-libraries/track/track.service';
import { ShortLinkService } from '@boto/nestjs-libraries/short-linking/short.link.service';
import { Nowpayments } from '@boto/nestjs-libraries/crypto/nowpayments';
import { WebhookController } from '@boto/backend/api/routes/webhooks.controller';
import { SignatureController } from '@boto/backend/api/routes/signature.controller';
import { AutopostController } from '@boto/backend/api/routes/autopost.controller';
import { SetsController } from '@boto/backend/api/routes/sets.controller';
import { ThirdPartyController } from '@boto/backend/api/routes/third-party.controller';
import { MonitorController } from '@boto/backend/api/routes/monitor.controller';

const authenticatedController = [
  UsersController,
  AnalyticsController,
  IntegrationsController,
  SettingsController,
  PostsController,
  MediaController,
  BillingController,
  NotificationsController,
  MarketplaceController,
  MessagesController,
  CopilotController,
  AgenciesController,
  WebhookController,
  SignatureController,
  AutopostController,
  SetsController,
  ThirdPartyController,
];
@Module({
  imports: [UploadModule],
  controllers: [
    RootController,
    StripeController,
    AuthController,
    PublicController,
    MonitorController,
    ...authenticatedController,
  ],
  providers: [
    AuthService,
    StripeService,
    OpenaiService,
    ExtractContentService,
    AuthMiddleware,
    PoliciesGuard,
    PermissionsService,
    CodesService,
    IntegrationManager,
    TrackService,
    ShortLinkService,
    Nowpayments,
  ],
  get exports() {
    return [...this.imports, ...this.providers];
  },
})
export class ApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(...authenticatedController);
  }
}
