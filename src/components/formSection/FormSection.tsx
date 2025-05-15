'use client';

import {
  GovButton,
  GovFormControl,
  GovFormFile,
  GovFormGroup,
  GovFormLabel,
  GovFormRadio,
  GovFormRadioGroup,
  GovWizard,
  GovWizardItem,
} from '@gov-design-system-ce/react';
import { useTranslations } from 'next-intl';

export const FormSection = () => {
  const t = useTranslations('Home.FormSection');

  return (
    <section>
      <GovWizard>
        <GovWizardItem color="primary" collapsible isExpanded>
          <span slot="prefix">1</span>
          <span slot="headline">{t('Step1.Headline')}</span>
          <span slot="annotation">{t('Step1.Annotation')}</span>
          <div className="text-dark-primary">
            <GovFormRadioGroup>
              <GovFormRadio value="file">
                <GovFormLabel slot="label">
                  {t('Step1.FileForm.Label')}
                </GovFormLabel>
              </GovFormRadio>
              <GovFormControl className="w-full max-w-[808px]">
                <GovFormLabel slot="top">
                  {t('Step1.FileForm.Placeholder')}
                </GovFormLabel>
                <GovFormGroup>
                  <GovFormFile accept=".xlsx,.xml,.ttl,.json" expanded>
                    <span>{t('Step1.FileForm.Placeholder')}</span>
                    <p>
                      <GovButton color="primary" size="m" type="outlined">
                        {t('Step1.FileForm.Button')}
                      </GovButton>
                    </p>
                    <span className="gov-form-file__note">
                      {t('Step1.FileForm.SupportedFormatsLabel')}
                    </span>
                  </GovFormFile>
                </GovFormGroup>
              </GovFormControl>
              <GovFormRadio value="url">
                <GovFormLabel slot="label">
                  {t('Step1.UrlForm.Label')}
                </GovFormLabel>
              </GovFormRadio>
              <GovFormRadio value="dict">
                <GovFormLabel slot="label">
                  {t('Step1.DictForm.Label')}
                </GovFormLabel>
              </GovFormRadio>
            </GovFormRadioGroup>
          </div>
        </GovWizardItem>
        <GovWizardItem color="primary" collapsible>
          <span slot="prefix">2</span>
          <span slot="headline">{t('Step2.Headline')}</span>
          <span slot="annotation">{t('Step2.Annotation')}</span>
        </GovWizardItem>
        <GovWizardItem color="primary" collapsible>
          <span slot="prefix">3</span>
          <span slot="headline">{t('Step3.Headline')}</span>
          <span slot="annotation">{t('Step3.Annotation')}</span>
        </GovWizardItem>
      </GovWizard>
    </section>
  );
};
