let currentCustomSlide = 0;



let isDragging = false;
let startX = 0;
let startY = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = null;
const slider = document.querySelector('.custom-card-container');
const cards = document.querySelectorAll('.custom-card');
const cardWidth = cards[0].offsetWidth + 20; // Including margin
const totalSlides = cards.length;
const totalWidth = cardWidth * totalSlides;

function moveCustomSlider(index) {
    currentTranslate = -index * cardWidth;
    applyTransform();
}

function applyTransform() {
    slider.style.transform = `translateX(${currentTranslate}px)`;
}

slider.addEventListener('mousedown', (e) => handleDragStart(e));
slider.addEventListener('touchstart', (e) => handleDragStart(e));

document.addEventListener('mousemove', (e) => handleDrag(e));
document.addEventListener('touchmove', (e) => handleDrag(e));

document.addEventListener('mouseup', () => handleDragEnd());
document.addEventListener('mouseleave', () => handleDragEnd());
document.addEventListener('touchend', () => handleDragEnd());

function handleDragStart(e) {
    isDragging = true;
    startX = e.pageX || e.touches[0].pageX;
    startY = e.pageY || e.touches[0].pageY;

    cancelAnimation();
}

function handleDrag(e) {
    if (!isDragging) return;

    e.preventDefault();

    const clientX = e.pageX || e.touches[0].pageX;
    const clientY = e.pageY || e.touches[0].pageY;

    const dx = clientX - startX;
    const dy = clientY - startY;

    if (Math.abs(dx) > Math.abs(dy)) { // Horizontal swipe
        const translate = prevTranslate + dx;

        if (translate < 0 && translate > -totalWidth + window.innerWidth) {
            currentTranslate = translate;
            applyTransform();
        }
    }
}

function handleDragEnd() {
    isDragging = false;

    const newSlideIndex = Math.round(Math.abs(currentTranslate) / cardWidth);
    currentTranslate = -newSlideIndex * cardWidth;

    animateSlide(newSlideIndex);

    cancelAnimation();
}

function animateSlide(toPosition) {
    const start = performance.now();
    const duration = 300; // Animation duration in milliseconds

    function animate(timestamp) {
        const progress = (timestamp - start) / duration;
        if (progress > 1) progress = 1;

        const easeInOutCubic = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        const easedProgress = easeInOutCubic(progress);

        const translate = prevTranslate + (toPosition * cardWidth - prevTranslate) * easedProgress;
        currentTranslate = -translate;

        applyTransform();

        if (progress < 1) {
            animationID = requestAnimationFrame(animate);
        }
    }

    animationID = requestAnimationFrame(animate);
}

function cancelAnimation() {
    if (animationID) {
        window.cancelAnimationFrame(animationID);
    }
}


function createCustomDots() {
    const dotsContainer = document.querySelector('.custom-dots-container');
    const cards = document.querySelectorAll('.custom-card');
    const totalDots = cards.length - 2; // Only 3 cards in view

    // Clear any existing dots
    dotsContainer.innerHTML = '';

    // Create dots
    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('div');
        dot.classList.add('custom-dot');
        dot.addEventListener('click', () => moveCustomSlider(i));
        dotsContainer.appendChild(dot);
    }

    // Update dots initially
    updateCustomDots();
}

function updateCustomDots() {
    const dots = document.querySelectorAll('.custom-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentCustomSlide);
    });
}

// Initialize slider
createCustomDots();
updateCustomActiveCard();