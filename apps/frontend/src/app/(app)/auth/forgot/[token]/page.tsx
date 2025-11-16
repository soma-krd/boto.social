export const dynamic = 'force-dynamic';
import { ForgotReturn } from '@boto/frontend/components/auth/forgot-return';
import { Metadata } from 'next';
import { isGeneralServerSide } from '@boto/helpers/utils/is.general.server.side';
export const metadata: Metadata = {
  title: `${isGeneralServerSide() ? 'Boto' : 'boto'} Forgot Password`,
  description: '',
};
export default async function Auth(params: {
  params: {
    token: string;
  };
}) {
  return <ForgotReturn token={params.params.token} />;
}
