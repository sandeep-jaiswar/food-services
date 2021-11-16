import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Param,
  NotFoundException,
  Post,
  Body,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { ValidateObjectId } from '../../core/pipes/validate-object-id.pipes';

@Controller('api/product')
export class ProductController {
  constructor(private service: ProductService) {}

  // Submit a post
  @Post('')
  async addProduct(@Res() res, @Body() createProductDTO: CreateProductDTO) {
    const newProduct = await this.service.addProduct(createProductDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Product has been submitted successfully!',
      product: newProduct,
    });
  }

  // Fetch a particular post using ID
  @Get(':id')
  async getProduct(@Res() res, @Param('id', new ValidateObjectId()) id) {
    const product = await this.service.getProduct(id);
    if (!product) {
      throw new NotFoundException('Product does not exist!');
    }
    return res.status(HttpStatus.OK).json(product);
  }

  // Fetch all products
  @Get('')
  async getProducts(@Res() res) {
    const products = await this.service.getProducts();
    return res.status(HttpStatus.OK).json(products);
  }

  @Put('')
  async editProduct(
    @Res() res,
    @Query('id', new ValidateObjectId()) id,
    @Body() createProductDTO: CreateProductDTO,
  ) {
    const editedProduct = await this.service.editProduct(id, createProductDTO);
    if (!editedProduct) {
      throw new NotFoundException('Product does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Product has been successfully updated',
      product: editedProduct,
    });
  }
  // Delete a product using ID
  @Delete('')
  async deleteProduct(@Res() res, @Query('id', new ValidateObjectId()) id) {
    const deletedProduct = await this.service.deleteProduct(id);
    if (!deletedProduct) {
      throw new NotFoundException('Product does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Product has been deleted!',
      product: deletedProduct,
    });
  }
}
