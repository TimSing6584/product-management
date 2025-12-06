const Product = require("../../models/product_model.js")
const filterStockHelper = require("../../helpers/filter_stock.js")
const searchHelper = require("../../helpers/search.js")
const paginationHelper = require("../../helpers/pagination.js")
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
    let pagination = paginationHelper(req, 4, total_products) // limit item per page is 4

    const filterProducts = await Product.find(filter)
                                        .limit(pagination.limitItems)
                                        .skip((pagination.currentPage - 1) * pagination.limitItems)
                                        .sort({position: 1})
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
module.exports.create_get = (req, res) => {
    res.render("admin/pages/products/create.pug", {
        titlePage: "Create New Product"
    })
}

// [POST] /admin/product/create
module.exports.create_post = async (req, res) => {
    const newProduct = req.body
    if(newProduct.position == ""){
        const countProducts = await Product.countDocuments()
        newProduct.position = countProducts + 1
    }
    await Product.create({
        title: newProduct.title,
        price: parseInt(newProduct.price),
        discountPercentage:parseInt(newProduct.discountPercentage),
        stock: parseInt(newProduct.stock),
        images: newProduct.images,
        deleted: false,
        category: newProduct.category,
        // deleteTime: Date,
        position: parseInt(newProduct.position),
        description: newProduct.description
    })
    req.flash("success", "You have successfully created new product")
    res.redirect('/admin/product')
}