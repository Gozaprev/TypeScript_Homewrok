// Old code:

// import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
// import { IsInt, Min, Max, IsEnum, IsNumber, IsBoolean, IsArray, ArrayNotEmpty, IsOptional, IsDate, MaxLength } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';

// export enum RoomType {
//     SINGLE = 'SINGLE',
//     DOUBLE = 'DOUBLE',
//     SUITE = 'SUITE',
//     DELUXE = 'DELUXE',
// }

// @Entity()
// export class Room {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @ApiProperty({ example: 101, description: 'Room number (1-999)' })
//     @Column()
//     @IsInt()
//     @Min(1)
//     @Max(999)
//     roomNumber: number;

//     @ApiProperty({ enum: RoomType, example: RoomType.SINGLE, description: 'Room type' })
//     @Column({ type: 'enum', enum: RoomType })
//     @IsEnum(RoomType)
//     type: RoomType;

//     @ApiProperty({ example: 120, description: 'Room price (50-1000)' })
//     @Column('decimal')
//     @IsNumber()
//     @Min(50)
//     @Max(1000)
//     price: number;

//     @ApiProperty({ example: true, description: 'Availability status' })
//     @Column()
//     @IsBoolean()
//     isAvailable: boolean;

//     @ApiProperty({ example: ['WiFi', 'TV'], description: 'Room amenities' })
//     @Column('simple-array')
//     @IsArray()
//     @ArrayNotEmpty()
//     amenities: string[];

//     @ApiProperty({ example: 2, description: 'Maximum occupancy' })
//     @Column()
//     @IsInt()
//     maxOccupancy: number;

//     @ApiProperty({ example: '2025-05-19', description: 'Last cleaned date' })
//     @Column({ type: 'date' })
//     @IsDate()
//     lastCleaned: Date;

//     @ApiProperty({ example: 'Needs new lightbulb', required: false, description: 'Maintenance notes' })
//     @Column({ nullable: true })
//     @IsOptional()
//     @MaxLength(255)
//     maintenanceNotes?: string;
// }











// import { IsEnum, IsInt, IsOptional, IsPositive, IsArray, IsString, IsDate } from 'class-validator';

// export enum RoomType {
//     SINGLE = 'SINGLE',
//     DOUBLE = 'DOUBLE',
//     SUITE = 'SUITE',
//     DELUXE = 'DELUXE',
// }

// export class Room {
//     @IsInt()
//     @IsPositive()
//     roomNumber: number;

//     @IsEnum(RoomType)
//     type: RoomType;

//     @IsInt()
//     @IsPositive()
//     price: number;

//     isAvailable: boolean;

//     @IsArray()
//     @IsOptional()
//     amenities?: string[];

//     @IsInt()
//     @IsPositive()
//     maxOccupancy: number;

//     @IsDate()
//     lastCleaned: Date;

//     @IsString()
//     @IsOptional()
//     maintenanceNotes?: string;
// }






// import {
//     Entity,
//     PrimaryGeneratedColumn,
//     Column,
//     Index,
// } from 'typeorm';
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
//     IsDate,
//     MaxLength,
// } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';
// import { RoomType } from './room-type.enum';

// @Entity()
// @Index(['roomNumber'], { unique: true })
// export class Room {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @ApiProperty({ example: 101, description: 'Room number (1-999)' })
//     @Column({ unique: true })
//     @IsInt()
//     @Min(1)
//     @Max(999)
//     roomNumber: number;

//     @ApiProperty({ enum: RoomType, example: RoomType.SINGLE, description: 'Room type' })
//     @Column({ type: 'enum', enum: RoomType })
//     @IsEnum(RoomType)
//     type: RoomType;

//     @ApiProperty({ example: 120, description: 'Room price (50-1000)' })
//     @Column('decimal')
//     @IsNumber()
//     @Min(50)
//     @Max(1000)
//     price: number;

//     @ApiProperty({ example: true, description: 'Availability status' })
//     @Column()
//     @IsBoolean()
//     isAvailable: boolean;

//     @ApiProperty({ example: ['WiFi', 'TV'], description: 'Room amenities' })
//     @Column('simple-array')
//     @IsArray()
//     @ArrayNotEmpty()
//     amenities: string[];

//     @ApiProperty({ example: 2, description: 'Maximum occupancy' })
//     @Column()
//     @IsInt()
//     maxOccupancy: number;

//     @ApiProperty({ example: '2025-05-19', description: 'Last cleaned date' })
//     @Column({ type: 'date' })
//     @IsDate()
//     lastCleaned: Date;

//     @ApiProperty({ example: 'Needs new lightbulb', required: false, description: 'Maintenance notes' })
//     @Column({ nullable: true })
//     @IsOptional()
//     @MaxLength(255)
//     maintenanceNotes?: string;
// }



// Corrected code:

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { RoomType } from './room-type.enum';

@Entity()
@Index(['roomNumber'], { unique: true })
export class Room {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1, description: 'Unique room ID' })
    id: number;

    @ApiProperty({ example: 101, description: 'Room number (1-999)' })
    @Column({ unique: true })
    roomNumber: number;

    @ApiProperty({ enum: RoomType, example: RoomType.SINGLE, description: 'Room type' })
    @Column({ type: 'enum', enum: RoomType })
    type: RoomType;

    @ApiProperty({ example: 120, description: 'Room price (50-1000)' })
    @Column('decimal')
    price: number;

    @ApiProperty({ example: true, description: 'Availability status' })
    @Column()
    isAvailable: boolean;

    @ApiProperty({ example: ['WiFi', 'TV'], description: 'Room amenities' })
    @Column('simple-array')
    amenities: string[];

    @ApiProperty({ example: 2, description: 'Maximum occupancy' })
    @Column()
    maxOccupancy: number;

    @ApiProperty({ example: '2025-05-19', description: 'Last cleaned date' })
    @Column({ type: 'date' })
    lastCleaned: Date;

    @ApiProperty({ example: 'Needs new lightbulb', required: false, description: 'Maintenance notes' })
    @Column({ nullable: true })
    maintenanceNotes?: string;
}
