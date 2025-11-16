'use client';

import Image from 'next/image';

export const Logo = () => {
  return (
    <Image
      src="/logo.svg"
      alt="Logo"
      width={150}
      height={150}
      className="rounded-2xl"
    />
  );
};
