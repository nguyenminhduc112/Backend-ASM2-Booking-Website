const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        default: 'User'
    },
    phoneNumber: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Users', userSchema)