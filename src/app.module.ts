import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [
    BlogModule,
    MongooseModule.forRoot(
      `mongodb+srv://SUPERUSER:SUPERUSER@cluster0.imsos.mongodb.net/FOODPOP?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
      },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
