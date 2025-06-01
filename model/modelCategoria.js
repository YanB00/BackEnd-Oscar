const Sequelize = require('sequelize');
const connection = require('../database/database');

const modelCategoria = connection.define(
    'tbl_categoria',
    {
        cod_categoria:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        nome_categoria:{
            type:Sequelize.STRING(100),
            allowNull:false
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
    {tableName: 'tbl_categoria'},
);

module.exports = modelCategoria;
