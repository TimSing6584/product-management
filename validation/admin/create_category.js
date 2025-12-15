// This validator is re-used for both CREATE + EDIT category
const Category = require("../../models/category_model.js")
module.exports.create_category = async (req, res, next) => {
    // Make sure category name is not empty
    try{
        // Prevent the case when user tries to open dev tool to delete required keyword
        if(req.body.name == ""){
            throw new Error("Category can not be empty")
        }
        // Check if category already exists
        const query = {
            name: req.body.name,
            deleted: false
        }

        // If editing -> /:id on url, exclude current category
        // If creating -> no /:id on url
        if (req.params.id) {
            query._id = { $ne: req.params.id }
        }

        const existed = await Category.findOne(query)
        if(existed){
            throw new Error("Your updated name already exists")
        }
        next()
    }
    catch(error){
        req.flash("error", error.message)
        res.redirect(req.get('referer'))
    }
}