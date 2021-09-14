import { ILoginUser } from './repositories/ILoginUser';
import { LoginUser } from './LoginUser';

export const loginUserData = (user: ILoginUser.Request): Promise<any> => {
  const loginUser = new LoginUser(user);
  return loginUser.loginUser();
};
