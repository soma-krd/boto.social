'use client';

import {
  PostComment,
  withProvider,
} from '@boto/frontend/components/new-launch/providers/high.order.provider';
import { ListmonkDto } from '@boto/nestjs-libraries/dtos/posts/providers-settings/listmonk.dto';
import { Input } from '@boto/react/form/input';
import { useSettings } from '@boto/frontend/components/launches/helpers/use.values';
import { SelectList } from '@boto/frontend/components/new-launch/providers/listmonk/select.list';
import { SelectTemplates } from '@boto/frontend/components/new-launch/providers/listmonk/select.templates';

const SettingsComponent = () => {
  const form = useSettings();

  return (
    <>
      <Input label="Subject" {...form.register('subject')} />
      <Input label="Preview" {...form.register('preview')} />
      <SelectList {...form.register('list')} />
      <SelectTemplates {...form.register('template')} />
    </>
  );
};

export default withProvider({
  postComment: PostComment.POST,
  minimumCharacters: [],
  SettingsComponent: SettingsComponent,
  CustomPreviewComponent: undefined,
  dto: ListmonkDto,
  checkValidity: undefined,
  maximumCharacters: 300000,
});
