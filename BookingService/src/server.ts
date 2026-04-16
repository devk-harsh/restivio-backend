import express from 'express';
import { serverConfig } from './config';
import './db/models/associations';
import v1Router from './routers/V1/index.router';
import v2Router from './routers/V2/index.router';
import { appErrorHandler, genericErrorHandler } from './middlewares/error.middleware';
import logger from './config/logger.config';
import { attachCorrelationIdMiddleware } from './middlewares/correlation.middleware';
import sequelize from './db/models/sequelize';
import { redisClient } from './config/redis.config';


const app = express();

app.use(express.json());

app.use(attachCorrelationIdMiddleware);
app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router); 


app.use(appErrorHandler);
app.use(genericErrorHandler);


const startServer = async () => {
    try {
        await sequelize.authenticate();
        logger.info('Database connection has been established successfully.');

        const pong = await redisClient.ping();
        logger.info(`Redis connection successful: ${pong}`);

        await redisClient.set("test:key", "hello");
        const value = await redisClient.get("test:key");
        logger.info(`Redis test value: ${value}`);

        app.listen(serverConfig.PORT, () => {
            logger.info(`Server is running on http://localhost:${serverConfig.PORT}`);
            logger.info(`Press Ctrl+C to stop the server.`);
        });

    } catch (error) {
        logger.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

startServer();