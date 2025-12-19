module.exports.checkLogin = (req, res, next) => {
    if(!req.body.email || !req.body.password){
        req.flash("error", "Please fill in both fields")
        res.redirect(req.get('referrer'))
    }
    else{
        next()
    }
}