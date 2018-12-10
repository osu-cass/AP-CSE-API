import { IClaim } from '../../models/claim';

export const importDbEntries = jest.fn().mockResolvedValue(<IClaim[]>[{}]);