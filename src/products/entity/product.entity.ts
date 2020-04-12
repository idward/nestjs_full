import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ProductDetailEntity } from './product-detail.entity';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  qty: number;
  @Column()
  price: number;

  @OneToOne(
    type => ProductDetailEntity,
    productDetail => productDetail.product,
    {
      // cascade: true,
      cascade: ['insert'],
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn()
  productDetail: ProductDetailEntity;
}
