import { GovButton, GovDropdown, GovIcon } from '@gov-design-system-ce/react';
import { useTranslations } from 'next-intl';

import { NavItem } from './NavItem';

export const NavItems = () => {
  const t = useTranslations('Header');

  return (
    <>
      <NavItem href="">{t('Nav.Link1')}</NavItem>
      <NavItem href="">{t('Nav.Link2')}</NavItem>
      <GovDropdown position="left">
        <GovButton
          color="primary"
          size="m"
          type="link"
          className="no-underline"
        >
          {t('Nav.Dropdown.Label')}
          <GovIcon type="components" name="chevron-down" slot="icon-end" />
        </GovButton>

        <ul slot="list">
          <li>
            <GovButton color="neutral" size="m" type="base" href="">
              {t('Nav.Dropdown.Link1')}
              <GovIcon
                type="components"
                name="bug"
                slot="icon-start"
                size="l"
              />
            </GovButton>
          </li>
          <li>
            <GovButton color="neutral" size="m" type="base" href="">
              {t('Nav.Dropdown.Link2')}
              <GovIcon
                type="components"
                name="flag"
                slot="icon-start"
                size="l"
              />
            </GovButton>
          </li>
        </ul>
      </GovDropdown>
    </>
  );
};
