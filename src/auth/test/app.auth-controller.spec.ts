import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../services/auth.service';
import { UserDto } from '../dto/user.dto';
import { AuthController } from '../controllers/auth.controller';

describe('AuthController', () => {
  let authController: AuthController;

  const mockAuthService = {
    validateUser: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('login', () => {
    it('should return access token on valid credentials', async () => {
      const userDto: UserDto = {
        id: 1,
        username: 'testUser',
        password: 'testPassword',
      };

      const mockToken = { access_token: 'mockJwtToken' };

      mockAuthService.validateUser.mockResolvedValue({
        id: 1,
        username: 'testUser',
      });
      mockAuthService.login.mockResolvedValue(mockToken);

      const result = await authController.login(userDto);

      expect(result).toEqual(mockToken);
      expect(mockAuthService.validateUser).toHaveBeenCalledWith(userDto);
      expect(mockAuthService.login).toHaveBeenCalledWith({
        id: 1,
        username: 'testUser',
      });
    });

    it('should return error message on invalid credentials', async () => {
      const userDto: UserDto = {
        id: 1,
        username: 'testUser',
        password: 'wrongPassword',
      };

      mockAuthService.validateUser.mockResolvedValue(null);

      const result = await authController.login(userDto);

      expect(result).toEqual({ message: 'Invalid credentials' });
      expect(mockAuthService.validateUser).toHaveBeenCalledWith(userDto);
    });
  });

  describe('getProfile', () => {
    it('should return user profile', () => {
      const req = { user: { id: 1, username: 'testUser' } };

      const result = authController.getProfile(req);

      expect(result).toEqual(req.user);
    });
  });
});
