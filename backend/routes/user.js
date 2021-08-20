const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

router.get('/user/:id', auth, userCtrl.getOneUser);
router.get('/users', auth, userCtrl.getAllUsers);
router.delete('/user/:id', auth, userCtrl.deleteUser);

module.exports = router;