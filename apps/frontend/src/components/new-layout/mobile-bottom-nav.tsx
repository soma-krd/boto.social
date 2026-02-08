'use client';

import { FC, useState } from 'react';
import { useMenuItem } from '@gitroom/frontend/components/layout/top.menu';
import { useUser } from '@gitroom/frontend/components/layout/user.context';
import { useVariables } from '@gitroom/react/helpers/variable.context';
import { useT } from '@gitroom/react/translation/get.transation.service.client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import { Drawer } from '@mantine/core';

const PRIMARY_PATHS = ['/launches', '/agents', '/analytics', '/media'];

const filterMenuItem = (f: { hide?: boolean; requireBilling?: boolean; name: string; role?: string[] }, user: { isLifetime?: boolean; role?: string } | null, billingEnabled: boolean) => {
  if (f.hide) return false;
  if (f.requireBilling && !billingEnabled) return false;
  if (f.name === 'Billing' && user?.isLifetime) return false;
  if (f.role) return f.role.includes(user?.role!);
  return true;
};

const isExternalPath = (path: string) => path.startsWith('http://') || path.startsWith('https://');

export const MobileBottomNav: FC = () => {
  const user = useUser();
  const t = useT();
  const { firstMenu, secondMenu } = useMenuItem();
  const { billingEnabled } = useVariables();
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);

  const filteredFirst = firstMenu.filter((f) => filterMenuItem(f, user, billingEnabled));
  const filteredSecond = secondMenu.filter((f) => filterMenuItem(f, user, billingEnabled));
  const mobileMenuItems = [...filteredFirst, ...filteredSecond];

  const primaryItems = PRIMARY_PATHS.map((path) => mobileMenuItems.find((item) => item.path === path)).filter(Boolean) as typeof mobileMenuItems;
  const overflowItems = mobileMenuItems.filter((item) => !PRIMARY_PATHS.includes(item.path));

  const isMoreActive = overflowItems.some((item) => (isExternalPath(item.path) ? false : pathname.startsWith(item.path)));

  return (
    <>
      <div className="flex items-center justify-around w-full">
        {primaryItems.map((item) => {
          const isActive = pathname.startsWith(item.path);
          return (
            <Link
              key={item.name}
              href={item.path}
              className={clsx(
                'flex flex-col items-center justify-center gap-[2px] flex-1',
                'h-full py-[6px] px-[4px] rounded-[8px] transition-all',
                isActive
                  ? 'text-textItemFocused bg-boxFocused'
                  : 'text-textItemBlur hover:text-textItemFocused'
              )}
            >
<div className="w-[20px] h-[20px] flex items-center justify-center [&>svg]:w-[20px] [&>svg]:h-[20px]">
              {item.icon}
            </div>
            <div className="text-[10px] font-[600] text-center line-clamp-1">
                {item.name}
              </div>
            </Link>
          );
        })}
        {overflowItems.length > 0 && (
          <button
            type="button"
            onClick={() => setMoreOpen(true)}
            className={clsx(
              'flex flex-col items-center justify-center gap-[2px] flex-1',
              'h-full py-[6px] px-[4px] rounded-[8px] transition-all',
              isMoreActive
                ? 'text-textItemFocused bg-boxFocused'
                : 'text-textItemBlur hover:text-textItemFocused'
            )}
            aria-label={t('more', 'More')}
          >
            <div className="w-[20px] h-[20px] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
              </svg>
            </div>
            <div className="text-[10px] font-[600] text-center line-clamp-1">
              {t('more', 'More')}
            </div>
          </button>
        )}
      </div>

      <Drawer
        opened={moreOpen}
        onClose={() => setMoreOpen(false)}
        position="bottom"
        size="auto"
        withCloseButton={false}
        classNames={{
          drawer: 'rounded-t-[16px] bg-newBgColorInner border-t border-newBorder',
          body: 'p-[16px] pb-[calc(16px+env(safe-area-inset-bottom))]',
        }}
      >
        <div className="flex flex-col gap-[4px]">
          {overflowItems.map((item) => {
            const isActive = !isExternalPath(item.path) && pathname.startsWith(item.path);
            const content = (
              <>
                <div className="w-[24px] h-[24px] flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <span className="text-[14px] font-[600]">{item.name}</span>
              </>
            );
            const className = clsx(
              'flex items-center gap-[12px] w-full py-[12px] px-[12px] rounded-[12px] transition-colors',
              isActive ? 'text-textItemFocused bg-boxFocused' : 'text-textItemBlur hover:bg-boxFocused hover:text-textItemFocused'
            );
            if (isExternalPath(item.path)) {
              return (
                <a
                  key={item.name}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                  onClick={() => setMoreOpen(false)}
                >
                  {content}
                </a>
              );
            }
            return (
              <Link
                key={item.name}
                href={item.path}
                className={className}
                onClick={() => setMoreOpen(false)}
              >
                {content}
              </Link>
            );
          })}
        </div>
      </Drawer>
    </>
  );
};
