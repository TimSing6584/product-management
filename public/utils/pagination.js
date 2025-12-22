// Pagination
const pages = document.querySelectorAll("button[pageNumber]")
if(pages){
    let url = new URL(window.location.href)
    pages.forEach((page) => {
        page.addEventListener("click", () => {
            pageNumber = page.getAttribute("pageNumber")
            url.searchParams.set("page", pageNumber)
            window.location.href = url.href
        })
    })
}
// End Pagination