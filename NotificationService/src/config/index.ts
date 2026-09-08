//This file contains all the basic configuration logic for the app server to work.
import dotenv from 'dotenv';

function loadEnv(){
    dotenv.config();
};

loadEnv();
console.log(`Environment variables loaded`);
type ServerConfig = {
    PORT : number,
    API_VERSION : string

    REDIS_HOST: string;
    REDIS_PORT: number;

    SMTP_HOST: string;
    SMTP_PORT: number;
    SMTP_USER: string;
    SMTP_PASS: string;
    MAIL_FROM: string;
};

export const serverConfig: ServerConfig= {
    PORT : Number(process.env.PORT) || 3003,
    API_VERSION : process.env.API_VERSION || "v1",

    REDIS_HOST: process.env.REDIS_HOST || "127.0.0.1",
    REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,

    SMTP_HOST: process.env.SMTP_HOST || "",
    SMTP_PORT: Number(process.env.SMTP_PORT) || 587,
    SMTP_USER: process.env.SMTP_USER || "",
    SMTP_PASS: process.env.SMTP_PASS || "",
    MAIL_FROM: process.env.MAIL_FROM || "Restivio <no-reply@restivio.com>",
};