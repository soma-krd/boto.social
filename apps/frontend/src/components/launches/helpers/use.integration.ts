'use client';

import { createContext, useContext } from 'react';
import { Integrations } from '@boto/frontend/components/launches/calendar.context';
import dayjs from 'dayjs';
import { newDayjs } from '@boto/frontend/components/layout/set.timezone';
export const IntegrationContext = createContext<{
  date: dayjs.Dayjs;
  integration: Integrations | undefined;
  allIntegrations: Integrations[];
  value: Array<{
    content: string;
    id?: string;
    image?: Array<{
      path: string;
      id: string;
    }>;
  }>;
}>({
  integration: undefined,
  value: [],
  date: newDayjs(),
  allIntegrations: [],
});
export const useIntegration = () => useContext(IntegrationContext);
