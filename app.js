const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors');
const app = express()
// Routers
const authRouters = require('./routers/auth')
const hotelRouters = require('./routers/hotel')
const userRouters = require('./routers/user')
const transactionRouters = require('./routers/transaction')
const dashboardRouters = require('./routers/dashboard')
const roomRouters = require('./routers/room')
////////////////
require('dotenv').config();
// CORS
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Start routers
app.use(authRouters)
app.use(hotelRouters)
app.use(userRouters)
app.use(transactionRouters)
app.use(dashboardRouters)
app.use(roomRouters)

// Connect MongoDB
mongoose.connect(process.env.MONGODB_URL_DEFAULT_SERVER)
    .then(() => {
        console.log("Connected MongoDB")
        // Listening port 5000
        app.listen(5000)
    }).
    catch(err => {
        console.log(err)
    })

