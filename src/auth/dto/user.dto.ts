import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UserDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
