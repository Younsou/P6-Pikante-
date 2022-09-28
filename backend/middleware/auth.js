const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const result = dotenv.config();

module.exports = (req, res, next) => {
    try {
        // récupérer le token dans le headers authorization: "bearer token"
        const token = req.headers.authorization.split(' ')[1];
        // Décoder le token:
        const decodedToken = jwt.verify(token, `${process.env.JWT_TOKEN}`);

        // Récupérer le userId qu'il y a à l'interieur du token déchiffré et le comparer avec l' userId
        const user_Id = decodedToken.userId;
        req.auth = {
            userId: user_Id
        };
        next();
    } catch (error) {
        res.status(401).json({ error });
    }
};