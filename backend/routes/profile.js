const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')

const profileCtrl = require('../controllers/profile')

router.post('/profile',auth, profileCtrl.postProfile)
router.get('/profile/:id',auth, profileCtrl.getProfile)
router.put('/profile/:id',auth, profileCtrl.updateProfile)

module.exports = router;