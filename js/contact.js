/* TravelPack – store visit enquiry form */
(function () {
  "use strict";

  var TP = (window.TP = window.TP || {});

  function refreshCount() {
    var el = document.getElementById("visit-count");
    if (!el) return;
    var list = TP.store.getJSON(TP.keys.visit, []);
    el.textContent = list.length === 0 ? "No visit requests yet" : list.length + (list.length === 1 ? " visit request saved on this device" : " visit requests saved on this device");
  }

  /* Sunday = 0 ... Saturday = 6 */
  var HOURS = [
    { day: 0, label: "Sunday", open: null },
    { day: 1, label: "Monday", open: [10, 20] },
    { day: 2, label: "Tuesday", open: [10, 20] },
    { day: 3, label: "Wednesday", open: [10, 20] },
    { day: 4, label: "Thursday", open: [10, 20] },
    { day: 5, label: "Friday", open: [10, 20] },
    { day: 6, label: "Saturday", open: [10, 21] }
  ];

  function updateOpenStatus() {
    var el = document.getElementById("store-status");
    if (!el) return;
    var now = new Date();
    var today = HOURS[now.getDay()];
    var hour = now.getHours() + now.getMinutes() / 60;
    var isOpen = today.open && hour >= today.open[0] && hour < today.open[1];

    el.textContent = isOpen ? "Open now" : "Closed now";
    el.classList.toggle("bg-emerald-100", isOpen);
    el.classList.toggle("text-emerald-700", isOpen);
    el.classList.toggle("dark:bg-emerald-500/15", isOpen);
    el.classList.toggle("dark:text-emerald-400", isOpen);
    el.classList.toggle("bg-sand-200", !isOpen);
    el.classList.toggle("text-charcoal-600", !isOpen);
    el.classList.toggle("dark:bg-white/10", !isOpen);
    el.classList.toggle("dark:text-sand-300", !isOpen);
  }

  function initVisitForm() {
    var form = document.getElementById("visit-form");
    if (!form) return;

    var dateField = form.querySelector('[name="visit_date"]');
    if (dateField) {
      var today = new Date();
      var iso = today.toISOString().split("T")[0];
      dateField.setAttribute("min", iso);
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!TP.validateForm(form)) {
        TP.toast("Please fix the highlighted fields and try again.", "error");
        return;
      }

      var data = {
        name: form.querySelector('[name="name"]').value.trim(),
        phone: form.querySelector('[name="phone"]').value.trim(),
        email: form.querySelector('[name="email"]').value.trim(),
        date: form.querySelector('[name="visit_date"]').value,
        time: form.querySelector('[name="visit_time"]').value,
        purpose: form.querySelector('[name="purpose"]').value,
        message: form.querySelector('[name="message"]').value.trim()
      };

      var saved = TP.store.push(TP.keys.visit, data);
      TP.savePreference({ lastVisitRef: saved.ref });

      form.reset();
      TP.clearFormErrors(form);
      refreshCount();
      TP.toast("Visit request received. Reference " + saved.ref + " — we will confirm your slot shortly.", "success");
    });

    form.addEventListener("input", function (event) {
      if (event.target && event.target.name) {
        var wrap = event.target.closest(".field");
        var box = wrap ? wrap.querySelector(".error-text") : null;
        event.target.classList.remove("is-invalid");
        event.target.removeAttribute("aria-invalid");
        if (box) box.classList.remove("is-visible");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initVisitForm();
    refreshCount();
    updateOpenStatus();
    window.setInterval(updateOpenStatus, 60000);
  });
})();
