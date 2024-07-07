const jwt = require('jsonwebtoken');
const SECRET_KEY = 'supersecret';

function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).send({ status: 'error', message: 'Access Denied' });
    }

    try {
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send({ status: 'error', message: 'Invalid Token' });
    }
}

module.exports = { authenticateToken };
