const Category = require("../../models/category_model.js")
const Product = require("../../models/product_model.js")


// [GET] /admin/category
module.exports.index = async (req, res) => {
    const categories = await Category.find({deleted: false}).lean()
    // lean() converts to plain JS object
    // Count how many products have this category
    for(let i = 0; i < categories.length; i ++){
        const quantity = await Product.countDocuments({
            category: categories[i]._id,
            deleted: false
        })
        categories[i].quantity = quantity
        categories[i].id = categories[i]._id.toString()
    }
    res.render("admin/pages/category/index.pug", {
        titlePage: "Admin Product Category",
        categories: categories
    })
}

// [GET] /admin/category/edit/:id
module.exports.edit_get = async (req, res) => {
    const category = await Category.findById(req.params.id)
    const other_categories = await Category.find({
        deleted: false,
        _id: { $ne: req.params.id }
    })
    res.render("admin/pages/category/edit.pug", {
        titlePage: "Edit Category",
        category: category,
        other_categories: other_categories
    })
}
// [PATCH] /admin/category/edit/:id
module.exports.edit_patch = async (req, res) => {
    // check if the updated name is duplicated
    await Category.updateOne({_id: req.params.id}, {name: req.body.name.trim()})
    req.flash("success", "You have successfully modified category")
    res.redirect("/admin/category")
}
// [DELETE] /admin/category/delete/:id
module.exports.delete = async (req, res) => {
    try{
        const category_id = req.params.id
        // Count how many products currently have this category
        const products_no = await Product.countDocuments({category: category_id})
        if(products_no > 0){
            throw new Error("You can’t delete a category that still has products")
        }
        await Category.updateOne({"_id": category_id}, {"deleted": true, "deleteTime": new Date()})
        req.flash("success", "You have successfully deleted product")
    }
    catch(error){
        req.flash("error", error.message)
    }
    finally{
        res.redirect('/admin/category')
    }
}

// [GET] /admin/category/create
module.exports.create_get = async (req, res) => {
    const categories = await Category.find({deleted: false})
    res.render("admin/pages/category/create.pug", {
        titlePage: "Create Category",
        all_categories: categories
    })
}
// [POST] /admin/category/create
module.exports.create_post = async (req, res) => {
    await Category.create(req.body)
    req.flash("success", "You have successfully created new category")
    res.redirect(`/admin/category`)
}