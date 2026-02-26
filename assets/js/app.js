// ============================
// HAMBURGER MENU

const menuIcon = document.getElementById("menu");
const navMenu = document.querySelector(".nav-menu");

menuIcon.addEventListener("click", function () {
  navMenu.classList.toggle("active");
});

// ============================
// ADD TO CART
// ============================

function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let existing = cart.find((item) => item.name === name);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      image: image,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Item added to cart");
}

// Attach click event to all add buttons
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".add-to-cart");

  buttons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const name = this.dataset.name;
      const price = parseInt(this.dataset.price);
      const image = this.dataset.image;

      addToCart(name, price, image);
    });
  });

  loadCart();
});

// ============================
// LOAD CART ITEMS
// ============================

function loadCart() {
  const container = document.getElementById("cart-container");
  if (!container) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  container.innerHTML = "";

  cart.forEach((item, index) => {
    container.innerHTML += `
            <div class="cart-section">
    <div class="cart-image">
        <img src="${item.image}" alt="${item.name}">
    </div>

            <div class="cart-content">

                <div class="cart-text">
                    <h3>${item.name}</h3>
                    <p>Plate</p>
                </div>

                <div class="cart-number">
                    <button onclick="increaseQty(${index})"><i class="fa-solid fa-plus"></i></button>
                    <p>${item.quantity}</p>
                    <button onclick="decreaseQty(${index})"><i class="fa-solid fa-minus"></i></button>
                </div>

                <div class="cart-price">
                    <p>N${item.price * item.quantity}</p>
                    <button onclick="removeItem(${index})"><i class="fa-solid fa-trash"></i></button>
                </div>

            </div>
        </div>
        `;
  });

  if (cart.length > 0) {
    container.innerHTML += `
    <button class="checkout-btn"><a href="/pages/order-summary.html">Checkout</a> <i></i></button>`;
  }
}

// ============================
// INCREASE QUANTITY
// ============================

function increaseQty(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart[index].quantity += 1;

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// ============================
// DECREASE QUANTITY
// ============================

function decreaseQty(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// ============================
// REMOVE ITEM
// ============================

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function goToDelivery() {
  window.location.href = "/pages/delivery-details.html";
}

function goToPayment() {
  window.location.href = "/pages/payment.html";
}

// This is for the final "Checkout Fully" click
function finalizeOrder() {
  window.location.href = "/pages/confirmed.html";
}

// --- FROM OTHER PAGES (The "Back" Logic) ---
function returnToOrder() {
  window.location.href = "/pages/order-summary.html";
}
