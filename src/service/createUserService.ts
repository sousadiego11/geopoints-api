import { createUserData } from '../data/user/createUser';
import { ICreateUser } from '../data/user/createUser/repositories/ICreateUser';

// eslint-disable-next-line max-len
export const createUserService = (user: ICreateUser.Request): Promise<ICreateUser.Response> => createUserData(user);
