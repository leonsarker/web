/* ========================================
   SHOP PAGE JAVASCRIPT
   ======================================== */

// Product Data
const products = [
  // MLOs
  {
    id: 'mlo-001',
    name: 'Luxury Penthouse MLO',
    category: 'mlos',
    price: 49.99,
    originalPrice: 69.99,
    image: 'https://picsum.photos/seed/penthouse/800/600',
    description: 'High-end penthouse with stunning city views, modern furniture, and custom lighting.',
    framework: 'both',
    featured: true,
    popular: true
  },
  {
    id: 'mlo-002',
    name: 'Underground Casino',
    category: 'mlos',
    price: 79.99,
    image: 'https://picsum.photos/seed/casino/800/600',
    description: 'Full casino experience with poker tables, slot machines, and VIP lounge.',
    framework: 'both',
    featured: true,
    popular: false
  },
  {
    id: 'mlo-003',
    name: 'Police Station HQ',
    category: 'mlos',
    price: 59.99,
    image: 'https://picsum.photos/seed/police/800/600',
    description: 'Detailed police headquarters with cells, offices, and briefing rooms.',
    framework: 'qb',
    featured: false,
    popular: true
  },
  {
    id: 'mlo-004',
    name: 'Hospital Medical Center',
    category: 'mlos',
    price: 64.99,
    image: 'https://picsum.photos/seed/hospital/800/600',
    description: 'Complete medical facility with ER, surgery rooms, and patient wards.',
    framework: 'esx',
    featured: false,
    popular: false
  },
  // Vehicles
  {
    id: 'veh-001',
    name: 'Pfister Comet S2',
    category: 'vehicles',
    price: 29.99,
    image: 'https://picsum.photos/seed/comet/800/600',
    description: 'High-performance sports car with custom handling and realistic physics.',
    framework: 'both',
    featured: true,
    popular: true
  },
  {
    id: 'veh-002',
    name: 'Benefactor Schafter V12',
    category: 'vehicles',
    price: 24.99,
    originalPrice: 34.99,
    image: 'https://picsum.photos/seed/schafter/800/600',
    description: 'Luxury sedan with armored options and custom engine sounds.',
    framework: 'both',
    featured: true,
    popular: false
  },
  {
    id: 'veh-003',
    name: 'Emergency Vehicle Pack',
    category: 'vehicles',
    price: 89.99,
    image: 'https://picsum.photos/seed/emergency/800/600',
    description: 'Complete pack: Police, Ambulance, Fire trucks with working lights and sirens.',
    framework: 'both',
    featured: true,
    popular: true
  },
  {
    id: 'veh-004',
    name: 'Supercar Collection',
    category: 'vehicles',
    price: 149.99,
    image: 'https://picsum.photos/seed/supercars/800/600',
    description: '10 exclusive supercars with custom handling and liveries.',
    framework: 'both',
    featured: false,
    popular: true
  },
  // Scripts
  {
    id: 'scr-001',
    name: 'Advanced Housing System',
    category: 'scripts',
    price: 39.99,
    image: 'https://picsum.photos/seed/housing/800/600',
    description: 'Complete housing system with furniture placement, storage, and key sharing.',
    framework: 'qb',
    featured: true,
    popular: true
  },
  {
    id: 'scr-002',
    name: 'Drug Manufacturing System',
    category: 'scripts',
    price: 44.99,
    image: 'https://picsum.photos/seed/drugs/800/600',
    description: 'Complex drug production and distribution system with quality mechanics.',
    framework: 'qb',
    featured: false,
    popular: true
  },
  {
    id: 'scr-003',
    name: 'Custom Job Creator',
    category: 'scripts',
    price: 54.99,
    originalPrice: 74.99,
    image: 'https://picsum.photos/seed/jobs/800/600',
    description: 'Create custom jobs with ease. Visual editor, payment systems, and more.',
    framework: 'both',
    featured: true,
    popular: false
  },
  {
    id: 'scr-004',
    name: 'Advanced Banking System',
    category: 'scripts',
    price: 49.99,
    image: 'https://picsum.photos/seed/banking/800/600',
    description: 'Full banking with loans, interest, joint accounts, and crypto trading.',
    framework: 'esx',
    featured: false,
    popular: false
  },
  // Clothing
  {
    id: 'cloth-001',
    name: 'Tactical Gear Pack',
    category: 'clothing',
    price: 19.99,
    image: 'https://picsum.photos/seed/tactical/800/600',
    description: 'Military-style tactical gear with 50+ components and custom textures.',
    framework: 'both',
    featured: true,
    popular: true
  },
  {
    id: 'cloth-002',
    name: 'Street Fashion Collection',
    category: 'clothing',
    price: 24.99,
    image: 'https://picsum.photos/seed/street/800/600',
    description: 'Modern streetwear with hoodies, sneakers, and accessories.',
    framework: 'both',
    featured: false,
    popular: true
  },
  {
    id: 'cloth-003',
    name: 'Emergency Services EUP',
    category: 'clothing',
    price: 34.99,
    image: 'https://picsum.photos/seed/eup/800/600',
    description: 'Complete EUP pack for police, fire, and EMS with rank variations.',
    framework: 'both',
    featured: true,
    popular: false
  },
  // Custom Base
  {
    id: 'base-001',
    name: 'Complete Server Setup',
    category: 'custom-base',
    price: 299.99,
    image: 'https://picsum.photos/seed/serversetup/800/600',
    description: 'Fully configured server with 100+ scripts, custom UI, and optimization.',
    framework: 'qb',
    featured: true,
    popular: true
  },
  {
    id: 'base-002',
    name: 'Starter Package ESX',
    category: 'custom-base',
    price: 199.99,
    image: 'https://picsum.photos/seed/esxsetup/800/600',
    description: 'Ready-to-run ESX server with essential scripts and configuration.',
    framework: 'esx',
    featured: true,
    popular: false
  }
];

