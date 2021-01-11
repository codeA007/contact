const jwt = require('jsonwebtoken');

verifyToken = (req, res, next) => {
    const authToken = req.get('Authorization');
    let decodedToken;
    try {
        decodedToken = jwt.verify(authToken, 'secret');
        console.log(decodedToken);
    }
    catch (err) {
        console.log(err);
    }
    if (!decodedToken) {
        return res.status(401).json({ 'message': 'not verified' })
    }
    req.userId = decodedToken.id;
    console.log(decodedToken.id);
    next();
}
module.exports = verifyToken;