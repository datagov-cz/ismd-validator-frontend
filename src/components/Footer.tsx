'use client';

import { GovButton, GovIcon, GovLink } from '@gov-design-system-ce/react';

import { scrollTop } from '@/lib/windowUtils';

export const Footer = () => {
  return (
    <footer className="bg-blue py-12 text-white mt-auto">
      <section className="max-w-[1200px] px-5 mx-auto space-y-8">
        <div className="flex justify-between">
          <ul className="flex justify-between w-full flex-wrap flex-col md:flex-row gap-y-10">
            <li className="space-y-5">
              <h5 className="font-medium text-xl">Odkazy</h5>
              <ul className="space-y-3">
                <li>
                  <GovLink href="#">Portál o datech</GovLink>
                </li>
                <li>
                  <GovLink href="#">Popis dat na portálu o datech</GovLink>
                </li>
                <li>
                  <GovLink
                    href="https://github.com/datagov-cz/ISMD_org"
                    external
                  >
                    Repozitář na GitHubu
                  </GovLink>
                </li>
              </ul>
            </li>
            <li className="space-y-5">
              <h5 className="font-medium text-xl">Kontakt</h5>
              <ul className="space-y-4">
                <li>
                  <GovLink href="mailto:data@dia.gov.cz">
                    <GovIcon slot="icon-start" name="envelope" />
                    data@dia.gov.cz
                  </GovLink>
                </li>
              </ul>
            </li>
          </ul>
          <GovButton
            slot="icon-start"
            name="chevron-up"
            aria-label="Na začátek stránky"
            type="solid"
            size="m"
            color="neutral"
            onGovClick={scrollTop}
          >
            <GovIcon name="chevron-up" size="m" />
          </GovButton>
        </div>
        <div className="space-y-4">
          <h6 className="text-lg font-medium">Poděkování</h6>
          <p className="text-sm">
            Informační systém pro modelování dat vznikl v rámci projektu
            Zajištění podmínek pro kvalitní správu datového fondu a zajištění
            řízeného přístupu k datům, reg.č.: CZ.31.1.01/MV/23_62/0000062.
          </p>
          <div className="flex gap-4 flex-wrap"></div>
        </div>
        <div>
          <ul className="flex gap-x-8 gap-y-4 flex-wrap">
            <li>
              <GovLink href="#">Link</GovLink>
            </li>
            <li>
              <GovLink href="#">Link</GovLink>
            </li>
            <li>
              <GovLink href="#">Link</GovLink>
            </li>
            <li>
              <GovLink href="#">Link</GovLink>
            </li>
          </ul>
        </div>
        <hr />
        <div className="flex justify-between flex-wrap gap-y-4 gap-x-8 text-secondary text-xs">
          <p>
            2025 © Digitální a informační agentura • Informace jsou poskytovány
            v souladu se zákonem č. 106/1999 Sb., o svobodném přístupu k
            informacím.
          </p>
          <div className="flex gap-x-3">
            <p>Verze 2.0.2105.9856</p>|<p>Využit Design system 4.0</p>
          </div>
        </div>
      </section>
    </footer>
  );
};
