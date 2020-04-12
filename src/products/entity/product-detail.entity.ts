import { PrimaryGeneratedColumn, Column, Entity, OneToOne } from 'typeorm';
import {ProductEntity} from './product.entity'

@Entity({ name: 'products-detail' })
export class ProductDetailEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;
  @Column()
  partNumber: string;
  @Column('smallint')
  dimension: number;
  @Column('float')
  weight: number;
  @Column()
  manufacturer: string;
  @Column()
  origin: string;

  @OneToOne(type => ProductEntity, product => product.productDetail)
  product: ProductEntity
}
