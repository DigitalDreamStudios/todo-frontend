import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/schema/user.schema';
import { User } from '../user/class/user';

@Module({
    imports: [
        JwtModule.register({
            secret: 'secretKey',
            signOptions: { expiresIn: '1h' },
        }),
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema,
            }
        ])
    ],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule { }