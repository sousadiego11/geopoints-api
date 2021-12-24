import { Encrypter } from '../../encrypter/Encrypter';
import { CreateUser } from './CreateUser';
import { ICreateUser } from './repositories/ICreateUser';

export const createUserData = async (user: ICreateUser.Request): Promise<ICreateUser.Response> => {
  const createUser = new CreateUser(user, new Encrypter(user.password));
  const newUser = await createUser.create();
  return newUser;
};
