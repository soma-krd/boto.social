import { Global, Module } from '@nestjs/common';
import { PrismaRepository, PrismaService, PrismaTransaction } from './prisma.service';
import { OrganizationRepository } from '@boto/nestjs-libraries/database/prisma/organizations/organization.repository';
import { OrganizationService } from '@boto/nestjs-libraries/database/prisma/organizations/organization.service';
import { UsersService } from '@boto/nestjs-libraries/database/prisma/users/users.service';
import { UsersRepository } from '@boto/nestjs-libraries/database/prisma/users/users.repository';
import { StarsService } from '@boto/nestjs-libraries/database/prisma/stars/stars.service';
import { StarsRepository } from '@boto/nestjs-libraries/database/prisma/stars/stars.repository';
import { SubscriptionService } from '@boto/nestjs-libraries/database/prisma/subscriptions/subscription.service';
import { SubscriptionRepository } from '@boto/nestjs-libraries/database/prisma/subscriptions/subscription.repository';
import { NotificationService } from '@boto/nestjs-libraries/database/prisma/notifications/notification.service';
import { IntegrationService } from '@boto/nestjs-libraries/database/prisma/integrations/integration.service';
import { IntegrationRepository } from '@boto/nestjs-libraries/database/prisma/integrations/integration.repository';
import { PostsService } from '@boto/nestjs-libraries/database/prisma/posts/posts.service';
import { PostsRepository } from '@boto/nestjs-libraries/database/prisma/posts/posts.repository';
import { IntegrationManager } from '@boto/nestjs-libraries/integrations/integration.manager';
import { MediaService } from '@boto/nestjs-libraries/database/prisma/media/media.service';
import { MediaRepository } from '@boto/nestjs-libraries/database/prisma/media/media.repository';
import { NotificationsRepository } from '@boto/nestjs-libraries/database/prisma/notifications/notifications.repository';
import { EmailService } from '@boto/nestjs-libraries/services/email.service';
import { ItemUserRepository } from '@boto/nestjs-libraries/database/prisma/marketplace/item.user.repository';
import { ItemUserService } from '@boto/nestjs-libraries/database/prisma/marketplace/item.user.service';
import { MessagesService } from '@boto/nestjs-libraries/database/prisma/marketplace/messages.service';
import { MessagesRepository } from '@boto/nestjs-libraries/database/prisma/marketplace/messages.repository';
import { StripeService } from '@boto/nestjs-libraries/services/stripe.service';
import { ExtractContentService } from '@boto/nestjs-libraries/openai/extract.content.service';
import { OpenaiService } from '@boto/nestjs-libraries/openai/openai.service';
import { AgenciesService } from '@boto/nestjs-libraries/database/prisma/agencies/agencies.service';
import { AgenciesRepository } from '@boto/nestjs-libraries/database/prisma/agencies/agencies.repository';
import { TrackService } from '@boto/nestjs-libraries/track/track.service';
import { ShortLinkService } from '@boto/nestjs-libraries/short-linking/short.link.service';
import { WebhooksRepository } from '@boto/nestjs-libraries/database/prisma/webhooks/webhooks.repository';
import { WebhooksService } from '@boto/nestjs-libraries/database/prisma/webhooks/webhooks.service';
import { SignatureRepository } from '@boto/nestjs-libraries/database/prisma/signatures/signature.repository';
import { SignatureService } from '@boto/nestjs-libraries/database/prisma/signatures/signature.service';
import { AutopostRepository } from '@boto/nestjs-libraries/database/prisma/autopost/autopost.repository';
import { AutopostService } from '@boto/nestjs-libraries/database/prisma/autopost/autopost.service';
import { SetsService } from '@boto/nestjs-libraries/database/prisma/sets/sets.service';
import { SetsRepository } from '@boto/nestjs-libraries/database/prisma/sets/sets.repository';
import { ThirdPartyRepository } from '@boto/nestjs-libraries/database/prisma/third-party/third-party.repository';
import { ThirdPartyService } from '@boto/nestjs-libraries/database/prisma/third-party/third-party.service';
import { VideoManager } from '@boto/nestjs-libraries/videos/video.manager';
import { FalService } from '@boto/nestjs-libraries/openai/fal.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    PrismaService,
    PrismaRepository,
    PrismaTransaction,
    UsersService,
    UsersRepository,
    OrganizationService,
    OrganizationRepository,
    StarsService,
    StarsRepository,
    SubscriptionService,
    SubscriptionRepository,
    NotificationService,
    NotificationsRepository,
    WebhooksRepository,
    WebhooksService,
    IntegrationService,
    IntegrationRepository,
    PostsService,
    PostsRepository,
    StripeService,
    MessagesRepository,
    SignatureRepository,
    AutopostRepository,
    AutopostService,
    SignatureService,
    MediaService,
    MediaRepository,
    ItemUserRepository,
    AgenciesService,
    AgenciesRepository,
    ItemUserService,
    MessagesService,
    IntegrationManager,
    ExtractContentService,
    OpenaiService,
    FalService,
    EmailService,
    TrackService,
    ShortLinkService,
    SetsService,
    SetsRepository,
    ThirdPartyRepository,
    ThirdPartyService,
    VideoManager,
  ],
  get exports() {
    return this.providers;
  },
})
export class DatabaseModule {}
