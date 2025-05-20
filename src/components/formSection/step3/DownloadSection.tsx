import { DownloadItemRow } from './DownloadItemRow';

export const DownloadSection = () => {
  return (
    <section className="space-y-6">
      <DownloadItemRow
        title="Pro další využití si slovník stáhněte do Vašeho zařízení."
        tooltips={[
          { title: 'Co mám dělat se staženým slovníkem?', description: '' },
        ]}
        govButton={{ text: 'Stáhnout slovník' }}
      />
      <DownloadItemRow
        title="Podrobnosti zjištění jsou dostupné ve výpisu z kontroly."
        tooltips={[
          { title: 'Jaké typy zjištění se rozlišují?', description: '' },
        ]}
        govButton={{ text: 'Stáhnout výpis z kontroly', type: 'outlined' }}
      />
      <DownloadItemRow
        title="Pro publikování slovníku je nezbytný katalogizační záznam."
        tooltips={[
          {
            title: 'Co mám dělat s nekompletním katalogizačním záznamem?',
            description: '',
          },
          {
            title: 'Proč je katalogizační záznam nekompletní?',
            description: '',
          },
        ]}
        govButton={{
          text: 'Stáhnout nekompletní katalogizační záznam',
          type: 'outlined',
        }}
      />
    </section>
  );
};
