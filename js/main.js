/* TravelPack – core helpers: storage, icons, toasts, validation, animations */
(function () {
  "use strict";

  var TP = (window.TP = window.TP || {});

  TP.keys = {
    theme: "travelpack_theme",
    direction: "travelpack_direction",
    repair: "travelpack_repair_requests",
    visit: "travelpack_visit_requests",
    prefs: "travelpack_preferences"
  };

  /* ---------------- storage ---------------- */
  TP.store = {
    getJSON: function (key, fallback) {
      try {
        var raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
      } catch (e) {
        return fallback;
      }
    },
    setJSON: function (key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {}
    },
    getText: function (key) {
      try {
        return localStorage.getItem(key);
      } catch (e) {
        return null;
      }
    },
    setText: function (key, value) {
      try {
        localStorage.setItem(key, value);
      } catch (e) {}
    },
    push: function (key, record) {
      var list = TP.store.getJSON(key, []);
      record.savedAt = new Date().toISOString();
      record.ref = "TP-" + Date.now().toString(36).toUpperCase();
      list.push(record);
      TP.store.setJSON(key, list);
      return record;
    }
  };

  TP.savePreference = function (patch) {
    var prefs = TP.store.getJSON(TP.keys.prefs, {});
    for (var k in patch) {
      if (Object.prototype.hasOwnProperty.call(patch, k)) prefs[k] = patch[k];
    }
    prefs.updatedAt = new Date().toISOString();
    TP.store.setJSON(TP.keys.prefs, prefs);
  };

  /* ---------------- icons ---------------- */
  TP.icons = function () {
    if (window.lucide && typeof lucide.createIcons === "function") {
      try {
        lucide.createIcons();
      } catch (e) {}
    }
  };

  /* ---------------- toast ---------------- */
  var toastHost = null;
  var toastStyles = {
    success: { icon: "check-circle-2", tone: "text-emerald-600 dark:text-emerald-400" },
    error: { icon: "alert-circle", tone: "text-red-600 dark:text-red-400" },
    info: { icon: "info", tone: "text-azure-600 dark:text-azure-400" }
  };

  TP.toast = function (message, type) {
    type = toastStyles[type] ? type : "success";
    if (!toastHost) {
      toastHost = document.createElement("div");
      toastHost.setAttribute("aria-live", "polite");
      toastHost.className =
        "fixed bottom-4 end-4 z-[100] flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-2";
      document.body.appendChild(toastHost);
    }
    var conf = toastStyles[type];
    var el = document.createElement("div");
    el.className =
      "pointer-events-auto flex items-start gap-3 rounded-xl border border-sand-200 dark:border-white/10 bg-white dark:bg-navy-800 px-4 py-3 shadow-xl opacity-0 translate-y-3 transition-all duration-300";
    el.innerHTML =
      '<i data-lucide="' +
      conf.icon +
      '" class="mt-0.5 h-5 w-5 shrink-0 ' +
      conf.tone +
      '"></i><p class="text-sm font-medium leading-snug text-navy-900 dark:text-sand-100"></p>';
    el.querySelector("p").textContent = message;
    toastHost.appendChild(el);
    TP.icons();
    window.requestAnimationFrame(function () {
      el.classList.remove("opacity-0", "translate-y-3");
    });
    window.setTimeout(function () {
      el.classList.add("opacity-0", "translate-y-3");
      window.setTimeout(function () {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 320);
    }, 4200);
  };

  /* ---------------- form validation ---------------- */
  function setError(field, message) {
    field.classList.add("is-invalid");
    field.setAttribute("aria-invalid", "true");
    var wrap = field.closest(".field");
    var box = wrap ? wrap.querySelector(".error-text") : null;
    if (box) {
      box.textContent = message;
      box.classList.add("is-visible");
    }
  }

  function clearError(field) {
    field.classList.remove("is-invalid");
    field.removeAttribute("aria-invalid");
    var wrap = field.closest(".field");
    var box = wrap ? wrap.querySelector(".error-text") : null;
    if (box) {
      box.textContent = "";
      box.classList.remove("is-visible");
    }
  }

  TP.clearFormErrors = function (form) {
    var fields = form.querySelectorAll("[name]");
    for (var i = 0; i < fields.length; i++) clearError(fields[i]);
  };

  TP.validateForm = function (form) {
    var fields = form.querySelectorAll("[name]");
    var ok = true;
    var firstBad = null;
    var today = new Date();
    today.setHours(0, 0, 0, 0);

    for (var i = 0; i < fields.length; i++) {
      var field = fields[i];
      var value = (field.value || "").trim();
      var rules = (field.getAttribute("data-validate") || "").split(",");
      var message = "";
      clearError(field);

      if (rules.indexOf("required") > -1 && !value) {
        message = field.getAttribute("data-msg-required") || "This field is required.";
      } else if (value && rules.indexOf("email") > -1 && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
        message = "Enter a valid email address.";
      } else if (value && rules.indexOf("phone") > -1 && !/^[+\d][\d\s().-]{7,18}$/.test(value)) {
        message = "Enter a valid phone number.";
      } else if (value && rules.indexOf("min3") > -1 && value.length < 3) {
        message = "Please enter at least 3 characters.";
      } else if (value && rules.indexOf("min10") > -1 && value.length < 10) {
        message = "Please enter at least 10 characters.";
      } else if (value && rules.indexOf("future") > -1) {
        var picked = new Date(value + "T00:00:00");
        if (isNaN(picked.getTime()) || picked < today) {
          message = "Choose a date from today onwards.";
        }
      } else if (value && rules.indexOf("time") > -1 && !/^\d{2}:\d{2}$/.test(value)) {
        message = "Choose a preferred time.";
      }

      if (message) {
        ok = false;
        if (!firstBad) firstBad = field;
        setError(field, message);
      }
    }

    if (firstBad) firstBad.focus();
    return ok;
  };

  /* ---------------- FAQ accordion ---------------- */
  function initFaq() {
    var items = document.querySelectorAll("[data-faq]");
    Array.prototype.forEach.call(items, function (item) {
      var btn = item.querySelector("[data-faq-btn]");
      if (!btn) return;
      btn.addEventListener("click", function () {
        var isOpen = item.classList.contains("is-open");
        Array.prototype.forEach.call(items, function (other) {
          other.classList.remove("is-open");
          var b = other.querySelector("[data-faq-btn]");
          if (b) b.setAttribute("aria-expanded", "false");
        });
        if (!isOpen) {
          item.classList.add("is-open");
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  /* ---------------- scroll reveal ---------------- */
  function initReveal() {
    var nodes = document.querySelectorAll(".reveal");
    if (!nodes.length) return;
    if (!("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(nodes, function (n) {
        n.classList.add("is-visible");
      });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    Array.prototype.forEach.call(nodes, function (n) {
      io.observe(n);
    });
  }

  /* ---------------- back to top ---------------- */
  function initBackToTop() {
    var btn = document.getElementById("back-to-top");
    if (!btn) return;
    btn.classList.add("is-hidden");
    var toggle = function () {
      if (window.scrollY > 420) btn.classList.remove("is-hidden");
      else btn.classList.add("is-hidden");
    };
    window.addEventListener("scroll", toggle, { passive: true });
    toggle();
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------------- misc ---------------- */
  function initYear() {
    var nodes = document.querySelectorAll("[data-year]");
    var year = String(new Date().getFullYear());
    Array.prototype.forEach.call(nodes, function (n) {
      n.textContent = year;
    });
  }

  function initEnquireDelegates() {
    document.addEventListener("click", function (event) {
      var btn = event.target.closest("[data-enquire]");
      if (!btn) return;
      var name = btn.getAttribute("data-enquire");
      var list = TP.store.getJSON(TP.keys.prefs, {});
      list.enquiries = list.enquiries || [];
      list.enquiries.push({ product: name, at: new Date().toISOString() });
      if (list.enquiries.length > 25) list.enquiries = list.enquiries.slice(-25);
      TP.savePreference(list);
      TP.toast("Enquiry noted for " + name + ". Our team will call you back.", "success");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    TP.icons();
    initYear();
    initFaq();
    initReveal();
    initBackToTop();
    initEnquireDelegates();
    TP.savePreference({ lastPage: location.pathname.split("/").pop() || "index.html" });
  });
})();
