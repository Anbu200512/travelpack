/* TravelPack – blog index: cards, category/search filter, article modal */
(function () {
  "use strict";

  var TP = (window.TP = window.TP || {});

  var POSTS = [
    {
      id: "cabin-rules",
      title: "Cabin baggage rules, decoded for the 2026 season",
      category: "Guides",
      date: "2026-09-18",
      read: 6,
      photo: 6726195,
      alt: "Travellers waiting with their luggage inside a bright airport terminal",
      excerpt: "Personal item, cabin bag, gate-check: what the numbers actually mean and which one your ticket gives you.",
      body: [
        "Every airline sells you the same promise — bring your bag on board — and then defines it three different ways. A personal item fits under the seat. A cabin bag fits in the overhead locker. Gate-check is what happens when the locker fills before you reach your row.",
        "The safe assumption is the smallest of the three unless your booking says otherwise. Budget carriers in particular price the overhead locker separately, and the fee at the gate is almost always higher than the fee you would have paid at checkout.",
        "Size limits are measured on the outside of the bag, wheels and handles included, which is where most surprises come from. A 55 cm case with a protruding telescopic grip can measure 58 cm once it is standing upright."
      ],
      bullets: [
        "Measure the bag fully packed, not empty — shells bulge when they are full.",
        "Weight limits are enforced at the counter, size limits at the gate.",
        "Soft-side bags forgive a centimetre; hard shells do not.",
        "Keep the gate-tag on your bag until you are seated."
      ]
    },
    {
      id: "carry-on-54321",
      title: "The 5-4-3-2-1 method: a carry-on packed in ten minutes",
      category: "Packing",
      date: "2026-09-04",
      read: 5,
      photo: 4004224,
      alt: "Aerial view of modern luggage and travel backpacks arranged on a wooden floor",
      excerpt: "Five tops, four bottoms, three accessories, two pairs of shoes, one jacket — and why the numbers matter more than the list.",
      body: [
        "The method is not really about the quantities. It is a budget: it forces every item to justify the space it takes, which is the only reliable way to keep a cabin bag under its weight limit.",
        "Start with the shoes, because they are rigid and heavy. Place them heel-to-toe along the wheeled side of the case where they will not crush anything. Then roll the soft items into the gaps between them.",
        "The last two items — jacket and one spare set — go on top, flat, so they can be pulled out at security without unfolding the whole bag."
      ],
      bullets: [
        "Roll knits, fold shirts, never compress denim unless it is the one pair you will wear.",
        "Wear the heaviest shoes and jacket through the terminal.",
        "A packing cube per category keeps the bag sortable at your destination.",
        "Leave ten per cent of the volume free for the return journey."
      ]
    },
    {
      id: "hard-or-soft",
      title: "Hard shell or soft side? How to actually choose",
      category: "Guides",
      date: "2026-08-21",
      read: 7,
      photo: 34429712,
      alt: "Premium luggage displayed on shelves inside a travel retail store",
      excerpt: "The trade-off is not durability versus price — it is structure versus access, and your trip decides it.",
      body: [
        "A hard shell protects what is inside and keeps its shape when stacked under a bus. A soft side expands slightly, has exterior pockets you can reach without opening anything, and absorbs abrasion better than painted polycarbonate.",
        "For business travel with a laptop and documents, soft side usually wins: the pocket is the feature. For family check-ins where clothes must arrive uncreased, the shell wins.",
        "Where both formats fail is over-packing. A case filled to its weight limit is harder on wheels, zips and handles than a half-full one, regardless of the material."
      ],
      bullets: [
        "Polycarbonate: light, repairable, scratches visibly.",
        "Aluminium: tough, heavy, dents rather than cracks.",
        "Polyester soft-side: cheap, flexible, wets through in rain.",
        "Nylon soft-side: tougher weave, better zips, higher price."
      ]
    },
    {
      id: "wheel-fix",
      title: "A seized wheel is usually a five-minute fix",
      category: "Care & repair",
      date: "2026-08-07",
      read: 4,
      photo: 30312048,
      alt: "Craftsman repairing luggage with tools on the bench",
      excerpt: "Grit, hair and a loose screw account for most dead wheels. Here is what we do on the bench — and what you can do yourself.",
      body: [
        "Nine out of ten wheels that arrive at our bench are not broken. They are contaminated: carpet fibres, hair and terminal grit packed into the bearing, sometimes with one retaining screw worked loose by vibration.",
        "A rinse under warm water, a pick through the bearing and a re-torque of the housing screw returns most wheels to quiet rotation. Only the third case — a cracked housing or a flattened tyre — needs the wheel replaced entirely.",
        "The part that shoppers rarely consider is the spare. We keep wheel assemblies for every range we have stocked, which is the real reason a warranty claim can be finished in a week instead of a season."
      ],
      bullets: [
        "Rinse wheels after a beach or gravel trip and dry them standing up.",
        "Check the four housing screws once a year.",
        "Do not oil a sealed bearing — it pulls in more grit.",
        "Replace wheels in pairs so the case rolls true."
      ]
    },
    {
      id: "tsa-locks",
      title: "What your TSA lock can and cannot do",
      category: "Care & repair",
      date: "2026-07-24",
      read: 5,
      photo: 22744094,
      alt: "A hand operating the built-in combination lock on a white suitcase",
      excerpt: "It will not make your bag theft-proof. It will stop a customs officer from cutting it open — here is the difference.",
      body: [
        "A TSA-approved lock carries a universal keyway that security staff can open without damaging the case. That is the entire feature: it converts a forced entry into a logged inspection.",
        "What it does not do is protect against a bag opened while you are two rows away, or against a zip that can be pierced with a pen and re-sealed. The lock is a deterrent and a convenience, not a vault.",
        "The failure we see most often is not the lock but the owner: a forgotten four-digit code. Register the combination with the airline's reference card, photograph it, and do not set the same code on every bag in the set."
      ],
      bullets: [
        "Set the code on a hard, flat surface before the trip.",
        "Never zip the lock closed while the dials are showing a partial number.",
        "Zip-pullers that lock into the housing beat a loose padlock.",
        "For checked bags, a cut-resistant zip track matters more than the lock."
      ]
    },
    {
      id: "size-guide",
      title: "Size guide: cabin, medium, large — which do you need?",
      category: "Guides",
      date: "2026-07-10",
      read: 6,
      photo: 34629932,
      alt: "A row of colourful suitcases in different sizes with their handles extended",
      excerpt: "Litres, centimetres and airline limits, translated into a single question: how many days are you actually away for?",
      body: [
        "Cabin cases at 55 cm hold roughly three to five days for one person. Medium cases at 65 cm cover a week. Large cases at 75 cm are for multi-stop trips, family shared packing, or travel where you plan to shop.",
        "Volume figures are honest but incomplete: a 40 litre cabin case packed with shoes behaves very differently from 40 litres of clothing. Weigh a sample load on the test lane before you commit.",
        "The set question answers itself once you know the trips you take. Two-piece sets suit couples who fly together; three-piece sets suit families; the four-piece set only earns its storage space if you travel at least a few times a year."
      ],
      bullets: [
        "55 cm cabin: 3–5 days, overhead locker.",
        "65 cm medium: 7 days, best all-round check-in.",
        "75 cm large: 10+ days or shared family packing.",
        "45 cm under-seater: documents, laptop and a change of clothes."
      ]
    },
    {
      id: "weekend-duffle",
      title: "Forty-eight hours, one duffle: the short-trip formula",
      category: "Packing",
      date: "2026-06-26",
      read: 4,
      photo: 15930219,
      alt: "A traveller walking down a city street pulling a red suitcase",
      excerpt: "Why a 40-litre duffle beats a cabin case when the trip is under two days — and when it does not.",
      body: [
        "A weekend trip has a shape: one outfit worn, one packed, one spare, plus a wash kit. That fits a 40 litre duffle with room left, and the duffle will fit in an overhead locker or under a seat where a rigid case will not.",
        "Soft duffles also survive the awkward legs of a trip — stairs, taxis, a train with no luggage rack — because you can carry them on your shoulder instead of dragging them.",
        "The exception is anything you cannot crease: a suit, shoes you will present in, camera bodies. Those want structure, and structure is what a case gives you."
      ],
      bullets: [
        "Pack shoes at the base, against the long side.",
        "A duffle without a laptop sleeve needs a separate sleeve for transit days.",
        "Compression straps matter more than brand on a soft bag.",
        "Bring a foldable tote for the return leg — it is always fuller."
      ]
    },
    {
      id: "new-range",
      title: "Behind the counter: how a new range lands in store",
      category: "Store news",
      date: "2026-06-12",
      read: 5,
      photo: 13111695,
      alt: "Travellers carrying luggage through a spacious modern airport hallway",
      excerpt: "Six weeks from first sample to shop floor, including the part where we reject most of what we are shown.",
      body: [
        "Samples arrive in spring. We roll each one down the test lane fully loaded, cycle the handle fifty times and put the wheels through a grit tray. Anything that develops play or noise is returned with notes.",
        "The survivors are checked against spare-part availability — a model we cannot source wheels for in three years' time does not make the floor, however good it looks.",
        "Only then does pricing happen. We compare the landed cost against comparable models already in store and set one price that holds all year, rather than a high anchor we can discount from."
      ],
      bullets: [
        "Sample testing: two weeks.",
        "Bench and part-availability review: one week.",
        "Range selection and buy: two weeks.",
        "Photography, sizing and catalogue entry: one week."
      ]
    }
  ];

  TP.POSTS = POSTS;

  var CATEGORIES = ["Guides", "Packing", "Care & repair", "Store news"];
  var state = { cat: "", q: "" };

  function img(id, w) {
    return "https://images.pexels.com/photos/" + id + "/pexels-photo-" + id + ".jpeg?auto=compress&cs=tinysrgb&w=" + (w || 800);
  }

  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  function fmtDate(iso) {
    var parts = String(iso).split("-");
    if (parts.length !== 3) return iso;
    return Number(parts[2]) + " " + MONTHS[Number(parts[1]) - 1] + " " + parts[0];
  }

  function esc(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function matches(p) {
    if (state.cat && p.category !== state.cat) return false;
    if (state.q) {
      var hay = (p.title + " " + p.category + " " + p.excerpt + " " + p.body.join(" ")).toLowerCase();
      if (hay.indexOf(state.q) === -1) return false;
    }
    return true;
  }

  function readLink(p) {
    return (
      '<button type="button" data-post="' + p.id + '" class="inline-flex items-center gap-2 text-sm font-semibold text-accent-600 transition hover:text-accent-700 dark:text-accent-400">' +
      'Read article <i data-lucide="arrow-right" class="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"></i></button>'
    );
  }

  function featuredCard(p) {
    return (
      '<article class="group grid overflow-hidden rounded-2xl border border-sand-200 bg-white shadow-sm transition hover:shadow-xl sm:grid-cols-2 dark:border-white/10 dark:bg-navy-900">' +
      '<div class="relative aspect-[16/10] overflow-hidden bg-sand-100 sm:aspect-auto dark:bg-navy-800">' +
      '<img src="' + img(p.photo, 1100) + '" alt="' + esc(p.alt) + '" loading="lazy" class="h-full w-full object-cover transition duration-500 group-hover:scale-105">' +
      '<span class="absolute top-3 start-3 rounded-full bg-accent-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow">Featured</span>' +
      "</div>" +
      '<div class="flex flex-col justify-center gap-3 p-6 sm:p-8">' +
      '<div class="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-wider">' +
      '<span class="rounded-full bg-azure-500/10 px-2.5 py-1 text-azure-600 dark:text-azure-400">' + esc(p.category) + "</span>" +
      '<span class="text-charcoal-400 dark:text-sand-500">' + fmtDate(p.date) + " · " + p.read + " min read</span>" +
      "</div>" +
      '<h2 class="font-display text-xl font-bold leading-snug text-navy-900 sm:text-2xl dark:text-white">' + esc(p.title) + "</h2>" +
      '<p class="text-sm leading-relaxed text-charcoal-500 dark:text-sand-400">' + esc(p.excerpt) + "</p>" +
      readLink(p) +
      "</div></article>"
    );
  }

  function postCard(p) {
    return (
      '<article class="group reveal flex h-full flex-col overflow-hidden rounded-2xl border border-sand-200 bg-white shadow-sm transition hover:shadow-xl dark:border-white/10 dark:bg-navy-900">' +
      '<div class="relative aspect-[16/10] overflow-hidden bg-sand-100 dark:bg-navy-800">' +
      '<img src="' + img(p.photo, 700) + '" alt="' + esc(p.alt) + '" loading="lazy" class="h-full w-full object-cover transition duration-500 group-hover:scale-105">' +
      '<span class="absolute top-3 start-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-navy-900 shadow dark:bg-navy-900/95 dark:text-sand-100">' + esc(p.category) + "</span>" +
      "</div>" +
      '<div class="flex flex-1 flex-col gap-3 p-5">' +
      '<p class="text-[11px] font-semibold uppercase tracking-wider text-charcoal-400 dark:text-sand-500">' + fmtDate(p.date) + " · " + p.read + " min read</p>" +
      '<h3 class="font-display text-base font-semibold leading-snug text-navy-900 dark:text-white">' + esc(p.title) + "</h3>" +
      '<p class="text-sm text-charcoal-500 dark:text-sand-400">' + esc(p.excerpt) + "</p>" +
      '<div class="mt-auto pt-2">' + readLink(p) + "</div>" +
      "</div></article>"
    );
  }

  function fill(id, html) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }

  function refreshReveal() {
    var nodes = document.querySelectorAll(".reveal:not(.is-visible)");
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
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );
    Array.prototype.forEach.call(nodes, function (n) {
      io.observe(n);
    });
  }

  function render() {
    var list = POSTS.filter(matches);
    var featuredHost = document.getElementById("blog-featured");
    var grid = document.getElementById("blog-grid");
    var empty = document.getElementById("blog-empty");
    var count = document.getElementById("blog-count");

    if (!grid) return;

    if (!list.length) {
      if (featuredHost) featuredHost.innerHTML = "";
      grid.innerHTML = "";
      grid.classList.add("hidden");
      if (empty) empty.classList.remove("hidden");
    } else {
      if (featuredHost) featuredHost.innerHTML = featuredCard(list[0]);
      grid.innerHTML = list.slice(1).map(postCard).join("");
      grid.classList.remove("hidden");
      if (empty) empty.classList.add("hidden");
    }

    if (count) {
      count.textContent =
        list.length === POSTS.length
          ? POSTS.length + " articles"
          : list.length + (list.length === 1 ? " article" : " articles") + " matching";
    }

    Array.prototype.forEach.call(document.querySelectorAll("[data-cat-chip]"), function (chip) {
      var active = (chip.getAttribute("data-cat-chip") || "") === state.cat;
      chip.classList.toggle("bg-navy-900", active);
      chip.classList.toggle("dark:bg-accent-500", active);
      chip.classList.toggle("text-white", active);
      chip.classList.toggle("border-transparent", active);
    });

    refreshReveal();
    TP.icons();
  }

  /* ---------------- article modal ---------------- */
  function openPost(id) {
    var modal = document.getElementById("post-modal");
    var content = document.getElementById("post-modal-content");
    if (!modal || !content) return;
    var p = null;
    for (var i = 0; i < POSTS.length; i++) {
      if (POSTS[i].id === id) p = POSTS[i];
    }
    if (!p) return;

    var paras = p.body.map(function (t) {
      return '<p class="mt-4 text-sm leading-relaxed text-charcoal-600 dark:text-sand-300">' + esc(t) + "</p>";
    }).join("");

    var list = (p.bullets || [])
      .map(function (b) {
        return (
          '<li class="flex items-start gap-2.5 text-sm text-charcoal-600 dark:text-sand-300">' +
          '<i data-lucide="check" class="mt-0.5 h-4 w-4 shrink-0 text-accent-500"></i><span>' + esc(b) + "</span></li>"
        );
      }).join("");

    content.innerHTML =
      '<div class="relative">' +
      '<button type="button" data-modal-close aria-label="Close article" class="absolute top-3 end-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-navy-900 shadow transition hover:text-accent-500 dark:bg-navy-900/95 dark:text-sand-100"><i data-lucide="x" class="h-5 w-5"></i></button>' +
      '<div class="aspect-[16/9] overflow-hidden bg-sand-100 dark:bg-navy-800">' +
      '<img src="' + img(p.photo, 1100) + '" alt="' + esc(p.alt) + '" class="h-full w-full object-cover"></div>' +
      '<div class="p-5 sm:p-7">' +
      '<div class="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-wider">' +
      '<span class="rounded-full bg-azure-500/10 px-2.5 py-1 text-azure-600 dark:text-azure-400">' + esc(p.category) + "</span>" +
      '<span class="text-charcoal-400 dark:text-sand-500">' + fmtDate(p.date) + " · " + p.read + " min read</span>" +
      "</div>" +
      '<h3 id="post-modal-title" class="mt-3 font-display text-xl font-semibold leading-snug text-navy-900 sm:text-2xl dark:text-white">' + esc(p.title) + "</h3>" +
      paras +
      (list
        ? '<h4 class="mt-6 text-xs font-bold uppercase tracking-wider text-charcoal-400 dark:text-sand-500">Key points</h4><ul class="mt-3 space-y-2.5">' + list + "</ul>"
        : "") +
      '<div class="mt-7 flex flex-col gap-2 sm:flex-row">' +
      '<button type="button" data-modal-close class="flex-1 rounded-xl border border-navy-900/15 px-5 py-3 text-sm font-semibold text-navy-900 transition hover:border-accent-500 hover:text-accent-600 dark:border-white/15 dark:text-sand-100 dark:hover:text-accent-400">Back to the journal</button>' +
      '<a href="contact.html" class="flex-1 rounded-xl bg-navy-900 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-accent-500 dark:bg-accent-500 dark:hover:bg-accent-600">Ask us in store</a>' +
      "</div></div></div>";

    modal.setAttribute("aria-labelledby", "post-modal-title");
    modal.classList.remove("hidden");
    document.body.classList.add("tp-locked");
    TP.icons();
    window.setTimeout(function () {
      var closeBtn = content.querySelector("[data-modal-close]");
      if (closeBtn) closeBtn.focus();
    }, 40);
  }

  function closeModal() {
    var modal = document.getElementById("post-modal");
    if (!modal || modal.classList.contains("hidden")) return;
    modal.classList.add("hidden");
    document.body.classList.remove("tp-locked");
  }

  /* ---------------- boot ---------------- */
  document.addEventListener("DOMContentLoaded", function () {
    var search = document.getElementById("blog-search");
    if (search) {
      var timer = null;
      search.addEventListener("input", function () {
        window.clearTimeout(timer);
        timer = window.setTimeout(function () {
          state.q = search.value.trim().toLowerCase();
          render();
        }, 180);
      });
    }

    Array.prototype.forEach.call(document.querySelectorAll("[data-cat-chip]"), function (chip) {
      chip.addEventListener("click", function () {
        state.cat = chip.getAttribute("data-cat-chip") || "";
        render();
      });
    });

    var clear = document.getElementById("blog-clear");
    if (clear) {
      clear.addEventListener("click", function () {
        state = { cat: "", q: "" };
        if (search) search.value = "";
        render();
      });
    }

    render();

    document.addEventListener("click", function (event) {
      var postBtn = event.target.closest("[data-post]");
      if (postBtn) {
        openPost(postBtn.getAttribute("data-post"));
        return;
      }
      if (event.target.closest("[data-modal-close]")) closeModal();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeModal();
    });

    /* deep link: blog.html#post-id */
    var hash = window.location.hash.replace("#", "");
    if (hash.indexOf("post-") === 0) openPost(hash.slice(5));
  });
})();
