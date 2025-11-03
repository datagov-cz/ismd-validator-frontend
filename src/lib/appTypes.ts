export type DictProcessInfoStatusType = 'Success' | 'Warning' | 'Error';

export type StatusType = {
  status: DictProcessInfoStatusType;
  message?: string;
};

export type OutputFormatType = 'json' | 'ttl';

export type ConversionType = 'file' | 'url' | 'dict';

export type SSPDictionaryType = {
  label: string;
  iri: string;
};
