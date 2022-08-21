(function() {
    // Change text on scroll
    let glide = new Glide('.glide');
    glide.mount();

    const titleEl = document.querySelector('.changing-title');
    const descriptionEl = document.querySelector('.changing-description');
    const slides = document.querySelectorAll('.img-slide');

    function changeContent(move) {
        let activeSlide = slides[glide.index];
        let name = activeSlide.dataset.name;
        let description = activeSlide.dataset.description;
        titleEl.textContent = name;
        descriptionEl.textContent = description;
    }

    changeContent();
    glide.on('run', changeContent);
})();