import { db } from '../../../database';
import { MarkerModel } from '../../entities';

export class CreateMarker {
  idUser: number;

  description: string;

  latitude: string;

  longitude: string;

  constructor(marker: MarkerModel) {
    this.idUser = marker.idUser;
    this.description = marker.description;
    this.latitude = marker.latitude;
    this.longitude = marker.longitude;
  }

  private async validateData() {
    if (!this.idUser) throw new Error('Markers should belong to a specific user!');
    if (!this.latitude || !this.longitude) throw new Error('Markers need a valid location!');
  }

  async create() {
    this.validateData();

    try {
      return db.one('INSERT INTO markers (id_user, description, latitude, longitude) values ($1, $2, $3, $4) returning id, id_user, description, latitude, longitude', [
        this.idUser, this.description, this.latitude, this.longitude,
      ]);
    } catch (error) {
      throw new Error(error);
    }
  }
}
