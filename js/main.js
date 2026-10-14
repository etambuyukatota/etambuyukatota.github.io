// Small enhancements only. The page works fully without JavaScript.
(function () {
  "use strict";

  // Keep the footer year current.
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Highlight the section link that matches what is on screen.
  var links = Array.prototype.slice.call(document.querySelectorAll(".profile__nav a[href^='#']"));
  if (!("IntersectionObserver" in window) || links.length === 0) return;

  var byId = {};
  links.forEach(function (link) {
    byId[link.getAttribute("href").slice(1)] = link;
  });

  function setCurrent(id) {
    links.forEach(function (link) { link.removeAttribute("aria-current"); });
    if (byId[id]) {
      byId[id].setAttribute("aria-current", "true");
      // On small screens the nav scrolls sideways; keep the active link visible.
      if (window.matchMedia("(max-width: 63.99em)").matches) {
        byId[id].scrollIntoView({ block: "nearest", inline: "nearest" });
      }
    }
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) setCurrent(entry.target.id);
    });
  }, { rootMargin: "-35% 0px -60% 0px" });

  Object.keys(byId).forEach(function (id) {
    var section = document.getElementById(id);
    if (section) observer.observe(section);
  });
})();
