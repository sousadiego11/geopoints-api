import bcrypt from 'bcrypt';
import { IEncrypter } from './repositories';

export class Encrypter implements IEncrypter {
  password: string

  constructor(password: string) {
    this.password = password;
  }

  async hashPassword(): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(this.password, salt);
  }
}
