import { db } from '../../../database';
import { MarkerModel } from '../../entities';

export const GetMarkers = (): Promise<MarkerModel[]> => db.manyOrNone('select m.id as id_marker, m.description, m.latitude, m.longitude,  u.name as user_name, u.id as user_id from markers m join users u on u.id = m.id_user;');
