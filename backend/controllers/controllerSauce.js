const SauceModel = require('../models/modelSauce');
const fs = require('fs');


// Controller pour avoir toute les sauces: ===========================================================
exports.getAllSauces = async (req, res) => {
    try {
        const sauce = await SauceModel.find({});
        res.status(200).json(sauce);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

// Controller pour créer une sauce: ==================================================================
exports.createSauce = async (req, res) => {
    console.log(req.body);
    const sauceObject = JSON.parse(req.body.sauce);
    // 
    //delete sauceObject._id;
    //delete sauceObject._userId;
    const sauce = new SauceModel({
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersdisLiked: []
    });
    try {
        await sauce.save();
        res.status(201).json({ message: 'Sauce enregistré' });
    } catch (err) {
        res.status(400).json({ error: err });
    }
};

// Controller pour avoir une sauce: ===================================================================
exports.getOneSauce = async (req, res) => {
    try {
        const sauce = await SauceModel.findOne({ _id: req.params.id });
        res.status(200).json(sauce);
    } catch (err) {
        res.status(404).json({ error: err });
    }
};

// Controller pour modifier une sauce image, nom, description: ========================================
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete sauceObject._userId;
    SauceModel.findOne({ _id: req.params.id })
        .then((sauce) => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non autorisé !' });
            } else {
                SauceModel.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce modifié!' }))
                    .catch(error => res.status(401).json({ error }));
                console.log("-->CONTENU SAUCE modify SAUCE");
                console.log(sauce);
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

// Controller pour supprimer une sauce: ===============================================================
exports.deleteSauce = (req, res) => {
    SauceModel.findOne({ _id: req.params.id })
        .then(sauce => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non autorisé !' });
            } else {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {

                    // Suppression dans la base de donnée de l'objet
                    SauceModel.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Sauce supprimé !' }) })
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};
