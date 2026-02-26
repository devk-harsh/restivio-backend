// This file contains all the basic configuration logic for the app server to work
import dotenv from 'dotenv';

type ServerConfig = {
    PORT: number
}

type DbConfig = {
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_HOST: string;
  DB_PORT: number;
};
function loadEnv() {
    dotenv.config();
    console.log(`Environment variables loaded`);
}

loadEnv();
/**
 * Server-related configuration
 */
export const serverConfig: ServerConfig = {
    PORT: Number(process.env.PORT) || 3001
};

/**
 * Database-related configuration
 */
export const dbConfig: DbConfig = {
  DB_USER: process.env.DB_USER || "root",
  DB_PASSWORD: process.env.DB_PASSWORD || "root",
  DB_NAME: process.env.DB_NAME || "test_db",
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: Number(process.env.DB_PORT) || 3306,
};