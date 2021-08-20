const model = require('../models')

exports.postComments = (req, res, next) => {
    model.User.findOne({
        where: {
            id: req.body.id
        }
    })
    .then(user => {
        if(user){
            model.CommentPost.create({
                UserId: req.body.id,
                PostId: req.body.commentId,
                comment: req.body.comment
            })
            .then(users => res.status(200).json(users))
            .catch(error => res.status(401).json(error))    
        }
    })
    .catch(error => res.status(500).json({error}))
}