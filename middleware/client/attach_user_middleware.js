const jwt = require("jsonwebtoken")
const User = require("../../models/user_model.js")
module.exports.attachUser  = async (req, res, next) => {
    const token = req.cookies.tokenUser

    if(!token) {
        res.locals.user = null
        return next()
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const user = await User.findById(decoded.user_id).select("-password")
        res.locals.user = user
        // if verify passes, just continue
    } catch (err) {
        res.locals.user = null
    }
    next()
}
