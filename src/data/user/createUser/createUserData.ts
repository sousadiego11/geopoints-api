import { CreateUser } from './CreateUser';
import { ICreateUser } from './repositories/ICreateUser';

export const createUserData = async (user: ICreateUser.Request): Promise<ICreateUser.Response> => {
  const createUser = new CreateUser(user);
  const newUser = await createUser.createUser();
  return newUser;
};
