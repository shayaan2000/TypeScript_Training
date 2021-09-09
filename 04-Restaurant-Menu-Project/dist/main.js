"use strict";
// initial data
const allItems = [
    {
        id: 1,
        title: "buttermilk pancakes",
        category: "breakfast",
        price: 15.99,
        img: "./img/item-1.jpeg",
        desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
    },
    {
        id: 2,
        title: "diner double",
        category: "lunch",
        price: 13.99,
        img: "./img/item-2.jpeg",
        desc: `vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `,
    },
    {
        id: 3,
        title: "godzilla milkshake",
        category: "shakes",
        price: 6.99,
        img: "./img/item-3.jpeg",
        desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
    },
    {
        id: 4,
        title: "country delight",
        category: "breakfast",
        price: 20.99,
        img: "./img/item-4.jpeg",
        desc: `Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, `,
    },
    {
        id: 5,
        title: "egg attack",
        category: "lunch",
        price: 22.99,
        img: "./img/item-5.jpeg",
        desc: `franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up `,
    },
    {
        id: 6,
        title: "oreo dream",
        category: "shakes",
        price: 18.99,
        img: "./img/item-6.jpeg",
        desc: `Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday`,
    },
    {
        id: 7,
        title: "bacon overflow",
        category: "breakfast",
        price: 8.99,
        img: "./img/item-7.jpeg",
        desc: `carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird `,
    },
    {
        id: 8,
        title: "american classic",
        category: "lunch",
        price: 12.99,
        img: "./img/item-8.jpeg",
        desc: `on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut  `,
    },
    {
        id: 9,
        title: "quarantine buddy",
        category: "shakes",
        price: 16.99,
        img: "./img/item-9.jpeg",
        desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
    },
    {
        id: 10,
        title: "bison steak",
        category: "dinner",
        price: 22.99,
        img: "./img/item-10.jpeg",
        desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
    },
];
let currentItems = [];
let categoryTabs;
//============== Selecting Elememts =================
const categoryFilterBarEl = document.querySelector(".filter-bar");
const categoryTabsEl = document.getElementsByClassName("filter-tab");
const menuSectionEl = document.querySelector(".menu-section");
//=============== Generating Markups ================
// Generating an item markup
const generateMenuItemMarkup = (item) => {
    return `
    <div class="item">
    <img src="${item.img}" alt="foodimg" />
    <div class="item-text-content">
        <div class="item-header">
            <h3 class="item-title">${item.title}</h3>
            <p class="item-price">$${item.price}</p>
        </div>
        <div class="divider"></div>
        <p class="item-description">${item.desc}</p>
    </div>
  </div>
  `;
};
// Generating a tab markup
const generateCategoryTabMarkup = (categoryTab) => {
    return `
    <li class="filter-tab" data-tab-id="${categoryTab.id}">${categoryTab.title}</li>
  `;
};
//======== Generating Category Tabs Dynamically ========
const generateCategoryTabs = () => {
    // extracting a unique set of categories from all items
    const uniqueCategories = [
        ...new Set(allItems.map(({ category }) => category.toLowerCase())),
    ];
    // initializing categories tabs - 0 is always 'all'
    categoryTabs = [{ id: 0, title: "all" }];
    // generating data for categoryTabs and pushing
    categoryTabs.push(...uniqueCategories.map((categoryTitle, i) => {
        return { id: i + 1, title: categoryTitle };
    }));
};
//================== Render Functions =================
// Renders current items
const displayResults = () => {
    menuSectionEl.innerHTML = "";
    const currentItemsMarkup = currentItems
        .map((item) => generateMenuItemMarkup(item))
        .join("");
    menuSectionEl.insertAdjacentHTML("afterbegin", currentItemsMarkup);
};
// Renders category tabs
const renderTabs = () => {
    // generating markups
    const categoryTabsMarkups = categoryTabs
        .map((tab) => generateCategoryTabMarkup(tab))
        .join("");
    // rendering tabs
    categoryFilterBarEl.innerHTML = "";
    categoryFilterBarEl.insertAdjacentHTML("afterbegin", categoryTabsMarkups);
};
// Renders active state of tab
const setTabActive = (tabId) => {
    for (const categoryTab of categoryTabsEl) {
        categoryTab.classList.remove("active");
    }
    categoryTabsEl[tabId].classList.add("active");
};
//=============== Filter Functionality ================
// Updates current items based on the received category
const filterResults = (filterCategory) => {
    currentItems = allItems.filter(({ category }) => filterCategory.toLowerCase() === category.toLowerCase());
};
// Callback function for click on tabs
const handleFilter = (event) => {
    const target = event.target;
    if (!target.closest(".filter-tab"))
        return;
    const tabId = +target.dataset.tabId;
    setTabActive(tabId);
    // Checking for 'All'
    tabId === 0
        ? (currentItems = allItems.map((item) => (Object.assign({}, item))))
        : filterResults(categoryTabs[tabId].title);
    // Rendering current
    displayResults();
};
// Event listener
categoryFilterBarEl.addEventListener("click", handleFilter);
//================== Initializing ====================
const init = () => {
    // Dynamically generating category tabs
    generateCategoryTabs();
    renderTabs();
    setTabActive(0);
    // Initializing current items with all Items
    currentItems = allItems.map((item) => (Object.assign({}, item)));
    displayResults();
};
init();
