'use client';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useFetch } from '@boto/helpers/utils/custom.fetch';
import Link from 'next/link';
import { Button } from '@boto/react/form/button';
import { Input } from '@boto/react/form/input';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { CreateOrgUserDto } from '@boto/nestjs-libraries/dtos/auth/create.org.user.dto';
import { GithubProvider } from '@boto/frontend/components/auth/providers/github.provider';
import { useRouter, useSearchParams } from 'next/navigation';
import { LoadingComponent } from '@boto/frontend/components/layout/loading';
import clsx from 'clsx';
import { GoogleProvider } from '@boto/frontend/components/auth/providers/google.provider';
import { OauthProvider } from '@boto/frontend/components/auth/providers/oauth.provider';
import { useFireEvents } from '@boto/helpers/utils/use.fire.events';
import { useVariables } from '@boto/react/helpers/variable.context';
import { useTrack } from '@boto/react/helpers/use.track';
import { TrackEnum } from '@boto/nestjs-libraries/user/track.enum';
import { FarcasterProvider } from '@boto/frontend/components/auth/providers/farcaster.provider';
import dynamic from 'next/dynamic';
import { WalletUiProvider } from '@boto/frontend/components/auth/providers/placeholder/wallet.ui.provider';
import { useT } from '@boto/react/translation/get.transation.service.client';
import { useModals } from '@boto/frontend/components/layout/new-modal';
import { PrivacyPolicyContent } from '@boto/frontend/components/legal/privacy-policy-content';
import { TermsOfServiceContent } from '@boto/frontend/components/legal/terms-of-service-content';
const WalletProvider = dynamic(
  () => import('@boto/frontend/components/auth/providers/wallet.provider'),
  {
    ssr: false,
    loading: () => <WalletUiProvider />,
  }
);
type Inputs = {
  email: string;
  password: string;
  company: string;
  providerToken: string;
  provider: string;
};
export function Register() {
  const getQuery = useSearchParams();
  const fetch = useFetch();
  const [provider] = useState(getQuery?.get('provider')?.toUpperCase());
  const [code, setCode] = useState(getQuery?.get('code') || '');
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (provider && code) {
      load();
    }
  }, []);
  const load = useCallback(async () => {
    const { token } = await (
      await fetch(`/auth/oauth/${provider?.toUpperCase() || 'LOCAL'}/exists`, {
        method: 'POST',
        body: JSON.stringify({
          code,
        }),
      })
    ).json();
    if (token) {
      setCode(token);
      setShow(true);
    }
  }, [provider, code]);
  if (!code && !provider) {
    return <RegisterAfter token="" provider="LOCAL" />;
  }
  if (!show) {
    return <LoadingComponent />;
  }
  return (
    <RegisterAfter token={code} provider={provider?.toUpperCase() || 'LOCAL'} />
  );
}
function getHelpfulReasonForRegistrationFailure(httpCode: number) {
  switch (httpCode) {
    case 400:
      return 'Email already exists';
    case 404:
      return 'Your browser got a 404 when trying to contact the API, the most likely reasons for this are the NEXT_PUBLIC_BACKEND_URL is set incorrectly, or the backend is not running.';
  }
  return 'Unhandled error: ' + httpCode;
}
export function RegisterAfter({
  token,
  provider,
}: {
  token: string;
  provider: string;
}) {
  const t = useT();
  const modal = useModals();
  const { isGeneral, genericOauth, neynarClientId, billingEnabled } =
    useVariables();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const fireEvents = useFireEvents();
  const track = useTrack();
  const isAfterProvider = useMemo(() => {
    return !!token && !!provider;
  }, [token, provider]);
  const resolver = useMemo(() => {
    return classValidatorResolver(CreateOrgUserDto);
  }, []);
  const form = useForm<Inputs>({
    resolver,
    defaultValues: {
      providerToken: token,
      provider: provider,
    },
  });
  const fetchData = useFetch();
  
  const openPrivacyModal = () => {
    modal.openModal({
      title: t('privacy_policy', 'Privacy Policy'),
      withCloseButton: true,
      classNames: {
        modal: 'w-[100%] max-w-[1400px]',
      },
      size: '80%',
      children: <PrivacyPolicyContent />,
    });
  };

  const openTermsModal = () => {
    modal.openModal({
      title: t('terms_of_service', 'Terms of Service'),
      withCloseButton: true,
      classNames: {
        modal: 'w-[100%] max-w-[1400px]',
      },
      size: '80%',
      children: <TermsOfServiceContent />,
    });
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    await fetchData('/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        ...data,
      }),
    })
      .then(async (response) => {
        setLoading(false);
        if (response.status === 200) {
          fireEvents('register');
          return track(TrackEnum.CompleteRegistration).then(() => {
            if (response.headers.get('activate') === 'true') {
              router.push('/auth/activate');
            } else {
              router.push('/auth/login');
            }
          });
        } else {
          form.setError('email', {
            message: await response.text(),
          });
        }
      })
      .catch((e) => {
        form.setError('email', {
          message:
            'General error: ' +
            e.toString() +
            '. Please check your browser console.',
        });
      });
  };
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <h1 className="text-3xl font-bold text-start mb-4 cursor-pointer">
            {t('sign_up', 'Sign Up')}
          </h1>
        </div>
        {!isAfterProvider &&
          (!isGeneral ? (
            <GithubProvider />
          ) : (
            <div className="gap-[5px] flex flex-col">
              {genericOauth && isGeneral ? (
                <OauthProvider />
              ) : (
                <GoogleProvider />
              )}
              {!!neynarClientId && <FarcasterProvider />}
              {billingEnabled && <WalletProvider />}
            </div>
          ))}
        {!isAfterProvider && (
          <div className="h-[20px] mb-[24px] mt-[24px] relative">
            <div className="absolute w-full h-[1px] bg-fifth top-[50%] -translate-y-[50%]" />
            <div
              className={`absolute z-[1] justify-center items-center w-full start-0 top-0 flex`}
            >
              <div className="bg-customColor15 px-[16px]">{t('or', 'OR')}</div>
            </div>
          </div>
        )}
        <div className="text-textColor">
          {!isAfterProvider && (
            <>
              <Input
                label="Email"
                {...form.register('email')}
                type="email"
                placeholder="Email Address"
              />
              <Input
                label="Password"
                {...form.register('password')}
                autoComplete="off"
                type="password"
                placeholder="Password"
              />
            </>
          )}
          <Input
            label="Company"
            {...form.register('company')}
            autoComplete="off"
            type="text"
            placeholder="Company"
          />
        </div>
        <div className={clsx('text-[12px]')}>
          {t(
            'by_registering_you_agree_to_our',
            'By registering you agree to our'
          )}&nbsp;
          <span
            onClick={openTermsModal}
            className="underline hover:font-bold cursor-pointer"
          >
            {t('terms_of_service', 'Terms of Service')}
          </span>&nbsp;
          {t('and', 'and')}&nbsp;
          <span
            onClick={openPrivacyModal}
            className="underline hover:font-bold cursor-pointer"
          >
            {t('privacy_policy', 'Privacy Policy')}
          </span>&nbsp;
        </div>
        <div className="text-center mt-6">
          <div className="w-full flex">
            <Button
              type="submit"
              className="flex-1 rounded-[4px]"
              loading={loading}
            >
              {t('create_account', 'Create Account')}
            </Button>
          </div>
          <p className="mt-4 text-sm">
            {t('already_have_an_account', 'Already Have An Account?')}&nbsp;
            <Link href="/auth/login" className="underline  cursor-pointer">
              {t('sign_in', 'Sign In')}
            </Link>
          </p>
        </div>
      </form>
    </FormProvider>
  );
}
