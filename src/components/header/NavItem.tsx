import { ReactNode } from 'react';

interface Props {
  href: string;
  children: ReactNode;
}

export const NavItem = ({ href, children }: Props) => {
  return (
    <li className="h-12">
      <a
        href={href}
        className="flex h-full items-center no-underline px-2 font-medium text-text-primary cursor-pointer"
      >
        {children}
      </a>
    </li>
  );
};
