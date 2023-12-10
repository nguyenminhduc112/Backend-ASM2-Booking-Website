const express = require('express')
const router = express.Router()
// Controllers
const transactionController = require('../controllers/transaction')

// POST -> /transaction/add
router.post('/transaction/add', transactionController.addTransaction)

// GET -> /transactions/:email
router.get('/transactions/:email', transactionController.getTransactionByEmail)

// GET -> /transactions/last
router.get('/transactionsLast', transactionController.getLastTransaction)

// GET -> /transactions/last
router.get('/transactionsAll', transactionController.getAllTransactions)

module.exports = router