export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import { AfterActivate } from '@boto/frontend/components/auth/after.activate';
import { isGeneralServerSide } from '@boto/helpers/utils/is.general.server.side';
export const metadata: Metadata = {
  title: `${
    isGeneralServerSide() ? 'Boto' : 'boto'
  } - Activate your account`,
  description: '',
};
export default async function Auth() {
  return <AfterActivate />;
}
