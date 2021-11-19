import { AuthModule } from './authentication/auth.module';
import { AuthController } from './authentication/auth.controller';
import { ProductModule } from './modules/product/product.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ProductModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DBCONNECTIONURL, {
      useNewUrlParser: true,
    }),
  ],
  controllers: [AuthController, AppController],
  providers: [AppService],
})
export class AppModule {}
