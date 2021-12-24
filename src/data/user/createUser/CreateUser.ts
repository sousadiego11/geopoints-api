import validator from 'validator';
import { db } from '../../../database';
import { IEncrypter } from '../../encrypter/repositories';
import { ICreateUser } from './repositories/ICreateUser';

const passwordConfig = {
  minLength: 6,
  minSymbols: 0,
  minNumbers: 0,
  minUppercase: 0,
};

export class CreateUser implements ICreateUser {
  name: string;

  email: string;

  password: string;

  constructor(user: ICreateUser.Request, private readonly encrypter: IEncrypter) {
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.encrypter = encrypter;
  }

  async userExists(): Promise<ICreateUser.Response> {
    return db.oneOrNone('SELECT * FROM users WHERE email = $1', [this.email]);
  }

  async validateFields(): Promise<void> {
    if (this.name === null || this.email === null || this.password === null) {
      throw new Error('Por favor, preencha todos os campos!');
    }
    if (!validator.isStrongPassword(this.password, passwordConfig)) {
      throw new Error('Senha muito fraca!');
    }
    if (!validator.isEmail(this.email)) {
      throw new Error('Insira um e-mail válido!');
    }
  }

  async create(): Promise<ICreateUser.Response> {
    await this.validateFields();
    const existUser = await this.userExists();
    const hashedPassword = await this.encrypter.hashPassword();
    if (!existUser) {
      return db.none('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [this.name, this.email, hashedPassword]);
    }

    throw new Error('E-mail já em uso!');
  }
}
