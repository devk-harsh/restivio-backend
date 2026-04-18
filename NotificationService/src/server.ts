import express from 'express';
import {serverConfig } from './config';

import v1Router from './routers/V1/index.router';
import v2Router from './routers/V2/index.router';
import { genericErrorHandler } from './middlewares/error.middleware';
import logger from './config/logger.config';
import { attachCorrelationIdMiddleware } from './middlewares/correlation.middleware';

const app = express();

app.use(express.json());


app.use(attachCorrelationIdMiddleware);


/*
Registering all the routers and their corresponding routes without app server object
*/
app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);
//This is API Versioning..And one version is down then just comment down their app.use

//Now add the error handler middleware
app.use(genericErrorHandler);



app.listen(serverConfig.PORT, ()=>{
    logger.info(`Server is running on http://localhost:${serverConfig.PORT}/api/v1/ping`);
    logger.info(`Server is running on http://localhost:${serverConfig.PORT}/api/v2/ping`);
    logger.info(`Press Ctrl +C to stop the server`,{"name":"dev servers"});

});