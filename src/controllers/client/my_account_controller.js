const User = require("../../models/user_model.js")
const Order = require("../../models/order_model.js")
const md5 = require("md5")
// [GET] /my_account
module.exports.index = (req, res) => {
    res.render("client/pages/my_account/index.pug", {
        titlePage: "My Account"
    })
}
// [PATCH] /my_account/edit/:id
module.exports.edit = async (req, res) => {
    if(req.body.password == ""){
        delete req.body.password
    }
    else{
        req.body.password = md5(req.body.password)
    }
    await User.updateOne({_id: req.params.id}, req.body)
    req.flash("success", "Successfully modified your account")
    res.redirect(req.get('referrer'))
}
// [GET] /my_account/history
module.exports.history_get = async (req, res) => {
    let orders = await Order.find({
        userId: res.locals.user._id,
        status: "delivered"
    })
    console.log(orders.createdAt)
    res.render("client/pages/my_account/history.pug", {
        titlePage: "Order History",
        orders: orders
    })
}
// [GET] /my_account/history/detail/:id
module.exports.history_detail = async (req, res) => {
    const order = await Order.findById(req.params.id)
    res.render("client/pages/my_account/history_detail.pug", {
        titlePage: "Order Detail",
        products: order.products
    })
}