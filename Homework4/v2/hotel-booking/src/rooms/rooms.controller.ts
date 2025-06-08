// Old code:

// import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
// import { RoomsService } from './rooms.service';
// import { RoomType } from './room-type.enum';
// import { Room } from './room.entity'
// import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

// @ApiTags('rooms')
// @Controller('rooms')
// export class RoomsController {
//     constructor(private readonly roomsService: RoomsService) { }

//     @Post()
//     @ApiOperation({ summary: 'Create a new room' })
//     @ApiResponse({ status: 201, description: 'The room has been successfully created.' })
//     create(@Body() room: Room): Room {
//         return this.roomsService.create(room);
//     }

//     @Get()
//     @ApiOperation({ summary: 'Get all rooms' })
//     @ApiResponse({ status: 200, description: 'List of rooms.' })
//     findAll(
//         @Query('roomNumber') roomNumber?: number,
//         @Query('type') type?: RoomType,
//         @Query('minPrice') minPrice?: number,
//         @Query('maxPrice') maxPrice?: number,
//         @Query('isAvailable') isAvailable?: boolean,
//     ): Room[] {
//         let rooms = this.roomsService.findAll();

//         // Filtering logic
//         if (roomNumber) {
//             rooms = rooms.filter(room => room.roomNumber === roomNumber);
//         }
//         if (type) {
//             rooms = rooms.filter(room => room.type === type);
//         }
//         if (minPrice) {
//             rooms = rooms.filter(room => room.price >= minPrice);
//         }
//         if (maxPrice) {
//             rooms = rooms.filter(room => room.price <= maxPrice);
//         }
//         if (isAvailable !== undefined) {
//             rooms = rooms.filter(room => room.isAvailable === isAvailable);
//         }

//         return rooms;
//     }

//     @Get(':roomNumber')
//     @ApiOperation({ summary: 'Get a room by room number' })
//     @ApiResponse({ status: 200, description: 'The room details.' })
//     findOne(@Param('roomNumber') roomNumber: number): Room {
//         return this.roomsService.findOne(roomNumber);
//     }

//     @Put(':roomNumber')
//     @ApiOperation({ summary: 'Update a room' })
//     @ApiResponse({ status: 200, description: 'The room has been successfully updated.' })
//     update(@Param('roomNumber') roomNumber: number, @Body() updatedRoom: Partial<Room>): Room {
//         return this.roomsService.update(roomNumber, updatedRoom);
//     }

//     @Delete(':roomNumber')
//     @ApiOperation({ summary: 'Delete a room' })
//     @ApiResponse({ status: 204, description: 'The room has been successfully deleted.' })
//     remove(@Param('roomNumber') roomNumber: number): void {
//         this.roomsService.remove(roomNumber);
//     }
// }





// import {
//     Controller,
//     Get,
//     Post,
//     Put,
//     Delete,
//     Param,
//     Body,
//     Query,
//     ParseIntPipe,
//     DefaultValuePipe,
//     ParseBoolPipe,
// } from '@nestjs/common';
// import {
//     ApiTags,
//     ApiOperation,
//     ApiQuery,
//     ApiResponse,
// } from '@nestjs/swagger';
// import { RoomsService } from './rooms.service';
// import { Room } from './room.entity';
// import { RoomType } from './room-type.enum';
// import { CreateRoomDto } from './dto/create-room.dto';
// import { UpdateRoomDto } from './dto/update-room.dto';

// @ApiTags('rooms')
// @Controller('rooms')
// export class RoomsController {
//     constructor(private readonly roomsService: RoomsService) { }

//     @Post()
//     @ApiOperation({ summary: 'Create a new room' })
//     @ApiResponse({ status: 201, description: 'Room created successfully', type: Room })
//     async create(@Body() createRoomDto: CreateRoomDto): Promise<Room> {
//         return this.roomsService.create(createRoomDto);
//     }

//     @Get()
//     @ApiOperation({ summary: 'Get all rooms with optional filters' })
//     @ApiQuery({ name: 'roomNumber', required: false, type: Number, description: 'Filter by room number' })
//     @ApiQuery({ name: 'type', required: false, enum: RoomType, description: 'Filter by room type' })
//     @ApiQuery({ name: 'minPrice', required: false, type: Number, description: 'Filter by minimum price' })
//     @ApiQuery({ name: 'maxPrice', required: false, type: Number, description: 'Filter by maximum price' })
//     @ApiQuery({ name: 'isAvailable', required: false, type: Boolean, description: 'Filter by availability' })
//     @ApiResponse({ status: 200, description: 'List of rooms', type: [Room] })
//     async findAll(
//         @Query('roomNumber', new DefaultValuePipe(null), ParseIntPipe) roomNumber?: number,
//         @Query('type') type?: RoomType,
//         @Query('minPrice', new DefaultValuePipe(null), ParseIntPipe) minPrice?: number,
//         @Query('maxPrice', new DefaultValuePipe(null), ParseIntPipe) maxPrice?: number,
//         @Query('isAvailable', new DefaultValuePipe(null), ParseBoolPipe) isAvailable?: boolean,
//     ): Promise<Room[]> {
//         const filters = {
//             roomNumber: roomNumber ?? undefined,
//             type,
//             minPrice: minPrice ?? undefined,
//             maxPrice: maxPrice ?? undefined,
//             isAvailable: isAvailable ?? undefined,
//         };
//         return this.roomsService.findAll(filters);
//     }

