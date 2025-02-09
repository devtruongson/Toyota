import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

import configCors from './configs/configCors';
import connectDB from './configs/connectDB';
import initApiRoutes from './routes/api';

const app = express();
configCors(app);

app.use(compression());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

connectDB();

// Cấu hình Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API BACKEND SYSTEM',
            version: '1.0.0',
            description: 'API VINFAST',
        },
        servers: [
            {
                url: 'http://localhost:8080',
            },
        ],
    },
    apis: ['./routes/api.ts', '../dist/routes/api.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//init API routes
initApiRoutes(app);

app.listen(8080, () => {
    console.log('App starting successfully with port 8080');
});
