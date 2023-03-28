import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './modules/todo/todo.module';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [
    TodoModule,
    MongooseModule.forRoot(databaseConfig.uri),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
