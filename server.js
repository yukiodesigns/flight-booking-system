const express = require('express')
const mongoose = require('mongoose')
const auth = require('./routes/auth')
const flight = require('./routes/flight')

const app = express()
app.use(express.json())

app.use('/auth', auth)
app.use('/flight', flight)

mongoose.connect('mongodb://localhost:27017/FlightBookingSystem').then(()=>{ 
    console.log('Connected to Mongodb')
    app.listen(3000, () => {
        console.log('Server is running on port 3000')
    })
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
})