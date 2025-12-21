const Account = require("../../models/account_model.js")
const md5 = require('md5')
// [GET] /admin/my_account
module.exports.index = (req, res) => {
    res.render("admin/pages/my_account/index.pug", {
        titlePage: "My Account"
    })
}
// [PATCH] /admin/my_account/edit/:id
module.exports.edit = async (req, res) => {
    // check if the updated name is duplicated
    delete req.body.role
    if(req.body.password == ""){
        delete req.body.password
    }
    else{
        req.body.password = md5(req.body.password)
    }
    await Account.updateOne({_id: req.params.id}, req.body)
    req.flash("success", "Successfully modified your account")
    res.redirect("/admin/my_account")
}