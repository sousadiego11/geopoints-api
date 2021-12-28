import { ILoginUser } from './repositories/ILoginUser';
import { LoginUser } from './LoginUser';
import { Encrypter } from '../../encrypter/Encrypter';

export const loginUserData = (user: ILoginUser.Request): Promise<ILoginUser.Response> => {
  const loginUser = new LoginUser(user, new Encrypter(user.password, user.email));
  return loginUser.loginUser();
};
