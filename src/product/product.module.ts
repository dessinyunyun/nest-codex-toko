import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { product } from 'models';
import { TestMiddleWare } from 'src/middleware/validate-customer';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt-config';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    JwtModule.register(jwtConfig),
    SequelizeModule.forFeature([product]),
    MulterModule.register({
      dest: 'uploads',
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
// export class ProductModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(TestMiddleWare).forRoutes(ProductController, {
//       path: 'auth/checkauth',
//       method: RequestMethod.GET,
//     });
//   }
// }
export class ProductModule {}
