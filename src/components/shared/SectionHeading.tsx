import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const SectionHeading = ({ children }: Props) => {
  return (
    <h2 className="font-medium text-xl lg:text-3xl text-dark-primary">
      {children}
    </h2>
  );
};
