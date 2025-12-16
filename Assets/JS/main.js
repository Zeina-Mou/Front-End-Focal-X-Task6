// Loading Page (initialization the page with available products)
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("home-page")) {
    initHomePage();
  } else if (document.getElementById("admin-page")) {
    initAdminPage();
  }
});

// Data Management section

// Function To retrieve stored data from LocalDtorage
function getProducts() {
  const products = localStorage.getItem("products");
  if (products) {
      const parsed = JSON.parse(products);
      if (parsed.length > 0) return parsed;
      localStorage.removeItem("products");
  }

  // Virtual data displayed on the site
const initialData = [
  {
    id: 1,
    name: "Gaming Laptop",
    price: 1500,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1586268321208-c1812b582cd8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGdhbWluZyUyMGxhcHRvcCUyMHByb3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 2,
    name: "Airpods",
    price: 299,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXBwbGUlMjBhaXJwb2RzfGVufDB8fDB8fHww",
  },
  {
    id: 3,
    name: "Shoes",
    price: 120,
    category: "Clothes",
    image:
      "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNob2VzfGVufDB8fDB8fHww",
  },
  {
    id: 4,
    name: "Smart Watch",
    price: 350,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1617043983671-adaadcaa2460?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 5,
    name: "Sunglasses",
    price: 150,
    category: "Accessories",
    image:
      "https://plus.unsplash.com/premium_photo-1755752691552-7ae5a02469d1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fHw%3D",
  },
  {
    id: 6,
    name: "Jacket",
    price: 85,
    category: "Clothes",
    image:
      "https://images.unsplash.com/photo-1740711152088-88a009e877bb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8",
  },
  {
    id: 7,
    name: "T-shirt",
    price: 20,
    category: "Clothes",
    image:
      "https://plus.unsplash.com/premium_photo-1675186049222-0b5018db6ce9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNsb3RoaW5nfGVufDB8fDB8fHww",
  },
];
  // Save product in memory
  saveProducts(initialData);
  return initialData;
}
// Product saving function
function saveProducts(products) {
  localStorage.setItem("products", JSON.stringify(products));
}

// Home Page Logic

// Definition of key variables
 // Current image in slider
let currentSliderIndex = 0; 
 // List of products displayed to the customer
let displayedProducts = [];
 // Selected category (default: all)
let currentCategory = "all";

