import 'reflect-metadata';

import { Injectable } from '@nestjs/common';
import { XProvider } from '@gitroom/nestjs-libraries/integrations/social/x.provider';
import { SocialProvider } from '@gitroom/nestjs-libraries/integrations/social/social.integrations.interface';
import { LinkedinProvider } from '@gitroom/nestjs-libraries/integrations/social/linkedin.provider';
import { RedditProvider } from '@gitroom/nestjs-libraries/integrations/social/reddit.provider';
import { DevToProvider } from '@gitroom/nestjs-libraries/integrations/social/dev.to.provider';
import { HashnodeProvider } from '@gitroom/nestjs-libraries/integrations/social/hashnode.provider';
import { MediumProvider } from '@gitroom/nestjs-libraries/integrations/social/medium.provider';
import { FacebookProvider } from '@gitroom/nestjs-libraries/integrations/social/facebook.provider';
import { InstagramProvider } from '@gitroom/nestjs-libraries/integrations/social/instagram.provider';
import { YoutubeProvider } from '@gitroom/nestjs-libraries/integrations/social/youtube.provider';
import { TiktokProvider } from '@gitroom/nestjs-libraries/integrations/social/tiktok.provider';
import { PinterestProvider } from '@gitroom/nestjs-libraries/integrations/social/pinterest.provider';
import { DribbbleProvider } from '@gitroom/nestjs-libraries/integrations/social/dribbble.provider';
import { LinkedinPageProvider } from '@gitroom/nestjs-libraries/integrations/social/linkedin.page.provider';
import { ThreadsProvider } from '@gitroom/nestjs-libraries/integrations/social/threads.provider';
import { DiscordProvider } from '@gitroom/nestjs-libraries/integrations/social/discord.provider';
import { SlackProvider } from '@gitroom/nestjs-libraries/integrations/social/slack.provider';
import { MastodonProvider } from '@gitroom/nestjs-libraries/integrations/social/mastodon.provider';
import { BlueskyProvider } from '@gitroom/nestjs-libraries/integrations/social/bluesky.provider';
import { LemmyProvider } from '@gitroom/nestjs-libraries/integrations/social/lemmy.provider';
import { InstagramStandaloneProvider } from '@gitroom/nestjs-libraries/integrations/social/instagram.standalone.provider';
import { FarcasterProvider } from '@gitroom/nestjs-libraries/integrations/social/farcaster.provider';
import { TelegramProvider } from '@gitroom/nestjs-libraries/integrations/social/telegram.provider';
import { NostrProvider } from '@gitroom/nestjs-libraries/integrations/social/nostr.provider';
import { VkProvider } from '@gitroom/nestjs-libraries/integrations/social/vk.provider';
import { WordpressProvider } from '@gitroom/nestjs-libraries/integrations/social/wordpress.provider';
import { ListmonkProvider } from '@gitroom/nestjs-libraries/integrations/social/listmonk.provider';
import { GmbProvider } from '@gitroom/nestjs-libraries/integrations/social/gmb.provider';
import { KickProvider } from '@gitroom/nestjs-libraries/integrations/social/kick.provider';
import { TwitchProvider } from '@gitroom/nestjs-libraries/integrations/social/twitch.provider';
import { SocialAbstract } from '@gitroom/nestjs-libraries/integrations/social.abstract';
import { MoltbookProvider } from '@gitroom/nestjs-libraries/integrations/social/moltbook.provider';
import { SkoolProvider } from '@gitroom/nestjs-libraries/integrations/social/skool.provider';

