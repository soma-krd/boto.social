import { Plugs } from '@boto/frontend/components/plugs/plugs';
export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import { isGeneralServerSide } from '@boto/helpers/utils/is.general.server.side';
export const metadata: Metadata = {
  title: `${isGeneralServerSide() ? 'Boto' : 'boto'} Plugs`,
  description: '',
};
export default async function Index() {
  return <Plugs />;
}
