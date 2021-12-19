import bcrypt from 'bcrypt';
import validator from 'validator';
import { db } from '../../../database';
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

  encriptedPassword: string;

  constructor(user: ICreateUser.Request) {
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.encriptedPassword = null;
  }

  async userExists(): Promise<ICreateUser.Response> {
    return db.oneOrNone('SELECT * FROM users WHERE email = $1', [this.email]);
  }

  async hashPassword(): Promise<void> {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(this.password, salt);

    this.encriptedPassword = hashed;
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

  async createUser(): Promise<ICreateUser.Response> {
    await this.validateFields();
    const existUser = await this.userExists();
    await this.hashPassword();
    if (!existUser) {
      return db.none('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [this.name, this.email, this.encriptedPassword]);
    }

    throw new Error('E-mail já em uso!');
  }
}
