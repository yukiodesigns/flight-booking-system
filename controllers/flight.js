const User = require('../models/user')
const Flight = require('../models/flight')
const Payment = require('../models/payment')

exports.bookFlight = async (req, res) =>{
    try {
        const {flightNumber} = req.body
        const user = await User.findById(req.userId)
        const flight = await Flight.findOne({flightNumber})

        if(!flight){
            return res.status(404).json({message: 'No flight found'})
        }

        if (flight.paymentRequired) {
            return res.status(400).json({ message: 'Payment required before booking' });
        }

        flight.passengers.push(user)
        user.flights.push(flight)

        await flight.save()
        await user.save()
        res.json({message: 'Flight booked successfully'})
    } catch (error) {
        res.json(500).json({message: 'Flight not booked'})
    }
}

exports.getFlight = async (req, res) => {
    try {
       const user = await User.findById(req.userId).populate('flights')
       res.json(user.flights) 
    } catch (error) {
        res.json(500).json({message: 'Failed to fetch flights'})
    }
}

exports.confirmAttendance = async (req, res) =>{
    try {
       const {flightNumber} = req.body
       const user = await User.findById(req.userId)
       const flight = await Flight.findOne({flightNumber})

       if(!flight){
        return res.status(404).json({message: 'No flight found'})
       }
       if(flight.attendant.toString() !== user.id){
        return res.status(404).json({message: 'You are not the attendant'})
       }

       flight.passengers.forEach((passenger)=>{
        user.attendedFLights.push(passenger)
       })

       await user.save()
       res.json({message: 'Attendance confirmed'})
    } catch (error) {
        res.json(500).json({message: 'Flight not booked'})
    }
}

exports.confirmFlight = async (req, res) =>{
    try {
       const {flightNumber} = req.body
       const user = await User.findById(req.userId)
       const flight = await Flight.findOne({flightNumber})

       if(!flight){
        return res.status(404).json({message: 'No flight found'})
       }
       if(flight.pilot.toString() !== user.id){
        return res.status(404).json({message: 'You are not the pilot'})
       }

       flight.passengers.forEach((passenger)=>{
        user.attendedFLights.push(passenger)
       })

       await user.save()
       res.json({message: 'Flight confirmed'})
    } catch (error) {
        res.json(500).json({message: 'Flight not booked'})
    }
}

exports.paidFlights = async (req, res) =>{
    try {
       const { flightNumber, amount } = req.body;
        const user = await User.findById(req.userId);

        const flight = await Flight.findOne({ flightNumber });

        if (!flight) {
            return res.status(404).json({ message: 'Flight not found' });
        }

        const payment = new Payment({
            user: user._id,
            flight: flight._id,
            amount
        });

        await payment.save();

        flight.payment = payment._id;
        flight.paymentRequired = false;

        await flight.save();

        res.json({ message: 'Payment successful', payment }); 
    } catch (error) {
        res.json(500).json({message: 'PAyment Failed'})
    }
}