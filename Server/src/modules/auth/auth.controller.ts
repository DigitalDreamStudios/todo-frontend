import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateLoginDto } from './dto/login.auth.dto';

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() createLoginDto: CreateLoginDto) {
        return this.authService.login(createLoginDto);
    }
}
