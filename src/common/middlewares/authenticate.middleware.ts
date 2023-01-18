import {MiddlewareInterface} from '../../types/middleware.interface.js';
import {NextFunction, Request, Response} from 'express';
import * as jose from 'jose';
import {createSecretKey} from 'crypto';
import HttpError from '../errors/http-error.js';
import {StatusCodes} from 'http-status-codes';

export class AuthenticateMiddleware implements MiddlewareInterface {
  constructor(private readonly jwtSecret: string) {}

  public async execute(req: Request, _res: Response, next: NextFunction): Promise<void> {
    const authorizationHeader = req.headers?.authorization?.split(' ');
    if (!authorizationHeader) {
      return next();
    }

    const [, token] = authorizationHeader;

    try {
      const {payload} = await jose.jwtVerify(token, createSecretKey(this.jwtSecret, 'utf-8'));
      req.user = {email: payload.email as string, userId1c: payload.userId1c as string, userId: payload.userId as string};

      return next();
    } catch {
      return next(new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Invalid token',
        'Authenticate Middleware'
      ));
    }
  }
}