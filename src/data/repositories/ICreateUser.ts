import { UserModel } from '../entities';

export interface ICreateUser {
  createUser(): Promise<UserModel>;
}
