const Product = require("../../models/product_model.js")

// [GET] /product
module.exports.index = async (req, res) => {
    const render_product = await Product.find({
        deleted: false,
        stock: { $gt: 0 },

    }).sort({position: -1}) // sort the product by position to display (display newest first)
    res.render("client/pages/products/index.pug", {
        titlePage: "Product Page",
        products: render_product
    })
}

// [GET] /product/:slug
module.exports.detail = async (req, res) => {
    // ADD pagination later
    try{
        const product_slug = req.params.slug
        const product = await Product.findOne({slug: product_slug})
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