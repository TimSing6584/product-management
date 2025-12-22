// Search Form
const searchForm = document.querySelector("#form-search")
if(searchForm){
    let url = new URL(window.location.href)
    searchForm.addEventListener("submit", event => {
        event.preventDefault() // prevent page reload (can lose data of the filter by stock before)
        const keyword = event.target.elements.search_key_word.value
        if(keyword && !event.submitter.classList.contains("btn-secondary")){
            url.searchParams.set("search_key_word", keyword)
        }
        else{
            url.searchParams.delete("search_key_word")
        }
        window.location.href = url.href
    })
}
// End Search Form