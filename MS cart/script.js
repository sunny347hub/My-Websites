const CART_KEY = "cart";

const catalog = [
    {
        id: "iphone17",
        name: "Apple iPhone 17",
        price: 79999,
        image: "iphone 17.webp",
        category: "Mobile",
        rating: "4.6 ★★★★★",
        description: "Apple smartphone with advanced cameras and a bright display."
    },
    {
        id: "motorola",
        name: "Motorola G57 Power",
        price: 19999,
        image: "motorla.webp",
        category: "Mobile",
        rating: "4.3 ★★★★☆",
        description: "Everyday smartphone with a large battery and spacious display."
    },
    {
        id: "oneplus",
        name: "OnePlus Nord",
        price: 25999,
        image: "oneplus.jpg",
        category: "Mobile",
        rating: "4.2 ★★★★☆",
        description: "Smartphone with 128 GB storage and a multi-camera system."
    },
    {
        id: "vivobook",
        name: "ASUS Vivobook S Laptop",
        price: 54999,
        image: "asus laptop.webp",
        category: "Laptop",
        rating: "4.4 ★★★★☆",
        description: "Lightweight laptop for study, programming and everyday work."
    },
    {
        id: "rog",
        name: "ASUS ROG Strix Scar 18",
        price: 678999,
        image: "rog.avif",
        category: "Laptop",
        rating: "4.4 ★★★★☆",
        description: "High-performance gaming laptop with a large display."
    },
    {
        id: "macbook",
        name: "Apple MacBook",
        price: 99999,
        image: "mac book.webp",
        category: "Laptop",
        rating: "4.7 ★★★★★",
        description: "Portable Apple laptop for creative work and daily tasks."
    },
    {
        id: "tv",
        name: "4K Ultra HD Smart TV",
        price: 189999,
        image: "tv.avif",
        category: "Electronics",
        rating: "4.2 ★★★★☆",
        description: "Large-screen smart TV for streaming and home entertainment."
    },
    {
        id: "alexa",
        name: "Amazon Alexa",
        price: 7999,
        image: "alex.png",
        category: "Electronics",
        rating: "4.2 ★★★★☆",
        description: "Voice-controlled assistant and smart home hub."
    },
    {
        id: "us-polo",
        name: "US Polo ASSN Fashion",
        price: 2499,
        image: "US polo ASSN.jpg",
        category: "Footwear",
        rating: "4.4 ★★★★☆",
        description: "Comfortable casual apparel with classic styling."
    },
    {
        id: "red-tape",
        name: "Red Tape Shoes",
        price: 3499,
        image: "Red Tape.avif",
        category: "Footwear",
        rating: "4.5 ★★★★★",
        description: "Comfortable everyday footwear with a durable design."
    }
];

function readCart() {
    try {
        const savedCart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");

        if (!Array.isArray(savedCart)) return [];

        return savedCart.map(item => ({
            ...item,
            quantity: Math.max(1, Number(item.quantity) || 1)
        }));
    } catch {
        return [];
    }
}

let cart = readCart();

function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function updateCartCount() {
    const cartCount = document.getElementById("cartCount");

    if (!cartCount) return;

    cartCount.textContent = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );
}

function addToCart(name, price, image) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name,
            price,
            image,
            quantity: 1
        });
    }

    saveCart();
    updateCartCount();

    alert(`${name} added to your cart.`);
}

