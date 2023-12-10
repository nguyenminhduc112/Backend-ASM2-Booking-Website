const express = require('express')
const router = express.Router()
// Controllers
const userController = require('../controllers/user')

router.get('/', (req, res, next) => {
    res.send('Success Routers')
})

// GET -> /user/:email
router.get('/user/:email', userController.getUser)


module.exports = router