import { MarkerModel } from '../data/entities';
import { createMarkerData } from '../data/marker/createMarker/createMarkerData';

// eslint-disable-next-line max-len
export const createMarkerService = (markerData: MarkerModel): Promise<MarkerModel> => createMarkerData(markerData);
