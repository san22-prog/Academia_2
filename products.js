const productGroups = [
  {
    category: "Art Supplies",
    items: [
      ["Acrylic Colour Marker Set", 250],
      ["Acrylic Colour Paint Set", 220],
      ["Rainbow Colour Pencil Set", 180],
      ["Artist Colour Pencil Collection", 280],
      ["Artist Painting Canvas", 200],
      ["Oil Pastels", 150],
      ["Classic Paint Palette", 80],
      ["Artist Mixing Palette", 95],
      ["Artist Mixing Palette", 95],
      ["Premium Artist Palette", 160],
      ["Wax Seal Kit", 250],
      ["Pink Spiral Sketchbook", 180],
      ["Classic Artist Sketchbook", 200],
      ["Premium Drawing Sketchbook", 280],
      ["Watercolour Paint Palette", 220],
      ["Rainbow Watercolour Palette", 240],
      ["3D Rabbit Stickers", 70],
      ["Cute Character Stickers", 60],
      ["Pastel Decorative Stickers", 65],
      ["Hello Kitty Stickers", 75],
      ["Cute Cat & Dog Stickers", 70],
      ["Butterfly Stickers", 60],
    ],
  },
  {
    category: "Paper & Planning",
    items: [
      ["Hello Kitty & Friends 2027 Calendar", 250],
      ["Cute Cats 2027 Wall Calendar", 220],
      ["Lavender Dreams 2027 Desk Calendar", 180],
      ["Floral Elegance 2027 Desk Calendar", 200],
      ["Classic School Copybook Set", 150],
      ["Classic School Copybook Set", 150],
      ["Classic School Copybook Set", 150],
      ["Floral School Copybook Set (x4)", 240],
      ["Floral Daily Diary", 220],
      ["Pastel Personal Diary", 180],
      ["Pastel Spiral Notebook", 160],
      ["Floral Study Notebook", 190],
      ["Cute Cat Notebook", 180],
      ["Cute Koala Notebook", 180],
      ["Cute Rabbit Notebook", 180],
      ["Cute Mocha Notebook", 180],
      ["Floral Notebook Set", 250],
      ["Kawaii Dino Notebook Bundle", 260],
      ["Cherry Blossom Notebook Set", 250],
      ["Aesthetic Study Notebook Set", 240],
      ["Daily Planner", 220],
      ["Daily Planner", 220],
      ["Weekly Planner", 200],
      ["Daily Planner", 220],
      ["Cute Cat Sticky Notes", 90],
      ["Mini Reminder Notes", 70],
      ["Hello Kitty Sticky Notes", 100],
      ["Purple Memo Notes", 80],
      ["Pink Memo Notes", 80],
      ["Cute Daily To-Do List Pad", 120],
      ["Pastel Spiral To-Do List Pad", 140],
    ],
  },
  {
    category: "Everyday Essentials",
    items: [
      ["Blush Pink Calculator", 250],
      ["Pastel Pink Scientific Calculator", 650],
      ["Lavender Scientific Calculator", 650],
      ["Pastel Clear Bag", 180],
      ["Hello Kitty Writing Clipboard", 150],
      ["Classic Hello Kitty Writing Clipboard", 150],
      ["Kuromi Writing Clipboard", 150],
      ["Colour Pen Set 1", 150],
      ["Colour Pen Set 2", 150],
      ["Complete Study Starter Set", 450],
      ["Pastel School Essentials Bundle", 380],
      ["Everyday Writing Kit", 250],
      ["Student Stationery Set", 350],
      ["Cute Panda Desk Essentials Set", 300],
      ["Back-to-School Supply Bundle", 500],
      ["Colourful Notes Stationery Set", 280],
      ["Study Desk Companion Kit", 350],
      ["Creative Student Essentials", 400],
      ["All-in-One Stationery Bundle", 550],
      ["Hello Kitty Stationery Set", 350],
      ["Milk and Mocha Stationery Set", 350],
      ["Pastel Blue Correction Tape", 65],
      ["Pastel Pink Correction Tape", 65],
      ["Precision Craft Cutter", 90],
      ["Classic Eraser", 25],
      ["Cute Mini Eraser", 35],
      ["Cute Kuromi Eraser", 45],
      ["Complete Geometry Set", 180],
      ["Pastel Study Highlighters", 150],
      ["Bright Colour Highlighter Set", 160],
      ["Everyday Highlighting Pens", 120],
      ["Everyday Writing Pen", 35],
      ["Everyday Writing Pen", 35],
      ["Everyday Writing Pen", 35],
      ["Classic HB Writing Pencils", 80],
      ["Floral Pencil Pouch", 140],
      ["Pastel Pencil Case", 160],
      ["Transparent Pencil Case", 120],
      ["Pastel Gel Pen Collection", 180],
      ["Blue Ink Pen Set", 100],
      ["Black Ink Pen Set", 100],
      ["Fine-Tip Colour Pen Bundle", 180],
      ["Premium Study Pen Bundle", 220],
      ["Rose Pink Ruler", 50],
      ["Floral Pattern Ruler", 55],
      ["Cute Teddy Bear Scissors", 85],
      ["Hello Kitty Scissors", 95],
    ],
  },
  
];

