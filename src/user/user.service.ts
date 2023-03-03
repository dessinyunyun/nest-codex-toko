import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { user } from 'models';
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(@InjectModel(user) private userModel: typeof user) {}

  async findUser(id: number): Promise<any> {
    const findUser = await this.userModel.findOne({
      where: { id },
    });

    console.log(findUser);
    if (!findUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return findUser;
  }

  async getUsers(): Promise<user[]> {
    return this.userModel.findAll();
  }

  async getUser(id: any): Promise<user> {
    const findUser = this.findUser(id);
    return findUser;
  }

  async createUser(userData: user) {
    try {
      const { username, password } = userData;
      const result = await this.userModel.create({
        username,
        password: bcrypt.hashSync(password, 8),
      });

      console.log(result);

      return result;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new HttpException(
          'Username sudah ada yg pny, km cari yg baru yh',
          HttpStatus.BAD_REQUEST,
        );
      }

      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUser(id: any, userData: user) {
    try {
      const { username, password } = userData;
      const findUser = this.findUser(id);

      return (await findUser).update({
        username,
        password: bcrypt.hashSync(password, 8),
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteUser(id: any) {
    try {
      const findUser = this.findUser(id);
      console.log(findUser);
      (await findUser).destroy();
      return 'berhasil menghapus user';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async validateUser(username: string, password: string): Promise<user> {
    try {
      const findUser = await user.findOne({
        where: { username },
      });

      if (!findUser) {
        throw new HttpException(
          'username tidak ditemukan',
          HttpStatus.BAD_REQUEST,
        );
      }

      const validPass = bcrypt.compareSync(password, findUser.password);
      if (!validPass) {
        throw new HttpException('password salah', HttpStatus.BAD_REQUEST);
      }

      return findUser;
    } catch (error) {}
  }
}
