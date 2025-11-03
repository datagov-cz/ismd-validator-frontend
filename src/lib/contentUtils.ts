import { DictProcessInfoStatusType } from './appTypes';

export const getDownloadSectionTranslationKey = (
  status: DictProcessInfoStatusType,
) => {
  return status === 'Error' ? 'Error' : 'Success-Warning';
};
