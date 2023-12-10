const express = require('express')
const router = express.Router()
// Controllers
const dashboardController = require('../controllers/dashboard')

// GET -> /dashboard/infoBoard
router.get('/dashboard/infoBoard', dashboardController.getInfoBoard)


module.exports = router