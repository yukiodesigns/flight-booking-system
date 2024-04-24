const express = require('express')
const router = express.Router()
const {bookFlight, getFlight, confirmAttendance, confirmFlight, paidFlight} = require('../controllers/flight')

router.post('/book', authMiddleware, bookFlight)
router.get('/', getFlight)
router.post('/confirm-attendance', authMiddleware, confirmAttendance)
router.post('/confirm-flight', authMiddleware, confirmFlight)
router('/pay', authMiddleware, paidFlight)

module.exports = router