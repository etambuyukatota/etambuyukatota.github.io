// Small enhancements only. The page works fully without JavaScript.
(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");

  // Keep the footer year current.
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  var profile = document.querySelector(".profile");
  var nav = document.querySelector(".profile__nav");
  var list = nav ? nav.querySelector("ul") : null;
  var links = Array.prototype.slice.call(document.querySelectorAll(".profile__nav a[href^='#']"));
  var smallScreen = window.matchMedia("(max-width: 63.99em)");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------------------------------------------------------------
     Phones and tablets: the header scrolls away but its menu strip
     stays pinned to the top of the screen.
     --------------------------------------------------------------- */
  var stickAt = 0;

  function measure() {
    if (!profile || !nav) return;
    if (!smallScreen.matches) {
      root.style.removeProperty("--profile-top");
      root.style.removeProperty("--nav-h");
      profile.classList.remove("is-stuck");
      return;
    }
    var box = profile.getBoundingClientRect();
    var offset = Math.round(nav.getBoundingClientRect().top - box.top); // header top to menu
    var stripHeight = Math.round(box.height) - offset;                  // menu plus bottom border
    stickAt = offset;
    root.style.setProperty("--profile-top", -offset + "px");
    root.style.setProperty("--nav-h", stripHeight + "px");
    updateStuck();
    updateFades();
  }

  function updateStuck() {
    if (!profile || !smallScreen.matches) return;
    profile.classList.toggle("is-stuck", window.scrollY >= stickAt - 1);
  }

  // Soft fades at the menu edges show that it scrolls sideways.
  function updateFades() {
    if (!nav || !list) return;
    var max = list.scrollWidth - list.clientWidth;
    nav.classList.toggle("can-left", list.scrollLeft > 4);
    nav.classList.toggle("can-right", list.scrollLeft < max - 4);
  }

  // Slide the menu sideways (never the page) so the current link is in view.
  function revealLink(link) {
    if (!list || !smallScreen.matches) return;
    var target = link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2;
    list.scrollTo({ left: Math.max(0, target), behavior: reduceMotion.matches ? "auto" : "smooth" });
  }

  /* ---------------------------------------------------------------
     Highlight the menu link for the section on screen.
     --------------------------------------------------------------- */
  var byId = {};
  links.forEach(function (link) { byId[link.getAttribute("href").slice(1)] = link; });
  var currentId = null;
  var lockedUntil = 0;

  function setCurrent(id) {
    if (!byId[id] || id === currentId) return;
    currentId = id;
    links.forEach(function (link) { link.removeAttribute("aria-current"); });
    byId[id].setAttribute("aria-current", "true");
    revealLink(byId[id]);
  }

  // A tapped link is highlighted at once, and stays highlighted while the
  // page glides to it instead of flickering through the sections in between.
  links.forEach(function (link) {
    link.addEventListener("click", function () {
      setCurrent(link.getAttribute("href").slice(1));
      lockedUntil = Date.now() + 1200;
    });
  });
  window.addEventListener("scrollend", function () { lockedUntil = 0; });

  if ("IntersectionObserver" in window && links.length) {
    var observer = new IntersectionObserver(function (entries) {
      if (Date.now() < lockedUntil) return;
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setCurrent(entry.target.id);
      });
    }, { rootMargin: "-35% 0px -60% 0px" });

    Object.keys(byId).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }

  // The last section is short, so mark it once the page reaches the bottom.
  function checkBottom() {
    if (Date.now() < lockedUntil || !links.length) return;
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      setCurrent(links[links.length - 1].getAttribute("href").slice(1));
    }
  }

  /* ---------------------------------------------------------------
     Wiring
     --------------------------------------------------------------- */
  var ticking = false;
  window.addEventListener("scroll", function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      updateStuck();
      checkBottom();
      ticking = false;
    });
  }, { passive: true });

  if (list) list.addEventListener("scroll", updateFades, { passive: true });
  window.addEventListener("resize", measure);
  if (smallScreen.addEventListener) smallScreen.addEventListener("change", measure);
  if ("ResizeObserver" in window && profile) new ResizeObserver(measure).observe(profile);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  measure();
})();
