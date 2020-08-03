import express from 'express';
import {
  createConnection,
  getConnection,
  getConnectionOptions,
  Connection,
} from 'typeorm';
import 'express-async-errors';
import cors from 'cors';
import handleErrors from '@shared/middlewares/handleErrors';
import { loadEnv } from '@shared/utils/loadEnvironments';
import routes from './routes';

loadEnv();
class Server {
  public app: express.Express;

  private connection: Connection;

  constructor() {
    this.app = express();
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
    this.app.use(cors());
    this.app.use(express.json());
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
