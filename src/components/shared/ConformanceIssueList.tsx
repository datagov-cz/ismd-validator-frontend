import { useTranslations } from 'next-intl';

import { ConformanceIssueDto } from '@/api/generated';

const KNOWN_KINDS = [
  'VOCABULARY_INVALID',
  'CONCEPT_EXCLUDED',
  'REFERENCE_REMOVED',
  'VALUE_DROPPED',
  'EXTERNAL_CONCEPT',
] as const;

interface Props {
  issues: ConformanceIssueDto[];
}

/** Last IRI segment of the concept (e.g. "řidič"), or the location when there is none. */
const subjectOf = (issue: ConformanceIssueDto) => {
  if (issue.conceptIri) {
    const segments = issue.conceptIri.split('/');
    const last = segments[segments.length - 1] || issue.conceptIri;
    try {
      return decodeURIComponent(last);
    } catch {
      return last; // malformed escape, e.g. in an IRI the gate rejected
    }
  }
  return issue.location || '—';
};

const kindOrder = (kind?: string) => {
  const index = KNOWN_KINDS.indexOf(kind as (typeof KNOWN_KINDS)[number]);
  return index === -1 ? KNOWN_KINDS.length : index;
};

/** What does not conform to OFN Slovníky: excluded from the output, or (for the vocabulary) to correct. */
export const ConformanceIssueList = ({ issues }: Props) => {
  const t = useTranslations('ConformanceIssues');

  const sorted = [...issues].sort(
    (a, b) => kindOrder(a.kind) - kindOrder(b.kind),
  );

  const kindLabel = (kind?: string) =>
    KNOWN_KINDS.includes(kind as (typeof KNOWN_KINDS)[number])
      ? t(`Kind.${kind}`)
      : (kind ?? '');

  return (
    <div className="overflow-auto max-h-[240px]">
      <table className="text-dark-primary w-full relative text-left">
        <tbody>
          <tr className="border-b border-border-grey">
            <th className="sticky top-0 bg-white">{t('Table.Kind')}</th>
            <th className="sticky top-0 bg-white">{t('Table.Subject')}</th>
            <th className="sticky top-0 bg-white">{t('Table.Message')}</th>
          </tr>
          {sorted.map((issue, index) => (
            <tr
              key={`${issue.kind}-${issue.conceptIri}-${issue.location}-${index}`}
            >
              <td>{kindLabel(issue.kind)}</td>
              <td className="break-all" title={issue.conceptIri ?? undefined}>
                {subjectOf(issue)}
              </td>
              <td>{issue.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
