import { ILoginUser } from '../data/user/loginUser/repositories/ILoginUser';
import { loginUserData } from '../data/user/loginUser';

export const loginUserService = (user: ILoginUser.Request): Promise<any> => loginUserData(user);
