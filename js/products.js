/* TravelPack – product catalogue, home rendering, product page logic */
(function () {
  "use strict";

  var TP = (window.TP = window.TP || {});

  function img(id, w) {
    return (
      "https://images.pexels.com/photos/" +
      id +
      "/pexels-photo-" +
      id +
      ".jpeg?auto=compress&cs=tinysrgb&w=" +
      (w || 800)
    );
  }

  function money(value) {
    return "$" + Number(value).toLocaleString("en-US");
  }

  var TYPE_CABIN = "Cabin Luggage";
  var TYPE_CHECKIN = "Check-in Luggage";
  var TYPE_SETS = "Luggage Sets";
  var TYPE_BACKPACK = "Travel Backpacks";
  var TYPE_DUFFLE = "Duffle Bags";
  var TYPE_LAPTOP = "Laptop & Travel Bags";
  var TYPE_TROLLEY = "Trolley Bags";
  var TYPE_ACCESSORY = "Accessories";

  var SIZE_LABELS = {
    cabin: "Cabin / Carry-on",
    medium: 'Medium (24–26")',
    large: 'Large (28")',
    xl: 'Extra large (30"+)',
    multi: "Multi-size sets",
    bag: "Bags & backpacks",
    accessory: "Accessories"
  };

  var PRODUCTS = [
    {
      id: "tp-cabin-aerolite",
      name: "AeroLite 55 Cabin Spinner",
      type: TYPE_CABIN,
      size: "55 × 38 × 23 cm · 38 L",
      sizeKey: "cabin",
      material: "Matte polycarbonate shell",
      features: ["TSA-approved combination lock", "360° silent double wheels", "Two-stage aluminium handle", "Compression straps inside"],
      price: 149,
      stock: "In stock",
      photo: 2646521,
      featured: true,
      premium: true,
      blurb: "Airline-friendly cabin case built for short business trips and weekend hops."
    },
    {
      id: "tp-cabin-skyline",
      name: "Skyline Compact Carry-On",
      type: TYPE_CABIN,
      size: "50 × 35 × 20 cm · 32 L",
      sizeKey: "cabin",
      material: "Recycled polypropylene with aluminium frame",
      features: ["Front laptop pocket fits 15.6\"", "YKK water-repellent zips", "Fold-flat trolley handle", "Weight: 2.6 kg"],
      price: 129,
      stock: "In stock",
      photo: 27945494,
      featured: true,
      blurb: "A light, tidy carry-on for commuters who board a plane straight after work."
    },
    {
      id: "tp-cabin-urbanshell",
      name: "UrbanShell 40 Cabin Trolley",
      type: TYPE_CABIN,
      size: "55 × 40 × 20 cm · 40 L",
      sizeKey: "cabin",
      material: "Textured ABS shell",
      features: ["360° spinner wheels", "Built-in number lock", "Fully lined interior", "Corner impact guards"],
      price: 159,
      stock: "Low stock",
      photo: 30782813,
      blurb: "Deep-blue hard shell that stays sharp through crowded terminals."
    },
    {
      id: "tp-cabin-meridian",
      name: "Meridian Cabin Pro",
      type: TYPE_CABIN,
      size: "56 × 36 × 23 cm · 42 L",
      sizeKey: "cabin",
      material: "Aircraft-grade polycarbonate",
      features: ["Leather-trimmed handles", "TSA combination lock", "Removable laundry pouch", "Silent Hinomoto wheels"],
      price: 189,
      stock: "In stock",
      photo: 24596572,
      featured: true,
      premium: true,
      blurb: "Our premium cabin case with soft leather details and a whisper-quiet wheel set."
    },
    {
      id: "tp-cabin-transit",
      name: "TransitCase Cabin Elite",
      type: TYPE_CABIN,
      size: "55 × 35 × 25 cm · 40 L",
      sizeKey: "cabin",
      material: "Polycarbonate with metallic finish",
      features: ["Fingerprint-friendly matte coat", "Integrated TSA lock", "Zip-around expansion +5 cm", "Lifetime wheel guarantee"],
      price: 175,
      stock: "In stock",
      photo: 22744062,
      blurb: "Expandable cabin case for travellers who always come home with more."
    },
    {
      id: "tp-checkin-grandtour",
      name: "GrandTour Check-In 68",
      type: TYPE_CHECKIN,
      size: "68 cm · 95 L",
      sizeKey: "large",
      material: "Hardside polycarbonate",
      features: ["Push-button trolley handle", "TSA number lock", "Mesh divider with zip pocket", "Reinforced corner housings"],
      price: 199,
      stock: "In stock",
      photo: 11213249,
      featured: true,
      premium: true,
      blurb: "The dependable large check-in for two-week holidays."
    },
    {
      id: "tp-checkin-voyage",
      name: "VoyageCheck 75 Large",
      type: TYPE_CHECKIN,
      size: "75 cm · 120 L",
      sizeKey: "xl",
      material: "Polypropylene with ribbed shell",
      features: ["Extra-wide wheel stance", "Double-coil zipper", "Fold-out shoe compartment", "ID label window"],
      price: 239,
      stock: "In stock",
      photo: 36807310,
      blurb: "Maximum packing volume for family moves and long relocations."
    },
    {
      id: "tp-checkin-horizon",
      name: "Horizon Check-In 60",
      type: TYPE_CHECKIN,
      size: "60 cm · 75 L",
      sizeKey: "medium",
      material: "Softside ballistic nylon",
      features: ["Four exterior pockets", "Lockable zip pulls", "Reinforced base board", "Trolley sleeve for stacking"],
      price: 169,
      stock: "In stock",
      photo: 13929260,
      featured: true,
      blurb: "A softside medium case that swallows last-minute additions."
    },
    {
      id: "tp-checkin-atlas",
      name: "Atlas Expandable 78",
      type: TYPE_CHECKIN,
      size: "78 cm · 135 L",
      sizeKey: "xl",
      material: "German polycarbonate, gloss finish",
      features: ["Expansion zip +15% volume", "Dual TSA locks", "Anti-theft zipper", "Stain-resistant lining"],
      price: 259,
      stock: "Pre-order",
      photo: 36183004,
      premium: true,
      blurb: "Our largest expandable case for relocations and extended tours."
    },
    {
      id: "tp-checkin-coastal",
      name: "Coastal Check-In 70",
      type: TYPE_CHECKIN,
      size: "70 cm · 100 L",
      sizeKey: "large",
      material: "Hardside polycarbonate, sand finish",
      features: ["Low-profile spinner wheels", "Number lock with reset", "Cross ribbons", "Scratch-resistant coat"],
      price: 209,
      stock: "In stock",
      photo: 6720272,
      blurb: "Sand-toned hard case that hides scuffs between trips."
    },
    {
      id: "tp-set-wayfarer",
      name: "Wayfarer 2-Piece Set",
      type: TYPE_SETS,
      size: "Cabin 55 cm + Medium 68 cm",
      sizeKey: "multi",
      material: "Polycarbonate shells",
      features: ["Nested storage design", "Matching interior lining", "Four wheels per case"],
      price: 329,
      stock: "In stock",
      photo: 34629933,
      featured: true,
      blurb: "Two matching cases for travellers who pack light in and pack full out.",
      set: { pieces: 2, sizes: "55 cm cabin + 68 cm medium", wheels: "360° double spinner", lock: "TSA combination lock", warranty: "5 years" }
    },
    {
      id: "tp-set-voyager",
      name: "Voyager 3-Piece Set",
      type: TYPE_SETS,
      size: "55 cm + 65 cm + 75 cm",
      sizeKey: "multi",
      material: "Polycarbonate shells",
      features: ["Nested storage design", "Colour-matched wheel sets", "Two interior zip dividers"],
      price: 449,
      stock: "In stock",
      photo: 32095000,
      featured: true,
      blurb: "Our best-selling trio — cabin, medium and large covered in one purchase.",
      set: { pieces: 3, sizes: "55 cm + 65 cm + 75 cm", wheels: "360° double spinner", lock: "TSA combination lock", warranty: "5 years" }
    },
    {
      id: "tp-set-family",
      name: "Family Travel Set (4-Piece)",
      type: TYPE_SETS,
      size: "45 cm + 55 cm + 65 cm + 75 cm",
      sizeKey: "multi",
      material: "Polycarbonate shells with aluminium trim",
      features: ["One set for four travellers", "Colour-coded name plates", "Separate laundry bags included"],
      price: 599,
      stock: "Low stock",
      photo: 7368312,
      blurb: "Four coordinated cases sized for the whole household.",
      set: { pieces: 4, sizes: "45 + 55 + 65 + 75 cm", wheels: "360° double spinner", lock: "TSA combination lock", warranty: "7 years" }
    },
    {
      id: "tp-set-heritage",
      name: "Explorer Heritage 3-Piece Set",
      type: TYPE_SETS,
      size: "50 cm + 60 cm + 70 cm",
      sizeKey: "multi",
      material: "Textured ABS with leather-look trim",
      features: ["Vintage-inspired detailing", "Retractable trolley handles", "Fabric-lined interiors"],
      price: 499,
      stock: "In stock",
      photo: 34629931,
      blurb: "Classic styling with modern wheels — three cases that look like a collection.",
      set: { pieces: 3, sizes: "50 + 60 + 70 cm", wheels: "360° spinner", lock: "3-dial number lock", warranty: "3 years" }
    },
    {
      id: "tp-bag-trailpro",
      name: "TrailPro 45 Travel Backpack",
      type: TYPE_BACKPACK,
      size: "45 L · 55 × 30 × 22 cm",
      sizeKey: "bag",
      material: "600D recycled polyester, DWR coating",
      features: ["Clamshell opening", "Padded 16\" laptop sleeve", "Rain cover included", "Hip belt for load transfer"],
      price: 119,
      stock: "In stock",
      photo: 9629915,
      featured: true,
      blurb: "Cabin-legal main pack for multi-city trips and light trekking."
    },
    {
      id: "tp-bag-canvaswander",
      name: "CanvasWander 30 Rucksack",
      type: TYPE_BACKPACK,
      size: "30 L · 45 × 28 × 18 cm",
      sizeKey: "bag",
      material: "Waxed cotton canvas with leather trim",
      features: ["Drawstring + flap closure", "Padded shoulder straps", "Side bottle pockets", "Laptop sleeve fits 15\""],
      price: 79,
      stock: "In stock",
      photo: 9630186,
      blurb: "A rugged canvas rucksack that ages well with every journey."
    },
    {
      id: "tp-bag-metropack",
      name: "MetroPack 28 Commuter",
      type: TYPE_BACKPACK,
      size: "28 L · 44 × 30 × 16 cm",
      sizeKey: "bag",
      material: "Ballistic nylon with vegan leather accents",
      features: ["Quick-access top pocket", "Hidden anti-theft back pocket", "Magnetic buckle closure", "USB pass-through port"],
      price: 89,
      stock: "In stock",
      photo: 3731256,
      featured: true,
      blurb: "Slim city pack that carries a laptop, gym kit and lunch together."
    },
    {
      id: "tp-bag-summit",
      name: "SummitTrek 55 Hiking Pack",
      type: TYPE_BACKPACK,
      size: "55 L · 68 × 34 × 28 cm",
      sizeKey: "bag",
      material: "Ripstop nylon with reinforced base",
      features: ["Adjustable torso length", "Hydration bladder sleeve", "Rain cover and trekking pole loops", "Load-lifter straps"],
      price: 139,
      stock: "In stock",
      photo: 11726037,
      blurb: "A capable 55-litre pack for trail weekends and hut-to-hut routes."
    },
    {
      id: "tp-bag-aquashield",
      name: "AquaShield 40 Weatherproof Pack",
      type: TYPE_BACKPACK,
      size: "40 L · 50 × 30 × 24 cm",
      sizeKey: "bag",
      material: "Waterproof tarpaulin with welded seams",
      features: ["Fully water-rejecting shell", "Roll-top closure", "Padded device compartment", "Reflective safety strips"],
      price: 129,
      stock: "In stock",
      photo: 16359263,
      blurb: "Keeps cameras and laptops dry when the weather turns."
    },
    {
      id: "tp-duff-weekender",
      name: "Weekender 45 Canvas Duffle",
      type: TYPE_DUFFLE,
      size: "45 L · 55 × 28 × 26 cm",
      sizeKey: "bag",
      material: "16 oz cotton canvas with leather handles",
      features: ["Wide U-zip opening", "Detachable padded shoulder strap", "End shoe pocket", "Reinforced base"],
      price: 99,
      stock: "In stock",
      photo: 9582664,
      featured: true,
      blurb: "Classic two-night duffle with a wide opening for easy packing."
    },
    {
      id: "tp-duff-heritage",
      name: "Heritage Leather-Trim Duffle 40",
      type: TYPE_DUFFLE,
      size: "40 L · 52 × 27 × 25 cm",
      sizeKey: "bag",
      material: "Cotton canvas with full-grain leather trim",
      features: ["Brass hardware", "Interior zip pocket", "Carry handles with grip wrap", "Luggage sleeve on the base"],
      price: 159,
      stock: "In stock",
      photo: 9391902,
      blurb: "A smart weekender that slips over a trolley handle."
    },
    {
      id: "tp-duff-sport",
      name: "SportHold 60 Weekender Duffle",
      type: TYPE_DUFFLE,
      size: "60 L · 62 × 32 × 30 cm",
      sizeKey: "bag",
      material: "600D polyester with PVC backing",
      features: ["Ventilated wet pocket", "Mesh produce compartments", "Reinforced grab handles", "Water-resistant base"],
      price: 89,
      stock: "In stock",
      photo: 27793087,
      blurb: "Roomy holdall for gym, pool and training weekends."
    },
    {
      id: "tp-duff-cabinflex",
      name: "CabinFlex 35 Duffle",
      type: TYPE_DUFFLE,
      size: "35 L · 50 × 26 × 24 cm",
      sizeKey: "bag",
      material: "Ripstop nylon with bonded seams",
      features: ["Under-seat friendly size", "Shoe compartment", "Water-bottle pocket", "Weighs only 680 g"],
      price: 75,
      stock: "In stock",
      photo: 5120082,
      blurb: "Light cabin duffle that fits under the seat in front of you."
    },
    {
      id: "tp-laptop-exec",
      name: "Executive Leather Briefcase 15\"",
      type: TYPE_LAPTOP,
      size: "15 L · 39 × 28 × 9 cm",
      sizeKey: "bag",
      material: "Full-grain leather with cotton lining",
      features: ["Padded 15\" laptop bay", "Organiser panel for cards", "Detachable shoulder strap", "Magnetic flap closure"],
      price: 149,
      stock: "In stock",
      photo: 6538433,
      featured: true,
      blurb: "A polished leather briefcase for meetings and daily commutes."
    },
    {
      id: "tp-laptop-slidepro",
      name: "SlidePro Laptop Tote 14\"",
      type: TYPE_LAPTOP,
      size: "12 L · 34 × 26 × 10 cm",
      sizeKey: "bag",
      material: "Pebbled vegan leather",
      features: ["Fits 14\" laptop and tablet", "Magnetic top closure", "Key leash inside", "Reinforced flat base"],
      price: 89,
      stock: "In stock",
      photo: 29359841,
      blurb: "A soft tote that carries tech without looking like a tech bag."
    },
    {
      id: "tp-laptop-commuter",
      name: "Commuter Laptop Backpack 24\"",
      type: TYPE_LAPTOP,
      size: "24 L · 46 × 30 × 15 cm",
      sizeKey: "bag",
      material: "Leather-finish nylon with suede lining",
      features: ["Fits 16\" laptop", "Quick-retrieve phone pocket", "Trolley strap on the back", "Anti-slip shoulder pads"],
      price: 109,
      stock: "In stock",
      photo: 15059375,
      featured: true,
      blurb: "Business-ready backpack with a soft, protective tech bay."
    },
    {
      id: "tp-laptop-studio",
      name: "Studio Leather Laptop Briefcase",
      type: TYPE_LAPTOP,
      size: "18 L · 41 × 30 × 11 cm",
      sizeKey: "bag",
      material: "Hand-finished leather",
      features: ["Wide document compartment", "Padded 15\" sleeve", "Detachable strap", "Hand-stitched edges"],
      price: 169,
      stock: "Low stock",
      photo: 6650020,
      blurb: "Full-grain leather case that improves with every working year."
    },
    {
      id: "tp-trolley-porter",
      name: "Portersoft Trolley Duffle 28\"",
      type: TYPE_TROLLEY,
      size: "28\" · 80 L",
      sizeKey: "large",
      material: "Softside polyester with reinforced frame",
      features: ["Wide inline skate wheels", "Two-stage trolley handle", "Front zip pockets", "Lockable zip pulls"],
      price: 129,
      stock: "In stock",
      photo: 12391911,
      blurb: "Rolling softside for heavy loads you would rather not carry."
    },
    {
      id: "tp-trolley-rail",
      name: "RailTrolley Weekender 25\"",
      type: TYPE_TROLLEY,
      size: "25\" · 60 L",
      sizeKey: "medium",
      material: "Ballistic nylon with moulded base",
      features: ["Two quiet wheels", "Retractable handle", "Garment sleeve included", "Cabin-friendly depth"],
      price: 109,
      stock: "In stock",
      photo: 10640262,
      blurb: "A pull-along weekender sized for rail travel and short flights."
    },
    {
      id: "tp-trolley-aero",
      name: "AeroTrolley 24 Cabin Trolley",
      type: TYPE_TROLLEY,
      size: "24\" · 45 L",
      sizeKey: "cabin",
      material: "Polycarbonate shell with fabric interior",
      features: ["Spinner wheels", "Front accessory pocket", "Number lock", "Fits airline overhead bins"],
      price: 119,
      stock: "In stock",
      photo: 40104348,
      blurb: "Compact rolling cabin bag for light packers and frequent flyers."
    },
    {
      id: "tp-acc-cubes",
      name: "Travel Organiser Packing Cubes (Set of 6)",
      type: TYPE_ACCESSORY,
      size: "6 pieces · S / M / L",
      sizeKey: "accessory",
      material: "Ripstop nylon with mesh panels",
      features: ["Double-zip openings", "Water-resistant coating", "Hand-washable", "Fits any 60–95 L case"],
      price: 39,
      stock: "In stock",
      photo: 18999368,
      featured: true,
      blurb: "Six cubes that turn a messy case into a tidy drawer."
    },
    {
      id: "tp-acc-kit",
      name: "Travel Essentials Accessory Kit",
      type: TYPE_ACCESSORY,
      size: "9 pieces",
      sizeKey: "accessory",
      material: "Mixed technical fabrics",
      features: ["Toiletry bottle set", "Cable organiser pouch", "Packing list card", "Compact travel towel"],
      price: 49,
      stock: "In stock",
      photo: 13987298,
      featured: true,
      blurb: "Everything small that people forget until they are at the gate."
    }
  ];

  TP.PRODUCTS = PRODUCTS;
  TP.TYPES = [TYPE_CABIN, TYPE_CHECKIN, TYPE_SETS, TYPE_BACKPACK, TYPE_DUFFLE, TYPE_LAPTOP, TYPE_TROLLEY, TYPE_ACCESSORY];
  TP.img = img;
  TP.money = money;
  TP.SIZE_LABELS = SIZE_LABELS;

  function stockDot(stock) {
    if (stock === "In stock") return "bg-emerald-500";
    if (stock === "Low stock") return "bg-amber-500";
    return "bg-azure-500";
  }

  function stockText(stock) {
    return stock === "Pre-order" ? "Pre-order now" : stock;
  }

  function productById(id) {
    for (var i = 0; i < PRODUCTS.length; i++) {
      if (PRODUCTS[i].id === id) return PRODUCTS[i];
    }
    return null;
  }

  /* ---------------- card templates ---------------- */
  function productCard(p) {
    return (
      '<article class="product-card reveal flex h-full flex-col overflow-hidden rounded-2xl border border-sand-200 dark:border-white/10 bg-white dark:bg-navy-800 shadow-sm transition hover:shadow-xl">' +
      '<div class="relative aspect-[4/3] overflow-hidden bg-sand-100 dark:bg-navy-900">' +
      '<img src="' +
      img(p.photo, 700) +
      '" alt="' +
      p.name +
      ' – ' +
      p.type +
      '" loading="lazy" class="h-full w-full object-cover transition duration-500 hover:scale-105">' +
      '<span class="absolute top-3 start-3 rounded-full bg-white/95 dark:bg-navy-900/95 px-2.5 py-1 text-[11px] font-semibold text-navy-900 dark:text-sand-100 shadow">' +
      p.type +
      "</span>" +
      '<span class="absolute top-3 end-3 rounded-full bg-white/95 dark:bg-navy-900/95 px-2.5 py-1 text-[11px] font-semibold text-navy-900 dark:text-sand-100 shadow">' +
      money(p.price) +
      "</span>" +
      "</div>" +
      '<div class="flex flex-1 flex-col gap-3 p-4 sm:p-5">' +
      '<div>' +
      '<h3 class="font-display text-base font-semibold leading-snug text-navy-900 dark:text-white">' +
      p.name +
      "</h3>" +
      '<p class="mt-1 text-xs font-semibold uppercase tracking-wider text-charcoal-400 dark:text-sand-500">' +
      p.type +
      "</p>" +
      "</div>" +
      '<div class="mt-auto flex items-center gap-2 text-xs font-medium text-charcoal-500 dark:text-sand-400"><span class="h-2 w-2 rounded-full ' +
      stockDot(p.stock) +
      '"></span>' +
      stockText(p.stock) +
      "</div>" +
      '<div class="flex gap-2">' +
      '<button type="button" data-view="' +
      p.id +
      '" class="flex-1 rounded-xl border border-navy-900/15 dark:border-white/15 px-3 py-2.5 text-xs font-semibold text-navy-900 dark:text-sand-100 transition hover:border-accent-500 hover:text-accent-600 dark:hover:text-accent-400">View Details</button>' +
      '<button type="button" data-enquire="' +
      p.name +
      '" class="flex-1 rounded-xl bg-navy-900 dark:bg-accent-500 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-accent-600 dark:hover:bg-accent-600">Buy</button>' +
      "</div>" +
      "</div></article>"
    );
  }

  function setCard(p, compact, showSpec) {
    var s = p.set;
    if (showSpec === undefined) showSpec = true;
    var specRow = function (label, value) {
      return (
        '<div class="flex items-start gap-3 border-b border-sand-100 dark:border-white/5 py-2 text-sm">' +
        '<span class="w-24 shrink-0 text-charcoal-400 dark:text-sand-500">' +
        label +
        "</span><span class='font-medium text-navy-900 dark:text-sand-100'>" +
        value +
        "</span></div>"
      );
    };
    var specBlock = showSpec
      ? '<div class="rounded-xl bg-sand-50 dark:bg-navy-900/60 px-3">' +
        specRow("Pieces", s.pieces) +
        specRow("Sizes", s.sizes) +
        specRow("Material", p.material) +
        specRow("Wheels", s.wheels) +
        specRow("Lock", s.lock) +
        (compact ? "" : specRow("Warranty", s.warranty)) +
        "</div>"
      : "";
    return (
      '<article class="reveal flex h-full flex-col overflow-hidden rounded-2xl border border-sand-200 dark:border-white/10 bg-white dark:bg-navy-800 shadow-sm transition hover:shadow-xl">' +
      '<div class="relative aspect-[4/3] overflow-hidden bg-sand-100 dark:bg-navy-900">' +
      '<img src="' +
      img(p.photo, 800) +
      '" alt="' +
      p.name +
      ' showing matching luggage pieces" loading="lazy" class="h-full w-full object-cover transition duration-500 hover:scale-105">' +
      '<span class="absolute top-3 start-3 rounded-full bg-accent-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow">' +
      s.pieces +
      " pieces</span>" +
      '<span class="absolute top-3 end-3 rounded-full bg-white/95 dark:bg-navy-900/95 px-2.5 py-1 text-xs font-bold text-navy-900 dark:text-sand-100 shadow">' +
      money(p.price) +
      "</span>" +
      "</div>" +
      '<div class="flex flex-1 flex-col gap-3 p-4 sm:p-5">' +
      '<div><h3 class="font-display text-lg font-semibold text-navy-900 dark:text-white">' +
      p.name +
      "</h3>" +
      '<p class="mt-1 text-sm text-charcoal-500 dark:text-sand-400">' +
      p.blurb +
      "</p></div>" +
      specBlock +
      '<div class="mt-auto flex gap-2 pt-1">' +
      '<button type="button" data-view="' +
      p.id +
      '" class="flex-1 rounded-xl border border-navy-900/15 dark:border-white/15 px-3 py-2.5 text-xs font-semibold text-navy-900 dark:text-sand-100 transition hover:border-accent-500 hover:text-accent-600 dark:hover:text-accent-400">View Details</button>' +
      '<button type="button" data-enquire="' +
      p.name +
      '" class="flex-1 rounded-xl bg-accent-500 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-accent-600">Buy</button>' +
      "</div></div></article>"
    );
  }

  TP.productCard = productCard;
  TP.setCard = setCard;

  function fill(id, html) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }

  function pick(predicate, limit) {
    var out = [];
    for (var i = 0; i < PRODUCTS.length && out.length < limit; i++) {
      if (predicate(PRODUCTS[i])) out.push(PRODUCTS[i]);
    }
    return out;
  }

  function renderCards(list) {
    return list.map(productCard).join("");
  }

  function renderSets(compact, showSpec) {
    return pick(function (p) {
      return p.type === TYPE_SETS;
    }, 4)
      .map(function (p) {
        return setCard(p, compact, showSpec);
      })
      .join("");
  }

  /* ---------------- home sections ---------------- */
  function renderHome() {
    fill("home-sets", renderSets(false, false));
    fill("home-backpacks", renderCards(pick(function (p) { return p.type === TYPE_BACKPACK; }, 4)));
    fill(
      "home-premium",
      renderCards(
        pick(function (p) {
          return p.premium && p.type !== TYPE_SETS;
        }, 3)
      )
    );

    fill("home2-sets", renderSets(true, false));
    fill(
      "home2-accessories",
      renderCards(
        pick(function (p) {
          return p.type === TYPE_ACCESSORY;
        }, 4)
      )
    );

    refreshReveal();
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

  /* ---------------- product modal ---------------- */
  var modalTimer = null;

  function modalMarkup(p) {
    var rows = [
      ["Type", p.type],
      ["Size / capacity", p.size],
      ["Material", p.material],
      ["Availability", stockText(p.stock)],
      ["Price", money(p.price)]
    ];
    if (p.set) {
      rows.splice(3, 0, ["Pieces", String(p.set.pieces)]);
      rows.splice(4, 0, ["Wheels", p.set.wheels]);
      rows.splice(5, 0, ["Lock type", p.set.lock]);
      rows.splice(6, 0, ["Warranty", p.set.warranty]);
    }
    var specHtml = rows
      .map(function (r) {
        return (
          '<div class="flex items-start gap-3 border-b border-sand-100 dark:border-white/5 py-2.5 text-sm">' +
          '<span class="w-32 shrink-0 text-charcoal-400 dark:text-sand-500">' +
          r[0] +
          "</span><span class='font-medium text-navy-900 dark:text-sand-100'>" +
          r[1] +
          "</span></div>"
        );
      })
      .join("");

    var featureHtml = p.features
      .map(function (f) {
        return (
          '<li class="flex items-start gap-2 text-sm text-charcoal-600 dark:text-sand-300">' +
          '<i data-lucide="check" class="mt-0.5 h-4 w-4 shrink-0 text-accent-500"></i><span>' +
          f +
          "</span></li>"
        );
      })
      .join("");

    return (
      '<div class="relative">' +
      '<button type="button" data-modal-close aria-label="Close details" class="absolute top-3 end-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/95 dark:bg-navy-900/95 text-navy-900 dark:text-sand-100 shadow transition hover:text-accent-500"><i data-lucide="x" class="h-5 w-5"></i></button>' +
      '<div class="aspect-[16/10] overflow-hidden bg-sand-100 dark:bg-navy-900">' +
      '<img src="' +
      img(p.photo, 1100) +
      '" alt="' +
      p.name +
      '" class="h-full w-full object-cover"></div>' +
      '<div class="p-5 sm:p-7">' +
      '<span class="inline-block rounded-full bg-accent-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent-600 dark:text-accent-400">' +
      p.type +
      "</span>" +
      '<div class="mt-3 flex flex-wrap items-start justify-between gap-3">' +
      '<div><h3 id="modal-title" class="font-display text-xl font-semibold text-navy-900 dark:text-white sm:text-2xl">' +
      p.name +
      "</h3>" +
      '<p class="mt-1 max-w-xl text-sm text-charcoal-500 dark:text-sand-400">' +
      p.blurb +
      "</p></div>" +
      '<span class="rounded-xl bg-navy-900 dark:bg-accent-500 px-4 py-2 font-display text-lg font-bold text-white">' +
      money(p.price) +
      "</span></div>" +
      '<div class="mt-5 grid gap-5 md:grid-cols-2">' +
      "<div><h4 class='mb-1 text-xs font-bold uppercase tracking-wider text-charcoal-400 dark:text-sand-500'>Specifications</h4>" +
      specHtml +
      "</div>" +
      "<div><h4 class='mb-3 text-xs font-bold uppercase tracking-wider text-charcoal-400 dark:text-sand-500'>Key features</h4><ul class='space-y-2'>" +
      featureHtml +
      "</ul></div>" +
      "</div>" +
      '<div class="mt-6 flex flex-col gap-2 sm:flex-row">' +
      '<button type="button" data-enquire="' +
      p.name +
      '" class="flex-1 rounded-xl bg-accent-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-600">Enquire / Buy this ' +
      p.type.toLowerCase().replace("luggage", "item") +
      "</button>" +
      '<a href="contact.html" class="flex-1 rounded-xl border border-navy-900/15 dark:border-white/15 px-5 py-3 text-center text-sm font-semibold text-navy-900 dark:text-sand-100 transition hover:border-accent-500 hover:text-accent-600 dark:hover:text-accent-400">Book a store visit</a>' +
      "</div>" +
      "</div></div>"
    );
  }

  function openModal(id) {
    var modal = document.getElementById("product-modal");
    var content = document.getElementById("modal-content");
    if (!modal || !content) return;
    var p = productById(id);
    if (!p) return;
    content.innerHTML = modalMarkup(p);
    modal.classList.remove("hidden");
    document.body.classList.add("tp-locked");
    TP.icons();
    if (modalTimer) window.clearTimeout(modalTimer);
    modalTimer = window.setTimeout(function () {
      var closeBtn = content.querySelector("[data-modal-close]");
      if (closeBtn) closeBtn.focus();
    }, 40);
    TP.savePreference({ lastViewed: p.id });
  }

  function closeModal() {
    var modal = document.getElementById("product-modal");
    if (!modal || modal.classList.contains("hidden")) return;
    modal.classList.add("hidden");
    document.body.classList.remove("tp-locked");
  }

  document.addEventListener("click", function (event) {
    var viewBtn = event.target.closest("[data-view]");
    if (viewBtn) {
      openModal(viewBtn.getAttribute("data-view"));
      return;
    }
    if (event.target.closest("[data-modal-close]")) closeModal();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeModal();
  });

  /* ---------------- products page ---------------- */
  function initProductPage() {
    var grid = document.getElementById("products-grid");
    if (!grid) return;

    var search = document.getElementById("search-input");
    var typeSelect = document.getElementById("type-filter");
    var sizeSelect = document.getElementById("size-filter");
    var sortSelect = document.getElementById("sort-select");
    var clearBtn = document.getElementById("clear-filters");
    var countEl = document.getElementById("results-count");
    var empty = document.getElementById("empty-state");
    var chips = document.querySelectorAll("[data-type-chip]");

    var state = { q: "", type: "", size: "", sort: "featured" };

    function syncChips() {
      Array.prototype.forEach.call(chips, function (chip) {
        var active = chip.getAttribute("data-type-chip") === state.type;
        chip.classList.toggle("bg-navy-900", active);
        chip.classList.toggle("dark:bg-accent-500", active);
        chip.classList.toggle("text-white", active);
        chip.classList.toggle("border-transparent", active);
      });
    }

    function apply() {
      var query = state.q.toLowerCase();
      var list = PRODUCTS.filter(function (p) {
        if (state.type && p.type !== state.type) return false;
        if (state.size && p.sizeKey !== state.size) return false;
        if (query) {
          var hay = (p.name + " " + p.type + " " + p.material + " " + p.size + " " + p.features.join(" ")).toLowerCase();
          if (hay.indexOf(query) === -1) return false;
        }
        return true;
      });

      if (state.sort === "price-asc") list.sort(function (a, b) { return a.price - b.price; });
      else if (state.sort === "price-desc") list.sort(function (a, b) { return b.price - a.price; });
      else if (state.sort === "name") list.sort(function (a, b) { return a.name.localeCompare(b.name); });
      else list.sort(function (a, b) { return (b.featured ? 1 : 0) - (a.featured ? 1 : 0); });

      grid.innerHTML = list.map(productCard).join("");
      if (countEl) countEl.textContent = list.length + (list.length === 1 ? " product" : " products");
      if (empty) empty.classList.toggle("hidden", list.length !== 0);
      grid.classList.toggle("hidden", list.length === 0);
      syncChips();
      refreshReveal();
      TP.savePreference({ productFilters: { q: state.q, type: state.type, size: state.size, sort: state.sort } });
    }

    if (search) {
      var timer = null;
      search.addEventListener("input", function () {
        window.clearTimeout(timer);
        timer = window.setTimeout(function () {
          state.q = search.value.trim();
          apply();
        }, 180);
      });
    }
    if (typeSelect) {
      typeSelect.addEventListener("change", function () {
        state.type = typeSelect.value;
        apply();
      });
    }
    if (sizeSelect) {
      sizeSelect.addEventListener("change", function () {
        state.size = sizeSelect.value;
        apply();
      });
    }
    if (sortSelect) {
      sortSelect.addEventListener("change", function () {
        state.sort = sortSelect.value;
        apply();
      });
    }
    if (clearBtn) {
      clearBtn.addEventListener("click", function () {
        state = { q: "", type: "", size: "", sort: "featured" };
        if (search) search.value = "";
        if (typeSelect) typeSelect.value = "";
        if (sizeSelect) sizeSelect.value = "";
        if (sortSelect) sortSelect.value = "featured";
        apply();
        TP.toast("Filters cleared.", "info");
      });
    }

    Array.prototype.forEach.call(chips, function (chip) {
      chip.addEventListener("click", function () {
        state.type = chip.getAttribute("data-type-chip") || "";
        if (typeSelect) typeSelect.value = state.type;
        apply();
      });
    });

    var params = new URLSearchParams(window.location.search);
    var typeParam = params.get("type");
    if (typeParam && TP.TYPES.indexOf(typeParam) > -1) {
      state.type = typeParam;
      if (typeSelect) typeSelect.value = typeParam;
    }
    var sortParam = params.get("sort");
    if (["price-asc", "price-desc", "name", "featured"].indexOf(sortParam) > -1) {
      state.sort = sortParam;
      if (sortSelect) sortSelect.value = sortParam;
    }

    apply();
  }

  /* ---------------- boot ---------------- */
  document.addEventListener("DOMContentLoaded", function () {
    renderHome();
    initProductPage();
    TP.icons();
  });
})();
