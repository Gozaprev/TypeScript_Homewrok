// Old code:

// import { Injectable, NotFoundException } from '@nestjs/common';
// import { Room } from './room.entity';

// @Injectable()
// export class RoomsService {
//     private rooms: Room[] = [];

//     create(room: Room): Room {
//         this.rooms.push(room);
//         return room;
//     }

//     findAll(): Room[] {
//         return this.rooms;
//     }

//     findOne(roomNumber: number): Room {
//         const room = this.rooms.find(room => room.roomNumber === roomNumber);
//         if (!room) {
//             throw new NotFoundException(`Room with number ${roomNumber} not found`);
//         }
//         return room;
//     }

//     update(roomNumber: number, updatedRoom: Partial<Room>): Room {
//         const roomIndex = this.rooms.findIndex(room => room.roomNumber === roomNumber);
//         if (roomIndex === -1) {
//             throw new NotFoundException(`Room with number ${roomNumber} not found`);
//         }
//         this.rooms[roomIndex] = { ...this.rooms[roomIndex], ...updatedRoom };
//         return this.rooms[roomIndex];
//     }

//     remove(roomNumber: number): void {
//         const roomIndex = this.rooms.findIndex(room => room.roomNumber === roomNumber);
//         if (roomIndex === -1) {
//             throw new NotFoundException(`Room with number ${roomNumber} not found`);
//         }
//         this.rooms.splice(roomIndex, 1);
//     }
// }



// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository, Between, FindOptionsWhere } from 'typeorm';
// import { Room } from './room.entity';
// import { RoomType } from './room-type.enum';

// @Injectable()
// export class RoomsService {
//     constructor(
//         @InjectRepository(Room)
//         private readonly roomRepository: Repository<Room>,
//     ) { }

//     async create(roomData: Partial<Room>): Promise<Room> {
//         const room = this.roomRepository.create(roomData);
//         return this.roomRepository.save(room);
//     }

//     async findAll(filters?: {
//         roomNumber?: number;
//         type?: RoomType;
//         minPrice?: number;
//         maxPrice?: number;
//         isAvailable?: boolean;
//     }): Promise<Room[]> {
//         const where: FindOptionsWhere<Room> = {};

//         if (filters) {
//             if (filters.roomNumber !== undefined) {
//                 where.roomNumber = filters.roomNumber;
//             }
//             if (filters.type !== undefined) {
//                 where.type = filters.type;
//             }
//             if (filters.isAvailable !== undefined) {
//                 where.isAvailable = filters.isAvailable;
//             }
//             if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
//                 where.price = Between(filters.minPrice, filters.maxPrice);
//             } else if (filters.minPrice !== undefined) {
//                 where.price = Between(filters.minPrice, 1000);
//             } else if (filters.maxPrice !== undefined) {
//                 where.price = Between(50, filters.maxPrice);
//             }
//         }

//         return this.roomRepository.find({ where });
//     }

//     async findOne(roomNumber: number): Promise<Room> {
//         const room = await this.roomRepository.findOneBy({ roomNumber });
//         if (!room) {
//             throw new NotFoundException(`Room with number ${roomNumber} not found`);
//         }
//         return room;
//     }

//     async update(roomNumber: number, updatedRoom: Partial<Room>): Promise<Room> {
//         const room = await this.findOne(roomNumber);
//         Object.assign(room, updatedRoom);
//         return this.roomRepository.save(room);
//     }

//     async remove(roomNumber: number): Promise<void> {
//         const room = await this.findOne(roomNumber);
//         await this.roomRepository.remove(room);
//     }
// }


// Corrected code:

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, FindOptionsWhere } from 'typeorm';
import { Room } from './room.entity';
import { RoomType } from './room-type.enum';

@Injectable()
export class RoomsService {
    constructor(
        @InjectRepository(Room)
        private readonly roomRepository: Repository<Room>,
    ) { }

    async create(roomData: Partial<Room>): Promise<Room> {
        const room = this.roomRepository.create(roomData);
        return this.roomRepository.save(room);
    }

    async findAll(filters?: {
        roomNumber?: number;
        type?: RoomType;
        minPrice?: number;
        maxPrice?: number;
        isAvailable?: boolean;
    }): Promise<Room[]> {
        const where: FindOptionsWhere<Room> = {};

        if (filters) {
            if (filters.roomNumber !== undefined) {
                where.roomNumber = filters.roomNumber;
            }
            if (filters.type !== undefined) {
                where.type = filters.type;
            }
            if (filters.isAvailable !== undefined) {
                where.isAvailable = filters.isAvailable;
            }
            if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
                where.price = Between(filters.minPrice, filters.maxPrice);
            } else if (filters.minPrice !== undefined) {
                where.price = Between(filters.minPrice, 1000);
            } else if (filters.maxPrice !== undefined) {
                where.price = Between(50, filters.maxPrice);
            }
        }

        return this.roomRepository.find({ where });
    }

    async findOne(id: number): Promise<Room> {
        const room = await this.roomRepository.findOneBy({ id });
        if (!room) {
            throw new NotFoundException(`Room with id ${id} not found`);
        }
        return room;
    }

    async update(id: number, updatedRoom: Partial<Room>): Promise<Room> {
        const room = await this.findOne(id);
        Object.assign(room, updatedRoom);
        return this.roomRepository.save(room);
    }

    async remove(id: number): Promise<void> {
        const room = await this.findOne(id);
        await this.roomRepository.remove(room);
    }
}
