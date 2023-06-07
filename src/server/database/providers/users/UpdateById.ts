import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';
import { PasswordCrypto } from '../../../shared/services';

interface IBodyParams {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
}

export const updateById = async (id: Number, user: IBodyParams): Promise<void | Error> => {
  let User = user;

  if (user.password) {
    const hashedPassword = await PasswordCrypto.hasPassword(user.password);
    User = {
      ...user,
      password: hashedPassword,
    };
  }
  try {
    const result = await Knex(ETableNames.user).update(User).where('id', id);

    if (result > 0) return;

    return new Error('Erro ao atualizar registro.');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar registro.');
  }
};
