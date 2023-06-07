import * as create from './Create';
import * as getById from './GetById';
import * as getByEmail from './GetByEmail';
import * as getAll from './GetAll';
import * as count from './Count';
import * as deleteById from './DeleteById';
import * as updateById from './UpdateById';


export const UsersProvider = {
  ...getByEmail,
  ...create,
  ...getAll,
  ...count,
  ...getById,
  ...deleteById,
  ...updateById,
};