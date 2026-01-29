const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const yaml = require('yaml');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/', routes);

// Swagger setup
const file = fs.readFileSync('./openapi.yaml', 'utf8');
const openapiDocument = yaml.parse(file);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiDocument));

app.listen(PORT, () => {
    console.log(`Event service running on port ${PORT}`);
});
