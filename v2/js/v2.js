// Version 2 behaviour: mobile menu, current-section highlight, footer year,
// and the contact form that opens the visitor's email app.
(function () {
  "use strict";
  document.documentElement.classList.add("js");

  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // ---- Mobile menu ----
  var toggle = document.querySelector(".menu-toggle");
  var menu = document.getElementById("site-menu");
  function setMenu(open) {
    if (!toggle || !menu) return;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    menu.classList.toggle("is-open", open);
  }
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        toggle.focus();
      }
    });
    window.matchMedia("(min-width: 56.01em)").addEventListener("change", function (mq) {
      if (mq.matches) setMenu(false);
    });
  }

  // ---- Highlight the menu link for the section on screen ----
  var links = Array.prototype.slice.call(document.querySelectorAll(".menu__list a[href^='#']"));
  if ("IntersectionObserver" in window && links.length) {
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) { a.removeAttribute("aria-current"); });
        if (byId[entry.target.id]) byId[entry.target.id].setAttribute("aria-current", "true");
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    // The introduction has no menu link, so reaching it clears the highlight.
    Object.keys(byId).concat("top").forEach(function (id) {
      var el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  // ---- Contact form: build an email the visitor sends from their own app ----
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var name = form.elements.name.value.trim();
      var subject = form.elements.subject.value.trim();
      var message = form.elements.message.value.trim();
      var body = message + "\n\n" + name;
      window.location.href = "mailto:janetetambuyuk@gmail.com" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
    });
  }
})();
