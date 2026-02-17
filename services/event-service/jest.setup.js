const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env.test
dotenv.config({ path: path.resolve(__dirname, '.env.test') });

// Force Jest to recognize the test environment
process.env.NODE_ENV = 'test';