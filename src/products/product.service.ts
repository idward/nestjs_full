import { Injectable } from '@nestjs/common';
// import { Product } from './interface/product.model';
// import { Observable, of } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Product, UpdateProduct, ProductDetail } from './dto/product.dto';
import { ProductEntity } from './entity/product.entity';
import { ProductDetailEntity } from './entity/product-detail.entity';

@Injectable()
export class ProductService {
  // products: Array<Product> = [
  //   { id: 1, name: 'One Plus 7', qty: 1, price: 48000 },
  //   { id: 2, name: 'I Phone X', qty: 2, price: 64999 },
  // ];

  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    @InjectRepository(ProductDetailEntity)
    private productDetailsRepository: Repository<ProductDetailEntity>,
  ) {}

  getProducts(): Promise<ProductEntity[]> {
    return this.productRepository.find({ relations: ['productDetail'] });
  }

  getProduct(id: number): Promise<ProductEntity> {
    return this.productRepository.findOne(id, { relations: ['productDetail'] });
  }

  async updateProduct(id: number, updated: UpdateProduct): Promise<any> {
    const product = await this.productRepository.findOne(id, {
      relations: ['productDetail'],
    });
    const updatedProduct = await this.productRepository.merge(product, updated);
    await this.productRepository.save(updatedProduct);
    if (updated.productDetail) {
      const productDetail = await this.productDetailsRepository.findOne(product.productDetail.id);
      const updatedProductDetail = await this.productDetailsRepository.merge(
        productDetail,
        updated.productDetail,
      );
      await this.productDetailsRepository.save(updatedProductDetail);
    }
    return { msg: 'updated successfully' };
  }

  async addProduct(product: Product): Promise<ProductEntity> {
    const productDetail = new ProductDetailEntity();
    productDetail.partNumber = product.productDetail.partNumber;
    productDetail.dimension = product.productDetail.dimension;
    productDetail.weight = product.productDetail.weight;
    productDetail.manufacturer = product.productDetail.manufacturer;
    productDetail.origin = product.productDetail.origin;
    // await this.productDetailsRepository.save(productDetail);

    const newProduct = new ProductEntity();
    newProduct.name = product.name;
    newProduct.qty = product.qty;
    newProduct.price = product.price;
    newProduct.productDetail = productDetail;
    return this.productRepository.save(newProduct);
  }

  async deleteProduct(productId: number): Promise<any> {
    const deletedProduct = await this.getProduct(productId);
    await Promise.all([
      await this.productRepository.delete(productId),
      await this.productDetailsRepository.delete(
        deletedProduct.productDetail.id,
      ),
    ]);
    return {
      msg: `product deleted with ${productId} and productDetail deleted with ${deletedProduct.productDetail.id}`,
    };
  }
}
