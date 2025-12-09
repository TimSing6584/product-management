module.exports = (req, limit, total_items) => {
    let pagination = {
        currentPage: req.query.page ? parseInt(req.query.page) : 1, // default start is page 1
        limitItems: limit,
    }
    pagination.total_pages = Math.ceil(total_items / pagination.limitItems)
    return pagination
}