import dotenv from 'dotenv';
import { cleanEnv, num, str } from 'envalid';

dotenv.config();

const env = cleanEnv(process.env, {
  PORT: num({ default: 5000 }),
  DB_HOST: str({ default: 'localhost' }),
  DB_PORT: num({ default: 5432 }),
  DB_USERNAME: str(),
  DB_PASSWORD: str(),
  DB_NAME: str(),
  JWT_SECRET: str(),
});

export default env;