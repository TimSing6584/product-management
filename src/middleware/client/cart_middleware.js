const Cart = require("../../models/cart_model.js")

module.exports.cartId = async (req, res, next) => {
    try {
        if(!req.cookies.cartId) {
            const cart = new Cart()
            await cart.save()
            const expireTime = 365 * 24 * 60 * 60 * 1000
            res.cookie("cartId", cart.id, {
                expires: new Date(Date.now() + expireTime)
            })
            res.locals.cart = cart
        }
        else {
            const cart = await Cart.findById(req.cookies.cartId)
            if(cart) {
                cart.totalQuantity = cart.products.reduce((sum,item) => sum + item.quantity, 0)
                res.locals.cart = cart
            } else {
                // Cart was deleted or not found, create a new one
                const newCart = new Cart()
                await newCart.save()
                const expireTime = 365 * 24 * 60 * 60 * 1000
                res.cookie("cartId", newCart.id, {
                    expires: new Date(Date.now() + expireTime)
                })
                res.locals.cart = newCart
            }
        }
        next()
    } catch(err) {
        console.error("Cart middleware error:", err)
        // Don't crash the app, just continue without cart
        res.locals.cart = null
        next()
    }
}