import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { product, product_category } from 'models';

import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ProductService {
  async findProduct(id) {
    try {
      const findProduct = await product.findOne({
        where: { id },
        include: [
          {
            model: product_category,
            attributes: ['name', 'description'],
            as: 'category',
          },
        ],
      });

      if (!findProduct) {
        throw new HttpException(`product not exist`, HttpStatus.BAD_REQUEST);
      }

      return findProduct;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getImage(filename, res) {
    try {
      res.sendFile(path.join(process.cwd(), 'uploads/product', filename));
    } catch (error) {}
  }

  deleteImgInFile(imgPath) {
    fs.unlink(imgPath, (err) => {
      if (err) {
        console.log(err);
        return;
      }

      console.log('File successfully delete/update');
    });
  }

  async create(createProductDto: CreateProductDto) {
    console.log(createProductDto);
    try {
      if (!createProductDto) {
        throw new HttpException('Invalid input', HttpStatus.BAD_REQUEST);
      }
      if (createProductDto.image) {
        createProductDto.image;
      }
      return (await product).create(createProductDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      return (await product).findAll({
        include: [
          {
            model: product_category,
            attributes: ['name', 'description'],
            as: 'category',
          },
        ],
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number) {
    try {
      const theProduct = this.findProduct(id);
      return theProduct;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const findProduct = await this.findProduct(id);

      if (findProduct.image) {
        const imagePath = path.join(
          __dirname,
          '../../../uploads/product',
          findProduct.image,
        );
        console.log(imagePath);
        this.deleteImgInFile(imagePath);
      }

      const result = (await findProduct).update(updateProductDto);
      console.log(await result);
      return await result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    try {
      const theProduct = await this.findProduct(id);

      if (theProduct.image) {
        const imagePath = path.join(
          __dirname,
          '../../../uploads/product',
          theProduct.image,
        );
        console.log(imagePath);
        this.deleteImgInFile(imagePath);
      }
      theProduct.destroy();
      return `berhasil menghapus product dengan id ${id}`;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
