import { ApiProperty } from '@nestjs/swagger';

export class Task {
  @ApiProperty({ example: '60f1b3b3b9b3f3b3b3b9b3f3', required: false })
  _id: string;

  @ApiProperty({ example: 'Examen de programación' })
  title: string;

  @ApiProperty({
    example: 'Estudiar algoritmo y realizar ejemplos',
    required: false,
  })
  description: string;

  @ApiProperty({ example: false, required: false })
  completed: boolean;

  @ApiProperty({ example: '2021-07-16T00:00:00.000Z', required: false })
  createdAt: Date;
}
