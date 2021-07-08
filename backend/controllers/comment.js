const model = require('../models')

exports.postComments = (req, res, next) => {
    model.User.findOne({
        where: {
            id: req.params.id
        }
    })
    .then( user => {
        if(user){
            model.Comment.create({
                userId: req.body.id,
                postId: req.params.id,
                comment: req.body.comment
            })
        }
    })
}