import { useState } from 'react';
import { GovButton, GovDropdown } from '@gov-design-system-ce/react';
import { useTranslations } from 'next-intl';

import { GovIcon } from '@/components/shared/GovIcon';

import { NavItem } from './NavItem';

export const NavItems = () => {
  const t = useTranslations('Header');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      <NavItem href="">{t('Nav.Link1')}</NavItem>
      <NavItem href="/validujeme/swagger-ui/index.html">
        {t('Nav.Link2')}
      </NavItem>
      <GovDropdown
        position="left"
        color="primary"
        size="m"
        type="base"
        className="no-underline [&_ul]:pl-0!"
        onChange={setIsDropdownOpen}
        label={
          <>
            {t('Nav.Dropdown.Label')}
            <GovIcon
              type="components"
              name="chevron-down"
              className={`transition-transform duration-200 ${isDropdownOpen ? '-rotate-180' : ''}`}
            />
          </>
        }
      >
        <GovButton
          color="neutral"
          size="m"
          type="base"
          href="https://github.com/datagov-cz/ismd-org/issues/new?template=bug_report.yml"
          target="_blank"
          expanded
          iconStart={
            <GovIcon
              type="components"
              name="bug"
              size="l"
              className="[&>svg>path]:fill-black dark:[&>svg>path]:fill-white"
            />
          }
        >
          {t('Nav.Dropdown.Link1')}
        </GovButton>
        <GovButton
          color="neutral"
          size="m"
          type="base"
          href="https://github.com/datagov-cz/ismd-org/issues/new?template=feature_request.yml"
          target="_blank"
          expanded
          iconStart={
            <GovIcon
              type="components"
              name="flag"
              size="l"
              className="[&>svg>path]:fill-black dark:[&>svg>path]:fill-white"
            />
          }
        >
          {t('Nav.Dropdown.Link2')}
        </GovButton>
      </GovDropdown>
    </>
  );
};
