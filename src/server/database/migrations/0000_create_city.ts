import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.city, (table) => {
      table.bigIncrements('id').primary().index();
      table.string('name').checkLength('<=', 150).notNullable().index();

      table.comment('Table of cities');
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.city}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.city).then(() => {
    console.log(`# Dropped table ${ETableNames.city}`);
  });
}
