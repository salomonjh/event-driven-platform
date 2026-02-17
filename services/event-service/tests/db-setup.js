// Import instance conexion
const sequelize = require('../src/models'); 

// Import models
require('../src/models/event.model'); 

beforeAll(async () => {
    // Check database name to prevent accidental data loss
    const currentDb = sequelize.config.database;
    if (currentDb !== 'events_test_db') {
        throw new Error(`Error: connected to wrong database (${currentDb}). Expected 'events_test_db'. Aborting tests to prevent data loss.`);
    }
    console.log('Info: models registered', Object.keys(sequelize.models));

    // Clean the database before running tests
    await sequelize.sync({ force: true });
    console.log('Info: database synced and cleaned');});

afterAll(async () => {
    // Close the database connection after all tests are done
    await sequelize.close();
});