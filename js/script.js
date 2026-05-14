document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressBar = document.getElementById('progress-bar');
    
    let currentIndex = 0;
    let autoPlayInterval;
    const intervalTime = 6000; // 6 seconds
    let startTime;
    let animationFrame;

    // Initialize
    function init() {
        updateSlides();
        startProgressBar();
    }

    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentIndex);
        });

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlides();
        resetProgressBar();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlides();
        resetProgressBar();
    }

    // Progress Bar Logic
    function startProgressBar() {
        startTime = Date.now();
        animateProgress();
    }

    function animateProgress() {
        const elapsedTime = Date.now() - startTime;
        const progress = Math.min((elapsedTime / intervalTime) * 100, 100);
        
        progressBar.style.width = `${progress}%`;

        if (progress < 100) {
            animationFrame = requestAnimationFrame(animateProgress);
        } else {
            nextSlide();
        }
    }

    function resetProgressBar() {
        cancelAnimationFrame(animationFrame);
        progressBar.style.width = '0%';
        startProgressBar();
    }

    // Event Listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            currentIndex = parseInt(dot.getAttribute('data-index'));
            updateSlides();
            resetProgressBar();
        });
    });

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });

    // Pause on Hover (optional)
    const sliderWrapper = document.querySelector('.slider-wrapper');
    sliderWrapper.addEventListener('mouseenter', () => {
        cancelAnimationFrame(animationFrame);
    });

    sliderWrapper.addEventListener('mouseleave', () => {
        // Adjust startTime to continue from where it left off
        const currentWidth = parseFloat(progressBar.style.width);
        const elapsed = (currentWidth / 100) * intervalTime;
        startTime = Date.now() - elapsed;
        animateProgress();
    });

    init();
});
