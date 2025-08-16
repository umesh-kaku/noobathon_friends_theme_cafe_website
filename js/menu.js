document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');

    // Load cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();

    // Add to cart functionality
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const menuItem = e.target.closest('.menu-item');
            const itemName = menuItem.querySelector('h3').textContent;
            const itemPrice = parseFloat(menuItem.querySelector('.price').textContent.replace('$', ''));
            const itemImage = menuItem.querySelector('img').src;
            
            // Create unique ID for the item
            const itemId = `${itemName.toLowerCase().replace(/\s+/g, '-')}`;
            
            // Check if item already exists in cart
            const existingItem = cart.find(item => item.id === itemId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: itemId,
                    name: itemName,
                    price: itemPrice,
                    image: itemImage,
                    quantity: 1
                });
            }
            
            // Save to localStorage and update display
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            
            // Show feedback
            showAddedToCartFeedback(button);
        });
    });

    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    function showAddedToCartFeedback(button) {
        const originalText = button.textContent;
        button.textContent = 'Added!';
        button.classList.add('added');
        
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('added');
        }, 1500);
    }

    // Add this to your existing DOMContentLoaded event listener
    const hugsyButton = document.querySelector('.hugsy-chat-button');
    if (hugsyButton) {
        hugsyButton.addEventListener('click', () => {
            window.location.href = 'chat.html';
        });
    }
}); 