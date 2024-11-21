import { z } from 'zod';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const envSchema = z.object({
  MONGODB_URI: z.string().min(1, "MongoDB URI is required"),
  JWT_SECRET: z.string().min(1, "JWT secret is required"),
  MAILTRAP_USER: z.string().min(1, "Mailtrap user is required"),
  MAILTRAP_PASS: z.string().min(1, "Mailtrap password is required"),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  API_URL: z.string().url().default('http://localhost:5173'),
  PORT: z.string().transform(Number).default('5000'),
});

// Parse and validate environment variables
const env = envSchema.parse(process.env);

export const config = {
  mongodb: {
    uri: env.MONGODB_URI,
  },
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: '7d',
    refreshExpiresIn: '30d',
  },
  email: {
    mailtrap: {
      user: env.MAILTRAP_USER,
      pass: env.MAILTRAP_PASS,
    },
  },
  env: env.NODE_ENV,
  apiUrl: env.API_URL,
  port: env.PORT,
} as const;