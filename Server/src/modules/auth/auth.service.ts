import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateLoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) { }

    async login(createLoginDto: CreateLoginDto) {
        const payload = { email: createLoginDto.email };
            
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
