import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex(ETableNames.user)
    .where('id', '=', 1)
    .update({
      role: 'sadmin',
    })
    .then(() => {
      console.log(`# Changed role from table ${ETableNames.user}`);
    });
}

exports.down = function(knex: Knex) {
  return knex(ETableNames.user)
    .where('id', '=', 5) 
    .update({
      role: 'user'
    });
};
