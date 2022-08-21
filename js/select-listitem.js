(function(){
    const descriptionEl = document.querySelector(".book-description .description");
    const bookImage = document.getElementById("book-cover");
    const books = document.querySelectorAll(".book-stack .linkbox");
    let baseUrl = bookImage.src;
    baseUrl = baseUrl.substring(0, baseUrl.lastIndexOf('/') + 1)

    books.forEach((book) => {
        book.onclick = (e) => {
            descriptionEl.innerHTML = e.target.dataset.description;
            bookImage.src = baseUrl + e.target.dataset.image;
        }
    });
})()