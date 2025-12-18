const Role = require("../../models/role_model.js")
const Account = require("../../models/account_model.js")
// [GET] /admin/role
module.exports.index = async (req, res) => {
    const roles = await Role.find({deleted: false}).lean()
    // Count how many accounts have this role
    for(let i = 0; i < roles.length; i ++){
        const quantity = await Account.countDocuments({
            role: roles[i]._id,
            deleted: false
        })
        roles[i].quantity = quantity
        roles[i].id = roles[i]._id.toString()
    }
    res.render("admin/pages/role/index.pug", {
        titlePage: "Roles Management",
        roles: roles
    })
}
// [GET] /admin/role/create
module.exports.create_get = async (req, res) => {
    const roles = await Role.find({deleted: false})
    res.render("admin/pages/role/create.pug", {
        titlePage: "Create Role",
        all_roles: roles
    })
}
// [POST] /admin/role/create
module.exports.create_post = async (req, res) => {
    await Role.create(req.body)
    req.flash("success", "You have successfully created new role")
    res.redirect(`/admin/role`)
}

// [GET] /admin/role/edit/:id
module.exports.edit_get = async (req, res) => {
    const role = await Role.findById(req.params.id)
    const other_roles = await Role.find({
        deleted: false,
        _id: { $ne: req.params.id }
    })
    res.render("admin/pages/role/edit.pug", {
        titlePage: "Edit Role",
        role: role,
        other_roles: other_roles
    })
}
// [PATCH] /admin/role/edit/:id
module.exports.edit_patch = async (req, res) => {
    // check if the updated name is duplicated
    await Role.updateOne({_id: req.params.id}, {
        name: req.body.name.trim(),
        description: req.body.description.trim()
    })
    req.flash("success", "You have successfully modified role")
    res.redirect("/admin/role")
}

// [DELETE] /admin/role/delete/:id
module.exports.delete = async (req, res) => {
    try{
        const role_id = req.params.id
        // Count how many accounts currently have this category
        const account_no = await Account.countDocuments({role: role_id})
        console.log(account_no)
        if(account_no > 0){
            throw new Error("You can’t delete a role that still has users")
        }
        await Role.updateOne({"_id": role_id}, {"deleted": true, "deleteTime": new Date()})
        req.flash("success", "You have successfully deleted role")
    }
    catch(error){
        req.flash("error", error.message)
    }
    finally{
        res.redirect('/admin/role')
    }
}

// [GET] /admin/role/permission
module.exports.permission_get = async (req, res) => {
    const records = await Role.find({deleted: false})
    res.render("admin/pages/role/permission.pug", {
        titlePage: "Permission Management",
        records: records
    })
}

// [PATCH] /admin/role/permission
module.exports.permission_patch = async (req, res) => {
    const permissions = JSON.parse(req.body.permissions)
    for(let item of permissions){
        await Role.updateOne({_id : item.id}, {permissions: item.permissions})
    }
    req.flash("success", "You have successfully updated role permissions")
    res.redirect("/admin/role/permission")
}