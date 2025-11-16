export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import { PlatformAnalytics } from '@boto/frontend/components/platform-analytics/platform.analytics';
import { isGeneralServerSide } from '@boto/helpers/utils/is.general.server.side';
export const metadata: Metadata = {
  title: `${isGeneralServerSide() ? 'Boto' : 'boto'} Analytics`,
  description: '',
};
export default async function Index() {
  return <PlatformAnalytics />;
}
