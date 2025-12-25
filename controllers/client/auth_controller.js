const User = require("../../models/user_model.js")
const md5 = require('md5')
const jwt = require('jsonwebtoken')
// [GET] /auth/preview
module.exports.preview = async (req,res) => {
    res.render("client/pages/auth/preview.pug")
}
// [GET] /auth
module.exports.index = async (req,res) => {
    try{
        jwt.verify(req.cookies.tokenUser, process.env.JWT_SECRET_KEY)
        res.redirect("/")
    }
    catch{
        res.render("client/pages/auth/index.pug")
    }
}


// [POST] /user/register
module.exports.register = async (req,res) => {
    const emailExisted = await User.findOne({
        email: req.body.email,
        deleted: false
    })
    if(emailExisted){
        req.flash("error", "Email has already existed")
    }
    else{
        req.body.password = md5(req.body.password)
        await User.create(req.body)
        req.flash("success", "You have successfully created account")
    }
    res.redirect(req.get('referrer'))
}

// [POST] /user/login
module.exports.login = async (req,res) => {
    const email = req.body.email
    const password = req.body.password
    const user = await User.findOne({email: email, deleted: false})
    if(!user){
        req.flash("error", "Email is incorrect")
        res.redirect(req.get('referer'))
        return
    }
    if(user.password != md5(password)){
        req.flash("error", "Password is incorrect")
        res.redirect(req.get('referer'))
        return
    }

    // Generate JWT token
    const token = jwt.sign(
        {
            user_id: user._id,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
    )
    res.cookie("tokenUser", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 1000 * 60 * 60 * 24
    })
    res.redirect("/")
}

// [GET] /auth/logout
module.exports.logout = (req, res) => {
    res.clearCookie("tokenUser")
    res.redirect("/")
}