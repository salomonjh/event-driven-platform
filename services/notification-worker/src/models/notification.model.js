const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Notification = sequelize.define('Notification', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    eventId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'event_id',
    },
    status: {
        type: DataTypes.ENUM('PENDING', 'SENT', 'FAILED'),
        defaultValue: 'PENDING'
    },
    payload: {
        type: DataTypes.JSONB,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'created_at',
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'updated_at',
    },
}, {
    tableName: 'notifications',
});

module.exports = Notification;