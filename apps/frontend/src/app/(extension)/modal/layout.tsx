import { ReactNode } from 'react';
import { AppLayout } from '@boto/frontend/components/launches/layout.standalone';
export default async function AppLayoutIn({
  children,
}: {
  children: ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
