import jwt from 'jsonwebtoken';
import { db } from '../../../database';
import { IEncrypter } from '../../encrypter/repositories';
import { UserModel } from '../../entities';
import { ILoginUser } from './repositories/ILoginUser';

export class LoginUser implements ILoginUser {
  password: string

  email: string

  constructor(
    user: ILoginUser.Request,
    readonly encrypter: IEncrypter,
  ) {
    this.password = user.password;
    this.email = user.email;
    this.encrypter = encrypter;
  }

  async fetchUser(): Promise<UserModel> {
    const user = await db.oneOrNone('SELECT * FROM users WHERE email = $1', [this.email]);
    return {
      email: user?.email,
      password: user?.password,
      id: user?.id,
      name: user?.name,
    };
  }

  validate(id: number): void {
    if (!this.email) throw new Error('Insira um email!');
    if (!id) throw new Error('Usuário não existe!');
  }

  async loginUser(): Promise<ILoginUser.Response> {
    const { email, password, id } = await this.fetchUser();
    this.validate(id);
    const isValidPassword = await this.encrypter.validatePassword(password);

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
