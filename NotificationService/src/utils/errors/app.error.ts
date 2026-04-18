export interface IAppError extends Error {
  statusCode: number;
  isOperational: boolean;
}

export class AppError extends Error implements IAppError {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

/* ----------------------------------------------------
   1. Bad Request Error (400)
---------------------------------------------------- */
export class BadRequestError extends AppError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

/* ----------------------------------------------------
   2. Unauthorized Error (401)
---------------------------------------------------- */
export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

/* ----------------------------------------------------
   3. Forbidden Error (403)
---------------------------------------------------- */
export class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super(message, 403);
  }
}

/* ----------------------------------------------------
   4. Not Found Error (404)
---------------------------------------------------- */
export class NotFoundError extends AppError {
  constructor(message = "Resource Not Found") {
    super(message, 404);
  }
}
