const modelMovie = require('./modelMovie');
const modelCategoria = require('./modelCategoria');

modelCategoria.hasMany(modelMovie, { foreignKey: 'cod_categoria' });
modelMovie.belongsTo(modelCategoria, { foreignKey: 'cod_categoria', as: 'categoria' });

module.exports = {
    modelMovie,
    modelCategoria
};
