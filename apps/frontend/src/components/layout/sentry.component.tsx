'use client';

import { FC, ReactNode, useEffect } from 'react';
import { useVariables } from '@boto/react/helpers/variable.context';
import { initializeSentryClient } from '@boto/react/sentry/initialize.sentry.client';

export const SentryComponent: FC<{ children: ReactNode }> = ({ children }) => {
  const { sentryDsn: dsn, environment } = useVariables();

  useEffect(() => {
    if (!dsn) {
      return;
    }

    initializeSentryClient(environment, dsn);
  }, [dsn]);

  // Always render children - don't block the app
  return <>{children}</>;
};
