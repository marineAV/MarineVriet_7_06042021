const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')

const commentCtrl = require('../controllers/commentpost')

// comments of posts
router.post('/comment', auth, commentCtrl.postComments)

module.exports = router;
