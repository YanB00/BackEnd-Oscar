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
            allowNull:true
        }
    }
);

// modelCategoria.sync({force:true});

module.exports = modelCategoria;