const mongoose = require('mongoose')

const flightSchema = new mongoose.Schema({
    flightNumber:{type: String, required: true, unique:true},
    destination:{type: String, required: true},
    date:{type: Date, required: true},
    passengers:[{type: mongoose.Schema.Types.ObjectId, ref:'User'}],
    pilot:{type: mongoose.Schema.Types.ObjectId, ref:'User'},
    attendant:{type: mongoose.Schema.Types.ObjectId, ref:'User'},
    paymentRequired: { type: Boolean, default: true },
    payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }
})
 module.exports = mongoose.model('Flight', flightSchema)