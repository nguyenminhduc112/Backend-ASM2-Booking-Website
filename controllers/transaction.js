const Transaction = require("../models/transaction")

exports.addTransaction = (req, res, next) => {
    const data = req.body
    const transaction = new Transaction({ user: data.user, hotel: data.hotel, room: data.room, dateStart: data.dateStart, dateEnd: data.dateEnd, price: data.price, payment: data.payment, createdAt: new Date(), status: 'Booked' })
    transaction.save()
        .then(result => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(400).send(err)
        })

}

exports.getTransactionByEmail = (req, res, next) => {
    const email = req.params.email
    Transaction.find({ "user.email": email })
        .populate('hotel')
        .then((transactions) => {
            res.status(200).send(transactions)
        })
        .catch(err => {
            res.status(400).send(err)
        })
}

exports.getLastTransaction = (req, res, next) => {
    Transaction.find({})
        .populate('hotel')
        .sort({ createdAt: -1 })
        .limit(8)
        .then((transactions) => {
            res.status(200).send(transactions)
        })
        .catch(err => {
            res.status(400).send(err)
        })
}

exports.getAllTransactions = (req, res, next) => {
    Transaction.find({})
        .populate('hotel')
        .sort({ createdAt: -1 })
        .then((transactions) => {
            res.status(200).send(transactions)
        })
        .catch(err => {
            res.status(400).send(err)
        })
}

