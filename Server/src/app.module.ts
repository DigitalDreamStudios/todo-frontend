import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './modules/todo/todo.module';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseConfig } from './config/database.config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TodoModule,
    UserModule,
    AuthModule,
    MongooseModule.forRoot(databaseConfig.uri),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
