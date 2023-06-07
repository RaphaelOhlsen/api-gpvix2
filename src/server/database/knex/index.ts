import { knex } from 'knex';
import 'dotenv/config';
import pg from 'pg';

import { development, production, test } from './Environment';

if (process.env.ENVIRONMENT === 'production') {
  pg.types.setTypeParser(20, 'text', parseInt);
}

const getEnvironment = () => {
  switch (process.env.ENVIRONMENT) {
    case 'development':
      return production;
    case 'test':
      return test;
    case 'production':
      return production;
    default:
      return development;
  }
};

export const Knex = knex(getEnvironment());
