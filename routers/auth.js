const express = require('express')
const router = express.Router()
// Controllers
const authController = require('../controllers/auth')

router.get('/', (req, res, next) => {
    res.send('Success Routers')
})

// POST -> Singup
router.post('/auth/signup', authController.postUser)
// POST -> Singin
router.post('/auth/signin', authController.Login)
// POST -> Singin
router.post('/auth/signinAdmin', authController.LoginAdmin)

module.exports = router