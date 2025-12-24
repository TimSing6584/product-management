const productRoutes = require("./product_route.js")
const homeRoutes = require("./home_route.js")
const cartRoutes = require("./cart_route.js")
const checkoutRoutes = require("./checkout_route.js")
const cart_middleware = require("../../middleware/client/cart_middleware.js")
module.exports = (app) => {
    app.use(cart_middleware.cartId)

    app.use("/", homeRoutes)
    app.use("/product", productRoutes)
    app.use("/cart", cartRoutes)
    app.use("/checkout", checkoutRoutes)
}