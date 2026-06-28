const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const carousel = document.getElementById("projectCarousel");
const prevSlide = document.getElementById("prevSlide");
const nextSlide = document.getElementById("nextSlide");

if (carousel && prevSlide && nextSlide) {
  const scrollBySlide = (direction) => {
    const firstSlide = carousel.querySelector(".project-slide");
    const gap = parseFloat(getComputedStyle(carousel).columnGap || "0");
    const amount = firstSlide ? firstSlide.getBoundingClientRect().width + gap : 320;
    carousel.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  prevSlide.addEventListener("click", () => scrollBySlide(-1));
  nextSlide.addEventListener("click", () => scrollBySlide(1));
}
