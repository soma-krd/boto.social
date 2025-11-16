import { internalFetch } from '@boto/helpers/utils/internal.fetch';
export const dynamic = 'force-dynamic';
import { Register } from '@boto/frontend/components/auth/register';
import { Metadata } from 'next';
import { isGeneralServerSide } from '@boto/helpers/utils/is.general.server.side';
import Link from 'next/link';
import { getT } from '@boto/react/translation/get.translation.service.backend';
import { LoginWithOidc } from '@boto/frontend/components/auth/login.with.oidc';
export const metadata: Metadata = {
  title: `${isGeneralServerSide() ? 'Boto' : 'boto'} Register`,
  description: '',
};
export default async function Auth(params: {searchParams: {provider: string}}) {
  const t = await getT();
  if (process.env.DISABLE_REGISTRATION === 'true') {
    const canRegister = (
      await (await internalFetch('/auth/can-register')).json()
    ).register;
    if (!canRegister && !params?.searchParams?.provider) {
      return (
        <>
          <LoginWithOidc />
          <div className="text-center">
            {t('registration_is_disabled', 'Registration is disabled')}
            <br />
            <Link className="underline hover:font-bold" href="/auth/login">
              {t('login_instead', 'Login instead')}
            </Link>
          </div>
        </>
      );
    }
  }
  return <Register />;
}
