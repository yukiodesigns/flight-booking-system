const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

exports.register = async (req, res)=>{
    try {
        const {name, password, role} = req.body
        const user = new User({name, password, role});
        await user.save();
        res.status(201).json({message: "User registered"})
    } catch (error) {
        res.status(500).json({message: "User not registered", error})
    }
}

exports.login = async (req, res) =>{
    try {
        const {name, password} = req.body
        const user = await User.findOne({name})

        if(!user || ! await user.comparePassword(password)){
            return res.status(401).json({message: "Invalid details"})
        }
        const token = jwt.sign({userId: user.id, role: user.role}, config.secretKey)
        res.json({token})
        
    } catch (error) {
        res.status(500).json({message: "User not logged in", error})
    }
}