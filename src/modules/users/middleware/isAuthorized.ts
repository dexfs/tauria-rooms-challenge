import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface IToken {
  sub: string;
}
const decodeToken = (token: string) => {
  return verify(token, authConfig.jwt.secret);
};

const isAuthorized = (
  request: Request,
  response: Response,
  next: NextFunction,
): Response | undefined => {
  const requestToken = request.headers.authorization;

  if (!requestToken) {
    return response.status(401).json({ message: 'Missing token.' });
  }

  try {
    const [, token] = requestToken.split(' ');
    const decoded = decodeToken(token) as IToken;
    request.user = {
      id: decoded.sub,
    };
    next();
  } catch (error) {
    throw Error('Invalid token!');
  }
};

export default isAuthorized;
