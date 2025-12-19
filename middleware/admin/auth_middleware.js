const jwt = require("jsonwebtoken")
const Role = require("../../models/role_model.js")
module.exports.requireAuth = async (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        return res.redirect("/admin/auth/login")
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const userRole = await Role.findById(decoded.role).select("name permissions")
        res.locals.role = userRole
        res.locals.userId = decoded.id
        // if verify passes, just continue
        next()
    } catch (err) {
        return res.redirect("/admin/auth/login")
    }
}
