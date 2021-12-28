import bcrypt from 'bcrypt';
import { IEncrypter } from './repositories';

export class Encrypter implements IEncrypter {
  password: string

  email: string

  constructor(password: string, email?: string) {
    this.password = password;
    this.email = email;
  }

  async hashPassword(): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(this.password, salt);
  }

  async validatePassword(userPassword: string): Promise<any> {
    return bcrypt.compare(this.password, userPassword);
  }
}
