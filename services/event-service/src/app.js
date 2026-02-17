const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const yaml = require('yaml');
const path = require('path');
const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/', routes);
app.use(errorHandler);

// Swagger setup
const healthFile = fs.readFileSync(
    path.join(__dirname, '../openapi/health.open.yaml'),
    'utf8'
);
const eventFile = fs.readFileSync(
    path.join(__dirname, '../openapi/event.open.yaml'),
    'utf8'
);

const healthDoc = yaml.parse(healthFile);
const eventDoc = yaml.parse(eventFile);

const openapiDocument = {
    ...healthDoc,
    paths: { ...healthDoc.paths, ...eventDoc.paths },
    components: { ...healthDoc.components, ...eventDoc.components },
};

app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiDocument));

module.exports = app;
