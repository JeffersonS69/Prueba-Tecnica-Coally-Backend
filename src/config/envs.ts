import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  port: parseInt(process.env.PORT) || 3000,
  database: {
    url: process.env.BASE_URL_MONGO,
  },
  user_test_auth: process.env.USER_TEST_AUTH,
  password_test_auth: process.env.PASSWORD_TEST_AUTH,
}));
