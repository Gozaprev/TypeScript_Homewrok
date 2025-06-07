import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../usres/usres.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findByUsername(username);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }
        // return user data without password
        const { password: _, ...result } = user;
        return result;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    // async register(createUserDto: any) {
    //     // add extra checks here (e.g., unique username/email)
    //     const user = await this.usersService.create(createUserDto);
    //     const { password, ...result } = user;
    //     return result;
    // }

    async register(createUserDto: any) {
        // Check if username already exists
        const existingUserByUsername = await this.usersService.findByUsername(createUserDto.username);
        if (existingUserByUsername) {
            throw new BadRequestException('Username already taken');
        }

        // Check if email already exists
        const existingUserByEmail = await this.usersService.findByEmail(createUserDto.email);
        if (existingUserByEmail) {
            throw new BadRequestException('Email already registered');
        }

        // Create user
        const user = await this.usersService.create(createUserDto);
        const { password, ...result } = user;
        return result;
    }


}
