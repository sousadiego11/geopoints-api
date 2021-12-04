import { MarkerModel } from '../../entities';
import { GetMarkers } from './GetMarkers';

export const getMarkersData = (): Promise<MarkerModel[]> => GetMarkers();
