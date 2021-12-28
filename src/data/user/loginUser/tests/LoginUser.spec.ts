/* eslint-disable max-classes-per-file */
import { LoginUser } from '..';
import { Encrypter } from '../../../encrypter/Encrypter';
import { UserModel } from '../../../entities';
import { ILoginUser } from '../repositories/ILoginUser';

export class FakeLoginUser extends LoginUser {
  async fetchUser(): Promise<UserModel> {
    return {
      email: this.email,
      password: this.password,
      id: 1,
      name: 'name',
    };
  }

  async loginUser(): Promise<ILoginUser.Response> {
    const { password, id } = await this.fetchUser();
    this.validate(id);
    const isValidPassword = await this.encrypter.validatePassword(password);

    if (isValidPassword) {
      return { token: 'token', id };
    }

    throw new Error('Senha inválida!');
  }
}

const makeSut = (user: any) => {
  const encrypter = new Encrypter(user.password, user.email);
  const repository = new LoginUser(user, encrypter);
  const fakeRepository = new FakeLoginUser(user, encrypter);

  return {
    repository, encrypter, fakeRepository,
  };
};

describe('Create user', () => {
  const user = {
    name: 'Diego', password: 'minhasenha', email: 'meuemail@email.com',
  };
  test('Should throw if user not found with email', async () => {
    const { repository } = makeSut(user);

    jest.spyOn(repository, 'fetchUser').mockImplementationOnce(async () => ({
      email: null,
      password: null,
      id: null,
      name: null,
    }));

    await expect(repository.loginUser()).rejects.toThrow('Usuário não existe!');
  });
  test('Should throw if email not provided', async () => {
    const { repository } = makeSut({ ...user, email: null });

    jest.spyOn(repository, 'fetchUser').mockImplementationOnce(async () => user);

    await expect(repository.loginUser()).rejects.toThrow('Insira um email!');
  });
  test('Should throw if invalid password', async () => {
    const { fakeRepository, encrypter } = makeSut(user);

    jest.spyOn(encrypter, 'validatePassword').mockImplementationOnce(async () => false);

    await expect(fakeRepository.loginUser()).rejects.toThrow('Senha inválida!');
  });
  test('Should call encrypter validatePassword once', async () => {
    const { fakeRepository, encrypter } = makeSut(user);
    const encrypterSpy = jest.spyOn(encrypter, 'validatePassword').mockImplementationOnce(async () => true);
    await fakeRepository.loginUser();
    expect(encrypterSpy).toBeCalledTimes(1);
  });
  test('Should login user', async () => {
    const { fakeRepository, encrypter } = makeSut(user);
    jest.spyOn(encrypter, 'validatePassword').mockImplementationOnce(async () => true);
    await expect(fakeRepository.loginUser()).resolves.toEqual({ token: 'token', id: 1 });
  });
});
