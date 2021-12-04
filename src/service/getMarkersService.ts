import { MarkerModel } from '../data/entities';
import { getMarkersData } from '../data/marker/getMarker';

// eslint-disable-next-line max-len
export const getMarkersService = (): Promise<MarkerModel[]> => getMarkersData();
