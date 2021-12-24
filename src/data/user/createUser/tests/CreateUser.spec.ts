/* eslint-disable max-classes-per-file */
import { CreateUser } from '..';
import { Encrypter } from '../../../encrypter/Encrypter';

class FakeCreateUser extends CreateUser {
  async create() {
    await this.validateFields();
    const existsUser = await this.userExists();
    await this.encrypter.hashPassword();
    if (!existsUser) return { name: this.name, email: this.email, password: this.password };
    throw new Error('E-mail já em uso!');
  }
}

class FakeEncrypter extends Encrypter {
  async hashPassword() {
    return this.password;
  }
}

const makeSut = (user: any) => {
  const encrypter = new FakeEncrypter(user.password);
  const repository = new FakeCreateUser(user, encrypter);

  return {
    repository, encrypter,
  };
};

describe('Create user', () => {
  test('Should throw if user already exists', async () => {
    const user = {
      name: 'Diego', password: 'minhasenha', email: 'meuemail@email.com',
    };
    const { repository } = makeSut(user);
    jest.spyOn(repository, 'userExists').mockImplementationOnce(async () => user);
    await expect(repository.create()).rejects.toThrow('E-mail já em uso!');
  });

  test('Should create user if user not exists', async () => {
    const user = {
      name: 'Diego', password: 'minhasenha', email: 'meuemail@email.com',
    };
    const { repository } = makeSut(user);
    jest.spyOn(repository, 'userExists').mockImplementationOnce(() => null);
    await expect(repository.create()).resolves.toEqual(user);
  });

  test('Should call encrypter hashPassword once', async () => {
    const user = {
      name: 'Diego', password: 'minhasenha', email: 'meuemail@email.com',
    };
    const { repository, encrypter } = makeSut(user);
    jest.spyOn(repository, 'userExists').mockImplementationOnce(() => null);
    const encrypterSpy = jest.spyOn(encrypter, 'hashPassword');
    await repository.create();
    expect(encrypterSpy).toBeCalledTimes(1);
  });

  test('Should throw if any user fields are empty', async () => {
    const { repository } = makeSut({ name: 'Diego', password: '123' });
    await expect(repository.create()).rejects.toThrow('Por favor, preencha todos os campos!');
  });

  test('Should throw if password is weak', async () => {
    const { repository } = makeSut({ name: 'Diego', password: '12345', email: 'email@email.com' });
    await expect(repository.create()).rejects.toThrow('Senha muito fraca!');
  });

  test('Should throw if email is invalid', async () => {
    const { repository } = makeSut({ name: 'Diego', password: 'minhasenha', email: 'meuemail.com' });
    await expect(repository.create()).rejects.toThrow('Insira um e-mail válido!');
  });
});
