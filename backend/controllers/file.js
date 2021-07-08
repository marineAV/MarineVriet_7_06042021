const model = require('../models')

exports.postFile = (req, res, next) => {
    model.User.findOne({
        where: {
            id: req.body.id
        }
    })
    .then(user => {
        if(user){
            model.File.create({
                UserId: req.body.id,
                file: `${req.protocol}://${req.get('host')}/files/${req.file.filename}`
            })
            .then(users => res.status(200).json(users))
            .catch(error => res.status(400).json(error))    
        }
    })
    .catch(error => res.status(500).json({error}))
}

exports.updateFile = (req, res, next) => {
    model.File.findOne({
        where: {
            UserId: req.params.id
        }
    })
    .then(user => {
        if(!user){
            return res.status(401).json({error})
        }
        model.File.update({
            file: `${req.protocol}://${req.get('host')}/files/${req.file.filename}`
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

exports.getFile = (req, res, next) => {
    model.File.findOne({
        attributes: ['file'],
        where: { UserId: req.params.id}
    })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(400).json(error))    
}