// State
let filteredProducts = [...products];
let activeFilters = {
  categories: [],
  frameworks: [],
  priceRange: { min: 0, max: 500 },
  sortBy: 'newest'
};

// Initialize Shop
document.addEventListener('DOMContentLoaded', async () => {
  // Wait for database to be ready
  if (window.db) {
    await window.db.init();
    const dbProducts = await window.db.getAllProducts();
    if (dbProducts.length > 0) {
      products.length = 0;
      products.push(...dbProducts);
    }
  }
  
  renderProducts(products);
  setupFilters();
  setupSorting();
  setupMobileFilters();
  setupStaffPanel();
});

// Staff Panel Setup
function setupStaffPanel() {
  const staffPanel = document.getElementById('staffPanel');
  const toggleBtn = document.getElementById('toggleStaffPanel');
  const formContainer = document.getElementById('productFormContainer');
  const cancelBtn = document.getElementById('cancelProductForm');
  const productForm = document.getElementById('productForm');
  
  if (!staffPanel) return;
  
  // Check if user is staff
  checkStaffAccess().then(isStaff => {
    if (isStaff) {
      staffPanel.style.display = 'block';
    }
  });
  
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      formContainer.style.display = formContainer.style.display === 'none' ? 'block' : 'none';
      toggleBtn.textContent = formContainer.style.display === 'none' ? 'Add New Product' : 'Cancel';
    });
  }
  
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      formContainer.style.display = 'none';
      toggleBtn.textContent = 'Add New Product';
      productForm.reset();
    });
  }
  
  if (productForm) {
    productForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await saveProduct();
    });
  }
}

// Check Staff Access
async function checkStaffAccess() {
  const currentUser = localStorage.getItem('fivem-current-user') || sessionStorage.getItem('fivem-current-user');
  if (!currentUser) return false;
  
  const user = JSON.parse(currentUser);
  return user.isStaff === true || (user.roles && user.roles.includes('1492610905349816500'));
}

