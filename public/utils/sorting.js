// Sort products by criteria
const sortDiv = document.querySelector("[sort]")
if(sortDiv){
    let url = new URL(window.location.href)
    const sortSelect = sortDiv.querySelector("[sort-select]")
    const sortClear = sortDiv.querySelector("[sort-clear]")
    // Set URL according to choosen criteria
    sortSelect.addEventListener("change", (event) => {
        const [sortKey, sortValue] = event.target.value.split("-")
        url.searchParams.set("sortKey", sortKey)
        url.searchParams.set("sortValue", sortValue)
        window.location.href = url.href
    })
    // Clear options
    sortClear.addEventListener("click", () => {
        url.searchParams.delete("sortKey")
        url.searchParams.delete("sortValue")
        window.location.href = url.href
    })
    // Display the choosen option value
    const sortKey = url.searchParams.get("sortKey")
    const sortValue = url.searchParams.get("sortValue")
    if(sortKey && sortValue){
        const optionSelected = sortSelect.querySelector(`option[value="${sortKey}-${sortValue}"]`)
        optionSelected.selected = true
    }
}

// End sort product by criteria