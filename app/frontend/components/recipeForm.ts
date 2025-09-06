// import "trix";
// import "@rails/actiontext";

import DOMPurify from "dompurify";

const imageInput = document.getElementById("recipe_featured_image") as HTMLInputElement;
const fileButton = document.getElementById("file-button");
const fileText = document.getElementById("file-text");

fileButton?.addEventListener("click", () => {
  imageInput?.click();
})

imageInput?.addEventListener("change", () => {
  if(imageInput.value && fileText) {
    fileText.innerHTML = DOMPurify.sanitize(imageInput.value)
  }
})
