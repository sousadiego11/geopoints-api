import { MarkerModel } from '../../entities';
import { CreateMarker } from './CreateMarker';

export const createMarkerData = (markerData: MarkerModel): Promise<MarkerModel> => {
  const createMarker = new CreateMarker(markerData);
  const marker = createMarker.create();
  return marker;
};
