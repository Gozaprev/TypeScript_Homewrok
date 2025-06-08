// Old code:


// import {
//     IsInt,
//     Min,
//     Max,
//     IsEnum,
//     IsNumber,
//     IsBoolean,
//     IsArray,
//     ArrayNotEmpty,
//     IsOptional,
//     IsDateString,
//     MaxLength,
// } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';
// import { RoomType } from '../room-type.enum';

// export class CreateRoomDto {
//     @ApiProperty({ example: 101, description: 'Room number (1-999)' })
//     @IsInt()
//     @Min(1)
//     @Max(999)
//     roomNumber: number;

//     @ApiProperty({ enum: RoomType, example: RoomType.SINGLE, description: 'Room type' })
//     @IsEnum(RoomType)
//     type: RoomType;

//     @ApiProperty({ example: 120, description: 'Room price (50-1000)' })
//     @IsNumber()
//     @Min(50)
//     @Max(1000)
//     price: number;

//     @ApiProperty({ example: true, description: 'Availability status' })
//     @IsBoolean()
//     isAvailable: boolean;

//     @ApiProperty({ example: ['WiFi', 'TV'], description: 'Room amenities' })
//     @IsArray()
//     @ArrayNotEmpty()
//     amenities: string[];

//     @ApiProperty({ example: 2, description: 'Maximum occupancy' })
//     @IsInt()
//     maxOccupancy: number;

//     @ApiProperty({ example: '2025-05-19', description: 'Last cleaned date' })
//     @IsDateString()
//     lastCleaned: string;

//     @ApiProperty({ example: 'Needs new lightbulb', required: false, description: 'Maintenance notes' })
//     @IsOptional()
//     @MaxLength(255)
//     maintenanceNotes?: string;
// }


// src/rooms/dto/create-room.dto.ts
// import {
//     IsInt,
//     Min,
//     Max,
//     IsEnum,
//     IsNumber,
//     IsBoolean,
//     IsArray,
//     ArrayNotEmpty,
//     IsOptional,
//     IsDateString,
//     MaxLength,
// } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';
// import { RoomType } from '../room-type.enum';
// import { Type } from 'class-transformer';

// export class CreateRoomDto {
//     @ApiProperty({ example: 101, description: 'Room number (1-999)' })
//     @IsInt()
//     @Min(1)
//     @Max(999)
//     roomNumber: number;

//     @ApiProperty({ enum: RoomType, example: RoomType.SINGLE, description: 'Room type' })
//     @IsEnum(RoomType)
//     type: RoomType;

//     @ApiProperty({ example: 120, description: 'Room price (50-1000)' })
//     @IsNumber()
//     @Min(50)
//     @Max(1000)
//     price: number;

//     @ApiProperty({ example: true, description: 'Availability status' })
//     @IsBoolean()
//     isAvailable: boolean;

//     @ApiProperty({ example: ['WiFi', 'TV'], description: 'Room amenities' })
//     @IsArray()
//     @ArrayNotEmpty()
//     amenities: string[];

//     @ApiProperty({ example: 2, description: 'Maximum occupancy' })
//     @IsInt()
//     maxOccupancy: number;

//     @ApiProperty({ example: '2025-05-19', description: 'Last cleaned date' })
//     @IsDateString()
//     @Type(() => Date)  // <-- Transform string to Date
//     lastCleaned: Date;

//     @ApiProperty({ example: 'Needs new lightbulb', required: false, description: 'Maintenance notes' })
//     @IsOptional()
//     @MaxLength(255)
//     maintenanceNotes?: string;
// }



// Corrected code:

import {
    IsInt,
    Min,
    Max,
    IsEnum,
    IsNumber,
    IsBoolean,
    IsArray,
    ArrayNotEmpty,
    IsString,
    IsOptional,
    IsDateString,
    MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RoomType } from '../room-type.enum';
import { Type } from 'class-transformer';

export class CreateRoomDto {
    @ApiProperty({ example: 101, description: 'Room number (1-999)' })
    @IsInt({ message: 'Room number must be an integer' })
    @Min(1, { message: 'Room number must be at least 1' })
    @Max(999, { message: 'Room number must be at most 999' })
    roomNumber: number;

    @ApiProperty({ enum: RoomType, example: RoomType.SINGLE, description: 'Room type' })
    @IsEnum(RoomType, { message: 'Type must be a valid RoomType' })
    type: RoomType;

    @ApiProperty({ example: 120, description: 'Room price (50-1000)' })
    @IsNumber({}, { message: 'Price must be a number' })
    @Min(50, { message: 'Price must be at least 50' })
    @Max(1000, { message: 'Price must be at most 1000' })
    price: number;

    @ApiProperty({ example: true, description: 'Availability status' })
    @IsBoolean({ message: 'isAvailable must be a boolean' })
    isAvailable: boolean;

    @ApiProperty({ example: ['WiFi', 'TV'], description: 'Room amenities' })
    @IsArray({ message: 'Amenities must be an array' })
    @ArrayNotEmpty({ message: 'Amenities cannot be empty' })
    @IsString({ each: true, message: 'Each amenity must be a string' })
    amenities: string[];

    @ApiProperty({ example: 2, description: 'Maximum occupancy' })
    @IsInt({ message: 'Max occupancy must be an integer' })
    maxOccupancy: number;

    @ApiProperty({ example: '2025-05-19', description: 'Last cleaned date' })
    @IsDateString({}, { message: 'Last cleaned must be a valid ISO date string' })
    //@Type(() => Date)
    lastCleaned: Date;

    @ApiProperty({ example: 'Needs new lightbulb', required: false, description: 'Maintenance notes' })
    @IsOptional()
    @MaxLength(255, { message: 'Maintenance notes must be at most 255 characters' })
    maintenanceNotes?: string;
}
