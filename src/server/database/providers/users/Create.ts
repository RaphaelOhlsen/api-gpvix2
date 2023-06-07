import { ETableNames } from '../../ETableNames';
import { IUser } from '../../models';
import { Knex } from '../../knex';
import { PasswordCrypto } from '../../../shared/services';

export const create = async (user: Omit<IUser, 'id'>): Promise<number | Error> => {
  const hashedPassword = await PasswordCrypto.hasPassword(user.password);

  const userWithHashedPassword = {
    ...user,
    password: hashedPassword,
  };

  try {
    const [result] = await Knex(ETableNames.user)
      .insert(userWithHashedPassword)
      .returning('id');

    if (typeof result === 'object') {
      return result.id;
    } else if (typeof result === 'number') {
      return result;
    }

    return new Error('Erro ao cadastrar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar o registro');
  }
};
