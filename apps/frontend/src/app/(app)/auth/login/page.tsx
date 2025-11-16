export const dynamic = 'force-dynamic';
import { Login } from '@boto/frontend/components/auth/login';
import { Metadata } from 'next';
import { isGeneralServerSide } from '@boto/helpers/utils/is.general.server.side';
export const metadata: Metadata = {
  title: `${isGeneralServerSide() ? 'Boto' : 'boto'} Login`,
  description: '',
};
export default async function Auth() {
  return <Login />;
}
