const mongoose = require('mongoose')
const Schema = mongoose.Schema

const hotelSchema = Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    cheapestPrice: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },

    distance: {
        type: Number,
        required: true
    },
    photos: Array,

    rating: {
        type: Number,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    },

    rooms: [
        {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'Rooms'
        }
    ]

})

module.exports = mongoose.model('Hotels', hotelSchema)