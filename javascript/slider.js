(() => {
    let currentSlide = 0;
    function showSlide(index) {
        if (index < 0) {
            currentSlide = slides.length - 1;
        } else if (index >= slides.length) {
            currentSlide = 0;
        }
    
        slides.forEach((slide, i) => {
            slide.style.display = i === currentSlide ? 'block' : 'none';
        });
    }
    const addEventListenerToButton = (button, increment) => {
        button.addEventListener('click', () => {
            currentSlide += increment;
            showSlide(currentSlide);
        });
    };
    addEventListenerToButton(prevButton, -1);
    addEventListenerToButton(nextButton, 1);
    showSlide(currentSlide);
})();
