const express = require('express');
const cors = require('cors');

const routesCategoria = require('./route/routesCategoria');
const routesFilme = require('./route/routesMovie');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routesCategoria);
app.use('/', routesFilme);

app.listen(5000, () => {
    console.log('servidor rodando em - http://localhost:5000');
});