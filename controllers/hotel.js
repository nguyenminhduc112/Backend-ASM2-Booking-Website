
const Hotel = require("../models/hotel")
const Room = require("../models/room")
const Transaction = require("../models/transaction")

exports.getCountHotelCaptionCity = async (req, res, next) => {
    try {
        const countHotelCityHaNoi = await Hotel.countDocuments({ city: 'Ha Noi' })
        const countHotelCityHoChiMinh = await Hotel.countDocuments({ city: 'Ho Chi Minh' })
        const countHotelCityDaNang = await Hotel.countDocuments({ city: 'Da Nang' })
        const data = [
            {
                city: 'Ha Noi',
                count: countHotelCityHaNoi,
                image: "./images/Ha Noi.jpg"
            },
            {
                city: 'Ho Chi Minh',
                count: countHotelCityHoChiMinh,
                image: "./images/HCM.jpg"
            },
            {
                city: 'Da Nang',
                count: countHotelCityDaNang,
                image: "./images/Da Nang.jpg"
            }
        ]
        res.status(200).send(data)
    } catch (error) {
        res.status(404).send(error)
    }
}

exports.getHotel = async (req, res, next) => {
    try {
        const hotelId = req.params.hotelId
        const dateStart = req.query.dateStart || null
        const dateEnd = req.query.dateEnd || null
        if (dateStart && dateEnd) {
            const dateStartCover = new Date(dateStart)
            const dateEndCover = new Date(dateEnd)
            const transactions = await Transaction.find({
                $and: [
                    { hotel: hotelId },
                    {
                        $and: [
                            { 'dateStart': { $lte: dateEndCover } },
                            { 'dateEnd': { $gte: dateStartCover } }
                        ]
                    }
                ]
            })
            console.log(transactions)
            if (transactions.length > 0) {
                const hotel = await Hotel.findOne({ _id: hotelId }).populate('rooms')
                transactions.forEach(transaction => {
                    transaction.room.forEach(r => {
                        hotel.rooms.forEach((roomHotel, indexHotel) => {
                            if (roomHotel._id.toString() === r.roomId.toString()) {
                                roomHotel.roomNumbers.forEach((numberRoom, index) => {
                                    if (r.numberRooms.includes(numberRoom)) {
                                        hotel.rooms[indexHotel].roomNumbers.splice(index, 1)
                                    }
                                })
                            }
                        })
                    })

                })
                res.status(200).send(hotel)
            } else {
                const hotel = await Hotel.findOne({ _id: hotelId }).populate('rooms')
                res.status(200).send(hotel)
            }
        } else {
            const hotel = await Hotel.findOne({ _id: hotelId }).populate('rooms')
            res.status(200).send(hotel)
        }

    } catch (error) {
        res.status(404).send(error)
    }
}



exports.getHotels = (req, res, next) => {
    Hotel.find()
        .then(hotels => {
            res.status(200).send(hotels.reverse())
        })
        .catch(err => {
            res.status(404).send(err)
        })
}

exports.getHotelTop3Rating = (req, res, next) => {
    Hotel.find().sort({ rating: 'desc' }).limit(3)
        .then(hotels => {
            res.status(200).send(hotels)
        })
        .catch(err => {
            res.status(404).send(err)
        })
}


exports.getCountHotelCategory = async (req, res, next) => {
    try {
        const countHoteByTypeHotels = await Hotel.countDocuments({ type: 'hotel' })
        const countHoteByTypeApartmentls = await Hotel.countDocuments({ type: 'apartment' })
        const countHoteByTypeResorts = await Hotel.countDocuments({ type: 'resort' })
        const countHoteByTypeVillas = await Hotel.countDocuments({ type: 'villa' })
        const countHoteByTypeCabins = await Hotel.countDocuments({ type: 'cabin' })
        const data = [
            {
                type: 'Hotels',
                count: countHoteByTypeHotels,
                image: "./images/type_1.webp"
            },
            {
                type: 'Apartments',
                count: countHoteByTypeApartmentls,
                image: "./images/type_2.jpg"
            },
            {
                type: 'Resorts',
                count: countHoteByTypeResorts,
                image: "./images/type_3.jpg"
            },
            {
                type: 'Villas',
                count: countHoteByTypeVillas,
                image: "./images/type_4.jpg"
            },
            {
                type: 'Cabins',
                count: countHoteByTypeCabins,
                image: "./images/type_5.jpg"
            },
        ]
        res.status(200).send(data)

    } catch (error) {
        res.status(404).send(error)
    }
}