// Save Product (Add or Edit)
async function saveProduct() {
  const productId = document.getElementById('productId')?.value;
  const product = {
    name: document.getElementById('productName').value,
    category: document.getElementById('productCategory').value,
    framework: document.getElementById('productFramework').value,
    price: parseFloat(document.getElementById('productPrice').value),
    description: document.getElementById('productDescription').value,
    image: document.getElementById('productImage').value,
    badge: document.getElementById('productBadge').value || null,
    originalPrice: parseFloat(document.getElementById('productOriginalPrice').value) || null,
    updatedAt: new Date().toISOString()
  };
  
  try {
    if (productId) {
      // Edit existing
      await window.db.updateProduct(parseInt(productId), product);
      showToast('Product updated successfully!');
    } else {
      // Add new
      product.id = 'prod-' + Date.now();
      product.createdAt = new Date().toISOString();
      await window.db.addProduct(product);
      showToast('Product added successfully!');
    }
    
    // Refresh products
    const dbProducts = await window.db.getAllProducts();
    products.length = 0;
    products.push(...dbProducts);
    renderProducts(products);
    
    // Reset form
    document.getElementById('productForm').reset();
    document.getElementById('productFormContainer').style.display = 'none';
    document.getElementById('toggleStaffPanel').textContent = 'Add New Product';
  } catch (error) {
    showToast('Error: ' + error.message);
  }
}

// Edit Product
async function editProduct(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  document.getElementById('productName').value = product.name;
  document.getElementById('productCategory').value = product.category;
  document.getElementById('productFramework').value = product.framework;
  document.getElementById('productPrice').value = product.price;
  document.getElementById('productDescription').value = product.description;
  document.getElementById('productImage').value = product.image;
  document.getElementById('productBadge').value = product.badge || '';
  document.getElementById('productOriginalPrice').value = product.originalPrice || '';
  
  // Add hidden field for product ID
  let idField = document.getElementById('productId');
  if (!idField) {
    idField = document.createElement('input');
    idField.type = 'hidden';
    idField.id = 'productId';
    document.getElementById('productForm').appendChild(idField);
  }
  idField.value = product.id;
  
  document.getElementById('productFormContainer').style.display = 'block';
  document.getElementById('toggleStaffPanel').textContent = 'Cancel';
}

// Delete Product
async function deleteProduct(productId) {
  if (!confirm('Are you sure you want to delete this product?')) return;
  
  try {
    await window.db.deleteProduct(productId);
    showToast('Product deleted successfully!');
    
    // Refresh products
    const dbProducts = await window.db.getAllProducts();
    products.length = 0;
    products.push(...dbProducts);
    renderProducts(products);
  } catch (error) {
    showToast('Error: ' + error.message);
  }
}

