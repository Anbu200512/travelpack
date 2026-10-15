/* TravelPack – navbar: dropdown, mobile menu, theme & direction toggles */
(function () {
  "use strict";

  var TP = (window.TP = window.TP || {});

  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  /* ---------------- theme ---------------- */
  function applyTheme(theme, persist) {
    var root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    if (persist) TP.store.setText(TP.keys.theme, theme);
    TP.savePreference({ theme: theme });

    var btns = document.querySelectorAll("[data-theme-toggle]");
    Array.prototype.forEach.call(btns, function (btn) {
      btn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
      btn.setAttribute("title", theme === "dark" ? "Light mode" : "Dark mode");
      btn.innerHTML =
        '<i data-lucide="' +
        (theme === "dark" ? "sun" : "moon") +
        '" class="h-[18px] w-[18px]"></i>';
    });
    TP.icons();
  }

  /* ---------------- direction ---------------- */
  function applyDirection(dir, persist) {
    document.documentElement.setAttribute("dir", dir);
    if (persist) TP.store.setText(TP.keys.direction, dir);
    TP.savePreference({ direction: dir });

    var btns = document.querySelectorAll("[data-dir-toggle]");
    Array.prototype.forEach.call(btns, function (btn) {
      btn.setAttribute("aria-label", dir === "rtl" ? "Switch to left-to-right layout" : "Switch to right-to-left layout");
      btn.setAttribute("title", dir === "rtl" ? "LTR layout" : "RTL layout");
      btn.innerHTML =
        '<i data-lucide="arrow-right-left" class="h-[18px] w-[18px]"></i>';
    });
    TP.icons();
  }

  TP.setTheme = function (theme) {
    applyTheme(theme, true);
  };
  TP.setDirection = function (dir) {
    applyDirection(dir, true);
  };

  /* ---------------- dropdown ---------------- */
  function initDropdown() {
    var wrap = document.querySelector("[data-dropdown]");
    if (!wrap) return;
    var btn = wrap.querySelector("[data-dropdown-btn]");
    var menu = wrap.querySelector("[data-dropdown-menu]");
    if (!btn || !menu) return;

    function close() {
      menu.classList.add("hidden");
      btn.setAttribute("aria-expanded", "false");
    }
    function open() {
      menu.classList.remove("hidden");
      btn.setAttribute("aria-expanded", "true");
    }

    btn.addEventListener("click", function (event) {
      event.stopPropagation();
      if (menu.classList.contains("hidden")) open();
      else close();
    });

    menu.addEventListener("click", function (event) {
      event.stopPropagation();
    });

    document.addEventListener("click", function (event) {
      if (!wrap.contains(event.target)) close();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") close();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 1280) return;
      close();
    });
  }

  /* ---------------- mobile menu ---------------- */
  function initMobileMenu() {
    var toggle = document.getElementById("mobile-toggle");
    var panel = document.getElementById("mobile-menu");
    if (!toggle || !panel) return;

    function setOpen(open) {
      if (open) {
        panel.classList.remove("hidden");
        toggle.setAttribute("aria-expanded", "true");
        toggle.innerHTML = '<i data-lucide="x" class="h-5 w-5"></i>';
      } else {
        panel.classList.add("hidden");
        toggle.setAttribute("aria-expanded", "false");
        toggle.innerHTML = '<i data-lucide="menu" class="h-5 w-5"></i>';
      }
      TP.icons();
    }

    toggle.addEventListener("click", function () {
      setOpen(panel.classList.contains("hidden"));
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setOpen(false);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 1280) setOpen(false);
    });

    /* mobile Home disclosure (dropdown inside mobile menu) */
    var subBtn = document.querySelector("[data-mobile-sub-btn]");
    var subPanel = document.querySelector("[data-mobile-sub]");
    if (subBtn && subPanel) {
      subBtn.addEventListener("click", function () {
        var expanded = subBtn.getAttribute("aria-expanded") === "true";
        subPanel.classList.toggle("hidden", expanded);
        subBtn.setAttribute("aria-expanded", expanded ? "false" : "true");
        var chev = subBtn.querySelector("[data-chevron]");
        if (chev) chev.style.transform = expanded ? "" : "rotate(180deg)";
      });
    }
  }

  /* ---------------- active link ---------------- */
  function initActiveLink() {
    var page = document.body.getAttribute("data-page") || "";
    if (page === "home2") page = "home";
    var links = document.querySelectorAll("[data-nav]");
    Array.prototype.forEach.call(links, function (link) {
      if (link.getAttribute("data-nav") === page) {
        link.classList.add("tp-nav-active", "font-semibold");
        link.setAttribute("aria-current", "page");
      }
    });
  }

  /* ---------------- header shadow ---------------- */
  function initHeaderScroll() {
    var header = document.getElementById("site-header");
    if (!header) return;
    var update = function () {
      if (window.scrollY > 8) header.classList.add("shadow-lg");
      else header.classList.remove("shadow-lg");
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  ready(function () {
    var storedTheme = TP.store.getText(TP.keys.theme);
    var theme =
      storedTheme === "dark" || storedTheme === "light"
        ? storedTheme
        : window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    applyTheme(theme, false);

    var storedDir = TP.store.getText(TP.keys.direction);
    var dir = storedDir === "rtl" || storedDir === "ltr" ? storedDir : "ltr";
    applyDirection(dir, false);

    var themeBtns = document.querySelectorAll("[data-theme-toggle]");
    Array.prototype.forEach.call(themeBtns, function (themeBtn) {
      themeBtn.addEventListener("click", function () {
        var isDark = document.documentElement.classList.contains("dark");
        applyTheme(isDark ? "light" : "dark", true);
      });
    });

    var dirBtns = document.querySelectorAll("[data-dir-toggle]");
    Array.prototype.forEach.call(dirBtns, function (dirBtn) {
      dirBtn.addEventListener("click", function () {
        var next = document.documentElement.getAttribute("dir") === "rtl" ? "ltr" : "rtl";
        applyDirection(next, true);
      });
    });

    initDropdown();
    initMobileMenu();
    initActiveLink();
    initHeaderScroll();
    TP.icons();
  });
})();
