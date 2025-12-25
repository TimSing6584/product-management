const Cart = require("../../models/cart_model.js")
const Product = require("../../models/product_model.js")
const Order = require("../../models/order_model.js")
const cart_info_helper = require("../../helpers/get_cart_info.js")
// [GET] /checkout
module.exports.index = async (req,res) => {
    const cartInfo = await cart_info_helper(res.locals.cart.products)
    res.locals.totalPrice = cartInfo.totalPrice
    res.render("client/pages/checkout/index.pug", {
        titlePage: "Check Out",
        products: cartInfo.products
    })
}
// [POST] /checkout/order
module.exports.order = async (req,res) => {
    const userInfo = req.body
    const cartInfo = await cart_info_helper(res.locals.cart.products)
    const userId = res.locals.user ? res.locals.user._id : ""
    const order = new Order({
        cartId: req.cookies.cartId,
        userInfo: userInfo,
        products: cartInfo.products,
        totalPrice: cartInfo.totalPrice,
        userId: userId
    })
    await order.save()
    // Decrement stock and Increment sold of each product
    for(const p of res.locals.cart.products) {
        await Product.updateOne(
            {_id: p.product_id},
            {
                $inc: {
                    stock: -p.quantity, // decrease stock
                    sold: p.quantity    // increase sold
                }
            }
        )
    }


    res.redirect(`/checkout/success/${order._id}`)
}
// [GET] /checkout/success/:order_id
module.exports.success = async (req,res) => {
    const order = await Order.findById(req.params.order_id)
    const { cartId, userInfo, products, totalPrice } = order
    await Cart.updateOne({_id: cartId}, {
        products: []
    })
    res.render("client/pages/checkout/success.pug", {
        titlePage: "Finished Order",
        userInfo: userInfo,
        products: products,
        totalPrice: totalPrice
    })
}