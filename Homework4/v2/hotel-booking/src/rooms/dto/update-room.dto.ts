// import { PartialType } from '@nestjs/swagger';
// import { CreateRoomDto } from './create-room.dto';

// export class UpdateRoomDto extends PartialType(CreateRoomDto) { }

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
import { ApiPropertyOptional } from '@nestjs/swagger';
import { RoomType } from '../room-type.enum';
import { Type } from 'class-transformer';

export class UpdateRoomDto {
    @ApiPropertyOptional({ example: 101, description: 'Room number (1-999)' })
    @IsOptional()
    @IsInt({ message: 'Room number must be an integer' })
    @Min(1, { message: 'Room number must be at least 1' })
    @Max(999, { message: 'Room number must be at most 999' })
    roomNumber?: number;

    @ApiPropertyOptional({ enum: RoomType, example: RoomType.SINGLE, description: 'Room type' })
    @IsOptional()
    @IsEnum(RoomType, { message: 'Type must be a valid RoomType' })
    type?: RoomType;

    @ApiPropertyOptional({ example: 120, description: 'Room price (50-1000)' })
    @IsOptional()
    @IsNumber({}, { message: 'Price must be a number' })
    @Min(50, { message: 'Price must be at least 50' })
    @Max(1000, { message: 'Price must be at most 1000' })
    price?: number;

    @ApiPropertyOptional({ example: true, description: 'Availability status' })
    @IsOptional()
    @IsBoolean({ message: 'isAvailable must be a boolean' })
    isAvailable?: boolean;

    @ApiPropertyOptional({ example: ['WiFi', 'TV'], description: 'Room amenities' })
    @IsOptional()
    @IsArray({ message: 'Amenities must be an array' })
    @ArrayNotEmpty({ message: 'Amenities cannot be empty' })
    @IsString({ each: true, message: 'Each amenity must be a string' })
    amenities?: string[];

    @ApiPropertyOptional({ example: 2, description: 'Maximum occupancy' })
    @IsOptional()
    @IsInt({ message: 'Max occupancy must be an integer' })
    maxOccupancy?: number;

    @ApiPropertyOptional({ example: '2025-05-19', description: 'Last cleaned date' })
    @IsOptional()
    @IsDateString({}, { message: 'Last cleaned must be a valid ISO date string' })
    //@Type(() => Date)
    lastCleaned?: Date;

    @ApiPropertyOptional({ example: 'Needs new lightbulb', description: 'Maintenance notes' })
    @IsOptional()
    @MaxLength(255, { message: 'Maintenance notes must be at most 255 characters' })
    maintenanceNotes?: string;
}