exports.searchHotels = async (req, res, next) => {
    try {
        // Query 
        const address = req.query.address || null
        const dateStart = req.query.dateStart || null
        const dateEnd = req.query.dateEnd || null
        const numberPeople = Number(req.query.numberPeople) || null
        const numberRooms = Number(req.query.numberRoom) || null
        // let romm ids
        let roomsIdFormRooms
        let roomsIdFormRoomsFinal
        let roomsIdFormTranscation
        let roomsIdFormTranscationFinal
        // console.log(new Date("10/18/2023").toISOString() < new Date("10/19/2023").toISOString())
        // Check hotels
        const hotels = await Hotel.find()
        // Check number people
        if (numberPeople) {
            roomsIdFormRooms = await Room.find({ maxPeople: { $gte: numberPeople } }).select('_id')
            roomsIdFormRoomsFinal = roomsIdFormRooms.map(room => room._id.toString())
        }

        // Check if hotels have rooms available during that period
        if (dateStart && dateEnd) {
            const dateStartCover = new Date(dateStart)
            const dateEndCover = new Date(dateEnd)
            roomsIdFormTranscation = await Transaction.find({
                $and: [
                    { 'dateStart': { $lte: dateEndCover } },
                    { 'dateEnd': { $gte: dateStartCover } }
                ]
            }).select('room')
            roomsIdFormTranscationFinal = roomsIdFormTranscation.map(room => room.room.map(r => {
                return r.roomId.toString()
            })).flat()
        }
        const hotelsSearch = hotels.filter(hotel => {
            return (address ? hotel.address.toLowerCase().includes(address.toLowerCase()) : true) && (numberPeople ? hotel.rooms.some(room => roomsIdFormRoomsFinal.includes(room.toString())) : true) && (dateStart && dateEnd ? hotel.rooms.every((room, index, rooms) => {
                const roomsTransactionFilter = [...rooms]
                if (roomsIdFormTranscationFinal.includes(room.toString())) {
                    roomsTransactionFilter.splice(index, 1)
                }
                if (roomsTransactionFilter.length === 0) {
                    return false
                }
                return true

            }) : true) && (numberRooms ? hotel.rooms.length >= numberRooms : true)
        })
        res.status(200).send(hotelsSearch)

    } catch (error) {
        res.status(404).send(error)
    }
}

exports.addHotel = async (req, res, next) => {
    try {
        const data = req.body
        const hotel = await new Hotel(data)
        const result = await hotel.save()
        res.status(200).send(result)
    } catch (error) {
        res.status(404).send(error)
    }
}

exports.uppdateHotel = async (req, res, next) => {
    try {
        const hotelId = req.params.hotelId
        const name = req.body.name
        const address = req.body.address
        const cheapestPrice = req.body.cheapestPrice
        const city = req.body.city
        const desc = req.body.desc
        const distance = req.body.distance
        const featured = req.body.featured
        const photos = req.body.photos
        const rooms = req.body.rooms
        const title = req.body.title
        const type = req.body.type
        const rating = req.body.rating
        // Check all data have change
        const updatedHotel = await Hotel.updateOne({ _id: hotelId }, { name: name, address: address, cheapestPrice: cheapestPrice, city: city, desc: desc, distance: distance, featured: featured, photos: photos, rooms: rooms, title: title, type: type, rating: rating })
        if (updatedHotel.modifiedCount > 0) {
            res.status(200).send(updatedHotel)
        } else {
            res.status(201).send(updatedHotel)
        }
    } catch (error) {
        res.status(400).send(error)
    }
}

exports.deleteHotel = async (req, res, next) => {
    try {
        const hotelId = req.params.hotelId
        // Check hotel have transactions
        const transactions = await Transaction.find({ hotel: hotelId })
        if (transactions.length > 0) {
            res.status(404).send({ message: 'The hotel has transactions' })
        } else {
            const result = await Hotel.deleteOne({ _id: hotelId })
            res.status(200).send(result)
        }
    } catch (error) {
        res.status(404).send(error)
    }
}


