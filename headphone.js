document.addEventListener("DOMContentLoaded", () => {
  /* 
     1. SELECT HEADER ELEMENTS
  */

  const header = document.querySelector("#header");

  if (!header) return;

  const menuButton = header.querySelector(".mobile-menu");
  const searchButton = header.querySelector('.icon-btn[aria-label="Search"]');
  const notificationButton = header.querySelector(".notification-btn");
  const loginButton = header.querySelector(".buttonlogin");
  const navLinks = header.querySelectorAll(".main-nav .ull a");

  /* 
     2. MOBILE MENU
  */

  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-controls", "phlox-navigation");

  const navigation = header.querySelector(".main-nav");
  navigation.id = "phlox-navigation";

  menuButton.addEventListener("click", () => {
    const isOpen = header.classList.toggle("menu-open");

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");

    menuButton.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  /* ==================================
     3. ACTIVE NAVIGATION LINKS
  ================================== */

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((item) => {
        item.classList.remove("active");
      });

      link.classList.add("active");

      header.classList.remove("menu-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open menu");
      menuButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });

  /* 
     4. CREATE SEARCH PANEL
  */

  const searchPanel = document.createElement("div");

  searchPanel.className = "header-search-panel";
  searchPanel.hidden = true;

  searchPanel.innerHTML = `
    <div class="header-panel-title">
      <strong>Search PHLOX</strong>
      <button
        type="button"
        class="header-panel-close"
        aria-label="Close search"
      >
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>

    <input
      type="search"
      class="phlox-search-input"
      placeholder="Search headphones, speakers..."
      aria-label="Search products"
    />

    <p class="search-hint">
      Type a product name to find matching items.
    </p>
  `;

  header.appendChild(searchPanel);

  const searchInput = searchPanel.querySelector(".phlox-search-input");

  const searchHint = searchPanel.querySelector(".search-hint");
  const searchClose = searchPanel.querySelector(".header-panel-close");

  function closeSearch() {
    searchPanel.hidden = true;
    searchButton.setAttribute("aria-expanded", "false");
  }

  searchButton.setAttribute("aria-expanded", "false");

  searchButton.addEventListener("click", () => {
    const willOpen = searchPanel.hidden;

    closeNotifications();
    searchPanel.hidden = !willOpen;

    searchButton.setAttribute("aria-expanded", String(willOpen));

    if (willOpen) {
      searchInput.focus();
    } else {
      clearSearch();
    }
  });

  searchClose.addEventListener("click", () => {
    closeSearch();
    clearSearch();
    searchButton.focus();
  });

  /* 
     5. SEARCH YOUR PRODUCTS
  */

  const products = document.querySelectorAll(".villian5 .product");

  function clearSearch() {
    searchInput.value = "";

    products.forEach((product) => {
      product.classList.remove("search-hidden");
    });

    searchHint.textContent = "Type a product name to find matching items.";
  }

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();

    let matches = 0;

    products.forEach((product) => {
      const productText = product.textContent.toLowerCase();
      const isMatch = productText.includes(query);

      product.classList.toggle("search-hidden", query !== "" && !isMatch);

      if (isMatch) matches++;
    });

    if (query === "") {
      searchHint.textContent = "Type a product name to find matching items.";
    } else if (matches > 0) {
      searchHint.textContent = `${matches} matching product${matches === 1 ? "" : "s"} found.`;

      document.querySelector(".villian4")?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    } else {
      searchHint.textContent = "No matching products found. Try another name.";
    }
  });

  /* 
     6. NOTIFICATIONS PANEL
  */

  const notificationPanel = document.createElement("div");

  notificationPanel.className = "header-notification-panel";
  notificationPanel.hidden = true;

  notificationPanel.innerHTML = `
    <div class="header-panel-title">
      <strong>Notifications</strong>
      <button
        type="button"
        class="header-panel-close"
        aria-label="Close notifications"
      >
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>

    <div class="notification-item">
      <strong>Welcome to PHLOX!</strong>
      <p>Explore our latest headphones and gadgets.</p>
    </div>

    <div class="notification-item">
      <strong>Discover our best sellers</strong>
      <p>Check out the products featured on our homepage.</p>
    </div>
  `;

  header.appendChild(notificationPanel);

  const notificationClose = notificationPanel.querySelector(
    ".header-panel-close",
  );

  function closeNotifications() {
    notificationPanel.hidden = true;
    notificationButton.setAttribute("aria-expanded", "false");
  }

  notificationButton.setAttribute("aria-expanded", "false");

  notificationButton.addEventListener("click", () => {
    const willOpen = notificationPanel.hidden;

    closeSearch();
    notificationPanel.hidden = !willOpen;

    notificationButton.setAttribute("aria-expanded", String(willOpen));
  });

  notificationClose.addEventListener("click", () => {
    closeNotifications();
    notificationButton.focus();
  });

  /* 
     7. CLOSE PANELS WITH ESCAPE
  */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeSearch();
      closeNotifications();

      header.classList.remove("menu-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open menu");
      menuButton.innerHTML = '<i class="fa-solid fa-bars"></i>';

      clearSearch();
    }
  });

  /* 
     8. CLOSE PANELS ON OUTSIDE CLICK
  */

  document.addEventListener("click", (event) => {
    if (!header.contains(event.target)) {
      closeSearch();
      closeNotifications();
    }
  });

  /* 
     9. LOGIN BUTTON
  */

  loginButton.addEventListener("click", () => {
    alert("Welcome to PHLOX! Login still in progess");
  });
});

