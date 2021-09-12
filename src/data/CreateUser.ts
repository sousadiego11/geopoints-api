import bcrypt from 'bcrypt';
import { db } from '../database';
import { UserModel } from './entities';
import { ICreateUser } from './repositories';

export class CreateUser implements ICreateUser {
  name: string;

  email: string;

  password: string;

  encriptedPassword: string;

  constructor(user: UserModel) {
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.encriptedPassword = null;
  }

  private async userExists(): Promise<boolean> {
    return db.oneOrNone('SELECT * FROM users WHERE email = $1', [this.email]);
  }

  private async hashPassword(): Promise<void> {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(this.password, salt);

    this.encriptedPassword = hashed;
  }

  async createUser(): Promise<UserModel> {
    const existUser = await this.userExists();
    await this.hashPassword();
    if (!existUser) {
      return db.none('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [this.name, this.email, this.encriptedPassword]);
    }

    throw new Error('Email already being used!');
  }
}
