import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserDto } from '../dto/user.dto';
import { JwtAuthGuard } from '../jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  messageInvalidCredentials,
  messageLoginSuccessful,
  messageProfileRetrieved,
  messageUnauthorized,
} from '../../utils/message';
import { Profile, Token, User } from '../entity';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiBody({ type: User })
  @ApiResponse({
    status: 200,
    description: messageLoginSuccessful,
    type: Token,
  })
  @ApiResponse({
    status: 400,
    description: messageInvalidCredentials,
  })
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() userDto: UserDto,
  ): Promise<{ access_token: string } | { message: string }> {
    const user = await this.authService.validateUser(userDto);
    if (!user) {
      return { message: messageInvalidCredentials };
    }

    return this.authService.login(user);
  }

  @Post('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Profile' })
  @ApiResponse({
    status: 200,
    description: messageProfileRetrieved,
    type: Profile,
  })
  @ApiResponse({
    status: 401,
    description: messageUnauthorized,
  })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  getProfile(@Request() req) {
    return req.user;
  }
}
