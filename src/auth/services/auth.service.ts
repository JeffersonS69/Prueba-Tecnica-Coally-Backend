import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateUser(userDto: UserDto): Promise<any> {
    const user = {
      id: 1,
      username: process.env.USER_TEST_AUTH,
      password: await bcrypt.hash(process.env.PASSWORD_TEST_AUTH, 10),
    };

    const isPasswordValid = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (user && isPasswordValid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserDto) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
