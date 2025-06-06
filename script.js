function goToProductPage(url) {
    window.location.href = url;
}
let currentSlide = 1;
const totalSlides = 3;
const slider = document.getElementById('slider');
const dots = document.querySelectorAll('.dot');

function updateSlider() {
    // Remove all slide classes
    slider.className = slider.className.replace(/slide-\d+/g, '');
    // Add current slide class
    slider.classList.add(`slide-${currentSlide}`);
    
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index + 1 === currentSlide);
    });
}

function changeSlide(direction) {
    // Stop auto-play when manually navigating
    slider.classList.remove('auto-play');
    
    currentSlide += direction;
    
    if (currentSlide > totalSlides) {
        currentSlide = 1;
    } else if (currentSlide < 1) {
        currentSlide = totalSlides;
    }
    
    updateSlider();
    
    // Resume auto-play after 5 seconds
    setTimeout(() => {
        slider.classList.add('auto-play');
    }, 5000);
}

function goToSlide(slideNumber) {
    // Stop auto-play when manually navigating
    slider.classList.remove('auto-play');
    
    currentSlide = slideNumber;
    updateSlider();
    
    // Resume auto-play after 5 seconds
    setTimeout(() => {
        slider.classList.add('auto-play');
    }, 5000);
}

// Initialize
updateSlider();

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});

// Touch/swipe support for mobile
let startX = 0;
let endX = 0;

slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

slider.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    const difference = startX - endX;
    
    if (Math.abs(difference) > 50) { // Minimum swipe distance
        if (difference > 0) {
            changeSlide(1); // Swipe left - next slide
        } else {
            changeSlide(-1); // Swipe right - previous slide
        }
    }
});
