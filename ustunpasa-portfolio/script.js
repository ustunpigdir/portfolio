/* =====================================================================
   Ustunpasa Igdir — portfolio interactions
   Vanilla JS only. The site is fully functional without JavaScript;
   this file only enhances navigation and active-link highlighting.
   ===================================================================== */
(function () {
  "use strict";

  /* ----- Mobile navigation toggle ----- */
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("navMenu");

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // Close the menu after a link is tapped (mobile).
    menu.addEventListener("click", function (event) {
      var el = event.target;
      if (el && el.tagName === "A") {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ----- Active section highlight in nav ----- */
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.nav__menu a[href^="#"]')
  );

  var linkById = {};
  navLinks.forEach(function (link) {
    var id = link.getAttribute("href").slice(1);
    if (id) { linkById[id] = link; }
  });

  var sections = Object.keys(linkById)
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var link = linkById[entry.target.id];
          if (!link) { return; }
          if (entry.isIntersecting) {
            navLinks.forEach(function (l) { l.removeAttribute("aria-current"); });
            link.setAttribute("aria-current", "true");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (section) { observer.observe(section); });
  }
})();