/*  */

document.addEventListener("DOMContentLoaded", () => {
  const productSection = document.querySelector(".villian5");

  if (productSection && !productSection.id) {
    productSection.id = "shop";
  }

  document
    .querySelectorAll(
      ".by, .Shop, .button1, .button2, .button3, .button4, .button5, .button6",
    )
    .forEach((button) => {
      button.addEventListener("click", () => {
        productSection?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    });

  const hero = document.querySelector(".hero");

  if (!hero) return;

  const headphones = hero.querySelector(".headphones");
  const description = hero.querySelector(".lorem");
  const descriptionTitle = description?.querySelector("h4");
  const descriptionText = description?.querySelector(".dolor");

  /* 2. COLLAPSIBLE DESCRIPTION */

  if (descriptionTitle && descriptionText) {
    descriptionTitle.setAttribute("role", "button");
    descriptionTitle.setAttribute("tabindex", "0");
    descriptionTitle.setAttribute("aria-expanded", "true");

    descriptionTitle.setAttribute("aria-controls", "phlox-hero-description");

    descriptionText.id = "phlox-hero-description";

    function toggleDescription() {
      const isCollapsed = description.classList.toggle("is-collapsed");

      descriptionTitle.setAttribute("aria-expanded", String(!isCollapsed));
    }

    descriptionTitle.addEventListener("click", toggleDescription);

    descriptionTitle.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleDescription();
      }
    });
  }

  /* 3. HEADPHONE HOVER FEEDBACK */

  if (headphones) {
    headphones.addEventListener("mouseenter", () => {
      hero.classList.add("headphones-hovered");
    });

    headphones.addEventListener("mouseleave", () => {
      hero.classList.remove("headphones-hovered");
    });
  }

  /* 4. REVEAL HERO WHEN IT ENTERS THE VIEW */

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            hero.classList.add("hero-visible");
            observer.unobserve(hero);
          }
        });
      },
      { threshold: 0.15 },
    );

    observer.observe(hero);
  } else {
    hero.classList.add("hero-visible");
  }
});

/* 
   PHLOX — VILLIAN INTERACTIONS
*/

