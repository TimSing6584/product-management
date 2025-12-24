const Cart = require("../../models/cart_model.js")
const Product = require("../../models/product_model.js")
const Order = require("../../models/order_model.js")
// [GET] /checkout
module.exports.index = async (req,res) => {
    console.log(res.locals.totalPrice)
    let products = []
    let totalPrice = 0
    for(let obj of res.locals.cart.products){
        let product = await Product.findById(obj.product_id).lean()
        product.priceNew = (((100 - product.discountPercentage) * product.price) / 100).toFixed(0)
        product.totalPrice = product.priceNew * obj.quantity
        product.quantity = obj.quantity
        totalPrice += product.totalPrice
        products.push(product)
    }
    res.locals.totalPrice = totalPrice
    res.render("client/pages/checkout/index.pug", {
        titlePage: "Check Out",
        products: products
    })
}