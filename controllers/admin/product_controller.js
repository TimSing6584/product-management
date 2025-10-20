module.exports.index = (req, res) => {
    res.render("admin/pages/products/index.pug", {
        titlePage: "Admin Product Page"
    })
}