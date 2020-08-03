import express from 'express';
import {
  createConnection,
  getConnection,
  getConnectionOptions,
  Connection,
} from 'typeorm';
import 'express-async-errors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import * as Sentry from '@sentry/node';
import cors from 'cors';
import handleErrors from '@shared/middlewares/handleErrors';
import { loadEnv } from '@shared/utils/loadEnvironments';
import routes from './routes';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

loadEnv();
class Server {
  public app: express.Express;

  private connection: Connection;

  constructor() {
    this.app = express();
    Sentry.init({ dsn: process.env.SENTRY_DSN });
    this.enableMiddlewares();
    this.loadRoutes();
    this.enableErrorHandlers();
  }

  logs(): void {
    // eslint-disable-next-line no-console
    console.log(`🌎 [envoriment]: ${process.env.NODE_ENV}`);
    // eslint-disable-next-line no-console
    console.log(`📖 [database]: ${this.connection.isConnected}`);
    // eslint-disable-next-line no-console
    console.log(
      `🚀 Server ready at: http://${process.env.HOST}:${process.env.PORT}`,
    );
  }

  async connectionPGCreate(): Promise<void> {
    const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
    const connection = await createConnection({
      ...connectionOptions,
      name: 'default',
    });
    this.connection = connection;
  }

  async connectionPGClose() {
    await getConnection().close();
  }

  loadRoutes(): void {
    this.app.use(routes);
  }

  enableMiddlewares(): void {
    this.app.use(Sentry.Handlers.requestHandler());
    this.app.disable('x-powered-by');
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(limiter);
  }

  enableErrorHandlers(): void {
    this.app.use(handleErrors);
  }

  listen(): void {
    this.app.listen(process.env.PORT);
  }

  async start(): Promise<void> {
    await this.connectionPGCreate();
    this.listen();
    this.logs();
  }
}

export default new Server();
