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

    const filterProducts = await Product.find(filter).limit(pagination.limitItems).skip((pagination.currentPage - 1) * pagination.limitItems)
    res.render("admin/pages/products/index.pug", {
        titlePage: "Admin Product Page",
        products: filterProducts,
        filterButtons: filterButtons,
        last_search_word: last_search_word,
        pagination: pagination
    })
}