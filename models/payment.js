const mongoose = require('mongoose')
 const paymentSchema = new mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId, ref:'User'},
    flight:{type: mongoose.Schema.Types.ObjectId, ref:'Flight'},
    amount:{type: Number, required: true},
    paymentDate:{type: Date, default: Date.now}
 })

module.exports = mongoose.model('Payment', paymentSchema)