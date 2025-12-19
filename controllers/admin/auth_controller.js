const Account = require("../../models/account_model.js")
const Role = require("../../models/role_model.js")
const md5 = require('md5')
const jwt = require('jsonwebtoken')

// [GET] /admin/auth/login
module.exports.login_get = async (req, res) => {
    try{
        jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY)
        res.redirect("/admin")
    }
    catch{
        res.render("admin/pages/auth/login.pug", {
            titlePage: "Login Page"
        })
    }
}
// [POST] /admin/auth/login
module.exports.login_post = async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    const user = await Account.findOne({email: email, deleted: false})
    if(!user){
        req.flash("error", "Your email is incorrect")
        res.redirect(req.get('referer'))
        return
    }
    if(user.password != md5(password)){
        req.flash("error", "Your password is incorrect")
        res.redirect(req.get('referer'))
        return
    }
    // Generate JWT token
    const token = jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
    )
    res.cookie("token", token, {
        httpOnly: true
    })
    res.redirect("/admin")
}
// [GET] /admin/auth/logout
module.exports.logout = (req, res) => {
    res.clearCookie("token")
    res.redirect("/admin/auth/login")
}