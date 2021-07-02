const fs = require('fs')
const model = require('../models')

exports.postArticle = (req, res, next) => {
    let url;
    let gifs;
    let comments;
    model.User.findOne({
        where: {
            id: req.body.id
        }
    })
    .then(user => { 
        if(user){
                if(req.file){
                    url = `${req.protocol}://${req.get('host')}/files/${req.file.filename}`
                }else{
                    url == null
                }
                if(req.body.gifs !== undefined){
                    gifs = req.body.gifs
                }else{
                    gifs == null
                }
                if(req.body.comment !== undefined){
                    comments = req.body.comment
                }else{
                    comments == null
                }
                    model.Post.create({
                        UserId: req.body.id,
                        comment: comments,
                        gifs: gifs,
                        file: url
                    })
                    .then(users => res.status(200).json(users))
                    .catch(error => res.status(400).json(error))    
            }
    })
    .catch(error => res.status(401).json({error}))
}

exports.updateArticle = (req, res, next) => {
    model.Post.findOne({
        where: {
            UserId: req.params.id
        }
    })
    .then(user => {
        if(!user){
            return res.status(401).json({error})
        }
        model.Post.update({
            comment: req.body.comment,
            file: `${req.protocol}://${req.get('host')}/files/${req.files.filename}`
        },
        {
            where:{ 
                id: req.params.id
            }
        })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).json(error))    
    })
    .catch(error => res.status(500).json(error))    
}

exports.getArticles = (req, res, next) => {
    model.Post.findAll({
        include : [{
            model: model.User,
            attributes: ['firstName', 'name']
    }],
        order:[['createdAt','DESC']],
    })
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json(error))    
}

exports.deleteArticle = (req, res, next) => {
    model.Post.findOne({
        where: {
            id: req.params.id
        }    
    })
}