export const socialIntegrationList: Array<SocialAbstract & SocialProvider> = [
  new XProvider(process.env.ENABLE_X == 'true'),
  new LinkedinProvider(process.env.ENABLE_LINKEDIN == 'true'),
  new LinkedinPageProvider(process.env.ENABLE_LINKEDIN_PAGE == 'true'),
  new RedditProvider(process.env.ENABLE_REDDIT == 'true'),
  new InstagramProvider(process.env.ENABLE_INSTAGRAM == 'true'),
  new InstagramStandaloneProvider(process.env.ENABLE_INSTAGRAM_STANDALONE == 'true'),
  new FacebookProvider(process.env.ENABLE_FACEBOOK == 'true'),
  new ThreadsProvider(process.env.ENABLE_THREADS == 'true'),
  new YoutubeProvider(process.env.ENABLE_YOUTUBE == 'true'),
  new GmbProvider(process.env.ENABLE_GMB == 'true'),
  new TiktokProvider(process.env.ENABLE_TIKTOK == 'true'),
  new PinterestProvider(process.env.ENABLE_PINTEREST == 'true'),
  new DribbbleProvider(process.env.ENABLE_DRIBBLE == 'true'),
  new DiscordProvider(process.env.ENABLE_DISCORD == 'true'),
  new SlackProvider(process.env.ENABLE_SLACK == 'true'),
  new MastodonProvider(process.env.ENABLE_MASTODON == 'true'),
  new BlueskyProvider(process.env.ENABLE_BLUESKY == 'true'),
  new LemmyProvider(process.env.ENABLE_LEMMY == 'true'),
  new FarcasterProvider(process.env.ENABLE_FARCASTER == 'true'),
  new TelegramProvider(process.env.ENABLE_TELEGRAM == 'true'),
  new NostrProvider(process.env.ENABLE_NOSTR == 'true'),
  new VkProvider(process.env.ENABLE_VK == 'true'),
  new MediumProvider(process.env.ENABLE_MEDIUM == 'true'),
  new DevToProvider(process.env.ENABLE_DEVTO == 'true'),
  new HashnodeProvider(process.env.ENABLE_HASHNODE == 'true'),
  new WordpressProvider(process.env.ENABLE_WORDPRESS == 'true'),
  new ListmonkProvider(process.env.ENABLE_LISTMONK == 'true'),
  new MoltbookProvider(process.env.ENABLE_MOLTBOOK == 'true'),
  new SkoolProvider(process.env.ENABLE_SKOOL == 'true'),
  // new MastodonCustomProvider(),
];

@Injectable()
export class IntegrationManager {
  async getAllIntegrations() {
    return {
      social: await Promise.all(
        socialIntegrationList.filter(p => p.enable).map(async (p) => ({
          name: p.name,
          identifier: p.identifier,
          toolTip: p.toolTip,
          editor: p.editor,
          isExternal: !!p.externalUrl,
          isWeb3: !!p.isWeb3,
          isChromeExtension: !!p.isChromeExtension,
          ...(p.extensionCookies ? { extensionCookies: p.extensionCookies } : {}),
          ...(p.customFields ? { customFields: await p.customFields() } : {}),
        }))
      ),
      article: [] as any[],
    };
  }

  getAllTools(): {
    [key: string]: {
      description: string;
      dataSchema: any;
      methodName: string;
    }[];
  } {
    return socialIntegrationList.filter(p => p.enable).reduce(
      (all, current) => ({
        ...all,
        [current.identifier]:
          Reflect.getMetadata('custom:tool', current.constructor.prototype) ||
          [],
      }),
      {}
    );
  }

  getAllRulesDescription(): {
    [key: string]: string;
  } {
    return socialIntegrationList.filter(p => p.enable).reduce(
      (all, current) => ({
        ...all,
        [current.identifier]:
          Reflect.getMetadata(
            'custom:rules:description',
            current.constructor
          ) || '',
      }),
      {}
    );
  }

  getAllPlugs() {
    return socialIntegrationList.filter(p => p.enable)
      .map((p) => {
        return {
          name: p.name,
          identifier: p.identifier,
          plugs: (
            Reflect.getMetadata('custom:plug', p.constructor.prototype) || []
          )
            .filter((f: any) => !f.disabled)
            .map((p: any) => ({
              ...p,
              fields: p.fields.map((c: any) => ({
                ...c,
                validation: c?.validation?.toString(),
              })),
            })),
        };
      })
      .filter((f) => f.plugs.length);
  }

  getInternalPlugs(providerName: string) {
    const p = socialIntegrationList.filter(p => p.enable).find((p) => p.identifier === providerName)!;
    return {
      internalPlugs:
        (
          Reflect.getMetadata(
            'custom:internal_plug',
            p.constructor.prototype
          ) || []
        ).filter((f: any) => !f.disabled) || [],
    };
  }

  getAllowedSocialsIntegrations() {
    return socialIntegrationList.filter(p => p.enable).map((p) => p.identifier);
  }
  getSocialIntegration(integration: string): SocialProvider {
    return socialIntegrationList.find((i) => i.identifier === integration)!;
  }
}
