const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique:true },
    password: {type: String, required: true },
    role:{type: String, enum:['pilot', 'attendant', 'passenger'], required: true},
    flights:[{type: mongoose.Schema.Types.ObjectId, ref:'Flight'}],
    attendedFLights:[{type: mongoose.Schema.Types.ObjectId, ref:'Flight'}]
})

userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

userSchema.methods.comparePassword = async function(cPassword){
    return await bcrypt.compare(cPassword, this.password)
}

module.exports = mongoose.model('User', userSchema)