const SauceModel = require('../models/modelSauce');


// Controller pour like et Dislike une sauce:
exports.likeDislikeSauce = (req, res, next) => {
    console.log("je suis dans le controller nananère");

    // Affichage du req.body
    console.log("-->contenu req.body - ctrl like");
    console.log(req.body.like);
    //récupérer l'ID dans l'url de la requète
    console.log("-->contenu req.body - ctrl like");
    console.log(req.params);

    SauceModel.findOne({ _id: req.params.id })
        .then(sauce => {
            console.log(sauce);
            //=====================// METTRE UN LIKE ----> like = 1 (likes = +1)//=====================//

            //  Si le usersLiked est FALSE et si LIKES === 1
            if (!sauce.usersLiked.includes(req.body.userId) && req.body.like === 1) {  //--->utilisation de la methode javascript "includes()"
                SauceModel.updateOne(
                    { _id: req.params.id },
                    {
                        $inc: { likes: 1 },  //---------------------->utilisation de l'opérateur $inc-(mongoDB)
                        $push: { usersLiked: req.body.userId }  //--->utilisation de l'opérateur $push-(mongoDB)
                    }
                )
                    .then(() => res.status(201).json({ message: 'Like ajouté !' }))
                    .catch(error => res.status(400).json({ error }));
            }

            //=====================// ENLEVER LE LIKE ----> like = 0 (LIKES (neutre) = 0, pas de vote) //=====================//

            if (sauce.usersLiked.includes(req.body.userId) && req.body.like === 0) {
                SauceModel.updateOne(
                    { _id: req.params.id },
                    {
                        $inc: { likes: -1 },  //---------------------->utilisation de l'opérateur $inc-(mongoDB)
                        $pull: { usersLiked: req.body.userId }  //--->utilisation de l'opérateur $pull-(mongoDB)
                    }
                )
                    .then(() => res.status(201).json({ message: 'Like retiré, reste à 0' }))
                    .catch(error => res.status(400).json({ error }));
            }

            //=====================// METTRE UN DISLIKE ----> like = -1 (DISLIKES = +1) //=====================//

            if (!sauce.usersDisliked.includes(req.body.userId) && req.body.like === -1) {
                SauceModel.updateOne(
                    { _id: req.params.id },
                    {
                        $inc: { dislikes: 1 },  //---------------------->utilisation de l'opérateur $inc-(mongoDB)
                        $push: { usersDisliked: req.body.userId }  //--->utilisation de l'opérateur $push-(mongoDB)
                    }
                )
                    .then(() => res.status(201).json({ message: 'Dislike ajouté !' }))
                    .catch(error => res.status(400).json({ error }));
            }

            //=====================// ENELEVER LE DISLIKE ----> like = 0 (dislikes = 0) //=====================//

            if (sauce.usersDisliked.includes(req.body.userId) && req.body.like === 0) {
                SauceModel.updateOne(
                    { _id: req.params.id },
                    {
                        $inc: { dislikes: -1 }, //---------------------->utilisation de l'opérateur $inc-(mongoDB)
                        $pull: { usersDisliked: req.body.userId }  //--->utilisation de l'opérateur $pull-(mongoDB)
                    }
                )
                    .then(() => res.status(201).json({ message: 'Dislike retiré !' }))
                    .catch(error => res.status(400).json({ error }));
            }
        })
        .catch(error => res.status(404).json({ error }));
};