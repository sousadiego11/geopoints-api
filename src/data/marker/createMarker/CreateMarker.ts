import { db } from '../../../database';
import { MarkerModel } from '../../entities';
import { ICreateMarker } from './repositories/ICreateMarker';

export class CreateMarker implements ICreateMarker {
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
    if (!this.idUser) throw new Error('Um ponto precisa ser salvo para um usuário!');
    if (!this.latitude || !this.longitude) throw new Error('Um ponto requer localização válida!');
    if (this.description?.trim() === '' || !this.description) throw new Error('Um ponto requer descrição!');
  }

  async create() {
    await this.validateData();

    try {
      return db.one('INSERT INTO markers (id_user, description, latitude, longitude) values ($1, $2, $3, $4) returning id, id_user, description, latitude, longitude', [
        this.idUser, this.description, this.latitude, this.longitude,
      ]);
    } catch (error) {
      throw new Error(error);
    }
  }
}
