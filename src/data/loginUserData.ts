import { LoginUser } from './LoginUser';
import { ILoginUser } from './repositories/ILoginUser';

export const loginUserData = (user: ILoginUser.Request): Promise<any> => {
  const loginUser = new LoginUser(user);
  return loginUser.loginUser();
};
