const Category = require("../../models/category_model.js")
const Product = require("../../models/product_model.js")
// [GET] /admin/category
module.exports.index = async (req, res) => {
    const categories = await Category.find({deleted: false}).lean()
    // Count how many products have this category
    for(let i = 0; i < categories.length; i ++){
        const quantity = await Product.countDocuments({category: categories[i]._id})
        categories[i].quantity = quantity
    }
    console.log(categories)
    res.render("admin/pages/category/index.pug", {
        categories: categories
    })
}