const filterSideBar = document.querySelector(".filter-sidebar")
if(filterSideBar){
    const applyButton = filterSideBar.querySelector(".filter-apply")
    const resetButton = filterSideBar.querySelector(".filter-reset")
    let url = new URL(window.location.href)
    // Apply filter
    applyButton.addEventListener("click", (e) => {
        const category_boxes = filterSideBar.querySelectorAll("input[name='category']:checked")
        const price_boxes = filterSideBar.querySelectorAll("input[name='price']:checked")

        const categories = [...category_boxes].map(b => b.value).join("_")
        const prices = [...price_boxes].map(b => b.value).join("_")

        if(categories){
            url.searchParams.set("category", categories)
        }
        if(prices){
            url.searchParams.set("price", prices)
        }

        window.location.href = url.toString()
    })
    // Clear filter
    resetButton.addEventListener("click", () => {
        url.searchParams.delete("category")
        url.searchParams.delete("price")
        window.location.href = url.toString()
    })
    // Show the selected options
    if(url.searchParams.get("category")){
        const selectedCategories = url.searchParams.get("category").split("_")
        const allCategoryBoxes = filterSideBar.querySelectorAll("input[name='category']")
        allCategoryBoxes.forEach(box => {
            if(selectedCategories.includes(box.value)){
                box.checked = true
            }
        })
    }
    if(url.searchParams.get("price")){
        const selectedPrice = url.searchParams.get("price").split("_")
        const allPriceBoxes = filterSideBar.querySelectorAll("input[name='price']")
        allPriceBoxes.forEach(box => {
            if(selectedPrice.includes(box.value)){
                box.checked = true
            }
        })
    }

}