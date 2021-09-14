import { ILoginUser } from './repositories/ILoginUser';
import { LoginUser } from './LoginUser';

export const loginUserData = (user: ILoginUser.Request): Promise<ILoginUser.Response> => {
  const loginUser = new LoginUser(user);
  return loginUser.loginUser();
};
