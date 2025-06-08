// Old code:

// import { Controller } from '@nestjs/common';

// @Controller('users')
// export class UsersController {}

// import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
// import { UsersService, User } from './users.service';

// @Controller('users')
// export class UsersController {
//   constructor(private readonly usersService: UsersService) {}

//   @Post()
//   create(@Body() createUserDto: { name: string; email: string; role: string }): User {
//     return this.usersService.create(createUserDto.name, createUserDto.email, createUserDto.role);
//   }

//   @Get()
//   findAll(): User[] {
//     return this.usersService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: number): User {
//     return this.usersService.findOne(id);
//   }

//   @Put(':id')
//   update(@Param('id') id: number, @Body() updateUserDto: { name: string; email: string; role: string }): User {
//     return this.usersService.update(id, updateUserDto.name, updateUserDto.email, updateUserDto.role);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: number): void {
//     this.usersService.remove(id);
//   }
// }






// import { Controller, Get, Post, Put, Delete, Param, Res, Body } from '@nestjs/common';
// import { UsersService } from './users.service';
// import { Response } from 'express';
// import { CommonService } from 'src/common/common.service';
// import { v4 as uuidv4 } from 'uuid';
// const id = uuidv4(); 



// @Controller('users')
// export class UsersController {

//     constructor(
//         private usersService: UsersService,
//         private commonService: CommonService
//     ) { }

//     @Get()
//     listUsers() {
//         return this.usersService.getAll()
//     }

//     @Get(':id')
//     getDetails(@Param('id') id: string, @Res() response: Response) {
//         const userID = id;

//         const isIdInvalid = !this.commonService.validateUUID(userID);

//         if (isIdInvalid) {
//             return response.status(400).send({ message: 'Negative numbers cannot be used as id.' })
//         }
//         const user = this.usersService.getById(`${userID}`);

//         if (!user) {
//             return response.status(404).send({ message: `User with id: ${userID} does not exist.` })
//         }

//         return response.send(user)
//     }


//     @Post()
//     createUser(@Body() body: any, @Res() response: Response) {
//         const { name, email, role } = body;

//         // Manual validation
//         if (!name || typeof name !== 'string') {
//             return response.status(400).send({ message: 'Name is required.' });
//         }
//         if (!email || typeof email !== 'string' || !this.commonService.validateEmail(email)) {
//             return response.status(400).send({ message: 'Valid email is required.' });
//         }
//         if (!role || typeof role !== 'string') {
//             return response.status(400).send({ message: 'Role is required.' });
//         }
//         if (this.usersService.isEmailTaken(email)) {
//             return response.status(400).send({
//                 message: `Email '${email}' is already registered`,
//             });
//         }

//         const newUser = this.usersService.create({ id, name, email, role });
//         return response.status(201).send(newUser);
//     }

//     @Put(':id')
//     updateUser(
//         @Param('id') id: string,
//         @Body() body: any,
//         @Res() response: Response,
//     ) {
//         const userID = id;

//         if (!this.commonService.validateUUID(userID)) {
//             return response.status(400).send({
//                 message: 'Negative numbers cannot be used as id.',
//             });
//         }

//         const existingUser = this.usersService.getById(`${userID}`);


//         if (!existingUser) {
//             return response.status(404).send({
//                 message: `User with id: ${userID} does not exist.`,
//             });
//         }

//         const { name, email, role } = body;

//         if (email && (!this.commonService.validateEmail(email) || this.usersService.isEmailTaken(email, userID))) {
//             return response.status(400).send({
//                 message: `Email '${email}' is invalid or already registered`,
//             });
//         }

//         const updatedUser = this.usersService.update(userID.toString(), { name, email, role });
//         return response.send(updatedUser);
//     }

//     @Delete(':id')
//     deleteUser(@Param('id') id: string, @Res() response: Response) {
//         const userID = id;

//         if (!this.commonService.validateUUID(userID)) {
//             return response.status(400).send({
//                 message: 'Negative numbers cannot be used as id.',
//             });
//         }

//         const deleteResult = this.usersService.delete(userID);
//         if (!deleteResult) {
//             return response.status(404).send({
//                 message: `User with id: ${userID} does not exist.`,
//             });
//         }

//         return response.status(204).send();
//     }

// }

// A bit improved code

import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    BadRequestException,
    NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';

// Helper for DRY validation logic
function validateUserInput(
    { name, email, role },
    usersService: UsersService,
    excludeId?: string
) {
    if (!name || typeof name !== 'string') {
        throw new BadRequestException('Name is required.');
    }
    if (!email || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
        throw new BadRequestException('Valid email is required.');
    }
    if (!role || typeof role !== 'string') {
        throw new BadRequestException('Role is required.');
    }
    if (usersService.isEmailTaken(email, excludeId)) {
        throw new BadRequestException(`Email '${email}' is already registered`);
    }
}

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get()
    listUsers() {
        return this.usersService.getAll();
    }

    @Get(':id')
    getDetails(@Param('id') id: string) {
        return this.usersService.getById(id);
    }

    @Post()
    createUser(@Body() body: { name: string; email: string; role: string }) {
        validateUserInput(body, this.usersService);
        return this.usersService.create(body);
    }

    @Put(':id')
    updateUser(
        @Param('id') id: string,
        @Body() body: { name?: string; email?: string; role?: string }
    ) {
        // Throws NotFoundException if user does not exist
        this.usersService.getById(id);

        // Only validate email uniqueness if email is being updated
        if (body.email) {
            validateUserInput(
                { ...this.usersService.getById(id), ...body },
                this.usersService,
                id
            );
        }

        return this.usersService.update(id, body);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        const deleted = this.usersService.delete(id);
        if (!deleted) {
            throw new NotFoundException(`User with id: ${id} does not exist.`);
        }
        return { message: 'User deleted successfully.' };
    }
}
