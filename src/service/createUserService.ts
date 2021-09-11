import { createUserData } from '../data';
import { UserModel } from './entities';

export const createUserService = (user: UserModel): Promise<UserModel> => createUserData(user);
