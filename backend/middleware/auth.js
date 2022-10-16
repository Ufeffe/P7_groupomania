const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET')
        console.log("-----------------------", decodedToken, "-----------------------");
        const userId = decodedToken.userId
        const role = decodedToken.role
        const username = decodedToken.username
        req.auth = {
            userId: userId,
            role: role,
            username: username
        }
        next()
    } catch (error) {
        res.status(401).json([{ error }])
    }
}