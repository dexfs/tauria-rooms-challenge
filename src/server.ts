import 'reflect-metadata';

import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import errorValidationHandler from '@shared/middlewares/errorValidationHandler';
import routes from './routes';

import '@database/index';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(errorValidationHandler);

app.listen(3333, function () {
  console.log('Listening on port 3333');
});
