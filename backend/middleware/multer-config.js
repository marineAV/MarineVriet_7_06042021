const multer = require('multer');

const MIME_TYPES = { // biblio de mime types
  'file/jpg': 'jpg',
  'file/jpeg': 'jpg',
  'file/png': 'png',
  'file/gif': 'gif',
  'file/mp4': 'mp4',
  'file/mov': 'mov',
  'file/avi': 'avi',
  'file/mpeg': 'mpg',
  'file/mkv': 'mkv',
  'file/flv': 'flv',
  'file/wmv': 'wmv',

};

// objet de configuration pour les fichiers entrants
var storage = multer.diskStorage({            //on enregistre sur le disque
  destination: (req, file, callback) => {                   // indique ou enregistrer les fichiers
    callback(null, 'files');                               // pas d'erreurs, dossier images
  },
  filename: (req, file, callback) => {          // indique le nom des fichiers
    const name = file.originalname.split(' ').join('_');    // récupère le nom d'origine et remplace les espaces par _
    const extension = MIME_TYPES[file.mimetype];            //  récup extension correspondant au mime-type du fichier téléchargé(front)
    callback(null,  Date.now() + name );    
    // nom + timestamp( correspond au moment présent(ms since 1/1/70)) + . + extension
  }
});

module.exports = multer({storage: storage}).single('file'); 
// exporte l'élement multer, constante storage //single = fichier unique //il s'agit d'images 