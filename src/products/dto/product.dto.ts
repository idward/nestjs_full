import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsInt,
  IsObject,
  ValidateNested,
} from 'class-validator';

export class ProductDetail {
  @IsNotEmpty()
  @IsString()
  readonly partNumber: string;
  @IsNotEmpty()
  @IsNumber()
  readonly dimension: number;
  @IsNotEmpty()
  @IsNumber()
  readonly weight: number;
  @IsNotEmpty()
  @IsString()
  readonly manufacturer: string;
  @IsNotEmpty()
  @IsString()
  readonly origin: string;
}

export class Product {
  // @IsNotEmpty()
  // @IsNumber()
  // readonly id: number;
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @IsNotEmpty()
  @IsInt()
  readonly qty: number;
  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @ValidateNested()
  readonly productDetail: ProductDetail;
}

export class UpdateProductDetail {
  @IsOptional()
  @IsString()
  readonly partNumber: string;
  @IsOptional()
  @IsNumber()
  readonly dimension: number;
  @IsOptional()
  @IsNumber()
  readonly weight: number;
  @IsOptional()
  @IsString()
  readonly manufacturer: string;
  @IsOptional()
  @IsString()
  readonly origin: string;
}

export class UpdateProduct {
  @IsOptional()
  @IsString()
  readonly name: string;
  @IsOptional()
  @IsInt()
  readonly qty: number;
  @IsOptional()
  @IsNumber()
  readonly price: number;

  @IsOptional()
  @IsObject()
  readonly productDetail: UpdateProductDetail
}
