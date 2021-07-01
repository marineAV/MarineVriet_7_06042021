const jwt = require('jsonwebtoken')

module.exports = {
    generateToken: function(users){
        return jwt.sign({
            userId: users.id,
        },
        process.env.DB_TOKEN,
        {
            expiresIn: '5h' 
        }
        )
    }
}