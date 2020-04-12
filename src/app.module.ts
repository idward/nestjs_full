import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/product.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { ProductController } from './products/product.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: '!dwardlu0',
      database: 'nestDB',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      dropSchema: true,
      logging: null,
      logger: 'simple-console'
    }),
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private connection: Connection){ 
    console.log('database connection status: ', connection.isConnected);
  }

  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes({path: 'product/*', method: RequestMethod.GET});
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'products/(.*)', method: RequestMethod.GET })
      .forRoutes(ProductController);
  }
}
