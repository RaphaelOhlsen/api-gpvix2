import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';
import { ICity } from '../../models';

export const updateById = async (id: Number, city: Omit<ICity, 'id'>): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.city).update(city).where('id', id);

    if (result > 0) return;

    return new Error('Erro ao atualizar registro.');
  } catch (error) {
    return new Error('Erro ao atualizar registro.');
  }
};
