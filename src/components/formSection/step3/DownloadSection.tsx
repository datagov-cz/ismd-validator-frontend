import { useTranslations } from 'next-intl';

import { DownloadItemRow } from './DownloadItemRow';

export const DownloadSection = () => {
  const t = useTranslations('Home.FormSection.Step3.Dialog.DownloadSection');

  return (
    <section className="space-y-6">
      <DownloadItemRow
        title={t('Success-Warning.Row1.Title')}
        tooltips={[
          {
            title: t('Success-Warning.Row1.Tooltips.Title1'),
            description: t('Success-Warning.Row1.Tooltips.Description1'),
          },
        ]}
        govButton={{ text: t('Success-Warning.Row1.ButtonText') }}
      />
      <DownloadItemRow
        title={t('Success-Warning.Row2.Title')}
        tooltips={[
          {
            title: t('Success-Warning.Row2.Tooltips.Title1'),
            description: t('Success-Warning.Row2.Tooltips.Description1'),
          },
        ]}
        govButton={{
          text: t('Success-Warning.Row2.ButtonText'),
          type: 'outlined',
        }}
      />
      <DownloadItemRow
        title={t('Success-Warning.Row3.Title')}
        tooltips={[
          {
            title: t('Success-Warning.Row3.Tooltips.Title1'),
            description: t('Success-Warning.Row3.Tooltips.Description1'),
          },
          {
            title: t('Success-Warning.Row3.Tooltips.Title2'),
            description: t('Success-Warning.Row3.Tooltips.Description2'),
          },
        ]}
        govButton={{
          text: t('Success-Warning.Row3.ButtonText'),
          type: 'outlined',
        }}
      />
    </section>
  );
};
