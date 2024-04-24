const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, config.secretKey);
        req.userId = decoded.userId;
        req.role = decoded.role;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};
