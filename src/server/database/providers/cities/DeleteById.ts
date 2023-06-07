import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';


export const deleteById = async (id: Number): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.city)
      .where('id', id)
      .del();
    
    if ( result > 0 ) return;

    return new Error('Erro ao apagar registro.');

  } catch (error) {
    console.log(error);
    return new Error('Erro ao apagar registro.');
  }
};