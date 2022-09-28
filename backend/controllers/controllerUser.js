const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const result = dotenv.config();

const User = require('../models/modelUser');

// Controller pour signup: ===============================================================
exports.signup = (req, res, next) => {
    // Hasher le mot de passe avant de l'envoyer dans la base de donnée:
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            // Ce qui va être enregistré dans MongoDB
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }).send());
        })
        .catch(error => res.status(500).json({ error }));
};

// Controller pour login: ===============================================================
exports.login = (req, res, next) => {
    // Chercher dans la base de donnée si l'utilisateur est bien présent:
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            // Ici on utilise la fonction 'compare' de bcrypt pour comparer le mot de passe
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrecte !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(                // On appel la fonction 'sign' qui prend 3 arguments et qui renvoi en coder:
                            { userId: user._id },       // Identifiant de l'utilisateur
                            `${process.env.JWT_TOKEN}`, // Clé secrète pour l'encodage
                            { expiresIn: '24h' }        // Expiration de 24h pour le token
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};