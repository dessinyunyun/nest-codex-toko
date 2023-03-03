import { Module } from '@nestjs/common';
import { OrderDetailService } from './order_detail.service';
import { OrderDetailController } from './order_detail.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { order_detail } from 'models';

@Module({
  imports: [SequelizeModule.forFeature([order_detail])],
  controllers: [OrderDetailController],
  providers: [OrderDetailService],
})
export class OrderDetailModule {}
