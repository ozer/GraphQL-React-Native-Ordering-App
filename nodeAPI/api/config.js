import dotenv from 'dotenv';

dotenv.config({ silent: true });

export const {
  JWT_SECRET,
  MONGO_URI,
  PORT,
} = process.env;

export default JWT_SECRET;
