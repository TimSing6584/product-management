const Product = require("../../models/product_model.js")

// [GET] /admin/product
module.exports.index = async (req, res) => {
    let filter = {
        deleted: false
    }
    if (req.query.stock === "instock"){
        filter.stock = {$gt: 0}
    }
    else if(req.query.stock === "outofstock"){
        filter.stock = {$lte: 0}
    }
    // Define filter buttons
    let filterButtons = [
        {
            buttonName: "All",
            stock: "",
            class: req.query.stock === undefined ? "active" : ""
        },
        {
            buttonName: "In stock",
            stock: "instock",
            class: req.query.stock === "instock" ? "active" : ""
        },
        {
            buttonName: "Out of stock",
            stock: "outofstock",
            class: req.query.stock === "outofstock" ? "active" : ""
        }
    ]

    const fileredProducts = await Product.find(filter)
    res.render("admin/pages/products/index.pug", {
        titlePage: "Admin Product Page",
        products: fileredProducts,
        filterButtons: filterButtons
    })
    // console.log(allProducts)
}