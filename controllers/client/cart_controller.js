const Cart = require("../../models/cart_model.js")
const Product = require("../../models/product_model.js")
// [GET] /cart
module.exports.index = async (req, res) => {
    let products = []
    let totalPrice = 0
    for(let obj of res.locals.cart.products){
        let product = await Product.findById(obj.product_id).lean()
        product.price = (((100 - product.discountPercentage) * product.price) / 100).toFixed(0)
        product.totalPrice = product.price * obj.quantity
        product.quantity = obj.quantity
        totalPrice += product.totalPrice

        products.push(product)
    }
    res.locals.totalPrice = totalPrice
    res.render("client/pages/cart/index.pug", {
        titlePage: "Your Cart",
        products: products
    })
}
// [POST] /cart/add/:product_id
module.exports.add = async (req,res) => {
    const product_id = req.params.product_id
    const quantity = req.body.quantity
    const cartId = req.cookies.cartId
    const result = await Cart.updateOne(
        {
            _id: cartId,
            "products.product_id": product_id
        },
        {
            $inc: {"products.$.quantity": quantity}
        }
    )

    if (result.matchedCount === 0) {
        await Cart.updateOne(
            {_id: cartId},
            {
                $push: {
                    products: {product_id, quantity}
                }
            }
        )
    }
    req.flash("success", "Added product to cart")
    res.redirect(req.get('referrer'))
}