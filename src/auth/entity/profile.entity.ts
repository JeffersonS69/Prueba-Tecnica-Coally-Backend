import { ApiProperty } from '@nestjs/swagger';

export class Profile {
  @ApiProperty({ example: '1' })
  userId: number;

  @ApiProperty({ example: 'test' })
  username: string;
}