document.addEventListener("DOMContentLoaded", () => {
  const products = document.querySelectorAll(
    ".villian .product, .villian5 .product",
  );

  products.forEach((product) => {
    const button = product.querySelector(".btn");

    if (!button) return;

    button.dataset.originalText = button.textContent.trim();

    button.addEventListener("click", () => {
      const productName =
        product.querySelector("h5")?.textContent.trim() || "Product";

      button.textContent = "Added ✓";
      button.classList.add("is-added");

      setTimeout(() => {
        button.textContent = button.dataset.originalText;
        button.classList.remove("is-added");
      }, 1500);

      console.log(`${productName} selected`);
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const browseBtn = document.querySelector(".browse-btn");
  const browseInfo = document.querySelector(".browse-info");
  const browseMessage = document.querySelector(".browse-message");
  const categoryButtons = document.querySelectorAll(".browse-options button");

  if (!browseBtn || !browseInfo) return;

  browseBtn.addEventListener("click", () => {
    const isOpen = browseInfo.classList.toggle("show");

    browseBtn.setAttribute("aria-expanded", String(isOpen));
    browseBtn.innerHTML = isOpen
      ? "Close <span>⌃</span>"
      : "Browse <span>⌄</span>";
  });

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.category;

      const descriptions = {
        Headphones:
          "Explore over-ear and on-ear headphones for music, gaming, and everyday listening.",
        Earbuds:
          "Discover compact wireless earbuds for calls, music, and life on the go.",
        Speakers:
          "Find speakers designed to deliver powerful sound at home or outdoors.",
        Accessories:
          "Browse audio accessories such as cables, cases, and charging equipment.",
      };

      browseMessage.textContent = descriptions[category];
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const products = document.querySelectorAll(".villian5 .product");

  // Create the floating cart button
  const cartButton = document.createElement("button");
  cartButton.className = "phlox-cart-toggle";
  cartButton.type = "button";
  cartButton.setAttribute("aria-expanded", "false");
  cartButton.innerHTML = `
    🛒 Cart
    <span class="phlox-cart-count">0</span>
  `;

  // Create the cart panel
  const cartPanel = document.createElement("section");
  cartPanel.className = "phlox-cart-panel";
  cartPanel.setAttribute("aria-label", "Shopping cart");

  cartPanel.innerHTML = `
    <div class="phlox-cart-header">
      <h3>Your Cart</h3>
      <button class="phlox-cart-close"
        type="button" aria-label="Close cart">×</button>
    </div>
    <div class="phlox-cart-items"></div>
    <div class="phlox-cart-footer">
      <div class="phlox-cart-total">
        <span>Total</span>
        <span class="phlox-cart-total-price">₦0</span>
      </div>
      <button class="phlox-cart-checkout" type="button">
        Checkout
      </button>
    </div>
  `;

  document.body.append(cartButton, cartPanel);

  const countDisplay = cartButton.querySelector(".phlox-cart-count");
  const itemsContainer = cartPanel.querySelector(".phlox-cart-items");
  const totalDisplay = cartPanel.querySelector(".phlox-cart-total-price");
  const closeButton = cartPanel.querySelector(".phlox-cart-close");
  const checkoutButton = cartPanel.querySelector(".phlox-cart-checkout");

  // Products currently in the cart
  const cart = [];

  function formatPrice(price) {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 2,
    }).format(price);
  }

  function getProductPrice(product) {
    const priceElement = product.querySelector("h4");
    if (!priceElement) return 0;

    // Supports prices like ₦25,000 or $49.99
    const rawPrice = priceElement.textContent.trim();
    const number = Number(rawPrice.replace(/[^0-9.]/g, ""));

    return Number.isFinite(number) ? number : 0;
  }

  function renderCart() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    const totalPrice = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    countDisplay.textContent = totalItems;
    totalDisplay.textContent = formatPrice(totalPrice);

    itemsContainer.replaceChildren();

    if (cart.length === 0) {
      const emptyMessage = document.createElement("p");
      emptyMessage.className = "phlox-cart-empty";
      emptyMessage.textContent =
        "Your cart is empty. Add a product to get started.";
      itemsContainer.appendChild(emptyMessage);
      return;
    }

    cart.forEach((item) => {
      const row = document.createElement("div");
      row.className = "phlox-cart-item";

      const details = document.createElement("div");
      const name = document.createElement("h4");
      const price = document.createElement("p");

      name.textContent = `${item.name} × ${item.quantity}`;
      price.textContent = formatPrice(item.price * item.quantity);

      details.append(name, price);

      const removeButton = document.createElement("button");
      removeButton.className = "phlox-cart-remove";
      removeButton.type = "button";
      removeButton.textContent = "Remove";

      removeButton.addEventListener("click", () => {
        const index = cart.findIndex((cartItem) => cartItem.id === item.id);

        if (index !== -1) cart.splice(index, 1);
        renderCart();
      });

      row.append(details, removeButton);
      itemsContainer.appendChild(row);
    });
  }

  // Open and close the cart
  cartButton.addEventListener("click", () => {
    const isOpen = cartPanel.classList.toggle("is-open");
    cartButton.setAttribute("aria-expanded", String(isOpen));
  });

  closeButton.addEventListener("click", () => {
    cartPanel.classList.remove("is-open");
    cartButton.setAttribute("aria-expanded", "false");
  });

  // Add products from villian5
  products.forEach((product, index) => {
    const addButton = product.querySelector(".btn");
    if (!addButton) return;

    addButton.addEventListener("click", () => {
      const nameElement = product.querySelector("h5");
      const productName = nameElement
        ? nameElement.textContent.trim()
        : `Product ${index + 1}`;

      const existingItem = cart.find((item) => item.id === index);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.push({
          id: index,
          name: productName,
          price: getProductPrice(product),
          quantity: 1,
        });
      }

      const originalText =
        addButton.dataset.originalText || addButton.textContent.trim();

      addButton.dataset.originalText = originalText;
      addButton.textContent = "Added ✓";
      addButton.classList.add("is-added");

      renderCart();

      // Automatically show the cart after adding
      cartPanel.classList.add("is-open");
      cartButton.setAttribute("aria-expanded", "true");
    });
  });

  checkoutButton.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Add a product first.");
      return;
    }

    alert(
      "Your cart is ready! Online payment and order processing " +
        "Press am come my opay. 9122839863..Opay",
    );
  });

  renderCart();
});
