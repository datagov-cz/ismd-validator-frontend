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
