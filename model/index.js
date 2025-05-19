const modelMovie = require('./modelMovie');
const modelCategoria = require('./modelCategoria');

// Aqui sim você define as relações, com ambos os models já carregados
modelCategoria.hasMany(modelMovie, { foreignKey: 'cod_categoria' });
modelMovie.belongsTo(modelCategoria, { foreignKey: 'cod_categoria', as: 'categoria' });

module.exports = {
    modelMovie,
    modelCategoria
};
