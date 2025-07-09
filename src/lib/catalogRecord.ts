interface CatalogRecord {
  "@context": string;
  iri: string;
  typ: string;
  název: {
    cs: string;
    en: string;
  };
  popis: {
    cs: string;
    en: string;
  };
  prvek_rúian: string[];
  geografické_území: unknown[];
  prostorové_pokrytí: unknown[];
  klíčové_slovo: {
    cs: string[];
    en: string[];
  };
  periodicita_aktualizace: string;
  téma: unknown[];
  koncept_euroVoc: string[];
  specifikace: string[];
  kontaktní_bod: object;
  distribuce: Array<{
    typ: string;
    podmínky_užití: {
      typ: string;
      autorské_dílo: string;
      databáze_jako_autorské_dílo: string;
      databáze_chráněná_zvláštními_právy: string;
      osobní_údaje: string;
    };
    soubor_ke_stažení: string;
    přístupové_url: string;
    typ_média: string;
    formát: string;
    schéma: string;
  }>;
}

export const generateCatalogRecord = (title: string, description: string): CatalogRecord => {
  return {
    "@context": "https://ofn.gov.cz/dcat-ap-cz-rozhraní-katalogů-otevřených-dat/2024-05-28/kontexty/rozhraní-katalogů-otevřených-dat.jsonld",
    iri: "_:ds",
    typ: "Datová sada",
    název: {
      cs: title,
      en: title
    },
    popis: {
      cs: description,
      en: description
    },
    prvek_rúian: [
      "https://linked.cuzk.cz/resource/ruian/stat/1"
    ],
    geografické_území: [],
    prostorové_pokrytí: [],
    klíčové_slovo: {
      cs: ["slovník"],
      en: ["vocabulary"]
    },
    periodicita_aktualizace: "http://publications.europa.eu/resource/authority/frequency/IRREG",
    téma: [],
    koncept_euroVoc: [
      "http://eurovoc.europa.eu/438"
    ],
    specifikace: [
      "https://ofn.gov.cz/slovníky/draft/"
    ],
    kontaktní_bod: {},
    distribuce: [
      {
        typ: "Distribuce",
        podmínky_užití: {
          typ: "Specifikace podmínek užití",
          autorské_dílo: "https://data.gov.cz/podmínky-užití/neobsahuje-autorská-díla/",
          databáze_jako_autorské_dílo: "https://data.gov.cz/podmínky-užití/není-autorskoprávně-chráněnou-databází/",
          databáze_chráněná_zvláštními_právy: "https://data.gov.cz/podmínky-užití/není-chráněna-zvláštním-právem-pořizovatele-databáze/",
          osobní_údaje: "https://data.gov.cz/podmínky-užití/neobsahuje-osobní-údaje/"
        },
        soubor_ke_stažení: "",
        přístupové_url: "",
        typ_média: "http://www.iana.org/assignments/media-types/text/turtle",
        formát: "http://publications.europa.eu/resource/authority/file-type/RDF_TURTLE",
        schéma: "https://ofn.gov.cz/slovníky/draft/schémata/konceptuální-model.json"
      }
    ]
  };
};