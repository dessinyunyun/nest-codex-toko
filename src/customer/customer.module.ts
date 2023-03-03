import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { customer } from 'models';
import { TestMiddleWare } from '../middleware/validate-customer';
import { jwtConfig } from 'src/config/jwt-config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register(jwtConfig),
    SequelizeModule.forFeature([customer]),
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TestMiddleWare).forRoutes(CustomerController);
  }
}
