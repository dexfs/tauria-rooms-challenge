/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */
class GeneralError extends Error {
  constructor(message: string) {
    super(message);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, GeneralError);
    }

    this.name = 'GeneralError';
    this.message = message;
  }

  getCode(): number {
    if (this instanceof BadRequest) {
      return 400;
    }

    if (this instanceof Unauthorized) {
      return 401;
    }

    if (this instanceof NotFound) {
      return 404;
    }
    return 500;
  }
}

class BadRequest extends GeneralError {}
class NotFound extends GeneralError {}
class Unauthorized extends GeneralError {
  constructor(message: string) {
    super(message);
    this.name = 'Unauthorized';
  }
}

export { GeneralError, BadRequest, NotFound, Unauthorized };
