const Account = require("../../models/account_model.js")
const Role = require("../../models/role_model.js")
const md5 = require('md5')
// [GET] /admin/account
module.exports.index = async (req, res) => {
    const accounts = await Account .find({deleted: false})
                                .select("-password")
                                .populate("role")
    res.render("admin/pages/account/index.pug", {
        titlePage: "Accounts",
        accounts: accounts
    })
}
// [GET] /admin/account/create
module.exports.create_get = async (req, res) => {
    const roles = await Role.find({deleted: false})
    res.render("admin/pages/account/create.pug", {
        titlePage: "Create Account",
        roles: roles
    })
}
// [POST] /admin/account/create
module.exports.create_post = async(req, res) => {
    req.body.password = md5(req.body.password)
    await Account.create(req.body)
    req.flash("success", "You have successfully created new account")
    res.redirect("/admin/account")
}

// [GET] /admin/account/edit/:id
module.exports.edit_get = async (req, res) => {
    const account = await Account.findById(req.params.id).select("-password")
    const roles = await Role.find({deleted: false})
    res.render("admin/pages/account/edit.pug", {
        titlePage: "Edit Account",
        account: account,
        roles: roles
    })
}
// [PATCH] /admin/account/edit/:id
module.exports.edit_patch = async (req, res) => {
    // check if the updated name is duplicated
    if(req.body.password == ""){
        delete req.body.password
    }
    else{
        req.body.password = md5(req.body.password)
    }
    await Account.updateOne({_id: req.params.id}, req.body)
    req.flash("success", "You have successfully modified account")
    res.redirect(req.get("referrer"))
}


// [DELETE] /admin/account/delete/:id
module.exports.delete = async (req, res) => {
    try{
        const account_id = req.params.id
        await Account.updateOne({"_id": account_id}, {"deleted": true, "deleteTime": new Date()})
        req.flash("success", "You have successfully deleted account")
    }
    catch(error){
        req.flash("error", error.message)
    }
    finally{
        res.redirect('/admin/account')
    }
}