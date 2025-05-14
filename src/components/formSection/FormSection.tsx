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
                <GovFormLabel slot="label">Nahrát ze souboru</GovFormLabel>
              </GovFormRadio>
              <GovFormControl className="w-full max-w-[808px]">
                <GovFormLabel slot="top">Přetáhněte soubor nebo</GovFormLabel>
                <GovFormGroup>
                  <GovFormFile accept=".xlsx,.xml,.ttl,.json" expanded>
                    <span>Přetáhněte soubor nebo</span>
                    <p>
                      <GovButton color="primary" size="m" type="outlined">
                        Nahrát ze zařízení
                      </GovButton>
                    </p>
                    <span className="gov-form-file__note">
                      Podporované formáty XLSX, XML, TTL, JSON-LD
                    </span>
                  </GovFormFile>
                </GovFormGroup>
              </GovFormControl>
              <GovFormRadio value="url">
                <GovFormLabel slot="label">{t('Step2.Headline')}</GovFormLabel>
              </GovFormRadio>
              <GovFormRadio value="dict">
                <GovFormLabel slot="label">
                  Vybrat ze Sémantického slovníku pojmů
                </GovFormLabel>
              </GovFormRadio>
            </GovFormRadioGroup>
          </div>
        </GovWizardItem>
        <GovWizardItem color="primary" collapsible>
          <span slot="prefix">2</span>
          <span slot="headline">Zkontrolujte a převeďte slovník</span>
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
