import { ETableNames } from '../../ETableNames';
import { IUser } from '../../models';
import { Knex } from '../../knex';

export const getById = async (id: Number): Promise<Omit<IUser, 'password'> | Error> => {
  
  try {
    
    const result = await Knex(ETableNames.user)
      .select('id', 'name', 'email', 'role')
      .where('id', id)
      .first();

    if (result) return result;

    return new Error('Registro não encontrado.');
  } catch (error) {
    console.log(error);
    return new Error('Registro não encontrado.');
  }

};
