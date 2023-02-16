import {Controller} from '../../common/controller/controller.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {NextFunction, Request, Response} from 'express';
import CreateUserDto from './dto/create-user.dto.js';
import {UserServiceInterface} from './user-service.interface.js';
import {ConfigInterface} from '../../common/config/config.interface.js';
import HttpError from '../../common/errors/http-error.js';
import {StatusCodes} from 'http-status-codes';
import {createJWT, fillDTO, isEmpty1cRes} from '../../utils/common.js';
import UserResponse from './response/user.response.js';
import {JWT_ALGORITHM} from './user.constant.js';
import LoggedUserDto from './dto/logged-user.dto.js';
import LoginUserDto from './dto/login-user.dto.js';
import CheckEmailDto from './dto/check-email.dto.js';
import got from 'got';

@injectable()
export default class UserController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.UserServiceInterface) private readonly userService: UserServiceInterface,
    @inject(Component.ConfigInterface) private readonly configService: ConfigInterface
  ) {
    super(logger);
    this.logger.info('Register routes for UserController...');

    this.addRoute({path: '/register', method: HttpMethod.Post, handler: this.create});
    this.addRoute({path: '/login', method: HttpMethod.Post, handler: this.login});
    this.addRoute({path: '/login', method: HttpMethod.Get, handler: this.checkAuthenticate});
    this.addRoute({path: '/check-user', method: HttpMethod.Post, handler: this.checkRegistration});
  }

  public async create({body}: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>, res: Response, _next: NextFunction): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email ${body.email} exists.`,
        'UserController'
      )
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.send(
      res,
      StatusCodes.CREATED,
      fillDTO(UserResponse, result)
    );
  }

  public async login({body}: Request<Record<string, unknown>, Record<string, unknown>, LoginUserDto>, res: Response, _next: NextFunction): Promise<void> {
    const user = await this.userService.verifyUser(body, this.configService.get('SALT'));

    if (!user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `Unauthorized`,
        'UserController'
      );
    }

    const token = await createJWT(
      JWT_ALGORITHM,
      this.configService.get('JWT_SECRET'),
      {email: user.email, userId1c: user.userId1c, userId: user.id}
    )

    this.ok(res, fillDTO(LoggedUserDto, {email: user.email, name: user.name, userId1c: user.userId1c, token}))
  }

  public async checkAuthenticate(req: Request, res: Response) {
    const user = await this.userService.findByEmail(req.user.email);

    this.ok(res, fillDTO(LoggedUserDto, user));
  }

  public async checkRegistration({body}: Request<Record<string, unknown>, Record<string, unknown>, CheckEmailDto>, res: Response, _next: NextFunction): Promise<void> {
    const user = await this.userService.findByEmail(body.email);
    const url = this.configService.get('URL_1C_USER');
    const auth1c = this.configService.get('AUTHORIZATION_PHRASE_1C');

    if (!user) {
      try {
        const {body: user1c} = await got.get(`${url}${body.email}`, {
          headers: {
            'Authorization' : `${auth1c}`
          }
        });
        if (isEmpty1cRes(user1c)) {
          res
            .type('application/json')
            .status(StatusCodes.NON_AUTHORITATIVE_INFORMATION)
            .send(user1c);
        } else {
          res
            .type('application/json')
            .status(StatusCodes.NOT_FOUND)
            .send('No such user in 1c');
        }
      } catch {
        throw new HttpError(
          StatusCodes.BAD_REQUEST,
          `Can't connect to 1c server`,
          'UserController'
        );
      }
    }

    this.ok(res, fillDTO(UserResponse, user));
  }
}