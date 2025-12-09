module.exports = (req) => {
    let last_search_word = req.query.search_key_word ? req.query.search_key_word : ""
    return last_search_word
}