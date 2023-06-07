import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';
import { IUser } from '../../models';

interface IUserWithoutPassword extends Omit<IUser, 'password'> {}

export const getAll = async (
  page: number,
  limit: number,
  filter: string,
): Promise<IUserWithoutPassword[] | Error> => {
  try {
    const result = await Knex.from(ETableNames.user)
      .select('id', 'name', 'email', 'role')
      .orWhere('name', 'like', `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    return result;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar os registros.');
  }
};
