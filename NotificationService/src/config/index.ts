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
};

export const serverConfig: ServerConfig= {
    PORT : Number(process.env.PORT) || 3001,
    API_VERSION : String(process.env.API_VERSION)
};