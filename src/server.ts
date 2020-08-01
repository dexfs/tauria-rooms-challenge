import 'reflect-metadata';

import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';
import 'express-async-errors';
import cors from 'cors';
import errorHandler from '@shared/middlewares/errorHandler';
import routes from './routes';

import '@database/index';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(errorHandler);

app.listen(3333, function () {
  console.log('Listening on port 3333');
});
