import { createUserData } from '../data';
import { ICreateUser } from '../data/repositories';

// eslint-disable-next-line max-len
export const createUserService = (user: ICreateUser.Request): Promise<ICreateUser.Response> => createUserData(user);
