import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import {
  messageParamCompletedBoolean,
  messageParamDescriptionString,
  messageParamTitleEmpty,
  messageParamTitleString,
} from 'src/utils/message';

export class CreateTaskDto {
  @ApiProperty({ example: 'Examen de programación' })
  @IsNotEmpty({ message: messageParamTitleEmpty })
  @IsString({ message: messageParamTitleString })
  title: string;

  @ApiProperty({
    example: 'Estudiar algoritmo y realizar ejemplos',
    required: false,
  })
  @IsOptional()
  @IsString({ message: messageParamDescriptionString })
  description: string;

  @IsOptional()
  @IsBoolean({ message: messageParamCompletedBoolean })
  completed: boolean;
}
