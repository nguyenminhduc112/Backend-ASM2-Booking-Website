const md5 = require('md5')
const User = require('../models/user')

exports.postUser = (req, res, next) => {
    const username = req.body.username
    const password = md5(req.body.password)
    const fullName = req.body.fullName
    const phoneNumber = req.body.phoneNumber
    const email = req.body.email
    const isAdmin = Boolean(req.body.isAdmin) || false

    const user = new User({ username: username, password: password, fullName: fullName, phoneNumber: phoneNumber, email: email, isAdmin: isAdmin })

    user.save()
        .then((result) => {
            res.status(200).send(result)
        })
        .catch((err) => {
            res.status(400).send({ message: err })
        })
}

exports.Login = (req, res, next) => {
    const password = md5(req.body.password)
    const email = req.body.email

    User.findOne({ email: email, password: password })
        .then((result) => {
            if (result === null) {
                res.status(404).send({ error: 'User does not exist' })
            } else {
                res.status(200).send(result)
            }

        })
        .catch((err) => {
            res.status(400).send({ message: err })
        })
}


exports.LoginAdmin = (req, res, next) => {
    const password = md5(req.body.password)
    const email = req.body.email

    User.findOne({ email: email, password: password, isAdmin: true })
        .then((result) => {
            if (result === null) {
                res.status(404).send({ error: 'User does not exist' })
            } else {
                res.status(200).send(result)
            }

        })
        .catch((err) => {
            res.status(400).send({ message: err })
        })
}