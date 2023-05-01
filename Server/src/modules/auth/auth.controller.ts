import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateLoginDto } from './dto/login.auth.dto';

/**
 * A controller responsible for handling authentication-related requests
 */
@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    /**
     * Endpoint for logging in a user
     *
     * @param {CreateLoginDto} createLoginDto - An object containing the user's login credentials
     * @returns A Promise that resolves to an object containing a JSON Web Token and the user's information
     */
    @Post('login')
    async login(@Body() createLoginDto: CreateLoginDto) {
        return this.authService.login(createLoginDto);
    }
}
