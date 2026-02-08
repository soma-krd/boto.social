'use client';

import { FC } from 'react';
import {
  PostComment,
  withProvider,
} from '@gitroom/frontend/components/new-launch/providers/high.order.provider';
import { TwitchDto } from '@gitroom/nestjs-libraries/dtos/posts/providers-settings/twitch.dto';
import { useSettings } from '@gitroom/frontend/components/launches/helpers/use.values';
import { Select } from '@gitroom/react/form/select';
import { useWatch } from 'react-hook-form';
import { useT } from '@gitroom/react/translation/get.transation.service.client';

const messageTypes = [
  {
    label: 'Chat Message',
    value: 'message',
  },
  {
    label: 'Announcement',
    value: 'announcement',
  },
];

const announcementColors = [
  {
    label: 'Primary (Default)',
    value: 'primary',
  },
  {
    label: 'Blue',
    value: 'blue',
  },
  {
    label: 'Green',
    value: 'green',
  },
  {
    label: 'Orange',
    value: 'orange',
  },
  {
    label: 'Purple',
    value: 'purple',
  },
];

const TwitchSettings: FC = () => {
  const { register, control } = useSettings();
  const t = useT();
  const messageType = useWatch({
    control,
    name: 'messageType',
  });

  return (
    <div className="flex flex-col">
      <Select
        label={t('label_message_type', 'Message Type')}
        {...register('messageType', {
          value: 'message',
        })}
      >
        {messageTypes.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Select>
      {messageType === 'announcement' && (
        <Select
          label={t('label_announcement_color', 'Announcement Color')}
          {...register('announcementColor', {
            value: 'primary',
          })}
        >
          {announcementColors.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </Select>
      )}
    </div>
  );
};

export default withProvider({
  postComment: PostComment.COMMENT,
  comments: 'no-media',
  minimumCharacters: [],
  SettingsComponent: TwitchSettings,
  CustomPreviewComponent: undefined,
  dto: TwitchDto,
  checkValidity: undefined,
  maximumCharacters: 500,
});