//     @Get(':roomNumber')
//     @ApiOperation({ summary: 'Get a room by room number' })
//     @ApiResponse({ status: 200, description: 'Room details', type: Room })
//     async findOne(@Param('roomNumber', ParseIntPipe) roomNumber: number): Promise<Room> {
//         return this.roomsService.findOne(roomNumber);
//     }

//     @Put(':roomNumber')
//     @ApiOperation({ summary: 'Update a room by room number' })
//     @ApiResponse({ status: 200, description: 'Updated room', type: Room })
//     async update(
//         @Param('roomNumber', ParseIntPipe) roomNumber: number,
//         @Body() updateRoomDto: UpdateRoomDto,
//     ): Promise<Room> {
//         return this.roomsService.update(roomNumber, updateRoomDto);
//     }

//     @Delete(':roomNumber')
//     @ApiOperation({ summary: 'Delete a room by room number' })
//     @ApiResponse({ status: 204, description: 'Room deleted' })
//     async remove(@Param('roomNumber', ParseIntPipe) roomNumber: number): Promise<void> {
//         return this.roomsService.remove(roomNumber);
//     }
// }

// Corrected code:

import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    Query,
    ParseIntPipe,
    BadRequestException,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiQuery,
    ApiResponse,
} from '@nestjs/swagger';
import { RoomsService } from './rooms.service';
import { Room } from './room.entity';
import { RoomType } from './room-type.enum';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@ApiTags('rooms')
@Controller('rooms')
export class RoomsController {
    constructor(private readonly roomsService: RoomsService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new room' })
    @ApiResponse({ status: 201, description: 'Room created successfully', type: Room })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    async create(@Body() createRoomDto: CreateRoomDto): Promise<Room> {
        return this.roomsService.create(createRoomDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all rooms with optional filters' })
    @ApiQuery({ name: 'roomNumber', required: false, type: Number, description: 'Filter by room number' })
    @ApiQuery({ name: 'type', required: false, enum: RoomType, description: 'Filter by room type' })
    @ApiQuery({ name: 'minPrice', required: false, type: Number, description: 'Filter by minimum price' })
    @ApiQuery({ name: 'maxPrice', required: false, type: Number, description: 'Filter by maximum price' })
    @ApiQuery({ name: 'isAvailable', required: false, type: Boolean, description: 'Filter by availability' })
    @ApiResponse({ status: 200, description: 'List of rooms', type: [Room] })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    async findAll(
        @Query('roomNumber') roomNumber?: string,
        @Query('type') type?: RoomType,
        @Query('minPrice') minPrice?: string,
        @Query('maxPrice') maxPrice?: string,
        @Query('isAvailable') isAvailable?: string,
    ): Promise<Room[]> {
        // Manual parsing with validation to avoid pipe errors on optional params
        const filters: any = {};

        if (roomNumber !== undefined) {
            const parsedRoomNumber = parseInt(roomNumber, 10);
            if (isNaN(parsedRoomNumber)) {
                throw new BadRequestException('roomNumber must be a number');
            }
            filters.roomNumber = parsedRoomNumber;
        }

        if (type !== undefined) {
            if (!Object.values(RoomType).includes(type as RoomType)) {
                throw new BadRequestException(`type must be one of: ${Object.values(RoomType).join(', ')}`);
            }
            filters.type = type as RoomType;
        }

        if (minPrice !== undefined) {
            const parsedMinPrice = parseInt(minPrice, 10);
            if (isNaN(parsedMinPrice)) {
                throw new BadRequestException('minPrice must be a number');
            }
            filters.minPrice = parsedMinPrice;
        }

        if (maxPrice !== undefined) {
            const parsedMaxPrice = parseInt(maxPrice, 10);
            if (isNaN(parsedMaxPrice)) {
                throw new BadRequestException('maxPrice must be a number');
            }
            filters.maxPrice = parsedMaxPrice;
        }

        if (isAvailable !== undefined) {
            if (isAvailable.toLowerCase() === 'true') {
                filters.isAvailable = true;
            } else if (isAvailable.toLowerCase() === 'false') {
                filters.isAvailable = false;
            } else {
                throw new BadRequestException('isAvailable must be a boolean (true or false)');
            }
        }

        return this.roomsService.findAll(filters);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a room by ID' })
    @ApiResponse({ status: 200, description: 'Room details', type: Room })
    @ApiResponse({ status: 404, description: 'Room not found' })
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Room> {
        return this.roomsService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a room by ID' })
    @ApiResponse({ status: 200, description: 'Updated room', type: Room })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 404, description: 'Room not found' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateRoomDto: UpdateRoomDto,
    ): Promise<Room> {
        return this.roomsService.update(id, updateRoomDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a room by ID' })
    @ApiResponse({ status: 204, description: 'Room deleted' })
    @ApiResponse({ status: 404, description: 'Room not found' })
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.roomsService.remove(id);
    }
}
