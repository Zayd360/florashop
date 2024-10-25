// Slideshow functionality

let slideIndex = 0;
const slides = document.querySelectorAll(".slide");

function showSlides() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].classList.add("active");
  setTimeout(showSlides, 5000); // Change image every 5 seconds
}

showSlides();
// Login modal functionality
let loginModal = document.getElementById("loginModal");
let loginBtn = document.getElementById("loginBtn");
let closeLogin = document.getElementsByClassName("close")[0];

loginBtn.onclick = function() {
    loginModal.style.display = "block";
}

closeLogin.onclick = function() {
    loginModal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == loginModal) {
        loginModal.style.display = "none";
    }
}

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
    }

    // Perform login logic here
    console.log('Login successful!');
    loginModal.style.display = "none";
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Cart functionality
let cart = [];
let cartTotal = 0;
let cartModal = document.getElementById('cartModal');
let cartIcon = document.getElementById('cartIcon');
let closeCart = cartModal.getElementsByClassName('close')[0];

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', addToCart);
});

function addToCart(event) {
    let item = {
        name: event.target.dataset.name,
        price: parseFloat(event.target.dataset.price)
    };
    cart.push(item);
    cartTotal += item.price;
    updateCart();
    showCartNotification(item.name);
}

function updateCart() {
    let cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        let li = document.createElement('li');
        li.classList.add('cart-item');
        li.innerHTML = `${item.name} - ₹${item.price.toFixed(2)} <span class="remove-item" onclick="removeFromCart(${index})">❌</span>`;
        cartItems.appendChild(li);
    });
    document.getElementById('cartTotal').textContent = cartTotal.toFixed(2);
    document.querySelector('.cart-count').textContent = cart.length;
}

function removeFromCart(index) {
    let removedItem = cart.splice(index, 1)[0];
    cartTotal -= removedItem.price;
    updateCart();
}

function showCartNotification(itemName) {
    let notification = document.createElement('div');
    notification.classList.add('cart-notification');
    notification.textContent = `${itemName} added to cart!`;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 2000);
}

cartIcon.addEventListener('click', function() {
    cartModal.style.display = "block";
});

closeCart.onclick = function() {
    cartModal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == cartModal) {
        cartModal.style.display = "none";
    }
}

document.getElementById('checkoutBtn').addEventListener('click', function() {
    alert(`Thank you for your order! Total: ₹${cartTotal.toFixed(2)}`);
    cart = [];
    cartTotal = 0;
    updateCart();
    cartModal.style.display = "none";
});