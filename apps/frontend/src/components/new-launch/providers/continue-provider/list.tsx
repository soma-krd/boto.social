'use client';

import { InstagramContinue } from '@boto/frontend/components/new-launch/providers/continue-provider/instagram/instagram.continue';
import { FacebookContinue } from '@boto/frontend/components/new-launch/providers/continue-provider/facebook/facebook.continue';
import { LinkedinContinue } from '@boto/frontend/components/new-launch/providers/continue-provider/linkedin/linkedin.continue';
import { GmbContinue } from '@boto/frontend/components/new-launch/providers/continue-provider/gmb/gmb.continue';
import { YoutubeContinue } from '@boto/frontend/components/new-launch/providers/continue-provider/youtube/youtube.continue';

export const continueProviderList = {
  instagram: InstagramContinue,
  facebook: FacebookContinue,
  'linkedin-page': LinkedinContinue,
  gmb: GmbContinue,
  youtube: YoutubeContinue,
};
