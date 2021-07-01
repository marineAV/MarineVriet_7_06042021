const model = require('../models')
const bcrypt = require('bcrypt')
const fs = require('fs')
const passwordValidator = require('password-validator');
const validMail = require('email-validator')

var schema = new passwordValidator();

schema      // schéma passwordValidator
.is().min(7)                     // taille min
.is().max(30)                    // taille max
.has().uppercase()               // doit contenir des majuscules
.has().lowercase()               // doit contenir des minuscules
.has().digits(2)                 // doit contenir 2 chiffres
.has().not().spaces()            // pas d'espaces
.is().not().oneOf(['Passw0rd', 'Password123']); // le mdp n'est pas une de ces valeurs

exports.signup = (req, res, next) => {
    if(validMail.validate(req.body.email) && schema.validate(req.body.password)){
        model.User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(user => {
            if(user){
                return res.status(400).json({ error: "Cet utilisateur existe déjà!"})
            }else{
                bcrypt.hash(req.body.password, 10)
                .then((hash) => {
                    model.User.create({
                        name: req.body.name,
                        firstName: req.body.firstName,
                        email: req.body.email,
                        password: hash
                    })
                })
                .then(() => res.status(200).json({ message: "Utilisateur crée"}))
                .catch(error => res.status(401).json({ error }))
            }
        })
        .catch(error => res.status(401).json({ error }))    
    }else{
        return res.status(500).json({ message: "Votre email ou mot de passe ne sont pas valide!"})
    }
};

exports.login = (req, res, next) => {
    model.User.findOne({ 
        where: {
            email: req.body.email,
            }
        }) // récupère  l'email dans la requête
        .then(users => {
            if(!users){                      // Si l'utilisateur n'est pas trouvé, renvoi un msg d'erreur
                return res.status(401).json({ error: 'Utilisateur non trouvé!'});
            }
            bcrypt.compare(req.body.password, users.password, function(errBycrypt, resBycrypt) {
                if(resBycrypt){
                    res.status(200).json({                   
                        userId: users.id,                    
                        token: jwtUtils.generateToken(users)                   
                    });
                }else{
                    return res.status(400).json({ error: 'Le mot de passe est incorrect'});
                }
            }) 
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getOneUser = (req, res, next) => {
    model.User.findOne({
        where: {
            id: req.params.id,
        }
    })
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json(error))
}

exports.getAllUsers = (req, res, next) => {
    model.User.findAll({
        attributes : [ 'firstName', 'name'],
        order: [["name", "ASC"]]
    })
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json(error))
}

// Suppression du compte utilisateur
exports.deleteUser = (req, res, next) => {
    model.User.destroy({id: req.params.id})
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json(error))
}

// Modification du compte utilisateur
exports.updateUser = (req, res, next) => {
    const usersObject = req.file ?
    {
        ...JSON.parse(req.body.user),
        imageUrl: `${req.protocol}://${req.get('host')}/files/${req.file.filename}` 
    }:{
        ...req.body
    };
    model.User.update(
        {
            ...usersObject
        },
        {
        where: {
            id: req.params.id
        }
    })
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json(error))
}
