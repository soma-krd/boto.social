'use client';

import { FC } from 'react';
import {
  PostComment,
  withProvider,
} from '@boto/frontend/components/new-launch/providers/high.order.provider';
import { useSettings } from '@boto/frontend/components/launches/helpers/use.values';
import { Input } from '@boto/react/form/input';
import { MediumPublications } from '@boto/frontend/components/new-launch/providers/medium/medium.publications';
import { MediumTags } from '@boto/frontend/components/new-launch/providers/medium/medium.tags';
import { MediumSettingsDto } from '@boto/nestjs-libraries/dtos/posts/providers-settings/medium.settings.dto';
import { useIntegration } from '@boto/frontend/components/launches/helpers/use.integration';
import { Canonical } from '@boto/react/form/canonical';

const MediumSettings: FC = () => {
  const form = useSettings();
  const { date } = useIntegration();
  return (
    <>
      <Input label="Title" {...form.register('title')} />
      <Input label="Subtitle" {...form.register('subtitle')} />
      <Canonical
        date={date}
        label="Canonical Link"
        {...form.register('canonical')}
      />
      <div>
        <MediumPublications {...form.register('publication')} />
      </div>
      <div>
        <MediumTags label="Topics" {...form.register('tags')} />
      </div>
    </>
  );
};
export default withProvider({
  postComment: PostComment.POST,
  minimumCharacters: [],
  SettingsComponent: MediumSettings,
  CustomPreviewComponent: undefined, //MediumPreview,
  dto: MediumSettingsDto,
  checkValidity: undefined,
  maximumCharacters: 100000,
});
