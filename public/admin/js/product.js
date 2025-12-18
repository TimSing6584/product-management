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
if(check_all_box){
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
}
// End multiple selection tick boxes

// Form change-multi
const formMulti = document.querySelector("form[form-change-multi]")
if(formMulti){
    // Retreive the ids of all checked boxes in an array
    const idsInput = document.querySelector("input[name=ids]") // an imaginary input form to store the ids of selected products
    const selectChoice = document.querySelector("select[name=type]")
    formMulti.addEventListener("submit", (e) => {
        const checked_items = document.querySelectorAll("input[name=id]:checked")
        if(selectChoice.value == "change-position"){
            // if choose "change-position": store array ids in the form "id-position"
            idsInput.value = Array.from(checked_items).map(checkbox => {
                return checkbox.value + "-" + checkbox.closest("tr").querySelector('input[name="position"]').value
            })
        }
        else{
            // any choices except "change-position": store array ids in the form "id" only
            idsInput.value = Array.from(checked_items).map(item => item.value).toString()
        }

        try{
            // If there is no action selected
            if(!selectChoice.value){
                e.preventDefault() // stop submitting
                throw new Error("Please select an option")
            }
            // If there is no product selected
            if(checked_items.length === 0){
                e.preventDefault()
                throw new Error("Please select at least one product")
            }
            // Confirm if user want to continue the action (enhance UX, e.g., user misclick to choose delete multi items)
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


// Display products' description
// const descriptionButtons = document.querySelectorAll("button[show-description]")
// if(descriptionButtons){
//     descriptionButtons.forEach(button => {
//         button.addEventListener("click", () => {
//             const popUp = button.closest("td").querySelector(".popup-overlay")
//             const closeButton = popUp.querySelector("button.close-popup")
//             popUp.classList.remove("d-none")
//             closeButton.addEventListener("click", () => {
//                 popUp.classList.add("d-none")
//             })
//             // close when click at the background
//             popUp.addEventListener("click", (event) => {
//                 if (event.target === popUp) {
//                     popUp.classList.add("d-none")
//                 }
//             })
//         })
//     })
// }
// End display products' description


