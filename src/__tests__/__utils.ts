import supertest from 'supertest';
import ServerFactory from '../server';

/**
 * e2e Testing utils
 */
export const startTestServer = () => {
  return supertest(ServerFactory.app);
};
