import { GovAccordionItem } from '@gov-design-system-ce/react';

interface Props {
  label: string;
  answer: string;
}

export const FaqItem = ({ label, answer }: Props) => {
  return (
    <GovAccordionItem label={<h3>{label}</h3>}>
      <p>{answer}</p>
    </GovAccordionItem>
  );
};
