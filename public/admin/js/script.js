// Filter Button By Stock (/admin/product)
const buttons = document.querySelectorAll("button[stock]")
if(buttons){
    let url = new URL(window.location.href)
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const stock = button.getAttribute("stock")
            if(stock){
                url.searchParams.set("stock", stock)
            }
            else{
                url.searchParams.delete("stock")
                url.searchParams.delete("search_key_word") // remove any search_key_word
                // url.searchParams.delete("page") //  no comeback to first page
                // just stay at the current page
            }
            window.location.href = url.href
        })
    })
}
// End Filter Button By Stock (/admin/product)


// Search Form (/admin/product)
const searchForm = document.querySelector("#form-search")
if(searchForm){
    let url = new URL(window.location.href)
    searchForm.addEventListener("submit", event => {
        event.preventDefault() // prevent page reload (can lose data of the filter by stock before)
        const keyword = event.target.elements.search_key_word.value
        if(keyword){
            url.searchParams.set("search_key_word", keyword)
        }
        else{
            url.searchParams.delete("search_key_word")
        }
        window.location.href = url.href
    })
}
// End Search Form (/admin/product)

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

// Increment/Decrement Stock Value
const counterButtons = document.querySelectorAll(".stock-counter")
if(counterButtons.length > 0){
    // let url_params = new URLSearchParams(new URL(window.location.href).search).toString()
    counterButtons.forEach(button => {
        const changeStockForm = document.querySelector("form#change-stock")
        const path = changeStockForm.getAttribute("path")
        button.addEventListener("click", () => {
            // const current_stock = button.getAttribute("current_stock")
            const counter_value = button.getAttribute("counter_value")
            const data_id = button.getAttribute("data-id")

            changeStockForm.setAttribute("action", `${path}/${counter_value}/${data_id}?_method=PATCH`)
            changeStockForm.submit()
        })
    })
}
// End increment/Decrement Stock Value

// Multiple Selection Tick Boxes

const check_all_box = document.querySelector("input[name=check-all]")
const product_boxes = document.querySelectorAll("input[name=id]")
check_all_box.addEventListener("click", () => {
    if(check_all_box.checked === true){
        product_boxes.forEach(box => box.checked = true)
    }
    else{
        product_boxes.forEach(box => box.checked = false)
    }
})
product_boxes.forEach(box => {
    box.addEventListener("click", () => {
        const check_count = document.querySelectorAll("input[name=id]:checked").length
        if(check_count === product_boxes.length){
            check_all_box.checked = true
        }
        else{
            check_all_box.checked = false
        }
    })
})

// End multiple selection tick boxes

// Form change-multi
const formMulti = document.querySelector("form[form-change-multi")
if(formMulti){
    // Retreive the ids of all checked boxes in an array
    const idsInput = document.querySelector("input[name=ids]") // an imaginary input form to store the ids of selected products
    const selectChoice = document.querySelector("select[name=type]")
    formMulti.addEventListener("submit", (e) => {
        const checked_items = document.querySelectorAll("input[name=id]:checked")
        idsInput.value = Array.from(checked_items).map(item => item.value).toString()
        try{
            if(!selectChoice.value){
                e.preventDefault() // stop submitting
                throw new Error("Please select an option")
            }
            if(!confirm("Are you sure for your action?")){
                e.preventDefault()
            }
        }
        catch(error){
            alert(error.message)
        }
    })
}
// End form change-multi

// Delete product
const deleteButtons = document.querySelectorAll("button.delete")

if(deleteButtons){
    deleteButtons.forEach((button) => {
        const deleteForm = document.querySelector("form#delete-product")
        button.addEventListener("click", () => {
            if(confirm("Are you sure to delete?")){
                const product_id = button.getAttribute("data-id")
                deleteForm.setAttribute("action", deleteForm.getAttribute("path") + `/${product_id}?_method=DELETE`)
                deleteForm.submit()
            }
        })
    })
}
// End delete product

