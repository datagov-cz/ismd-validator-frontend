import { GovButton, GovWizardItem } from '@gov-design-system-ce/react';
import { useTranslations } from 'next-intl';

import { useConvertFile } from '@/api/generated';
import { useFormStore } from '@/store/formStore';

export const Step2 = () => {
  const t = useTranslations('Home.FormSection.Step2');

  const formFile = useFormStore((state) => state.file);
  const formUrl = useFormStore((state) => state.url);

  const setFormStatus = useFormStore((state) => state.setStatus);

  const convertMutation = useConvertFile();

  const handleConvert = () => {
    if (!formFile) return;

    const formData = new FormData();
    formData.append('file', formFile);

    convertMutation.mutate(
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: formData as any,
      },
      {
        onError: (error) => {
          console.error('Error converting file:', error);
          setFormStatus('Error');
        },
        onSuccess: () => {
          setFormStatus('Success');
        },
      },
    );
  };

  return (
    <GovWizardItem
      color="primary"
      collapsible
      isExpanded={!!formFile || !!formUrl}
    >
      <span slot="prefix">2</span>
      <span slot="headline">{t('Headline')}</span>
      <span slot="annotation">{t('Annotation')}</span>
      <GovButton
        color="primary"
        size="l"
        type="solid"
        disabled={!formFile}
        onGovClick={handleConvert}
      >
        {t('Button')}
      </GovButton>
    </GovWizardItem>
  );
};
