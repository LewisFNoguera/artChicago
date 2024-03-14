import { DatumAdapter, Datum } from '@utils/interface/artworks.interface';

export const successGenericAdapter = (data: DatumAdapter): DatumAdapter => {
  return {
    data: data.data as DatumAdapter | Datum,
    pagination: data.pagination,
    detail: data?.detail,
    error: data?.error,
    status: data?.status,
  };
};
