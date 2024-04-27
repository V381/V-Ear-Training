let currentSlide = 0;

function updateCurrentSlide(index, slidesLength) {
    if (index < 0) {
        currentSlide = slidesLength - 1;
    } else if (index >= slidesLength) {
        currentSlide = 0;
    } else {
        currentSlide = index;
    }
}


function showSlide(index) {
    const slides = queryItems("slides"); 
    updateCurrentSlide(index, slides.length);
    slides.forEach((slide, i) => {
        slide.style.display = i === currentSlide ? 'block' : 'none';
    });
}

function setupNavigationButtons() {
    const prevButton = queryItems("prevButton", true);
    const nextButton = queryItems("nextButton", true); 
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            showSlide(currentSlide - 1);
        });
    }
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            showSlide(currentSlide + 1);
        });
    }
}
