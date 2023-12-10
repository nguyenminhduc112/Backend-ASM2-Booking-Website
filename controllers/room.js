const Room = require("../models/room")
const Transaction = require("../models/transaction")

exports.getAllRooms = (req, res, next) => {
    Room.find({})
        .sort({ createdAt: -1 })
        .then(rooms => {
            res.status(200).send(rooms)
        })
        .catch(err => {
            res.status(404).send(err)
        })
}

exports.getRoom = (req, res, next) => {
    const { roomId } = req.params
    Room.findById(roomId)
        .then(room => {
            res.status(200).send(room)
        })
        .catch(err => {
            res.status(404).send(err)
        })
}

exports.addRoom = async (req, res, next) => {
    try {
        const data = req.body
        const room = await new Room(data)
        const result = await room.save()
        res.status(200).send(result)
    } catch (error) {
        res.status(404).send(error)
    }
}

exports.uppdateRoom = async (req, res, next) => {
    try {
        const { roomId } = req.params
        const price = req.body.price
        const desc = req.body.desc
        const roomNumbers = req.body.roomNumbers
        const title = req.body.title
        const updatedAt = req.body.updatedAt
        const maxPeople = req.body.maxPeople
        const updatedRoom = await Room.updateOne({ _id: roomId }, { price: price, desc: desc, roomNumbers: roomNumbers, title: title, maxPeople: maxPeople })
        if (updatedRoom.modifiedCount > 0) {
            await Room.updateOne({ _id: roomId }, { updatedAt: updatedAt })
            res.status(200).send(updatedRoom)
        } else {
            res.status(201).send(updatedRoom)
        }
    } catch (error) {
        res.status(404).send(error)
    }
}

exports.deleteRoom = async (req, res, next) => {
    try {
        const roomId = req.params.roomId
        // Check room have transactions
        const transactions = await Transaction.find({}, 'room')
        const checkRooms = transactions.filter(transation => transation.room.some(room => room.roomId.toString() === roomId.toString()))
        if (checkRooms.length > 0) {
            res.status(404).send({ message: 'The room has transactions' })
        } else {
            const result = await Room.deleteOne({ _id: roomId })
            res.status(200).send(result)
        }
    } catch (error) {
        res.status(404).send(error)
    }
}