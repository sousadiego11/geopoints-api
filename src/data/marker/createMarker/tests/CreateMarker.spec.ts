import { CreateMarker } from '../CreateMarker';

class FakeCreateMarker extends CreateMarker {
  async create() {
    await this.validateData();

    return {
      idUser: this.idUser,
      description: this.description,
      latitude: this.latitude,
      longitude: this.longitude,
    };
  }
}

const makeSut = (marker: any) => new FakeCreateMarker(marker);

describe('CreateMarker', () => {
  test('Should throw if marker description is not provided', async () => {
    const marker = {
      idUser: 1,
      latitude: '2',
      longitude: '3',
    };
    const sut = makeSut(marker);
    await expect(sut.create()).rejects.toThrow('Um ponto requer descrição!');
  });

  test('Should throw if user id is not provided', async () => {
    const marker = {
      description: 'desc',
      latitude: '2',
      longitude: '3',
    };
    const sut = makeSut(marker);
    await expect(sut.create()).rejects.toThrow('Um ponto precisa ser salvo para um usuário!');
  });

  test('Should throw if latitude or longitude is not provided', async () => {
    const marker = {
      idUser: 1,
      description: 'desc',
    };
    const sut = makeSut(marker);
    await expect(sut.create()).rejects.toThrow('Um ponto requer localização válida!');
  });

  test('Should create marker', async () => {
    const marker = {
      idUser: 1,
      latitude: '2',
      longitude: '3',
      description: 'desc',
    };
    const sut = makeSut(marker);
    await expect(sut.create()).resolves.toEqual(marker);
  });
});
