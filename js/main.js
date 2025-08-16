// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to 'light'
const savedTheme = localStorage.getItem('theme') || 'light';
document.body.dataset.theme = savedTheme;

// Set initial icon based on saved theme
themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

themeToggle.addEventListener('click', () => {
    // Toggle theme
    const newTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    document.body.dataset.theme = newTheme;
    
    // Save theme preference
    localStorage.setItem('theme', newTheme);
    
    // Toggle icon
    themeIcon.classList.toggle('fa-moon');
    themeIcon.classList.toggle('fa-sun');
    
    // Add theme transition
    document.documentElement.style.setProperty('--transition-speed', '0.3s');
    setTimeout(() => {
        document.documentElement.style.setProperty('--transition-speed', '0s');
    }, 300);
});

// Easter Eggs
const easterEggs = [
    { selector: '.logo h1', phrase: "How you doin'?", chance: 0.1 },
    { selector: '.feature-card i.fa-coffee', phrase: "Could I BE any more caffeinated?", chance: 0.15 }
];

easterEggs.forEach(egg => {
    const element = document.querySelector(egg.selector);
    if (element) {
        element.addEventListener('click', () => {
            if (Math.random() < egg.chance) {
                alert(egg.phrase);
            }
        });
    }
});

// Cart Functionality
let cartCount = 0;
const cartCountElement = document.querySelector('.cart-count');

function updateCart(count) {
    cartCount = count;
    cartCountElement.textContent = cartCount;
}

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add scroll animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .menu-item').forEach((el) => {
    observer.observe(el);
});

// Add door animation
const door = document.querySelector('.door');
const doorFrame = document.querySelector('.door-frame');

if (doorFrame) {
    doorFrame.addEventListener('click', () => {
        door.classList.add('open');
        
        // Wait for animation to complete before redirecting
        setTimeout(() => {
            window.location.href = 'pages/menu.html';
        }, 1500);
    });
}

// Add zoom effect when door opens
door.addEventListener('transitionend', (e) => {
    if (e.propertyName === 'transform') {
        document.body.style.transform = 'scale(1.5)';
        document.body.style.transition = 'transform 0.5s ease-in';
    }
});

// Add this to your existing DOMContentLoaded event listener
const couchQuiz = document.querySelector('.couch-quiz');
if (couchQuiz) {
    couchQuiz.addEventListener('click', () => {
        window.location.href = 'pages/quiz.html';
    });
} 