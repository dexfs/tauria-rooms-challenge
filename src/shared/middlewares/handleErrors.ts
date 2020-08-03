import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'express-validation';
import { GeneralError } from '@shared/utils/errors';

export default (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
): void | Response => {
  if (err instanceof GeneralError) {
    return res.status(err.getCode()).json({
      status: err.name,
      message: err.message,
    });
  }

  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }

  return res.status(500).json({
    status: 'error',
    message: err.message,
  });
  next(err);
};
