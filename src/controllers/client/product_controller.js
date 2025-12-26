const Product = require("../../models/product_model.js")
const Category = require("../../models/category_model.js")
const searchHelper = require("../../helpers/search.js")
const paginationHelper = require("../../helpers/pagination.js")
// [GET] /product
module.exports.index = async (req, res) => {
    let query = {
        deleted: false,
        stock: { $gt: 0 }, // only display products that are in stock
    }
    if(req.query.category){
        query.category = {$in: req.query.category.split("_")}
    }
    if(req.query.price){
        const priceRanges = req.query.price.split("_")
        query.$or = priceRanges.map(range => {
            const [min, max] = range.split("-").map(Number)
            return {
                price: {
                    $gte: min,
                    $lte: max
                }
            }
        })
    }
    // Filter by search keyword:
    const last_search_word = searchHelper(req)
    if(last_search_word){
        query.title = {$regex: last_search_word, $options: "i"}
    }
    // Pagination
    const total_products = await Product.countDocuments(query)
    let pagination = paginationHelper(req, 12, total_products) // limit item per page is 12
    const render_product = await Product.find(query)
                                        .limit(pagination.limitItems)
                                        .skip((pagination.currentPage - 1) * pagination.limitItems)
                                        .sort({
                                            discountPercentage: "desc",
                                            position: "desc"
                                        }) // sort the product by position to display (display newest first)
    const categories = await Category.find({deleted: false})
    res.render("client/pages/products/index.pug", {
        titlePage: "Product Page",
        products: render_product,
        categories: categories,
        last_search_word: last_search_word,
        show_search: true,
        pagination: pagination
    })
}

// [GET] /product/:slug
module.exports.detail = async (req, res) => {
    // ADD pagination later
    try{
        const product_slug = req.params.slug
        const product = await Product.findOne({slug: product_slug}).populate("category")
        res.render("client/pages/products/detail.pug", {
            titlePage: product.title,
            product: product
        })
    }
    catch(error){
        // req.flash("error", "Can't access")
        res.redirect(`/product`)
    }
}