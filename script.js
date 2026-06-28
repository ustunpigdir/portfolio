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

const summaryPanel = document.getElementById("summaryPanel");
const stageButtons = document.querySelectorAll('.link-row [data-stage]');

if (summaryPanel && stageButtons.length) {
  const stages = summaryPanel.querySelectorAll(".summary-stage");
  stageButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const wasActive = btn.getAttribute("aria-expanded") === "true";
      stageButtons.forEach((b) => b.setAttribute("aria-expanded", "false"));
      stages.forEach((s) => (s.hidden = true));
      if (wasActive) {
        summaryPanel.hidden = true;
      } else {
        btn.setAttribute("aria-expanded", "true");
        summaryPanel.hidden = false;
        stages.forEach((s) => {
          if (s.dataset.stage === btn.dataset.stage) s.hidden = false;
        });
      }
    });
  });
}
