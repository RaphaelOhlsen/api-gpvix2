import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';
import { IPerson } from '../../models';

export const getAll = async (
  page: number,
  limit: number,
  filter: string,
): Promise<IPerson[] | Error> => {
  try {
    const result = await Knex.from(ETableNames.person)
      .select('*')
      .orWhere('fullName', 'like', `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    return result;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar os registros.');
  }
};
