export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import { Activate } from '@boto/frontend/components/auth/activate';
import { isGeneralServerSide } from '@boto/helpers/utils/is.general.server.side';
export const metadata: Metadata = {
  title: `${
    isGeneralServerSide() ? 'Boto' : 'boto'
  } - Activate your account`,
  description: '',
};
export default async function Auth() {
  return <Activate />;
}