// Render Products
function renderProducts(productsToRender) {
  const productsGrid = document.querySelector('.shop-products');
  if (!productsGrid) return;

  if (productsToRender.length === 0) {
    productsGrid.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">🔍</div>
        <h3>No Products Found</h3>
        <p>Try adjusting your filters or search criteria.</p>
      </div>
    `;
    return;
  }

  productsGrid.innerHTML = productsToRender.map(product => `
    <div class="product-card" data-product-id="${product.id}" data-price="${product.price}" onclick="viewProduct('${product.id}')">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        ${product.originalPrice ? '<span class="product-badge badge-warning">SALE</span>' : ''}
        ${product.popular ? '<span class="product-badge badge-secondary" style="top: ${product.originalPrice ? "3rem" : "1rem"}">POPULAR</span>' : ''}
        <div class="product-quick-view">Quick View</div>
      </div>
      <div class="product-info">
        <div class="product-category">${product.category}</div>
        <h3 class="product-title">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-footer">
          <div class="product-price">
            €${product.price.toFixed(2)}
            ${product.originalPrice ? `<span class="original-price">€${product.originalPrice.toFixed(2)}</span>` : ''}
          </div>
          <button class="add-to-cart-btn" onclick="addToCartFromShop(event, '${product.id}')">Add to Cart</button>
        </div>
      </div>
    </div>
  `).join('');

  // Update product count
  const productCount = document.querySelector('.product-count');
  if (productCount) {
    productCount.textContent = `${productsToRender.length} products`;
  }
}

// Setup Filters
function setupFilters() {
  // Category filters
  const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
  categoryCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      activeFilters.categories = Array.from(categoryCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);
      applyFilters();
    });
  });

  // Framework filters
  const frameworkCheckboxes = document.querySelectorAll('input[name="framework"]');
  frameworkCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      activeFilters.frameworks = Array.from(frameworkCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);
      applyFilters();
    });
  });

  // Price range
  const priceSlider = document.getElementById('price-slider');
  const priceMin = document.getElementById('price-min');
  const priceMax = document.getElementById('price-max');

  if (priceSlider) {
    // Update slider background on load
    updateSliderBackground(priceSlider);
    
    priceSlider.addEventListener('input', (e) => {
      activeFilters.priceRange.max = parseInt(e.target.value);
      if (priceMax) priceMax.value = e.target.value;
      updateSliderBackground(priceSlider);
      applyFilters();
    });
  }

  // Function to update slider background gradient
  function updateSliderBackground(slider) {
    const value = (slider.value - slider.min) / (slider.max - slider.min) * 100;
    slider.style.background = `linear-gradient(to right, var(--accent-primary) 0%, var(--accent-primary) ${value}%, var(--bg-secondary) ${value}%, var(--bg-secondary) 100%)`;
  }

  if (priceMin && priceMax) {
    priceMin.addEventListener('change', (e) => {
      activeFilters.priceRange.min = parseInt(e.target.value) || 0;
      applyFilters();
    });

    priceMax.addEventListener('change', (e) => {
      activeFilters.priceRange.max = parseInt(e.target.value) || 500;
      if (priceSlider) priceSlider.value = activeFilters.priceRange.max;
      applyFilters();
    });
  }
}

// Apply Filters
function applyFilters() {
  filteredProducts = products.filter(product => {
    // Category filter
    if (activeFilters.categories.length > 0 && !activeFilters.categories.includes(product.category)) {
      return false;
    }

    // Framework filter
    if (activeFilters.frameworks.length > 0) {
      if (product.framework === 'both') return true;
      if (!activeFilters.frameworks.includes(product.framework)) return false;
    }

    // Price filter
    if (product.price < activeFilters.priceRange.min || product.price > activeFilters.priceRange.max) {
      return false;
    }

    return true;
  });

  // Apply sorting
  sortProducts();
  
  // Render
  renderProducts(filteredProducts);
}

// Setup Sorting
function setupSorting() {
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      activeFilters.sortBy = e.target.value;
      sortProducts();
      renderProducts(filteredProducts);
    });
  }
}

// Sort Products
function sortProducts() {
  switch (activeFilters.sortBy) {
    case 'price-low':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'popular':
      filteredProducts.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
      break;
    case 'newest':
    default:
      filteredProducts.sort((a, b) => b.id.localeCompare(a.id));
      break;
  }
}

// Mobile Filters
function setupMobileFilters() {
  const filterToggle = document.querySelector('.btn-filter');
  const filterSidebar = document.querySelector('.filter-sidebar');
  const cartOverlay = document.querySelector('.cart-overlay');

  if (filterToggle && filterSidebar) {
    filterToggle.addEventListener('click', () => {
      filterSidebar.classList.toggle('active');
      if (cartOverlay) cartOverlay.classList.add('active');
    });
  }

  if (cartOverlay && filterSidebar) {
    cartOverlay.addEventListener('click', () => {
      filterSidebar.classList.remove('active');
      cartOverlay.classList.remove('active');
    });
  }
}

// View Product
function viewProduct(productId) {
  window.location.href = `product-detail.html?id=${productId}`;
}

// Add to Cart from Shop
function addToCartFromShop(event, productId) {
  event.stopPropagation();
  const product = products.find(p => p.id === productId);
  if (product) {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity: 1
    });
  }
}
