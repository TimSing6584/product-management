const buttons = document.querySelectorAll("button[stock]")
let url = new URL(window.location.href)
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const stock = button.getAttribute("stock")
        // // HERE
        // if(!button.classList.contains("active")){
        //     buttons.forEach(button => button.classList.remove("active"))
        //     button.classList.add("active")
        // }
        // // END
        if(stock !== ""){
            url.searchParams.set("stock", stock)
        }
        else{
            url.searchParams.delete("stock")
        }
        window.location.href = url.href
    })
})