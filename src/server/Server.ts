/* eslint-disable quotes */
import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import './shared/services/YupTranslations';
import { router } from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from  '../swagger.json';

const server = express();

server.use(cors({
  // origin: process.env.CORS_ORIGIN?.split(';') || [],
  origin: '*',
}
));

server.use(express.json());

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

server.use(router);

export { server };
