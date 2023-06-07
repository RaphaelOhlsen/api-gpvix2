import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';
import { ICity } from '../../models';

export const getById = async (id: Number): Promise<ICity | Error> => {
  
  try {
    const result = await Knex(ETableNames.city)
      .select('*')
      .where('id', id)
      .first();

    if (result) return result;

    return new Error('Registro não encontrado.');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar registro.');
  }

};
