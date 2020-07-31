import { Router } from 'express';

import usersRoutes from './users.routes';
import roomsRoutes from './rooms.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/rooms', roomsRoutes);

export default routes;
