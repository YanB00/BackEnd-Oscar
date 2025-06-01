const express = require('express');
const cors = require('cors');

const routesCategoria = require('./routes/routeCategoria');
const routesFilme = require('./routes/routeMovie');
const { modelMovie, modelCategoria } = require('./model'); 

const app = express();

app.use(cors());
app.use((req, res, next) => {
    console.log(`[GLOBAL LOG] Request received: ${req.method} ${req.originalUrl}`);
    next(); // Pass control to the next middleware/route
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routesFilme);
app.use('/', routesCategoria);

app.use((req, res, next) => {
    console.log(`[GLOBAL LOG] 404 - No route matched: ${req.method} ${req.originalUrl}`);
    res.status(404).json({
        errorStatus: true,
        mensageStatus: 'Rota não encontrada.'
    });
});


app.listen(5000, () => {
    console.log('servidor rodando em - http://localhost:5000');
});