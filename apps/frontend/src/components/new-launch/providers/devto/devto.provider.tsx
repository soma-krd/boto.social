'use client';

import { FC } from 'react';
import {
  PostComment,
  withProvider,
} from '@boto/frontend/components/new-launch/providers/high.order.provider';
import { DevToSettingsDto } from '@boto/nestjs-libraries/dtos/posts/providers-settings/dev.to.settings.dto';
import { Input } from '@boto/react/form/input';
import { MediaComponent } from '@boto/frontend/components/media/media.component';
import { SelectOrganization } from '@boto/frontend/components/new-launch/providers/devto/select.organization';
import { DevtoTags } from '@boto/frontend/components/new-launch/providers/devto/devto.tags';
import { useMediaDirectory } from '@boto/react/helpers/use.media.directory';
import clsx from 'clsx';
import { Canonical } from '@boto/react/form/canonical';
import { useIntegration } from '@boto/frontend/components/launches/helpers/use.integration';
import { useSettings } from '@boto/frontend/components/launches/helpers/use.values';

const DevtoSettings: FC = () => {
  const form = useSettings();
  const { date } = useIntegration();
  return (
    <>
      <Input label="Title" {...form.register('title')} />
      <Canonical
        date={date}
        label="Canonical Link"
        {...form.register('canonical')}
      />
      <MediaComponent
        label="Cover picture"
        description="Add a cover picture"
        {...form.register('main_image')}
      />
      <div className="mt-[20px]">
        <SelectOrganization {...form.register('organization')} />
      </div>
      <div>
        <DevtoTags
          label="Tags (Maximum 4)"
          {...form.register('tags', {
            value: [],
          })}
        />
      </div>
    </>
  );
};
export default withProvider({
  postComment: PostComment.COMMENT,
  minimumCharacters: [],
  SettingsComponent: DevtoSettings,
  CustomPreviewComponent: undefined, // DevtoPreview,
  dto: DevToSettingsDto,
  checkValidity: undefined,
  maximumCharacters: 100000,
});
