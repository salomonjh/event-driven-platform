const sequelize = require('../models');

/**
 * GET /health
 * Check the health status of the service and the connection to the database.
 * @param {*} req
 * @param {*} res
 */
exports.getHealth = async (req, res) => {
    try {
        await sequelize.authenticate();
        res.json({ status: 'ok', db: 'connected', timestamp: new Date() });
    } catch (err) {
        res.status(500).json({ status: 'error', db: 'unreachable', error: err.message });
    }
};
