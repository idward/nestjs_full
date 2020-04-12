import {
  Controller,
  Get,
  Post,
  // Res,
  Param,
  Body,
  // Query,
  // HttpException,
  // HttpStatus,
  // ForbiddenException,
  // ServiceUnavailableException,
  // NotImplementedException,
  // InternalServerErrorException,
  UseFilters,
  UsePipes,
  // Header,
  // Redirect,
  ValidationPipe,
  UseInterceptors,
  Put,
  Delete,
} from '@nestjs/common';
// import { Response } from 'express';
// import { Observable } from 'rxjs';
import { Product, UpdateProduct } from './dto/product.dto';
import { ProductService } from './product.service';
import { HttpExceptionFilter } from 'src/common/filter/httpException.filter';
import { TransformInterceptor } from 'src/common/interceptor/transform.interceptor';
import { UpdateResult } from 'typeorm';
import { ProductEntity } from './entity/product.entity';
// import { ValidatePipe } from 'src/common/pipe/validate.pipe';
// import { productSchema } from '../common/validate/product-validate.schema';
// import { Calculator } from 'src/common/class/calculator';

// @Controller('products')
@Controller({ path: 'products' })
@UseInterceptors(TransformInterceptor)
@UseFilters(HttpExceptionFilter)
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('getProducts')
  getProducts(): Promise<ProductEntity[]> {
    console.log('get all products');
    return this.productService.getProducts();
  }

  @Get('getProducts/:id')
  // @Redirect('https://www.google.com.hk', 301)
  getProduct(@Param() param: any): Promise<ProductEntity> {
    return this.productService.getProduct(+param.id);
    // if (version && +version === 5) {
    //   console.log('vvvv');
    //   return { url: 'https://www.baidu.com' };
    // }
    // return this.productService.getProduct(+param.id, version);
  }

  @Put('updateProducts/:id')
  @UsePipes(
    new ValidationPipe({
      // skipNullProperties: true,
      // skipUndefinedProperties: true,
      // skipMissingProperties: true,
    }),
  )
  updateProduct(
    @Param() param: any,
    @Body() updatedProduct: UpdateProduct,
  ): Promise<UpdateResult> {
    return this.productService.updateProduct(+param.id, updatedProduct);
  }

  @Post('addProduct')
  // @Header('Authorization', 'Bearer XXXXX123')
  @UsePipes(ValidationPipe)
  addProduct(@Body() body: Product): Promise<ProductEntity> {
    console.log('router handler run...');
    // throw new ForbiddenException({
    //   status: HttpStatus.FORBIDDEN,
    //   error: 'Forbidden',
    // });
    // throw new InternalServerErrorException();
    // throw new Error('server error');
    // throw new HttpException({status: HttpStatus.FORBIDDEN, error: 'Forbidden'}, HttpStatus.FORBIDDEN)
    // const cal = new Calculator();
    // cal.target = body.name;
    // console.log(cal.target);
    // console.log('cal:', cal.calculate(5));
    return this.productService.addProduct(body);
  }

  @Delete('deleteProducts/:id')
  removeProduct(@Param() param:any): Promise<any> {
    return this.productService.deleteProduct(+param.id);
  }
}
