const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

const postCtrl = require('../controllers/post')

router.post('/article', auth, multer, postCtrl.postArticle)
router.put('/article/:id', auth, multer, postCtrl.updateArticle)
router.get('/article', auth, multer, postCtrl.getArticles)
router.delete('/article/:id', auth, multer, postCtrl.deleteArticle)

module.exports = router; 