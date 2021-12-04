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
      return {
        isValidPassword, email: user.email, id: user.id,
      };
    }

    throw new Error('Usuário não existe!');
  }

  async loginUser(): Promise<ILoginUser.Response> {
    const {
      isValidPassword, email, id,
    } = await this.validatePassword();

    if (isValidPassword) {
      const token = jwt.sign({
        email,
        id,
      }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 60 * 60 });
      return { token, id };
    }

    throw new Error('Senha inválida!');
  }
}
