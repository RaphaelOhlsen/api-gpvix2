import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';


export const deleteById = async (id: Number): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.person)
      .where('id', id)
      .del();
    
    if ( result > 0 ) return;

    return new Error('Erro ao apagar registro.');

  } catch (error) {
    return new Error('Erro ao apagar registro.');
  }
};