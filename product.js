let cartItems = [];

function addToCart(name, price) {
    cartItems.push({ name, price });
    updateCartCount();
    alert(`${name} added to cart!`);
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = cartItems.length;
    updateCartTotal();
}

function updateCartTotal() {
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    const totalElement = document.getElementById('cart-total-amount');
    if (totalElement) {
        totalElement.textContent = total.toFixed(2);
    }
}

function openCart() {
    const cartModal = document.querySelector('.cart-modal');
    cartModal.style.display = 'block';
    const cartList = document.querySelector('.cart-list');
    cartList.innerHTML = '';
    cartItems.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `
            <p>${item.name} - ₹${item.price.toFixed(2)}</p>
            <button class="btn" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartList.appendChild(cartItem);
    });
    updateCartTotal();
}

function closeCart() {
    const cartModal = document.querySelector('.cart-modal');
    cartModal.style.display = 'none';
}

function removeFromCart(index) {
    cartItems.splice(index, 1);
    updateCartCount();
    openCart();
}

function checkout() {
    if (cartItems.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    const cartModal = document.querySelector('.cart-modal');
    cartModal.style.display = 'none';
    alert(`Thank you for your purchase! Total amount: ₹${total.toFixed(2)}`);
    cartItems = [];
    updateCartCount();
}

function filterFlowers(type) {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        if (type === 'all') {
            box.style.display = 'block';
        } else {
            box.style.display = box.getAttribute('data-type') === type ? 'block' : 'none';
        }
    });
}


// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});