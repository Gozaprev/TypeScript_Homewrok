// Old:
// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class UsresService {}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    // async findByUsername(username: string): Promise<User | undefined> {
    //     return this.usersRepository.findOne({ where: { username } });
    // }

    async findByUsername(username: string): Promise<User | undefined> {
        const user = await this.usersRepository.findOne({ where: { username } });
        return user ?? undefined;
    }

    // async findByEmail(email: string): Promise<User | undefined> {
    //     return this.usersRepository.findOne({ where: { email } });
    // }

    async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.usersRepository.findOne({ where: { email } });
        return user ?? undefined;
    }

    // async findById(id: number): Promise<User | undefined> {
    //     return this.usersRepository.findOne({ where: { id } });
    // }

    async findById(id: number): Promise<User | undefined> {
        const user = await this.usersRepository.findOne({ where: { id } });
        return user ?? undefined;
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);

        const user = this.usersRepository.create({
            username: createUserDto.username,
            email: createUserDto.email,
            password: hashedPassword,
        });

        return this.usersRepository.save(user);
    }
}
