const jwt = require("jsonwebtoken")
const Role = require("../../models/role_model.js")
const Account = require("../../models/account_model.js")
module.exports.requireAuth = async (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        return res.redirect("/admin/auth/login")
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const role = await Role.findById(decoded.role_id).select("name permissions")
        const account = await Account.findById(decoded.account_id).select("-password")
        res.locals.role = role
        res.locals.account = account
        // if verify passes, just continue
        next()
    } catch (err) {
        return res.redirect("/admin/auth/login")
    }
}
