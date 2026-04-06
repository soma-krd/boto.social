export const dynamic = 'force-dynamic';
import { ReactNode } from 'react';
import loadDynamic from 'next/dynamic';
import { TestimonialComponent } from '@gitroom/frontend/components/auth/testimonial.component';
import { LogoTextComponent } from '@gitroom/frontend/components/ui/logo-text.component';
import { SocialMediaShowcase } from '../../../components/auth/social.media.showcase';
const ReturnUrlComponent = loadDynamic(() => import('./return.url.component'));
export default function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="light bg-newBgColor text-newTextColor flex flex-1 p-[12px] gap-[12px] min-h-screen w-screen">
      {/*<style>{`html, body {overflow-x: hidden;}`}</style>*/}
      <ReturnUrlComponent />
      <div className="flex flex-col py-[40px] px-[20px] flex-1 lg:w-[600px] lg:flex-none rounded-[12px] p-[12px] bg-newBgColorInner border border-newBorder shadow-sm">
        <div className="w-full max-w-[440px] mx-auto justify-center gap-[20px] h-full flex flex-col">
          <LogoTextComponent color="black" />
          <div className="flex">{children}</div>
        </div>
      </div>
      <div className="text-[36px] flex-1 pt-[88px] hidden lg:flex flex-col items-center">
        <SocialMediaShowcase />
      </div>
    </div>
  );
}
