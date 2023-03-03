import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TestMiddleWare implements NestMiddleware {
  constructor(@Inject(JwtService) private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        return res.status(403).send({ error: 'No Authentication' });
      }

      const decoded = await this.jwtService.verifyAsync(authorization);

      next();
    } catch (error) {
      if (error.message === 'invalid token') {
        return res.status(400).send({ error: error.message });
      }
      if (error.message === 'jwt expired') {
        return res.status(401).send({ error: 'token expired' });
      }
      return res.status(500).send({ error: error.message });
    }
  }
}
