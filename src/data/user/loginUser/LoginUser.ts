import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../../../database';
import { ILoginUser } from './repositories/ILoginUser';

export class LoginUser implements ILoginUser {
  password: string

  email: string

  constructor(user: ILoginUser.Request) {
    this.password = user.password;
    this.email = user.email;
  }

  private async validatePassword(): Promise<any> {
    const user = await db.oneOrNone('SELECT * FROM users WHERE email = $1', [this.email]);

    if (user) {
      return bcrypt.compare(this.password, user.password);
    }

    throw new Error('Usuário não existe!');
  }

  async loginUser(): Promise<ILoginUser.Response> {
    const isValidPassword = await this.validatePassword();
    if (isValidPassword) {
      const token = await jwt.sign({ data: this.email }, process.env.ACCESS_TOKEN_SECRET);
      return { token };
    }

    throw new Error('Senha inválida!');
  }
}
