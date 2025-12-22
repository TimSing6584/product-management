// Alert
const showAlert = document.querySelector("[show-alert]")
if(showAlert){
    const displayTime = parseInt(showAlert.getAttribute("data-time"))
    setTimeout(() => {
        showAlert.classList.add("alert-hidden")
    }, displayTime)
    const closeButton = document.querySelector("button[close-alert]")
    closeButton.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden")
    })
}
// End Alert