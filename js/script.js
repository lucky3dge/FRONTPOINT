/* =========================
  PAGINATION
========================= */
function showPage(pageNumber) {
  // Hide all pages
  document.querySelectorAll(".product-page").forEach(page => {
    page.classList.add("d-none");
  });

  // Show selected page
  const activePage = document.getElementById("page" + pageNumber);
  if (activePage) activePage.classList.remove("d-none");

  // Update active pagination button
  document.querySelectorAll("#productPagination .page-item").forEach(item => {
    item.classList.remove("active");
  });

  const activeBtn = document.querySelector(`#productPagination .page-item:nth-child(${pageNumber})`);
  if (activeBtn) activeBtn.classList.add("active");

  // Optional: scroll back to top of products nicely
  const firstPage = document.getElementById("page1");
  if (firstPage) firstPage.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Make sure page 1 shows on load
document.addEventListener("DOMContentLoaded", () => showPage(1));


 /* =========================
    chatbotBox
 ========================= */
function toggleFPChat(){
const chat=document.getElementById("fpChatWindow");
chat.style.display=chat.style.display==="flex"?"none":"flex";
}


function handleKey(e){
if(e.key==="Enter"){
sendFPMessage();
}
}


function sendFPMessage(){

const input=document.getElementById("fpUserInput");
const text=input.value.trim();

if(!text) return;

addUserMessage(text);
input.value="";

setTimeout(()=>botReply(text),700);
}


function addUserMessage(text){
const body=document.getElementById("fpChatBody");

const msg=document.createElement("div");
msg.className="fp-user-message";
msg.innerText=text;

body.appendChild(msg);
body.scrollTop=body.scrollHeight;
}


function addBotMessage(text){
const body=document.getElementById("fpChatBody");

const msg=document.createElement("div");
msg.className="fp-bot-message";
msg.innerHTML=text;

body.appendChild(msg);
body.scrollTop=body.scrollHeight;
}


function botReply(text){

text=text.toLowerCase();

if(text.includes("product")){
addBotMessage("We supply vehicles, solar equipment, furniture, building materials, agricultural machinery, and more.");
}

else if(text.includes("solar")){
addBotMessage("We provide lithium batteries, solar panels, hybrid inverters, and solar street lights.");
}

else if(text.includes("vehicle")){
addBotMessage("Our vehicles include Toyota Camry, Lexus models, BYD EVs, Li Auto, Avatr and more.");
}

else if(text.includes("procurement")){
addBotMessage("Frontpoint connects Nigerian buyers with trusted Chinese suppliers and manages logistics, documentation, and delivery.");
}

else if(text.includes("contact")){
addBotMessage("You can email us at <b>Frontpointent@outlook.com</b><br><br>Or chat directly on WhatsApp:<br><a href='https://wa.me/8615622784181' target='_blank'>Open WhatsApp</a>");
}

else if(text.includes("price")){
addBotMessage("Prices depend on product quantity and shipping requirements. Please contact us for a quotation.");
}

else if(text.includes("hello") || text.includes("hi")){
addBotMessage("Hello 👋 How can we assist you today?");
}

else{
addBotMessage("Thank you for contacting Frontpoint. A representative will assist you soon. You may also reach us on WhatsApp:<br><a href='https://wa.me/8615622784181' target='_blank'>Chat on WhatsApp</a>");
}

}

/* =========================
      sidebar
========================= */
const offcanvas = document.getElementById('offcanvas');
const closeBtn = document.getElementById('offcanvasClose');

closeBtn.addEventListener('click', () => {
  offcanvas.classList.remove('show');       // Remove Bootstrap's show class
  document.body.classList.remove('offcanvas-backdrop'); // Remove backdrop if needed
});


/* =========================
GLOBAL SEARCH (OTHER PAGES)
========================= */

function globalSearch(event) {
  event.preventDefault();

  let input =
    document.getElementById("globalSearchInput") ||
    document.getElementById("searchInput");

  if (!input) return;

  let query = input.value.trim();
  if (query === "") return;

  localStorage.setItem("productSearch", query);

  // ✅ Correct page
  window.location.href = "products.html";
}


/* =========================
SEARCH INSIDE PRODUCTS PAGE
========================= */

function searchProducts() {
  let input = document.getElementById("searchInput");
  if (!input) return;

  let filter = input.value.toLowerCase();

  // Show all pages before filtering
  document.querySelectorAll(".product-page").forEach(page => {
    page.classList.remove("d-none");
  });

  let products = document.querySelectorAll(".product-item");

  products.forEach(product => {
    let title = product.querySelector(".card-title").textContent.toLowerCase();

    if (title.includes(filter)) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}


/* =========================
AUTO SEARCH AFTER REDIRECT
========================= */

window.addEventListener("DOMContentLoaded", function () {
  let saved = localStorage.getItem("productSearch");
  if (!saved) return;

  let input = document.getElementById("searchInput");
  if (!input) return;

  input.value = saved;

  // Show all pages so search can find everything
  document.querySelectorAll(".product-page").forEach(page => {
    page.classList.remove("d-none");
  });

  searchProducts();

  localStorage.removeItem("productSearch");
});

/* =========================
GLOBAL SEARCH SYSTEM
========================= */

const searchStorageKey = "productSearchGlobal";

/* ==========================================
1️⃣ Global search from any page
========================================== */
function globalSearch(event) {
  event.preventDefault();

  const input =
    document.getElementById("globalSearchInput") ||
    document.getElementById("searchInput");

  if (!input) return;

  const query = input.value.trim();
  if (!query) return;

  // Save query to localStorage
  localStorage.setItem(searchStorageKey, query);

  // Redirect to products.html
  window.location.href = "products.html";
}

/* ==========================================
2️⃣ Live search on products page
========================================== */
function liveSearchProducts(scrollToFirst = false) {
  const input = document.getElementById("searchInput");
  if (!input) return;

  const filter = input.value.toLowerCase();

  // Show all product pages first
  const pages = document.querySelectorAll(".product-page");
  pages.forEach(page => page.classList.remove("d-none"));

  const products = document.querySelectorAll(".product-item");
  let firstMatch = null;

  products.forEach(product => {
    const title = product.querySelector(".card-title").textContent.toLowerCase();

    if (title.includes(filter)) {
      product.classList.remove("hide");
      product.classList.add("show", "found");
      if (!firstMatch) firstMatch = product;
    } else {
      product.classList.add("hide");
      product.classList.remove("show", "found");
    }
  });

  // Scroll to first match
  if (scrollToFirst && firstMatch) {
    firstMatch.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

/* ==========================================
3️⃣ Auto search when redirected from other page
========================================== */
window.addEventListener("DOMContentLoaded", function () {
  const savedSearch = localStorage.getItem(searchStorageKey);
  if (!savedSearch) return;

  const input = document.getElementById("searchInput");
  if (!input) return;

  input.value = savedSearch;

  // Show all pages for searching
  document.querySelectorAll(".product-page").forEach(page => page.classList.remove("d-none"));

  liveSearchProducts(true); // Scroll to first match

  localStorage.removeItem(searchStorageKey);
});

/* ==========================================
4️⃣ Optional: Pagination fix
========================================== */
function showPage(pageNumber) {
  const pages = document.querySelectorAll(".product-page");
  pages.forEach((page, index) => {
    if (index === pageNumber - 1) {
      page.classList.remove("d-none");
    } else {
      page.classList.add("d-none");
    }
  });
}

/* =========================
   searchProducts
========================= */
  function searchProducts() {
    const input = document.getElementById("searchInput");
    if (!input) return;

    const query = input.value.trim().toLowerCase();
    const pages = document.querySelectorAll(".product-page");
    const items = document.querySelectorAll(".product-item");

    // Create / get "no results" message
    let noResults = document.getElementById("noResultsMsg");
    if (!noResults) {
      noResults = document.createElement("div");
      noResults.id = "noResultsMsg";
      noResults.className = "text-center text-muted my-4";
      noResults.style.display = "none";
      noResults.innerHTML = "No products found.";
      // insert message before pagination if it exists, else at end of body
      const pagination = document.querySelector("nav[aria-label='Product pages'], nav .pagination")?.closest("nav");
      if (pagination) pagination.parentNode.insertBefore(noResults, pagination);
      else document.body.appendChild(noResults);
    }

    // If empty search: reset everything
    if (query === "") {
      // show all items
      items.forEach(item => item.classList.remove("d-none"));

      // reset pages: show page1, hide page2 & page3
      pages.forEach((p, idx) => {
        if (idx === 0) p.classList.remove("d-none");
        else p.classList.add("d-none");
      });

      // reset pagination active
      const paginationItems = document.querySelectorAll(".pagination .page-item");
      paginationItems.forEach((li, idx) => {
        li.classList.toggle("active", idx === 0);
      });

      noResults.style.display = "none";
      return;
    }

    // Filter items by title + text
    let anyMatch = false;

    items.forEach(item => {
      const title = item.querySelector(".card-title")?.innerText.toLowerCase() || "";
      const text  = item.querySelector(".card-text")?.innerText.toLowerCase() || "";
      const matches = title.includes(query) || text.includes(query);

      item.classList.toggle("d-none", !matches);
      if (matches) anyMatch = true;
    });

    // Show pages that contain visible items, hide pages that don't
    pages.forEach(page => {
      const hasVisible = page.querySelector(".product-item:not(.d-none)") !== null;
      page.classList.toggle("d-none", !hasVisible);
    });

    // Hide pagination while searching (optional but cleaner)
    const paginationNav = document.querySelector("nav[aria-label='Product pages']") || document.querySelector("nav .pagination")?.closest("nav");
    if (paginationNav) paginationNav.style.display = "none";

    // Show/hide "No results"
    noResults.style.display = anyMatch ? "none" : "block";
  }

  // OPTIONAL: when user clicks pagination, cancel search input
  function showPage(pageNumber) {
    // Clear search box if you want pagination to work normally
    const input = document.getElementById("searchInput");
    if (input) input.value = "";

    const pages = document.querySelectorAll(".product-page");
    pages.forEach(p => p.classList.add("d-none"));

    const activePage = document.getElementById("page" + pageNumber);
    if (activePage) activePage.classList.remove("d-none");

    // Update pagination active state
    document.querySelectorAll(".pagination .page-item").forEach(li => li.classList.remove("active"));
    const activeLi = document.querySelector(`.pagination .page-item:nth-child(${pageNumber})`);
    if (activeLi) activeLi.classList.add("active");

    // Re-show pagination if it was hidden during search
    const paginationNav = document.querySelector("nav[aria-label='Product pages']") || document.querySelector("nav .pagination")?.closest("nav");
    if (paginationNav) paginationNav.style.display = "block";

    // Ensure all products visible again
    document.querySelectorAll(".product-item").forEach(item => item.classList.remove("d-none"));

    // Hide "no results" if exists
    const noResults = document.getElementById("noResultsMsg");
    if (noResults) noResults.style.display = "none";
  }

  // Load default page
  document.addEventListener("DOMContentLoaded", () => {
    // Ensure page1 shows first
    if (typeof showPage === "function") showPage(1);
  });


  /* =========================
     Global search
  ========================= */
  function globalSearch(e) {
  e.preventDefault();
  const q = document.getElementById("globalSearchInput").value.trim();
  if (!q) return;

  // redirect to products with query
  window.location.href = "products.html?q=" + encodeURIComponent(q);
}
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const q = params.get("q");

  if (q) {
    const input = document.getElementById("searchInput");
    if (input) {
      input.value = q;
      searchProducts(); // run your existing filter
    }
  }
});
document.addEventListener("DOMContentLoaded", () => {

  const input = document.getElementById("searchInput"); // local filter input
  const globalInput = document.getElementById("globalSearchInput"); // navbar/global input
  const pages = document.querySelectorAll(".product-page");
  const items = document.querySelectorAll(".product-item");

  // ---------------------------
  // Helper: show page by index
  // ---------------------------
  function showPage(pageNumber) {
    pages.forEach((page, idx) => page.classList.toggle("d-none", idx !== pageNumber - 1));
    const paginationItems = document.querySelectorAll(".pagination .page-item");
    paginationItems.forEach((li, idx) => li.classList.toggle("active", idx === pageNumber - 1));
  }

  // ---------------------------
  // Filter products by query
  // ---------------------------
  function filterProducts(query) {
    query = (query || "").toLowerCase().trim();

    if (!query) {
      // Reset: show all
      items.forEach(item => item.classList.remove("d-none"));
      pages.forEach((page, idx) => page.classList.toggle("d-none", idx !== 0));
      showPage(1);

      const paginationNav = document.querySelector("nav[aria-label='Product pages']");
      if (paginationNav) paginationNav.style.display = "block";

      const noResults = document.getElementById("noResultsMsg");
      if (noResults) noResults.style.display = "none";
      return;
    }

    let anyMatch = false;

    items.forEach(item => {
      const title = item.querySelector(".card-title")?.textContent.toLowerCase() || "";
      const desc  = item.querySelector(".card-text")?.textContent.toLowerCase() || "";
      const match = title.includes(query) || desc.includes(query);

      item.classList.toggle("d-none", !match);
      if (match) anyMatch = true;
    });

    // Show pages with at least one match
    pages.forEach(page => {
      const hasVisible = page.querySelector(".product-item:not(.d-none)") !== null;
      page.classList.toggle("d-none", !hasVisible);
    });

    // Hide pagination during search
    const paginationNav = document.querySelector("nav[aria-label='Product pages']");
    if (paginationNav) paginationNav.style.display = "none";

    // Show no results message
    let noResults = document.getElementById("noResultsMsg");
    if (!noResults) {
      noResults = document.createElement("div");
      noResults.id = "noResultsMsg";
      noResults.className = "text-center text-muted my-4";
      noResults.style.display = "none";
      noResults.innerText = "No products found.";
      document.querySelector("body").appendChild(noResults);
    }
    noResults.style.display = anyMatch ? "none" : "block";
  }

  // ---------------------------
  // Apply query from URL ?q=
  // ---------------------------
  const params = new URLSearchParams(window.location.search);
  const q = params.get("q");
  if (q) {
    if (input) input.value = q;
    filterProducts(q);
    if (globalInput) globalInput.value = q; // sync navbar/global input
  }

  // ---------------------------
  // Global search from navbar
  // ---------------------------
  const globalForm = document.getElementById("globalSearchForm");
  if (globalForm && globalInput) {
    globalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = globalInput.value.trim();
      if (!query) return;
      // Redirect to products.html with query
      window.location.href = "products.html?q=" + encodeURIComponent(query);
    });
  }

  // ---------------------------
  // Optional: local filter input live
  // ---------------------------
  if (input) {
    input.addEventListener("input", () => filterProducts(input.value));
  }

});
