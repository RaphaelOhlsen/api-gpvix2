import { ETableNames } from '../../ETableNames';
import { IPerson } from '../../models';
import { Knex } from '../../knex';

export const getById = async (id: Number): Promise<IPerson | Error> => {
  
  try {
    
    const result = await Knex(ETableNames.person)
      .select('*')
      .where('id', id)
      .first();

    if (result) return result;

    return new Error('Registro não encontrado.');
  } catch (error) {
    console.log(error);
    return new Error('Registro não encontrado.');
  }

};
