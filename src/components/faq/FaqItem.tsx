import { GovAccordionItem } from '@gov-design-system-ce/react';

interface Props {
  label: string;
  answer: string;
}

export const FaqItem = ({ label, answer }: Props) => {
  return (
    <GovAccordionItem>
      <h3 slot="label">{label}</h3>
      <p className="text-blue-primary">{answer}</p>
    </GovAccordionItem>
  );
};
