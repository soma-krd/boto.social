import { getT } from '@gitroom/react/translation/get.translation.service.backend';

export const dynamic = 'force-dynamic';
import { ReactNode } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import loadDynamic from 'next/dynamic';
import { isGeneralServerSide } from '@gitroom/helpers/utils/is.general.server.side';
import { SocialMediaShowcase } from '@gitroom/frontend/components/auth/social.media.showcase';
const ReturnUrlComponent = loadDynamic(() => import('./return.url.component'));
export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const t = await getT();

  return (
    <div className="dark !bg-black lbox">
      <ReturnUrlComponent />
      <div className="flex flex-col lg:flex-row h-[100vh] w-[100vw] overflow-hidden">
        {/* Social Media Showcase - Hidden on mobile, visible on desktop */}
        <div className="hidden lg:flex lg:flex-1 items-center justify-center">
          <SocialMediaShowcase />
        </div>

        {/* Auth Box - Centered on mobile, right side on desktop */}
        <div className="flex-1 lg:flex-none relative z-[1] px-3 lg:pr-[100px] xs:mt-[70px] flex justify-center lg:justify-end items-center overflow-hidden">
          <div className="w-full max-w-lg h-[614px] flex flex-col bg-loginBox bg-no-repeat bg-contain">
            <div className="w-full relative">
              <div className="custom:fixed custom:text-start custom:left-[20px] custom:justify-start custom:top-[20px] absolute -top-[100px] text-textColor justify-center items-center w-full flex gap-[10px]">
                <Image
                  src="/boto-text.svg"
                  width={150}
                  height={50}
                  alt="Logo"
                />
              </div>
            </div>
            <div className="p-[32px] w-full h-[660px] text-textColor rbox">
              {children}
            </div>
            <div className="flex flex-1 flex-col">
              <div className="flex-1 flex justify-end">
                <div className="absolute top-0 bg-gradient-to-t from-customColor9 w-[1px] translate-x-[22px] h-full" />
              </div>
              <div>
                <div className="absolute end-0 bg-gradient-to-l from-customColor9 h-[1px] translate-y-[60px] w-full" />
              </div>
            </div>
            <div className="absolute top-0 bg-gradient-to-t from-customColor9 w-[1px] -translate-x-[22px] h-full" />
            <div className="absolute end-0 bg-gradient-to-l from-customColor9 h-[1px] -translate-y-[22px] w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
