import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Export environment variables
export const env = {
  DATABASE_URL: process.env.DATABASE_URL,
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  DB_USER: process.env.DB_USER,
  DB: process.env.DB,
  PASSWORD: process.env.PASSWORD,
}; 