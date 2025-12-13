const Product = require("../../models/product_model.js")
const Category = require("../../models/category_model.js")
const filterStockHelper = require("../../helpers/filter_stock.js")
const searchHelper = require("../../helpers/search.js")
const paginationHelper = require("../../helpers/pagination.js")
const { ITEMS_PER_PAGE } = require("../../config/pagination.js")
// [GET] /admin/product
module.exports.index = async (req, res) => {
    let filter = {
        deleted: false
    }
    // Filter by stock
    if (req.query.stock === "instock"){
        filter.stock = {$gt: 0}
    }
    else if(req.query.stock === "outofstock"){
        filter.stock = {$lte: 0}
    }

    // Define filter buttons, list of buttons we render on the page for client to filter
    let filterButtons = filterStockHelper(req)

    // Filter by search keyword:
    const last_search_word = searchHelper(req)
    if(last_search_word){
        filter.title = {$regex: last_search_word, $options: "i"}
    }

    // Pagination
    const total_products = await Product.countDocuments(filter)
    let pagination = paginationHelper(req, ITEMS_PER_PAGE, total_products) // limit item per page is 4
    // Sort products by criteria
    let sortKey = "position" // by default we sort by ascending position
    let sortValue ="asc"
    if(req.query.sortKey){
        sortKey = req.query.sortKey
    }
    if(req.query.sortValue){
        sortValue = req.query.sortValue
    }

    const filterProducts = await Product.find(filter)
                                        .limit(pagination.limitItems)
                                        .skip((pagination.currentPage - 1) * pagination.limitItems)
                                        .sort({[sortKey]: sortValue})
                                        .populate("category")
    res.render("admin/pages/products/index.pug", {
        titlePage: "Admin Product Page",
        products: filterProducts,
        filterButtons: filterButtons,
        last_search_word: last_search_word,
        pagination: pagination
    })
}

// [PATCH] /admin/product/change-stock/:current_stock/:counter_value/:id
module.exports.changeStock = async (req, res) => {
    const counter_value = req.params.counter_value
    const product_id = req.params.id

    // find the target product and its current stock value
    const target_product = await Product.findOne({"_id": product_id})
    const current_stock = target_product.stock
    if(counter_value === "decrement"){
        if(current_stock > 0){
            await target_product.updateOne({stock: current_stock - 1})
        }
    }
    else{
        await target_product.updateOne({stock: current_stock + 1})
    }
    req.flash("success", "You have successfully changed stock number")
    res.redirect(req.get('referer') || '/admin/product') // referer is the contains the address from which a resource has been requested
}
// [PATCH] /admin/product/change-multi
module.exports.changeMulti = async (req, res) => {
    // back end receives data from form submission in req.body
    const actionType = req.body.type
    const ids = req.body.ids.split(",") // convert the string of ids on the url
    switch(actionType){
        case "delete":
            await Product.updateMany({_id: {$in: ids}}, {$set: {deleted: true, deleteTime: new Date()}})
            req.flash("success", "You have successfully deleted products")
            break
        case "change-position":
            for(let id_pos of ids){
                let [id, position] = id_pos.split("-")
                //  because 'change-position' is a special case where ids has the form [id-pos]
                await Product.updateOne({_id: id}, { $set: { position: parseInt(position)}})
            }
            req.flash("success", "You have successfully changed products' position")
            break
        default:
            break
    }
    res.redirect(req.get('referer') || '/admin/product')

}

// [DELETE] /admin/product/delete/:id
module.exports.delete = async (req, res) => {
    const product_id = req.params.id
    await Product.updateOne({"_id": product_id}, {"deleted": true, "deleteTime": new Date()})
    req.flash("success", "You have successfully deleted product")
    res.redirect(req.get('referer') || '/admin/product')
}

// [GET] /admin/product/create
module.exports.create_get = async (req, res) => {
    const currentPage = parseInt(req.query.page)
    const categories = await Category.find({deleted: false})
    res.render("admin/pages/products/create.pug", {
        titlePage: "Create New Product",
        currentPage: currentPage,
        categories: categories
    })
}

// [POST] /admin/product/create
module.exports.create_post = async (req, res) => {
    const newProduct = req.body
    // Determine the page to render back after creating
    const totalDocuments = await Product.countDocuments()
    const renderPage = Math.ceil((totalDocuments + 1) / ITEMS_PER_PAGE)

    if(newProduct.position == ""){
        newProduct.position = totalDocuments + 1
    }
    if(newProduct.discountPercentage == ""){
        newProduct.discountPercentage = 0
    }
    await Product.create(newProduct)
    req.flash("success", "You have successfully created new product")
    res.redirect(`/admin/product?page=${renderPage}`)
}

// [GET] /admin/product/edit/:id
module.exports.edit_get = async (req, res) => {
    const currentPage = req.query.page
    const categories = await Category.find({deleted: false})
    try{
        const product_id = req.params.id
        const product = await Product.findById(product_id)
        res.render("admin/pages/products/edit.pug", {
            titlePage: "Edit Product",
            product: product,
            currentPage: currentPage,
            categories: categories
        })
    }
    catch(error){
        req.flash("error", "Can't access")
        res.redirect(`/admin/product?page=${currentPage}`)
    }
}

// [PATCH] /admin/product/edit/:id
module.exports.edit_patch = async (req, res) => {
    const currentPage = req.query.page
    try{
        const id = req.params.id;
        const data = req.body; // title, price, stock, etc.

        await Product.updateOne({ _id: id }, data);
        req.flash("success", `You have modified ${data.title}`)
    }
    catch(error){
        req.flash("error", "Can't access")
    }
    finally{
        res.redirect(`/admin/product?page=${currentPage}`)
    }
}

// [GET] /admin/product/detail/:id
module.exports.detail = async (req, res) => {
    const currentPage = req.query.page
    try{
        const product_id = req.params.id
        const product = await Product.findById(product_id).populate("category")
        res.render("admin/pages/products/detail.pug", {
            titlePage: product.title,
            product: product,
            currentPage: currentPage
        })
    }
    catch(error){
        req.flash("error", "Can't access")
        res.redirect(`/admin/product?page=${currentPage}`)
    }
}