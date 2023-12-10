const express = require('express')
const router = express.Router()
// Controllers
const hotelController = require('../controllers/hotel')

router.get('/', (req, res, next) => {
    res.send('Success Routers')
})

// GET -> /hotel/count/captioncity
router.get('/hotel/count/captioncity', hotelController.getCountHotelCaptionCity)
// GET -> /hotel/count/category
router.get('/hotel/count/category', hotelController.getCountHotelCategory)
// GET -> /hotel/top3/rating
router.get('/hotel/top3/rating', hotelController.getHotelTop3Rating)
// GET -> /hotel/search
router.get('/hotel/search', hotelController.searchHotels)
// GET -> /hotel/:hotelId
router.get('/hotel/:hotelId', hotelController.getHotel)
// GET -> /hotels
router.get('/hotels', hotelController.getHotels)
// DELETE -> /hotels
router.delete('/hotel/:hotelId', hotelController.deleteHotel)
// POST -> /hotel/add
router.post('/hotel/add', hotelController.addHotel)
// PUT -> /hotel/update/:hotelId
router.put('/hotel/update/:hotelId', hotelController.uppdateHotel)

module.exports = router