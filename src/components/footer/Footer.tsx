'use client';

import { GovButton, GovIcon, GovLink } from '@gov-design-system-ce/react';

import { scrollTop } from '@/lib/windowUtils';

import { FooterColumn } from './FooterColumn';

export const Footer = () => {
  return (
    <footer className="bg-blue py-12 text-white mt-auto">
      <section className="max-w-desktop px-5 mx-auto space-y-12">
        <div className="flex justify-between">
          <ul className="flex justify-between w-full flex-wrap flex-col md:flex-row gap-y-10 md:pr-28">
            <FooterColumn title="Odkazy">
              <ul className="space-y-3">
                <li>
                  <GovLink href="#" size="s">
                    Portál o datech
                  </GovLink>
                </li>
                <li>
                  <GovLink href="#" size="s">
                    Popis dat na portálu o datech
                  </GovLink>
                </li>
                <li>
                  <GovLink
                    href="https://github.com/datagov-cz/ISMD_org"
                    external
                    size="s"
                  >
                    Repozitář na GitHubu
                  </GovLink>
                </li>
              </ul>
            </FooterColumn>
            <FooterColumn title="Kontakt">
              <GovLink href="mailto:data@dia.gov.cz" size="s">
                <GovIcon slot="icon-start" name="envelope" />
                data@dia.gov.cz
              </GovLink>
            </FooterColumn>
          </ul>
          <GovButton
            slot="icon-start"
            name="arrow-up"
            aria-label="Na začátek stránky"
            type="solid"
            size="m"
            className="bg-white cursor-pointer"
            onGovClick={scrollTop}
          >
            <GovIcon name="arrow-up" />
          </GovButton>
        </div>
        <div className="space-y-4">
          <h6 className="text-lg font-medium">Poděkování</h6>
          <p className="text-sm">
            Informační systém pro modelování dat vznikl v rámci projektu
            Zajištění podmínek pro kvalitní správu datového fondu a zajištění
            řízeného přístupu k datům, reg.č.: CZ.31.1.01/MV/23_62/0000062.
          </p>
          <ul className="flex gap-y-4 gap-x-6 flex-wrap">
            <li>
              <GovIcon name="logo-eu" />
            </li>
            <li>
              <GovIcon name="logo-npo" />
            </li>
            <li>
              <GovIcon name="logo-dia" />
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <ul className="flex gap-x-8 gap-y-3 flex-wrap">
            <li>
              <GovLink href="#" size="s">
                Link
              </GovLink>
            </li>
            <li>
              <GovLink href="#" size="s">
                Link
              </GovLink>
            </li>
            <li>
              <GovLink href="#" size="s">
                Link
              </GovLink>
            </li>
            <li>
              <GovLink href="#" size="s">
                Link
              </GovLink>
            </li>
          </ul>
          <hr className="!border-t-footer-separator" />
          <div className="flex justify-between flex-wrap gap-y-4 gap-x-8 text-secondary text-xs">
            <p>
              2025 © Digitální a informační agentura • Informace jsou
              poskytovány v souladu se zákonem č. 106/1999 Sb., o svobodném
              přístupu k informacím.
            </p>
            <div className="flex gap-x-3">
              <p>Verze 2.0.2105.9856</p>|<p>Využit Design system 4.0</p>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};
