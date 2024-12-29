import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ example: 'test' })
  username: string;

  @ApiProperty({ example: 'password' })
  password: string;
}
