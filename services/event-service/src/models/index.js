const { Sequelize } = require('sequelize');
const path = require('path');

require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
    override: true 
});

const sequelize = new Sequelize(
    process.env.DB_NAME, // Ahora sí será 'events_test_db' porque override funcionó
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        logging: false,
    }
);

module.exports = sequelize;