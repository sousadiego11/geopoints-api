import { loginUserData } from '../data/loginUserData';
import { ILoginUser } from '../data/repositories/ILoginUser';

export const loginUserService = (user: ILoginUser.Request): Promise<any> => loginUserData(user);