const descriptions = {
  "Art Supplies":
    "Bring your creative ideas to life with this fun addition to your stationery collection.",
  "Paper & Planning":
    "Keep your notes, plans and daily tasks organised with this practical paper essential.",
  "Everyday Essentials":
    "A handy everyday stationery essential for school, university or your study desk.",
};

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/\(x4\)/g, "x4")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");




const productImages = {
  // Art Supplies — P001 to P022
  P001: require("./assets/products/acrylicmarker-001.jpeg"),
  P002: require("./assets/products/watercolour-003.jpeg"),
  P003: require("./assets/products/colourpencil-001.jpeg"),
  P004: require("./assets/products/colourpencil-002.jpeg"),
  P005: require("./assets/products/canvas-001.jpeg"),
  P006: require("./assets/products/oilpastel-001.jpeg"),
  P007: require("./assets/products/palette-001.jpeg"),
  P008: require("./assets/products/palette-002.jpeg"),
  P009: require("./assets/products/palette-003.jpeg"),
  P010: require("./assets/products/palette-004.jpeg"),
  P011: require("./assets/products/sealwax-001.jpeg"),
  P012: require("./assets/products/sketchbook-001.jpeg"),
  P013: require("./assets/products/sketchbook-002.jpeg"),
  P014: require("./assets/products/sketchbook-003.jpeg"),
  P015: require("./assets/products/watercolour-001.jpeg"),
  P016: require("./assets/products/watercolour-002.jpeg"),
  P017: require("./assets/products/stickers-001.jpeg"),
  P018: require("./assets/products/stickers-002.jpeg"),
  P019: require("./assets/products/stickers-003.jpeg"),
  P020: require("./assets/products/stickers-004.jpeg"),
  P021: require("./assets/products/stickers-005.jpeg"),
  P022: require("./assets/products/stickers-006.jpeg"),

  // Paper & Planning — P023 to P053
  P023: require("./assets/products/calendar-001.jpg"),
  P024: require("./assets/products/calendar-002.jpg"),
  P025: require("./assets/products/calendar-003.jpg"),
  P026: require("./assets/products/calendar-004.jpg"),
  P027: require("./assets/products/copybookset-001.jpeg"),
  P028: require("./assets/products/copybookset-002.jpeg"),
  P029: require("./assets/products/copybookset-003.jpeg"),
  P030: require("./assets/products/copybookset-004.jpeg"),
  P031: require("./assets/products/diary-001.jpeg"),
  P032: require("./assets/products/diary-002.jpeg"),
  P033: require("./assets/products/notebook-001.jpeg"),
  P034: require("./assets/products/notebook-002.jpeg"),
  P035: require("./assets/products/notebook-003.jpeg"),
  P036: require("./assets/products/notebook-004.jpeg"),
  P037: require("./assets/products/notebook-005.jpeg"),
  P038: require("./assets/products/notebook-006.jpeg"),
  P039: require("./assets/products/notebookset-001.jpeg"),
  P040: require("./assets/products/notebookset-002.jpeg"),
  P041: require("./assets/products/notebookset-003.jpeg"),
  P042: require("./assets/products/notebookset-004.jpeg"),
  P043: require("./assets/products/planner-001.jpg"),
  P044: require("./assets/products/planner-002.jpg"),
  P045: require("./assets/products/planner-003.jpg"),
  P046: require("./assets/products/planner-004.jpg"),
  P047: require("./assets/products/stickynotes-001.jpeg"),
  P048: require("./assets/products/stickynotes-002.jpeg"),
  P049: require("./assets/products/stickynotes-003.jpeg"),
  P050: require("./assets/products/stickynotes-004.jpeg"),
  P051: require("./assets/products/stickynotes-005.jpeg"),
  P052: require("./assets/products/todolist-001.jpg"),
  P053: require("./assets/products/todolist-002.jpg"),

  // Everyday Essentials — P054 to P100
  P054: require("./assets/products/calculator-001.jpeg"),
  P055: require("./assets/products/calculator-002.jpeg"),
  P056: require("./assets/products/calculator-003.jpeg"),
  P057: require("./assets/products/clearbag-001.jpeg"),
  P058: require("./assets/products/clipboard-001.jpeg"),
  P059: require("./assets/products/clipboard-002.jpeg"),
  P060: require("./assets/products/clipboard-003.jpeg"),
  P061: require("./assets/products/colourpen-001.jpeg"),
  P062: require("./assets/products/colourpen-002.jpeg"),
  P063: require("./assets/products/comboset-001.jpeg"),
  P064: require("./assets/products/comboset-002.jpeg"),
  P065: require("./assets/products/comboset-003.jpeg"),
  P066: require("./assets/products/comboset-004.jpeg"),
  P067: require("./assets/products/comboset-005.jpeg"),
  P068: require("./assets/products/comboset-006.jpeg"),
  P069: require("./assets/products/comboset-007.jpeg"),
  P070: require("./assets/products/comboset-008.jpeg"),
  P071: require("./assets/products/comboset-009.jpeg"),
  P072: require("./assets/products/comboset-010.jpeg"),
  P073: require("./assets/products/comboset-011.jpeg"),
  P074: require("./assets/products/comboset-012.jpeg"),
  P075: require("./assets/products/correctiontape-001.jpeg"),
  P076: require("./assets/products/correctiontape-002.jpeg"),
  P077: require("./assets/products/cutter-001.jpeg"),
  P078: require("./assets/products/eraser-001.jpeg"),
  P079: require("./assets/products/eraser-002.jpeg"),
  P080: require("./assets/products/eraser-003.jpeg"),
  P081: require("./assets/products/geometryset-001.jpeg"),
  P082: require("./assets/products/highlighter-001.jpeg"),
  P083: require("./assets/products/highlighter-002.jpeg"),
  P084: require("./assets/products/highlighter-003.jpeg"),
  P085: require("./assets/products/pen-001.jpeg"),
  P086: require("./assets/products/pen-002.jpeg"),
  P087: require("./assets/products/pen-003.jpeg"),
  P088: require("./assets/products/pencil-001.jpeg"),
  P089: require("./assets/products/pencilcase-001.jpeg"),
  P090: require("./assets/products/pencilcase-002.jpeg"),
  P091: require("./assets/products/pencilcase-003.jpeg"),
  P092: require("./assets/products/penset-001.jpeg"),
  P093: require("./assets/products/penset-002.jpeg"),
  P094: require("./assets/products/penset-003.jpeg"),
  P095: require("./assets/products/penset-004.jpeg"),
  P096: require("./assets/products/penset-005.jpeg"),
  P097: require("./assets/products/ruler-001.jpeg"),
  P098: require("./assets/products/ruler-002.jpeg"),
  P099: require("./assets/products/scissors-001.jpeg"),
  P100: require("./assets/products/scissors-002.jpeg"),
};

const getProductLabel = (category) => {
  if (category === 'Paper & Planning') {
    return 'Study favourite';
  }

  if (category === 'Everyday Essentials') {
    return 'Everyday essential';
  }

  if (category === 'Art Supplies') {
    return 'Creative pick';
  }

  return '';
};

export const products = productGroups.flatMap((group) =>
  group.items.map(([name, price], index) => {
    const id = `P${String(
      productGroups
        .slice(0, productGroups.indexOf(group))
        .reduce((total, previous) => total + previous.items.length, 0)
        + index + 1
    ).padStart(3, "0")}`;

    return {
      id,
      name,
      category: group.category,
      price,
      label: getProductLabel(group.category),
      description: `${name} — ${descriptions[group.category]}`,
      imageFile: `${id}-${slugify(name)}.png`,
      image: productImages[id] || null,
    };
  })
);


console.log("Total products:", products.length);