import { UserModel } from './entities';
import { CreateUser } from './CreateUser';

export const createUserData = async (user: UserModel): Promise<UserModel> => {
  const createUser = new CreateUser(user);
  const newUser = await createUser.createUser();
  return newUser;
};
