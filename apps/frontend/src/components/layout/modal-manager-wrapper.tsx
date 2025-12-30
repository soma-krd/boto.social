'use client';

import { ReactNode } from 'react';
import { ModalManager } from './new-modal';

export function ModalManagerWrapper({ children }: { children: ReactNode }) {
  return <ModalManager>{children}</ModalManager>;
}

