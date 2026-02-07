'use client';

import { FC } from 'react';
import { useMenuItem } from '@gitroom/frontend/components/layout/top.menu';
import { useUser } from '@gitroom/frontend/components/layout/user.context';
import { useVariables } from '@gitroom/react/helpers/variable.context';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';

const filterMenuItem = (f: { hide?: boolean; requireBilling?: boolean; name: string; role?: string[] }, user: { isLifetime?: boolean; role?: string } | null, billingEnabled: boolean) => {
  if (f.hide) return false;
  if (f.requireBilling && !billingEnabled) return false;
  if (f.name === 'Billing' && user?.isLifetime) return false;
  if (f.role) return f.role.includes(user?.role!);
  return true;
};

export const MobileBottomNav: FC = () => {
  const user = useUser();
  const { firstMenu, secondMenu } = useMenuItem();
  const { billingEnabled } = useVariables();
  const pathname = usePathname();

  const filteredFirst = firstMenu.filter((f) => filterMenuItem(f, user, billingEnabled));
  const filteredSecond = secondMenu.filter((f) => filterMenuItem(f, user, billingEnabled));
  const settingsItem = filteredSecond.find((f) => f.path === '/settings');
  const mobileMenuItems = settingsItem ? [...filteredFirst, settingsItem] : filteredFirst;

  return (
    <div className="flex items-center justify-around w-full">
      {mobileMenuItems.map((item) => {
        const isActive = pathname.startsWith(item.path);
        return (
          <Link
            key={item.name}
            href={item.path}
            className={clsx(
              'flex flex-col items-center justify-center gap-[4px] flex-1',
              'h-full py-[8px] px-[4px] rounded-[8px] transition-all',
              isActive
                ? 'text-textItemFocused bg-boxFocused'
                : 'text-textItemBlur hover:text-textItemFocused'
            )}
          >
            <div className="w-[24px] h-[24px] flex items-center justify-center">
              {item.icon}
            </div>
            <div className="text-[10px] font-[600] text-center line-clamp-1">
              {item.name}
            </div>
          </Link>
        );
      })}
    </div>
  );
};
