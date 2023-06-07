import * as deletedById from './DeleteById';
import * as updateById from './UpdateById';
import * as getById from './GetById';
import * as create from './Create';
import * as getAll from './GetAll';
import * as count from './Count';

export const CitiesProvider = {
  ...deletedById,
  ...updateById,
  ...getById,
  ...create,
  ...getAll,
  ...count,
};
