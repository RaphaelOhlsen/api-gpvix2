import * as signIn from './SignIn';
import * as signUp from './SignUp';
import * as getAll from './GetAll';
import * as getById from './GetById';
import * as deleteById from './DeleteById';
import * as create from './Create';
import * as updateById from './UpdateById';

export const UsersController = {
  ...signIn,
  ...signUp,
  ...getAll,
  ...getById,
  ...deleteById,
  ...create,
  ...updateById,
};
