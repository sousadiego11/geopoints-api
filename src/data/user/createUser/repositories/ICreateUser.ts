/* eslint-disable no-redeclare */

import { UserModel } from '../../../entities';

export interface ICreateUser {
  createUser(): Promise<ICreateUser.Response>;
  hashPassword(): Promise<void>;
  validateFields(): Promise<void>;
  userExists(): Promise<ICreateUser.Response>;
}

export namespace ICreateUser {
  export type Request = UserModel
  export type Response = UserModel
}
