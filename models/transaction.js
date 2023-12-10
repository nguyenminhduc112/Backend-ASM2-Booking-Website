const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = Schema({
    user: {
        type: Object,
        required: true,
    },
    hotel: {
        type: mongoose.Types.ObjectId,
        ref: 'Hotels',
        required: true
    },
    room: [
        {
            roomId: {
                type: mongoose.Types.ObjectId,
                required: true,
                ref: 'Rooms'
            },
            numberRooms: [
                {
                    type: Number,
                    required: true
                }
            ]
        }
    ],
    dateStart: {
        type: Date,
        required: true
    },
    dateEnd: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    },

    payment: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        required: true
    },

    status: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Transactions', transactionSchema)