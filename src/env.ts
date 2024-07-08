import dotenv from 'dotenv';
import { cleanEnv, num, str } from 'envalid';

dotenv.config();

const env = cleanEnv(process.env, {
  PORT: num({ default: 5000 }),
  MONGODB_URI: str({ default: 'mongodb://localhost:27017/yourdb' }),
  JWT_SECRET: str(),
});

export default env;