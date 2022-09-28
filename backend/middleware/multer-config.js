const multer = require('multer');


// Dictionnaire de MIME TYPE:
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png'
};

// La destination du fichier (répertoire) et générer un nom de fichier unique
const storage = multer.diskStorage({
    // Destination de stockage du fichier:
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        // Supprimer les espaces dans le nom du fichier:
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

// Exportation du middleware multer:
module.exports = multer({ storage: storage }).single('image');