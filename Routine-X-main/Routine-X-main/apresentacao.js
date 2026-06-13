const slides = Array.from(document.querySelectorAll(".slide"));
const previousButton = document.getElementById("prev-slide");
const nextButton = document.getElementById("next-slide");
const slideCounter = document.getElementById("slide-counter");
const slideProgress = document.getElementById("slide-progress");
const dotList = document.getElementById("dot-list");

let currentSlide = 0;

function renderDots() {
  dotList.innerHTML = "";

  slides.forEach((_, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", `Ir para o slide ${index + 1}`);
    button.addEventListener("click", () => showSlide(index));
    dotList.appendChild(button);
  });
}

function showSlide(index) {
  currentSlide = Math.min(Math.max(index, 0), slides.length - 1);

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === currentSlide);
  });

  Array.from(dotList.children).forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === currentSlide);
  });

  previousButton.disabled = currentSlide === 0;
  nextButton.disabled = currentSlide === slides.length - 1;
  slideCounter.textContent = `Slide ${currentSlide + 1} / ${slides.length}`;
  slideProgress.style.width = `${((currentSlide + 1) / slides.length) * 100}%`;
}

function goToPreviousSlide() {
  showSlide(currentSlide - 1);
}

function goToNextSlide() {
  showSlide(currentSlide + 1);
}

previousButton.addEventListener("click", goToPreviousSlide);
nextButton.addEventListener("click", goToNextSlide);

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    goToPreviousSlide();
  }

  if (event.key === "ArrowRight") {
    goToNextSlide();
  }
});

renderDots();
showSlide(0);
