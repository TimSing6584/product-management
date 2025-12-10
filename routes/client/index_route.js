const productRoutes = require("./product_route.js")
const homeRoutes = require("./home_route.js")

module.exports = (app) => {
    app.use("/product", productRoutes)
    app.use("/", homeRoutes)
}