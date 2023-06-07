import { IPerson, ICity, IUser } from '../../models';

declare module 'knex/types/tables' {
  interface Tables {
    person: IPerson;
    city: ICity;
    user: IUser
  }
}
