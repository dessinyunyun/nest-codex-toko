import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { user } from 'models';
import { TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    try {
      const { username, password } = loginAuthDto;
      const validateUser = await this.userService.validateUser(
        username,
        password,
      );

      if (!validateUser) {
        throw new HttpException(
          'Wrong email or password',
          HttpStatus.BAD_REQUEST,
        );
      }

      const acces_token = await this.createAccessToken(validateUser);

      return {
        mesagge: 'berhasil login',
        username,
        accesToken: acces_token,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.mesagge, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createAccessToken(user: user): Promise<string> {
    const payload = {
      sub: user.id,
    };

    const acces_token = await this.jwtService.signAsync(payload);

    return acces_token;
  }
}
