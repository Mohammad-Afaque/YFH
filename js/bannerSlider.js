// ====== Banner Slider Section ===

let currentIndex = 0;
const slides = document.querySelectorAll(".slide_ban");
const thumbnails = document.querySelectorAll(".thumbnail");

function updateActiveThumbnail() {
  thumbnails.forEach((thumbnail, index) => {
    thumbnail.classList.toggle("active", index === currentIndex);
  });
}

function showSlide(index) {
  const totalSlides = slides.length;
  if (index >= totalSlides) currentIndex = 0;
  else if (index < 0) currentIndex = totalSlides - 1;
  else currentIndex = index;

  const offset = -currentIndex * 100;
  document.querySelector(
    ".slides"
  ).style.transform = `translateX(${offset}%)`;
  updateActiveThumbnail();
}

function nextSlideBan() {
  showSlide(currentIndex + 1);
}

function prevSlideBan() {
  showSlide(currentIndex - 1);
}

// Optional: Auto-slide
setInterval(nextSlide, 3000);


// =========== Faq Section javascripts


function toggleAnswer(element) {
  const answer = element.nextElementSibling;
  const icon = element.querySelector('.toggle-icon');
  const faqItems = document.querySelectorAll('.faq-answer');

  // Close any open answers before opening the new one
  faqItems.forEach(item => {
      if (item !== answer && item.classList.contains('show')) {
          item.classList.remove('show');
          const iconToReset = item.previousElementSibling.querySelector('.toggle-icon');
          iconToReset.classList.remove('rotate');
          iconToReset.textContent = '+'; // Reset to plus sign
      }
  });

  // Toggle the clicked answer
  if (answer.classList.contains('show')) {
      answer.classList.remove('show');
      icon.classList.remove('rotate');
      icon.textContent = '+'; // Change to plus sign
  } else {
      answer.classList.add('show');
      icon.classList.add('rotate');
      icon.textContent = '×'; // Change to multiply sign
  }
}


// ========== testimonial Section =======


