const Sequelize = require('sequelize');
const connection = require('../database/database'); 

const modelMovie = connection.define(
    'tbl_filme',
    {
        cod_filme: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome_filme: {
            type: Sequelize.STRING(255), 
            allowNull: false,
        },
        nome_indicado: {
            type: Sequelize.STRING(255), 
            allowNull: false, 
        },
        cod_categoria: { 
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        }
    },
    {
        tableName: 'tbl_filme',
    }
);

module.exports = modelMovie;
