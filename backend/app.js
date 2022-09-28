const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const result = dotenv.config();

// Importation des routes:
const routeSauce = require('./routes/sauce');
const routeUser = require('./routes/user');

// Pour créer une application express:
const app = express();

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// Gérer les problèmes de CORS (Cross-Origin-Request-Sharing):
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// transformer le corp (body) en json objet javascript utilisable
app.use(bodyParser.json());

// La route des models sauces:
app.use('/api/sauces', routeSauce);

// La route d'authentification:
app.use('/api/auth', routeUser);

// Pour acceder au images du dossier images:
app.use('/images', express.static(path.join(__dirname, 'images')));

// Exportation de app.js afin d'y acceder depuis un autre fichier:
module.exports = app;