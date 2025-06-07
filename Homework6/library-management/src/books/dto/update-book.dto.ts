import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class UpdateBookDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    author?: string;

    @IsOptional()
    @IsNumber()
    publicationYear?: number;

    @IsOptional()
    @IsString()
    isbn?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsBoolean()
    available?: boolean;

    @IsOptional()
    @IsNumber()
    categoryId?: number;
}
