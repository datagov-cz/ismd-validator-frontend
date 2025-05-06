'use client';

import { useState } from 'react';
import { GovButton } from '@gov-design-system-ce/react';

export const Button = () => {
  const [clicks, setClicks] = useState(0);

  return (
    <GovButton
      type="solid"
      onGovClick={() => setClicks((prev) => prev + 1)}
      color="primary"
    >
      Click me: {clicks}
    </GovButton>
  );
};
