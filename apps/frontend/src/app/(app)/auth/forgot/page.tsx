export const dynamic = 'force-dynamic';
import { Forgot } from '@boto/frontend/components/auth/forgot';
import { Metadata } from 'next';
import { isGeneralServerSide } from '@boto/helpers/utils/is.general.server.side';
export const metadata: Metadata = {
  title: `${isGeneralServerSide() ? 'Boto' : 'boto'} Forgot Password`,
  description: '',
};
export default async function Auth() {
  return <Forgot />;
}