// Home Page initialization function
function initHomePage() {
  // Retrieve products from memory
  const products = getProducts();
  // Grabbing HTML elements (search, sort, and slider buttons) to control them
  const searchInput = document.getElementById("search");
  const sortSelect = document.getElementById("sortOrder");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  // Calling the filter function when typing in the search engine
  if (searchInput) {
    searchInput.addEventListener("input", filterProducts);
  }
  // Calling the filter function when the category changes
  if (sortSelect) {
    sortSelect.addEventListener("change", filterProducts);
  }
  // Move the slider when pressing the buttons
  if (prevBtn) prevBtn.addEventListener("click", () => moveSlider(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => moveSlider(1));

  // Interface setup
  setupUI(products);
  createCategoryButtons(products);

  // View products for the first time
  filterProducts();
}

// Setup interface function
function setupUI(products) {
  const slider = document.getElementById("mainSlider");
  const controls = document.querySelector(".controls-container");
  const noProductsMsg = document.getElementById("no-products-msg");

  if (products.length === 0) {
    if (slider) slider.style.display = "none";
    if (controls) controls.style.display = "none";
    if (noProductsMsg) noProductsMsg.style.display = "block";
  } else {
    if (noProductsMsg) noProductsMsg.style.display = "none";
    if (controls) controls.style.display = "block";
  }
}

// Category button creation function
function createCategoryButtons(products) {
  const catContainer = document.getElementById("categoryButtonsContainer");

  // Extracting product category names and removing duplicates
  const categories = products
    .map((p) => p.category)
    .filter((item, index, self) => self.indexOf(item) === index);

  let buttonsHTML = '<button class="cat-btn active">All</button>';
  categories.forEach((cat) => {
    buttonsHTML += `<button class="cat-btn">${cat}</button>`;
  });
  catContainer.innerHTML = buttonsHTML;

  catContainer.onclick = function (e) {
    if (e.target && e.target.classList.contains("cat-btn")) {
      let selectedCat = e.target.innerText;
      if (selectedCat === "All") {
        selectedCat = "all";
      }
      // Implement filtration
      setCategory(selectedCat, e.target);
    }
  };
}

// Set category function
function setCategory(cat, btnElement) {
  currentCategory = cat;
  const buttons = document.querySelectorAll(".cat-btn");
  buttons.forEach((b) => b.classList.remove("active"));
  btnElement.classList.add("active");
  filterProducts();
}

// Filtering function
function filterProducts() {
  let products = getProducts();
  const searchInput = document.getElementById("search");
  const sortInput = document.getElementById("sortOrder");

  // Cleaning Input
  const searchTerm = searchInput.value.toLowerCase().trim();
  const sort = sortInput.value;

  // The Filtering Logic
  displayedProducts = products.filter((p) => {
    const matchesName = p.name.toLowerCase().includes(searchTerm);
    const matchesCategory =
      currentCategory === "all" || p.category === currentCategory;
    return matchesName && matchesCategory;
  });
  // Sorting
  if (sort === "low") displayedProducts.sort((a, b) => a.price - b.price);
  if (sort === "high") displayedProducts.sort((a, b) => b.price - a.price);

  // Rendering
  renderGrid(displayedProducts); 
  currentSliderIndex = 0;
  updateSlider();
}

// Rendering function
function renderGrid(productsList) {
  const grid = document.getElementById("productsGrid");

  grid.innerHTML = "";

  if (productsList.length === 0) {
    grid.innerHTML =
      '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #fff;">No products match.</div>';
    return;
  }

  productsList.forEach((p, index) => {
    // Calculating the delay for animation
    const delay = index * 0.1;
    grid.innerHTML += `
            <div class="card" style="animation-delay: ${delay}s; opacity: 0; animation-fill-mode: forwards;">
                <div class="card-img-container">
                    <img src="${p.image}" alt="${p.name}" onerror="this.src='https://images.unsplash.com/photo-1609743522653-52354461eb27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bm90JTIwZm91bmR8ZW58MHx8MHx8fDA%3D'">
                </div>
                <div class="card-body">
                    <h3>${p.name}</h3>
                    <span class="category-tag">${p.category}</span>
                    <span class="price">$${p.price}</span>
                </div>
            </div>
        `;
  });
}

// Moving slider function
function moveSlider(dir) {
  currentSliderIndex += dir;
  updateSlider();
}


// Update slider function
function updateSlider() {
  const slider = document.getElementById("mainSlider");
  // If there are no products displayed => hide the slider
  if (displayedProducts.length === 0) {
    slider.style.display = "none";
    return;
  }
  slider.style.display = "block";

  // Rotating the counter
  if (currentSliderIndex >= displayedProducts.length) currentSliderIndex = 0;
  if (currentSliderIndex < 0) currentSliderIndex = displayedProducts.length - 1;

  const p = displayedProducts[currentSliderIndex];

  const imgEl = document.getElementById("slider-image");
  const titleEl = document.getElementById("slider-title");
  const priceEl = document.getElementById("slider-price");

  if (imgEl) {
    // Hide prev image
    imgEl.style.opacity = "0";

    // Wait 200 milliseconds
    setTimeout(() => {
      // change data 
      imgEl.src = p.image;

      if (titleEl) titleEl.innerText = p.name;
      if (priceEl) priceEl.innerText = p.price + " $";

      // show new image
      imgEl.style.opacity = "1";
    }, 200);
  }
}


// Admin Logic

// Admin page initialization function
function initAdminPage() {
  const form = document.getElementById("productForm");
  const cancelBtn = document.getElementById("cancelBtn");
  const tbody = document.getElementById("adminTableBody");

  if (form) {
    form.addEventListener("submit", handleFormSubmit);
  }

  if (cancelBtn) {
    cancelBtn.addEventListener("click", resetForm);
  }

  if (tbody) {
    tbody.addEventListener("click", (e) => {
      if (e.target.classList.contains("edit")) {
        const id = e.target.value; 
        startEdit(id);
      }

      if (e.target.classList.contains("del")) {
        const id = e.target.value; 
        deleteProduct(id);
      }
    });
  }

  renderAdminTable();
}

// Rendering Table
function renderAdminTable() {
  const products = getProducts();
  const tbody = document.getElementById("adminTableBody");

  tbody.innerHTML = "";

  if (products.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="4" style="text-align:center; padding: 20px; color: white;">No products found.</td></tr>';
    return;
  }

  products.forEach((p) => {
    // An id was used for the value
    tbody.innerHTML += `
            <tr>
                <td>
                    <div class="prod-name-cell">
                        <img src="${p.image}" class="table-img" onerror="this.src='https://placehold.co/50?text=Err'">
                        <span>${p.name}</span>
                    </div>
                </td>
                <td style="color: #9fa6ffff; font-weight: bold;">$${p.price}</td>
                <td>${p.category}</td>
                <td>
                    <button class="btn-small edit" value="${p.id}">Edit</button>
                    <button class="btn-small del" value="${p.id}">Delete</button>
                </td>
            </tr>
        `;
  });
}

// Adding/Editing function
function handleFormSubmit(e) {
  e.preventDefault();
  //This hidden box
  const id = document.getElementById("productId").value;
  const name = document.getElementById("productName").value;
  const price = parseFloat(document.getElementById("productPrice").value);
  const category = document.getElementById("productCategory").value;
  const image = document.getElementById("productImage").value;

  let products = getProducts();

  if (id) {
    // Editing
    // If the hidden box contains a number => we are editing.
    const index = products.findIndex((p) => p.id == id);
    if (index > -1) {
      products[index] = products[index] = {
        id: parseInt(id),
        name: name,
        price: price,
        category: category,
        image: image
      };
    }
  } else {
    // Adding
    // If the hidden box is empty => a new product.
    const newProduct = {
      id: Date.now(),
      name,
      price,
      category,
      image,
    };
    products.push(newProduct);
  }

  // Save changes to memory
  saveProducts(products);
  // Update the table
  renderAdminTable();
  // Clean the form
  resetForm();
}

// Function that retrieves data from a table into a form.
function startEdit(id) {
  const products = getProducts();
  const p = products.find((prod) => prod.id == id);

  if (p) {
    // Fill in the boxes with the product details
    document.getElementById("productId").value = p.id;
    document.getElementById("productName").value = p.name;
    document.getElementById("productPrice").value = p.price;
    document.getElementById("productCategory").value = p.category;
    document.getElementById("productImage").value = p.image;

    // Change the form format to "Edit"
    document.getElementById("formTitle").innerText = "Edit Product";
    const saveBtn = document.getElementById("saveBtn");
    saveBtn.innerText = "Update";

    // Show the cancel button
    document.getElementById("cancelBtn").style.display = "inline-block";
    // Change the display location to the form
    const formTitle = document.getElementById("formTitle");
    formTitle.scrollIntoView({ behavior: "smooth",block: "start"});
  }
}

// Delete Product Function
function deleteProduct(id) {
  let products = getProducts();
  // Keep all IDs except this product's ID
  products = products.filter((p) => p.id != id);
  // Save products after delete
  saveProducts(products);
  // Update the table
  renderAdminTable();
}

// Cleaning the foam after saving or canceling
function resetForm() {
  const form = document.getElementById("productForm");
  // Empty all fields
  if (form) form.reset();
  document.getElementById("productId").value = "";
  document.getElementById("formTitle").innerText = "Add New / Edit Existing";
  const saveBtn = document.getElementById("saveBtn");
  saveBtn.innerText = "Save Product";
  document.getElementById("cancelBtn").style.display = "none";
}
