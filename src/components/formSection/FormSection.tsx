'use client';

import { GovWizard } from '@gov-design-system-ce/react';

import { Step1 } from './step1/Step1';
import { Step2 } from './step2/Step2';
import { Step3 } from './step3/Step3';

export const FormSection = () => {
  return (
    <section>
      <GovWizard>
        <Step1 />
        <Step2 />
        <Step3 />
      </GovWizard>
    </section>
  );
};
