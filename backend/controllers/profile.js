const model = require('../models')

exports.postProfile = (req, res, next) => {
    model.User.findOne({
        where: {
            id: req.body.id
        }
    })
    .then(user => {
        if(user){
            model.Profile.create({
                UserId: req.body.id,
                interests: req.body.interests,
            })
            .then(profile => res.status(200).json(profile))
            .catch(error => res.status(400).json(error))        
        }
    })
    .catch(error => res.status(500).json(error))        
};

exports.getProfile = (req, res, next) => {
    model.Profile.findOne({
        attributes: ['interests'],
        where: { UserId: req.params.id }
    })
    .then(profile => res.status(200).json(profile))
    .catch(error => res.status(400).json(error))        
};

exports.updateProfile = (req, res, next) => {
    model.Profile.findOne({
        where: {
            UserId: req.params.id
        }
    })
    .then(user => {
        if(!user){
            return res.status(401).json({error})
        }
        model.Profile.update({
            interests: req.body.interests
        },
        {
            where:{ 
                UserId: req.body.id
            }
        })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).json(error))    
    })
    .catch(error => res.status(500).json(error))    
}

