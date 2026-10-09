/* TravelPack – warranty & repair enquiry form */
(function () {
  "use strict";

  var TP = (window.TP = window.TP || {});

  function refreshCount() {
    var el = document.getElementById("repair-count");
    if (!el) return;
    var list = TP.store.getJSON(TP.keys.repair, []);
    el.textContent = list.length === 0 ? "No repair requests yet" : list.length + (list.length === 1 ? " request saved on this device" : " requests saved on this device");
  }

  function initRepairForm() {
    var form = document.getElementById("repair-form");
    if (!form) return;

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
        product: form.querySelector('[name="product"]').value,
        purchaseDate: form.querySelector('[name="purchase_date"]').value,
        issue: form.querySelector('[name="issue"]').value,
        message: form.querySelector('[name="message"]').value.trim()
      };

      var saved = TP.store.push(TP.keys.repair, data);
      TP.savePreference({ lastRepairRef: saved.ref });

      form.reset();
      TP.clearFormErrors(form);
      refreshCount();
      TP.toast("Repair enquiry received. Reference " + saved.ref + " — our technician will call you within 24 hours.", "success");
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
    initRepairForm();
    refreshCount();
  });
})();
