import { createUserData } from '../data';
import { UserModel } from '../data/entities';

export const createUserService = (user: UserModel): Promise<UserModel> => createUserData(user);
