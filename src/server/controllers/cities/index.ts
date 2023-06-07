import * as deletedById from './DeleteById';
import * as updateById from './UpdateById';
import * as getById from './GetById';
import * as create from './Create';
import * as getAll from './GetAll';

export const CitiesController = {
  ...deletedById,
  ...updateById,
  ...getById,
  ...create,
  ...getAll,
};

