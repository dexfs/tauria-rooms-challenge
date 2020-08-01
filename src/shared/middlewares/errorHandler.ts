import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ValidationError } from 'express-validation';

export default (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction,
): void | Response => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }

  next();
};
