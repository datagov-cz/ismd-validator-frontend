import { GovChip } from '@gov-design-system-ce/react';
import { useTranslations } from 'next-intl';

import type { ConformanceIssueDto } from '@/api/generated';
import { ConformanceIssueKind } from '@/api/generated';

interface Props {
  issues: ConformanceIssueDto[];
}

const getConceptLabel = (iri: string) => {
  const lastPart = iri.split(/[/#]/).filter(Boolean).at(-1) ?? iri;

  try {
    return decodeURIComponent(lastPart).replace(/[-_]/g, ' ');
  } catch {
    return lastPart.replace(/[-_]/g, ' ');
  }
};

export const OfnIssuesList = ({ issues }: Props) => {
  const t = useTranslations('OfnConformance.Kinds');
  const kindLabels = {
    [ConformanceIssueKind.VALUE_DROPPED]: t('VALUE_DROPPED'),
    [ConformanceIssueKind.CONCEPT_EXCLUDED]: t('CONCEPT_EXCLUDED'),
    [ConformanceIssueKind.REFERENCE_REMOVED]: t('REFERENCE_REMOVED'),
    [ConformanceIssueKind.EXTERNAL_CONCEPT]: t('EXTERNAL_CONCEPT'),
    [ConformanceIssueKind.VOCABULARY_INVALID]: t('VOCABULARY_INVALID'),
  };
  const groups = new Map<string | null, ConformanceIssueDto[]>();

  for (const issue of issues) {
    const key = issue.conceptIri ?? null;
    const group = groups.get(key) ?? [];
    group.push(issue);
    groups.set(key, group);
  }

  return (
    <div className="space-y-4">
      {Array.from(groups.entries()).map(([conceptIri, groupIssues]) => (
        <section key={conceptIri ?? 'vocabulary'} className="space-y-2">
          <h4 className="font-semibold break-words text-sm!">
            {conceptIri ? (
              /^https?:\/\//i.test(conceptIri) ? (
                <a
                  href={conceptIri}
                  target="_blank"
                  rel="noreferrer"
                  title={conceptIri}
                  className="underline"
                >
                  {getConceptLabel(conceptIri)}
                </a>
              ) : (
                conceptIri
              )
            ) : (
              'Problém slovníku'
            )}
          </h4>
          <div role="list" className="space-y-3">
            {groupIssues.map((issue, index) => (
              <div
                key={`${issue.kind}-${issue.location}-${index}`}
                role="listitem"
                className="border-l-2 border-red-600 pl-3 space-y-1.5"
              >
                <p className="text-sm!">{issue.message}</p>
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                  {issue.kind && (
                    <GovChip color="warning" size="xs" type="outlined">
                      {kindLabels[issue.kind] ?? issue.kind}
                    </GovChip>
                  )}
                  {issue.location && (
                    <span className="break-all text-gray-700">
                      {issue.location}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};
