module.exports.create_product = (req, res, next) => {
    // Make sure required fileds are not empty
    // In case someone goes to devtool to delete keyword "required"
    const newProduct = req.body
    if(!newProduct.title || !newProduct.price || !newProduct.stock){
        req.flash("error", "Please fill in required fileds")
        res.redirect(req.get('referer'))
        return
    }
    next()
}