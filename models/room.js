const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roomSchema = Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    maxPeople: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    roomNumbers: Array,
    createdAt: Date,
    updatedAt: Date
})

module.exports = mongoose.model('Rooms', roomSchema)