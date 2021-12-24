/* eslint-disable no-redeclare */

import { UserModel } from '../../../entities';

export interface ICreateUser {
  create(): Promise<ICreateUser.Response>;
  validateFields(): Promise<void>;
  userExists(): Promise<ICreateUser.Response>;
}

export namespace ICreateUser {
  export type Request = UserModel
  export type Response = UserModel
}