function escapeHtml(value) {
    const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    };

    return String(value).replace(/[&<>"']/g, character => entities[character]);
}

function displayCart() {
    const cartItems = document.getElementById("cartItems");

    if (!cartItems) return;

    const totalItems = document.getElementById("totalItems");
    const totalPrice = document.getElementById("totalPrice");

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-message">
                <h2>Your cart is empty</h2>
                <a href="products.html">Continue shopping</a>
            </div>
        `;

        if (totalItems) totalItems.textContent = "0";
        if (totalPrice) totalPrice.textContent = "₹0";

        return;
    }

    cartItems.innerHTML = cart.map((item, index) => `
        <article class="cart-item">
            <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}">

            <div class="cart-item-details">
                <h3>${escapeHtml(item.name)}</h3>

                <p>₹${Number(item.price).toLocaleString("en-IN")} each</p>

                <div class="quantity-control" aria-label="Quantity for ${escapeHtml(item.name)}">
                    <button type="button" aria-label="Decrease quantity"
                        onclick="changeQuantity(${index}, -1)">−</button>

                    <span>${item.quantity}</span>

                    <button type="button" aria-label="Increase quantity"
                        onclick="changeQuantity(${index}, 1)">+</button>
                </div>
            </div>

            <div class="cart-item-actions">
                <strong>₹${(
                    Number(item.price) * item.quantity
                ).toLocaleString("en-IN")}</strong>

                <button class="remove-btn" type="button"
                    onclick="removeFromCart(${index})">Remove</button>
            </div>
        </article>
    `).join("");

    if (totalItems) {
        totalItems.textContent = cart.reduce(
            (total, item) => total + item.quantity,
            0
        );
    }

    const total = cart.reduce(
        (sum, item) => sum + Number(item.price) * item.quantity,
        0
    );

    if (totalPrice) {
        totalPrice.textContent = `₹${total.toLocaleString("en-IN")}`;
    }
}

function changeQuantity(index, change) {
    if (!cart[index]) return;

    cart[index].quantity += change;

    if (cart[index].quantity < 1) {
        cart.splice(index, 1);
    }

    saveCart();
    displayCart();
    updateCartCount();
}

function removeFromCart(index) {
    cart.splice(index, 1);

    saveCart();
    displayCart();
    updateCartCount();
}

function goToCheckout() {
    if (cart.length === 0) {
        alert("Your cart is empty. Add a product before checkout.");
        return;
    }

    window.location.href = "checkout.html";
}

function searchProducts() {
    const searchInput =
        document.getElementById("searchInput") ||
        document.querySelector(".search-box input");

    const destination = new URL("products.html", window.location.href);
    const query = searchInput ? searchInput.value.trim() : "";

    if (query) {
        destination.searchParams.set("q", query);
    }

    window.location.href = destination.href;
}

function renderProducts() {
    const productList = document.getElementById("productList");

    if (!productList) return;

    const page = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    const categoryPages = {
        "mobile.html": "Mobile",
        "mobiles.html": "Mobile",
        "laptop.html": "Laptop",
        "laptops.html": "Laptop",
        "electronics.html": "Electronics",
        "footwear.html": "Footwear"
    };

    const category = categoryPages[page];

    const query =
        new URLSearchParams(window.location.search).get("q") || "";

    const searchInput = document.getElementById("searchInput");

    if (searchInput) {
        searchInput.value = query;
    }

    const filteredProducts = catalog.filter(product => {
        const matchesCategory =
            !category || product.category === category;

        const searchableText = `
            ${product.name}
            ${product.category}
            ${product.description}
        `.toLowerCase();

        const matchesSearch = searchableText.includes(
            query.toLowerCase()
        );

        return matchesCategory && matchesSearch;
    });

    productList.innerHTML = filteredProducts.map(product => `
        <article class="product-card">
            <img
                src="${escapeHtml(product.image)}"
                class="product-image"
                alt="${escapeHtml(product.name)}"
            >

            <p class="product-category">
                ${escapeHtml(product.category)}
            </p>

            <h2 class="product-title">
                ${escapeHtml(product.name)}
            </h2>

            <p>${escapeHtml(product.description)}</p>

            <div class="rating" aria-label="${escapeHtml(product.rating)}">
                ${escapeHtml(product.rating)}
            </div>

            <div class="price">
                ₹${product.price.toLocaleString("en-IN")}
            </div>

            <button
                class="add-cart-btn"
                type="button"
                data-product-id="${escapeHtml(product.id)}"
            >
                Add to Cart
            </button>

            <a
                class="details-link"
                href="info.html?product=${encodeURIComponent(product.id)}"
            >
                View details
            </a>
        </article>
    `).join("");

    productList.querySelectorAll("[data-product-id]").forEach(button => {
        button.addEventListener("click", () => {
            const product = catalog.find(
                item => item.id === button.dataset.productId
            );

            if (product) {
                addToCart(
                    product.name,
                    product.price,
                    product.image
                );
            }
        });
    });

    const searchStatus = document.getElementById("searchStatus");

    if (searchStatus) {
        searchStatus.textContent = query
            ? `${filteredProducts.length} result${
                filteredProducts.length === 1 ? "" : "s"
            } for "${query}".`
            : "";
    }

    const noProducts = document.getElementById("noProducts");

    if (noProducts) {
        noProducts.hidden = filteredProducts.length !== 0;
    }
}

function showProductDetails() {
    const image = document.getElementById("detailImage");

    if (!image) return;

    const productId =
        new URLSearchParams(window.location.search).get("product") ||
        "vivobook";

    const product = catalog.find(item => item.id === productId);

    if (!product) {
        const productDetails = document.getElementById("productDetails");

        if (productDetails) {
            productDetails.innerHTML = `
                <div class="empty-message">
                    <h1>Product not found</h1>
                    <a href="products.html">Browse products</a>
                </div>
            `;
        }

        return;
    }

    document.title = `${product.name} - MS Shopping`;

    image.src = product.image;
    image.alt = product.name;

    const detailName = document.getElementById("detailName");
    const detailRating = document.getElementById("detailRating");
    const detailPrice = document.getElementById("detailPrice");
    const detailDescription = document.getElementById("detailDescription");
    const detailAddButton = document.getElementById("detailAddButton");

    if (detailName) detailName.textContent = product.name;
    if (detailRating) detailRating.textContent = product.rating;

    if (detailPrice) {
        detailPrice.textContent =
            `₹${product.price.toLocaleString("en-IN")}`;
    }

    if (detailDescription) {
        detailDescription.textContent = product.description;
    }

    if (detailAddButton) {
        detailAddButton.addEventListener("click", () => {
            addToCart(
                product.name,
                product.price,
                product.image
            );
        });
    }
}

const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword =
            document.getElementById("confirmPassword").value;

        if (!email.endsWith("@gmail.com")) {
            alert("Please enter a valid Gmail address ending with @gmail.com");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        alert("Account created successfully!");
        window.location.href = "home.html";
    });
}

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value;

        if (!email.endsWith("@gmail.com")) {
            alert("Please enter a valid Gmail address ending with @gmail.com");
            return;
        }

        alert("Login successful!");
        window.location.href = "home.html";
    });
}

const checkoutForm = document.getElementById("checkoutForm");

if (checkoutForm) {
    if (cart.length === 0) {
        window.location.replace("cart.html");
    }

    checkoutForm.addEventListener("submit", event => {
        event.preventDefault();

        if (cart.length === 0) {
            window.location.href = "cart.html";
            return;
        }

        const total = cart.reduce(
            (sum, item) => sum + Number(item.price) * item.quantity,
            0
        );

        sessionStorage.setItem(
            "msShoppingLastOrder",
            JSON.stringify({
                total,
                placedAt: new Date().toLocaleString()
            })
        );

        cart = [];
        saveCart();

        window.location.href = "order-complete.html";
    });
}

const orderSummary = document.getElementById("orderSummary");

if (orderSummary) {
    let order = null;

    try {
        order = JSON.parse(
            sessionStorage.getItem("msShoppingLastOrder") || "null"
        );
    } catch {
        order = null;
    }

    if (!order) {
        orderSummary.innerHTML = `
            <p>
                No recent demo order found.
                <a href="products.html">Continue shopping</a>.
            </p>
        `;
    } else {
        orderSummary.innerHTML = `
            <p>
                Your demo order total was
                <strong>₹${Number(order.total).toLocaleString("en-IN")}</strong>.
            </p>

            <p>Placed: ${escapeHtml(order.placedAt)}</p>

            <p>
                Payment and fulfillment are not connected in this frontend demo.
            </p>
        `;

        sessionStorage.removeItem("msShoppingLastOrder");
    }
}

updateCartCount();
displayCart();
renderProducts();
showProductDetails();