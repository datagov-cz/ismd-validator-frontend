import { DictProcessInfoStatusType, OutputFormatType } from './appTypes';

export const STATUS_MAP: Record<
  DictProcessInfoStatusType,
  'success' | 'warning' | 'error'
> = {
  Success: 'success',
  Warning: 'warning',
  Error: 'error',
};

export const OUTPUT_FORMAT: OutputFormatType =
  (process.env.NEXT_PUBLIC_CONVERT_FORMAT as OutputFormatType) ?? 'json';

export const SSP_FETCH_URL =
  'https://xn--slovnk-7va.gov.cz/sparql?default-graph-uri=&query=PREFIX+dct%3A+%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Fterms%2F%3E+SELECT+DISTINCT+%3Fslovnik+%3Fnazev_slovniku+WHERE+%7B+%3Fslovnik+a+%3Chttp%3A%2F%2Fonto.fel.cvut.cz%2Fontologies%2Fslovn%C3%ADk%2Fagendov%C3%BD%2Fpopis-dat%2Fpojem%2Fslovn%C3%ADk%3E+.+%3Fslovnik+dct%3Atitle+%3Fnazev_slovniku+.+FILTER+%28lang%28%3Fnazev_slovniku%29%3D%22cs%22%29+%7D+ORDER+BY+DESC%28%3Fslovnik%29+DESC%28%3Fnazev_slovniku%29%0D%0A&format=application%2Fsparql-results%2Bjson&timeout=0&signal_void=on';
export const SSP_QUERY = `
PREFIX dct: <http://purl.org/dc/terms/>
SELECT DISTINCT ?slovnik ?nazev_slovniku
WHERE {
  ?slovnik a <http://onto.fel.cvut.cz/ontologies/slovník/agendový/popis-dat/pojem/slovník> .
  ?slovnik dct:title ?nazev_slovniku .
  FILTER (lang(?nazev_slovniku) = "cs")
}
ORDER BY DESC(?slovnik) DESC(?nazev_slovniku)
`;
