/* eslint-disable no-redeclare */
import { UserModel } from '../entities';

export interface ICreateUser {
  createUser(): Promise<UserModel>;
}

export namespace ICreateUser {
  export type Request = UserModel
  export type Response = UserModel
}
