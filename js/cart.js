document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.querySelector('.cart-items');
    const cartContent = document.querySelector('.cart-content');
    const emptyCartMessage = document.querySelector('.empty-cart-message');
    const cartCount = document.querySelector('.cart-count');
    const subtotalElement = document.querySelector('.subtotal');
    const taxElement = document.querySelector('.tax');
    const totalElement = document.querySelector('.total-amount');

    // Load cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartDisplay();

    function updateCartDisplay() {
        const cartTitle = document.querySelector('.cart-container h1');
        
        if (cart.length === 0) {
            cartContent.style.display = 'none';
            emptyCartMessage.style.display = 'block';
            cartCount.textContent = '0';
            cartTitle.style.display = 'none';
        } else {
            cartContent.style.display = 'flex';
            emptyCartMessage.style.display = 'none';
            cartTitle.style.display = 'block';
            cartCount.textContent = cart.length;
            
            // Update cart items
            cartItems.innerHTML = cart.map(item => createCartItemHTML(item)).join('');
            
            // Update summary
            const subtotal = calculateSubtotal();
            const tax = subtotal * 0.08;
            const total = subtotal + tax;
            
            subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
            taxElement.textContent = `$${tax.toFixed(2)}`;
            totalElement.textContent = `$${total.toFixed(2)}`;
        }
    }

    function createCartItemHTML(item) {
        return `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="item-image">
                <div class="item-details">
                    <div class="item-name">${item.name}</div>
                    <div class="item-price">$${item.price.toFixed(2)}</div>
                    <div class="item-quantity">
                        <button class="quantity-btn minus">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn plus">+</button>
                        <i class="fas fa-trash remove-item"></i>
                    </div>
                </div>
            </div>
        `;
    }

    function calculateSubtotal() {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Event delegation for cart item controls
    cartItems.addEventListener('click', (e) => {
        const cartItem = e.target.closest('.cart-item');
        if (!cartItem) return;

        const itemId = cartItem.dataset.id;
        const itemIndex = cart.findIndex(item => item.id === itemId);

        if (e.target.classList.contains('minus')) {
            if (cart[itemIndex].quantity > 1) {
                cart[itemIndex].quantity--;
                updateCart();
            }
        } else if (e.target.classList.contains('plus')) {
            cart[itemIndex].quantity++;
            updateCart();
        } else if (e.target.classList.contains('remove-item')) {
            cart.splice(itemIndex, 1);
            updateCart();
        }
    });

    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        updateAllCartCounts();
    }

    // Checkout button
    document.querySelector('.checkout-btn').addEventListener('click', () => {
        alert('Thank you for your order!');
        cart = [];
        updateCart();
    });

    // Update cart count on page load
    updateAllCartCounts();
});

function updateAllCartCounts() {
    const cartCounts = document.querySelectorAll('.cart-count');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    cartCounts.forEach(count => {
        count.textContent = totalItems;
    });
} 