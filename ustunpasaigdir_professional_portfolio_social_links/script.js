const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const carousel = document.getElementById("projectCarousel");
const prevSlide = document.getElementById("prevSlide");
const nextSlide = document.getElementById("nextSlide");

if (carousel && prevSlide && nextSlide) {
  const slide = carousel.querySelector(".project-slide");
  const gap = 14;

  function amount() {
    return slide ? slide.getBoundingClientRect().width + gap : 320;
  }

  prevSlide.addEventListener("click", () => {
    carousel.scrollBy({ left: -amount(), behavior: "smooth" });
  });

  nextSlide.addEventListener("click", () => {
    carousel.scrollBy({ left: amount(), behavior: "smooth" });
  });
}
