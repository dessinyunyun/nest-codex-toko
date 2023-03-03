import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { customer, user } from 'models';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(customer) private customerModel: typeof customer,
    private sequelize: Sequelize,
  ) {}

  async findCustomer(id) {
    const cust = await customer.findOne({
      where: { id },
      include: [{ model: user }],
    });
    if (!cust) {
      throw new HttpException(
        `customer with id ${id} is not exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return cust;
  }

  async create(createCustomerDto: CreateCustomerDto) {
    try {
      const existingCustomer = await customer.findOne({
        where: { user_id: createCustomerDto.user_id },
      });
      if (existingCustomer) {
        throw new HttpException(
          'User ID telah dipakai pada customer lain',
          HttpStatus.BAD_REQUEST,
        );
      }
      return (await customer).create(createCustomerDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      return (await customer).findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number) {
    try {
      const cust = this.findCustomer(id);

      return cust;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const cust = this.findCustomer(id);
    return (await cust).update(updateCustomerDto);
  }

  async remove(id: number) {
    try {
      const cust = this.findCustomer(id);

      (await cust).destroy();
      return 'berhasil menghapus customer';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getViewsorderdetail() {
    try {
      const result = await this.sequelize.query(
        'select * from "productpercategory"',
      );

      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getCustomerOrderDetail() {
    try {
      const result = await this.sequelize.query(
        'select * from "customer_order_detail"',
      );
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
