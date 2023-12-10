const express = require('express')
const router = express.Router()
// Controllers
const roomController = require('../controllers/room')



// GET -> /rooms/all
router.get('/rooms/all', roomController.getAllRooms)
// GET -> /room/:roomId
router.get('/room/:roomId', roomController.getRoom)

// POST -> /room/add
router.post('/room/add', roomController.addRoom)

// DELETE -> /room/delete/:roomId
router.delete('/room/delete/:roomId', roomController.deleteRoom)

// PUT -> /room/update/:roomId
router.put('/room/update/:roomId', roomController.uppdateRoom)


module.exports = router