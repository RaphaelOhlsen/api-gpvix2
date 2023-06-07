import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex.schema
    .table('user', function (table) {
      table.string('role').notNullable().defaultTo('user').checkIn(['user', 'admin', 'sadmin']);
    })
    .then(() => {
      console.log(`# Updated table ${ETableNames.user}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema
    .table('user', function (table) {
      table.dropColumn('role');
    })
    .then(() => {
      console.log(`# Dropped table ${ETableNames.user}`);
    });
}