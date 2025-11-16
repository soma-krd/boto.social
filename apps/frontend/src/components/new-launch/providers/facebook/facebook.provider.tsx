'use client';

import {
  PostComment,
  withProvider,
} from '@boto/frontend/components/new-launch/providers/high.order.provider';
import { FacebookDto } from '@boto/nestjs-libraries/dtos/posts/providers-settings/facebook.dto';
import { Input } from '@boto/react/form/input';
import { useSettings } from '@boto/frontend/components/launches/helpers/use.values';

export const FacebookSettings = () => {
  const { register } = useSettings();

  return (
    <Input
      label={
        'Embedded URL (only for text Post)'
      }
      {...register('url')}
    />
  );
};

export default withProvider({
  postComment: PostComment.COMMENT,
  minimumCharacters: [],
  SettingsComponent: FacebookSettings,
  CustomPreviewComponent: undefined,
  dto: FacebookDto,
  checkValidity: undefined,
  maximumCharacters: 63206,
});
