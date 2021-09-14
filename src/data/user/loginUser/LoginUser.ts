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
      const isValidPassword = await bcrypt.compare(this.password, user.password);
      return { isValidPassword, id: user.id };
    }

    throw new Error('Usuário não existe!');
  }

  async loginUser(): Promise<ILoginUser.Response> {
    const { isValidPassword, id } = await this.validatePassword();

    if (isValidPassword) {
      const token = await jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET);
      await db.none('UPDATE users SET token = $1 where users.id = $2', [token, id]);
      return { token };
    }

    throw new Error('Senha inválida!');
  }
}
