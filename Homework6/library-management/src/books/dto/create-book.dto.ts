import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsNumber()
  publicationYear: number;

  @IsString()
  isbn: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  available?: boolean;

  @IsNumber()
  categoryId: number;
}

