const menuButton = document.getElementById("menuButton");
const siteNav = document.getElementById("siteNav");

if (menuButton && siteNav) {
  menuButton.addEventListener("click", () => {
    const open = siteNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

const track = document.getElementById("projectTrack");
const prev = document.getElementById("prevProject");
const next = document.getElementById("nextProject");
const dots = document.getElementById("projectDots");

if (track && prev && next && dots) {
  const cards = Array.from(track.querySelectorAll(".project-card"));

  cards.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.setAttribute("aria-label", `Go to project ${index + 1}`);
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      cards[index].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    });
    dots.appendChild(dot);
  });

  const dotButtons = Array.from(dots.querySelectorAll("button"));

  function activeIndex() {
    const trackLeft = track.getBoundingClientRect().left;
    let closest = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
      const distance = Math.abs(card.getBoundingClientRect().left - trackLeft);
      if (distance < closestDistance) {
        closest = index;
        closestDistance = distance;
      }
    });

    return closest;
  }

  function updateDots() {
    const index = activeIndex();
    dotButtons.forEach((dot, i) => dot.classList.toggle("active", i === index));
  }

  function scrollByCard(direction) {
    const index = activeIndex();
    const nextIndex = Math.max(0, Math.min(cards.length - 1, index + direction));
    cards[nextIndex].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }

  prev.addEventListener("click", () => scrollByCard(-1));
  next.addEventListener("click", () => scrollByCard(1));
  track.addEventListener("scroll", () => window.requestAnimationFrame(updateDots));
}
