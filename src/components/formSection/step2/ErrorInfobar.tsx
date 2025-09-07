import { GovIcon, GovInfobar } from '@gov-design-system-ce/react';
import { useTranslations } from 'next-intl';

interface Props {
  isHidden: boolean;
  fileError?: string;
  conversionError?: string;
}

export const ErrorInfobar = ({
  isHidden,
  fileError,
  conversionError,
}: Props) => {
  const t = useTranslations('Home.FormSection.Step2');

  return (
    <div className={isHidden ? 'hidden' : 'block'}>
      <GovInfobar color="error" type="subtle">
        <GovIcon name="exclamation-circle-fill" slot="icon" />
        <p className="text-lg">
          {fileError || conversionError || t('ConversionUknownError')}
          {conversionError && (
            <>
              {' '}
              <a
                href="https://github.com/datagov-cz/ismd-org/issues/new?template=bug_report.yml"
                target="_blank"
                className="underline"
              >
                {t('ConversionErrorLinkText')}
              </a>
            </>
          )}
        </p>
      </GovInfobar>
    </div>
  );
};
