export const dynamic = 'force-dynamic';
import { LaunchesComponent } from '@boto/frontend/components/launches/launches.component';
import { Metadata } from 'next';
import { isGeneralServerSide } from '@boto/helpers/utils/is.general.server.side';
export const metadata: Metadata = {
  title: `${isGeneralServerSide() ? 'Boto Calendar' : 'boto Launches'}`,
  description: '',
};
export default async function Index() {
  return <LaunchesComponent />;
}
