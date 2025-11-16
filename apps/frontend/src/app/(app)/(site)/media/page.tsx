import { MediaLayoutComponent } from '@boto/frontend/components/new-layout/layout.media.component';
import { Metadata } from 'next';
import { isGeneralServerSide } from '@boto/helpers/utils/is.general.server.side';

export const metadata: Metadata = {
  title: `${isGeneralServerSide() ? 'Boto' : 'boto'} Media`,
  description: '',
};

export default async function Page() {
  return <MediaLayoutComponent />
}
