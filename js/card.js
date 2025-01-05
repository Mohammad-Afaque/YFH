let currentSlide = 0;

function moveSlider(direction) {
  const slider = document.querySelector(".card-slider");
  const cards = document.querySelectorAll(".card");
  const cardWidth = cards[0].offsetWidth + 20; // Including margin

  currentSlide += direction;

  // Calculate the maximum slide index
  const maxSlide = cards.length - 3; // Showing 3 cards at a time

  // Loop the slides around
  if (currentSlide < 0) {
    currentSlide = maxSlide;
  } else if (currentSlide > maxSlide) {
    currentSlide = 0;
  }

  slider.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
}