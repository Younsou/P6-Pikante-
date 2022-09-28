const mongoose = require('mongoose');


// Le model: donnée utilisateur pour la page frontend 
const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },

    // Système de like/dislike:
    likes: { type: Number, defaut: 0 },
    dislikes: { type: Number, defaut: 0 },
    usersLiked: { type: [String] },
    usersDisliked: { type: [String] }
},
    { timestamps: true } // Pour créé des dates/heures de creation et d'update
);

// Exportation du module:
module.exports = mongoose.model('Sauce', sauceSchema);