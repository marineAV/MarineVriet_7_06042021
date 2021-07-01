const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

const fileCtrl = require('../controllers/file')

//Profile photo
router.post('/user/photo', auth, multer, fileCtrl.postFile)
router.put('/user/photo/:id', auth, multer, fileCtrl.updateFile)
router.get('/user/photo/:id', auth, multer, fileCtrl.getFile)

module.exports = router;