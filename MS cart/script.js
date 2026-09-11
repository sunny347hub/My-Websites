let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
    let count = cart.length;

    let cartCount = document.getElementById("cartCount");

    if (cartCount) {
        cartCount.textContent = count;
    }
}

function addToCart(name, price, image) {

    cart.push({
        name: name,
        price: price,
        image: image
    });

    saveCart();

    updateCartCount();

    alert(name + " added to cart!");
}

function displayCart() {

    let cartItems = document.getElementById("cartItems");

    let totalItems = document.getElementById("totalItems");

    let totalPrice = document.getElementById("totalPrice");

    if (!cartItems) {
        return;
    }

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-message">
                <h2>Your cart is empty</h2>
                <br>
                <a href="products.html">Continue Shopping</a>
            </div>
        `;

        totalItems.textContent = 0;

        totalPrice.textContent = "₹0";

        return;
    }

    cart.forEach(function(item, index) {

        total += item.price;

        cartItems.innerHTML += `
            <div class="cart-item">

                <img src="${item.image}" alt="${item.name}">

                <div>

                    <h3>${item.name}</h3>

                    <p>Price: ₹${item.price.toLocaleString()}</p>

                </div>

                <button
                    class="remove-btn"
                    onclick="removeFromCart(${index})"
                >
                    Remove
                </button>

            </div>
        `;

    });

    totalItems.textContent = cart.length;

    totalPrice.textContent =
        "₹" + total.toLocaleString();
}

function removeFromCart(index) {

    cart.splice(index, 1);

    saveCart();

    displayCart();

    updateCartCount();
}

function goToCheckout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }

    window.location.href = "checkout.html";
}

let signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function(event) {

        event.preventDefault();

        let email =
            document.getElementById("email").value;

        let password =
            document.getElementById("password").value;

        let confirmPassword =
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

let loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        let email =
            document.getElementById("loginEmail").value;

        if (!email.endsWith("@gmail.com")) {

            alert("Please enter a valid Gmail address ending with @gmail.com");

            return;
        }

        alert("Login successful!");

        window.location.href = "home.html";

    });
}

let checkoutForm =
    document.getElementById("checkoutForm");

if (checkoutForm) {

    checkoutForm.addEventListener("submit", function(event) {

        event.preventDefault();

        alert("Your order has been placed successfully!");

        cart = [];

        saveCart();

        window.location.href = "home.html";

    });
}

function searchProducts() {

    let searchInput =
        document.getElementById("searchInput");

    if (!searchInput) {
        return;
    }

    let searchText =
        searchInput.value.toLowerCase();

    let products =
        document.querySelectorAll(".product-card");

    products.forEach(function(product) {

        let productText =
            product.textContent.toLowerCase();

        if (productText.includes(searchText)) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });
}

updateCartCount();

displayCart();