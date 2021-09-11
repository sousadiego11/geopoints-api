import { UserModel } from '../service/entities';

export interface ICreateUser {
  createUser(): Promise<UserModel>;
}
