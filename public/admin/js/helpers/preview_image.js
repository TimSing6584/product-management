// Preview image before uploading
const uploadImgInput = document.querySelector("input[upload-image-input]")
const uploadImgPreview = document.querySelector("img[upload-image-preview]")
if(uploadImgInput && uploadImgPreview){
    uploadImgInput.addEventListener("change", (e) => {
        const [file] = uploadImgInput.files
        if (file) {
            uploadImgPreview.src = URL.createObjectURL(file)
        }
        else{
            uploadImgPreview.src = ""
        }
    })
}

// End preview image before uploading