module.exports.checkLogin = (req, res, next) => {
    if(!req.body.email || !req.body.password){
        req.flash("error", "Please fill in required fields")
        res.redirect(req.get('referrer'))
    }
    else{
        next()
    }
}
module.exports.checkRegister = (req, res, next) => {
    if(!req.body.email || !req.body.password || !req.body.fullname){
        req.flash("error", "Please fill in required fields")
        res.redirect(req.get('referrer'))
    }
    else{
        next()
    }
}