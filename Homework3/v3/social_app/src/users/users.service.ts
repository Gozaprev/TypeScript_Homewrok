// Old code

// import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
// import { v4 as uuidv4 } from 'uuid';
// const id = uuidv4(); 

// export interface User {
//     id: string;  
//     name: string;
//     email: string;
//     role: string;
// }


// @Injectable()
// export class UsersService {
//     private users: User[] = [
//         { id: uuidv4(), name: "John Johnson", email: "john@mail.com", role: "moderator" },
//         { id: uuidv4(), name: "Bob Bobski", email: "bob@mail.com", role: "admin" },
//         { id: uuidv4(), name: "Jane Janeson", email: "jane@mail.com", role: "user" }
//     ];
//     //private idCounter = 1;

//     getAll(): User[] {
//         return this.users;
//     }

//     getById(id: string): User {
//         const user = this.users.find(user => user.id === id);
//         if (!user) {
//             throw new NotFoundException(`User with ID ${id} not found`);
//         }
//         return user;
//     }

//     exists(id: string): boolean {
//         return this.users.some(u => u.id === id);
//       }


//     create(user: User) {

//         const { name, email, role } = user;
//         if (this.users.some(u => u.email === email)) {
//             throw new Error('Email exists');
//         }

//         // const newUser: User = { id: uuidv4(), name, email, role };
//         // this.users.push(newUser);
//         // return newUser;


//             //const id = user.id ?? uuidv4();  // generate if not provided
//             const newUser: User = { ...user };
//             this.users.push(newUser);
//             return newUser;



//     }

//     update(id: string, updateData: Partial<User>) {

//         const userIndex = this.users.findIndex(user => user.id === id);
//         if (userIndex === -1) {
//             throw new NotFoundException(`User with ID ${id} not found`);
//         }

//         if (updateData.email && this.users.some(u =>
//             u.email === updateData.email && u.id !== id)) {
//             throw new ConflictException('Email already exists');
//         }

//         const updatedUser = {
//             ...this.users[userIndex],
//             ...updateData,
//             id // Ensure ID remains unchanged
//         };


//         this.users[userIndex] = updatedUser;
//         return updatedUser;
//     }

//     // remove(id: number): void {
//     //     const userIndex = this.users.findIndex(user => user.id === id);
//     //     if (userIndex === -1) {
//     //         throw new NotFoundException(`User with ID ${id} not found`);
//     //     }
//     //     this.users.splice(userIndex, 1);
//     // }

//     delete(id: string): boolean {
//         const initialLength = this.users.length;
//         this.users = this.users.filter((user) => user.id !== id);
//         return this.users.length !== initialLength;
//     }

//     isEmailTaken(email: string, excludeId?: string): boolean {
//         return this.users.some(
//             (user) => user.email === email && user.id !== excludeId,
//         );
//     }


// }

// A bit improved code

import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

@Injectable()
export class UsersService {
    private users: User[] = [
        { id: uuidv4(), name: "John Johnson", email: "john@mail.com", role: "moderator" },
        { id: uuidv4(), name: "Bob Bobski", email: "bob@mail.com", role: "admin" },
        { id: uuidv4(), name: "Jane Janeson", email: "jane@mail.com", role: "user" }
    ];

    getAll(): User[] {
        return this.users;
    }

    getById(id: string): User {
        const user = this.users.find(user => user.id === id);
        if (!user) throw new NotFoundException(`User with ID ${id} not found`);
        return user;
    }

    create(data: Omit<User, 'id'>): User {
        if (this.isEmailTaken(data.email)) {
            throw new ConflictException('Email already exists');
        }
        const newUser: User = { ...data, id: uuidv4() };
        this.users.push(newUser);
        return newUser;
    }

    update(id: string, updateData: Partial<Omit<User, 'id'>>): User {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1) throw new NotFoundException(`User with ID ${id} not found`);
        if (updateData.email && this.isEmailTaken(updateData.email, id)) {
            throw new ConflictException('Email already exists');
        }
        const updatedUser = { ...this.users[userIndex], ...updateData, id };
        this.users[userIndex] = updatedUser;
        return updatedUser;
    }

    delete(id: string): boolean {
        const initialLength = this.users.length;
        this.users = this.users.filter(user => user.id !== id);
        return this.users.length !== initialLength;
    }

    isEmailTaken(email: string, excludeId?: string): boolean {
        return this.users.some(user => user.email === email && user.id !== excludeId);
    }
}
