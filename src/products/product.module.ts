import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductEntity } from './entity/product.entity';
import { ProductDetailEntity } from './entity/product-detail.entity';
// import { ValidatePipe } from 'src/common/pipe/validate.pipe';

@Module({
  imports: [
    //   ValidatePipe
    TypeOrmModule.forFeature([ProductEntity, ProductDetailEntity]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
