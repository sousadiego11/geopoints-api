import { db } from '../../../database';
import { MarkerModel } from '../../entities';

export const GetMarkers = (): Promise<MarkerModel[]> => db.manyOrNone('SELECT * FROM MARKERS');
