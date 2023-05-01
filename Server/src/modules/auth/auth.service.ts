import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateLoginDto } from './dto/login.auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/class/user';
import { Model } from 'mongoose';
import { findOneByEmail } from 'src/common/helpers/findOneByEmail.helper';
import { comparePassword } from 'src/common/helpers/comparePassword.helper';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectModel(User.name) private readonly userModel: Model<User>
    ) { }

    async login(createLoginDto: CreateLoginDto) {
        const { email, password } = createLoginDto;

        // Find a user by their email
        const findUser = await findOneByEmail(this.userModel, email);

        // Check if the provided password matches the user's stored password
        const checkPassword = await comparePassword(password, findUser.password)

        // Create a JWT payload using the user's email
        const payload = { userEmail: createLoginDto.email };

        // Return the user object and a signed JWT access token
        return {
            user: findUser,
            access_token: this.jwtService.sign(payload),
        };
    }
}
