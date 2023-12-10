const User = require('../models/user')
const Transaction = require('../models/transaction')
const { differenceInMonths } = require('date-fns')

exports.getInfoBoard = async (req, res, next) => {
    try {
        const countUsers = await User.countDocuments({ isAdmin: false })
        const countTransaction = await Transaction.countDocuments()
        // Revenue all transactions
        const allTransactions = await Transaction.find({}, "price")
        const revenueTransactions = allTransactions.reduce((total, price) => total + price.price, 0)
        // Average monthly revenue of transactions
        const startDate = new Date('2023-08-30')
        const currentDate = new Date()
        const numberOfMonths = differenceInMonths(currentDate, startDate)
        const averageMonthlyRevenue = revenueTransactions / numberOfMonths
        res.status(200).send({ countUsers, countTransaction, revenueTransactions, averageMonthlyRevenue })
    } catch (error) {
        res.status(404).send(error)
    }
}