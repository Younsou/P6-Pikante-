// Importation du SQL MongoDB pour la base de données:
const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

// Le model de base de donné pour le signup ( pour enregistré un nouvel utilisateur):
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
},
    { timestamps: true } // Pour créé des dates/heures de creation et d'update
);

// Sécurité pour ne pas enregistrer 2 fois le même email:
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);