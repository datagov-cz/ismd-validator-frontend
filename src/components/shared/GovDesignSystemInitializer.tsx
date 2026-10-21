'use client';

import { defineCustomElements } from '@gov-design-system-ce/components/loader';

if (typeof window !== 'undefined') {
  defineCustomElements(window);
}

export const GovDesignSystemInitializer = () => null;
