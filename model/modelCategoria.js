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
        },
          createdAt: { // Adicione a coluna createdAt
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW, // Define o valor padrão para a data e hora atual
        },
        updatedAt: { // O Sequelize também cria e atualiza o campo updatedAt
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            onUpdate: Sequelize.NOW,
        }
    }
);

//modelCategoria.sync({force:true});

module.exports = modelCategoria;