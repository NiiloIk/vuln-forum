const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Post = sequelize.define(
    'Post', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        modified_at: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        },
    },
    {
        tableName: 'post', // by default table name is Posts
        timestamps: false // Timestamps need to be false because in default it has createdAt and modifiedAt which break the query
    },
)

module.exports = Post