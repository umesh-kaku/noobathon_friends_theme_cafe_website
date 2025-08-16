// Virtual Barista Chat Logic

// Predefined response categories with Friends-themed messages
const responses = {
    // Greeting responses
    greetings: [
        "How you doin'? 😉",
        "Welcome to Central Perk! Could I BE any more excited to serve you?",
        "Oh. My. God! Welcome to Central Perk!",
        "We were on a break... but now we're back to serve you!"
    ],
    
    // Coffee-related responses
    coffee: [
        "Our best coffee? Gunther's Special Blend - it's what I make when I'm not stuck in an ATM vestibule with Jill Goodacre!",
        "I'd recommend Monica's Perfect Latte. It's made with her obsessive attention to detail!",
        "Phoebe's Grandma's secret recipe - but don't worry, it's not from Nestle Toulouse!"
    ],
    
    // Food recommendations
    food: [
        "JOEY DOESN'T SHARE FOOD! But I highly recommend the meatball sub 🥖",
        "We have Rachel's traditional English trifle... Don't worry, no beef in this one! 😅",
        "Monica's Lasagna - better than your mom's (sorry, not sorry!)",
        "Ross's Thanksgiving sandwich - WITH THE MOIST MAKER!"
    ],
    
    // Menu information
    menu: [
        "We've got everything from Chandler's Bachelor Mac to Monica's Famous Cookies!",
        "Check out our Mockolate options! Just kidding, we learned from that mistake 😅",
        "We have the best coffee in NYC - that's what Gunther tells me anyway!"
    ],
    
    // Friends quotes
    quotes: [
        "PIVOT! PIVOT! PIVOT!",
        "We were on a break!",
        "How you doin'? 😉",
        "Could this BE any more delicious?",
        "Oh. My. God!",
        "Joey doesn't share food!",
        "Seven! Seven! Seven!",
        "Welcome to the real world. It sucks. You're gonna love it!"
    ],
    
    // Default responses for unmatched queries
    default: [
        "Could this question BE any more challenging?",
        "Oh. My. God! Let me think about that...",
        "I wish I had Phoebe's psychic abilities to answer that better!",
        "That's a good question. Unlike my career as Dr. Drake Ramoray, I'll survive this one!"
    ]
};

// Initialize chat functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendMessage');
    const quickButtons = document.querySelectorAll('.quick-btn');
    const baristaAvatar = document.querySelector('.barista-avatar');

    // Add initial greeting with delay
    setTimeout(() => {
        addMessage("How you doin'? I'm Joey, your virtual barista! What can I get you today? 😉", 'barista');
    }, 500);

    // Function to add a new message to the chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.innerHTML = `
            <div class="message-content">
                ${text}
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Get random response from a category
    function getRandomResponse(category) {
        const options = responses[category];
        return options[Math.floor(Math.random() * options.length)];
    }

    // Process user message and generate response
    function processMessage(message) {
        message = message.toLowerCase();
        let response;

        // Determine appropriate response category
        if (message.includes('coffee') || message.includes('drink')) {
            response = getRandomResponse('coffee');
        } else if (message.includes('food') || message.includes('eat')) {
            response = getRandomResponse('food');
        } else if (message.includes('menu')) {
            response = getRandomResponse('menu');
        } else if (message.includes('quote') || message.includes('friends')) {
            response = getRandomResponse('quotes');
        } else if (message.includes('hi') || message.includes('hello')) {
            response = getRandomResponse('greetings');
        } else {
            response = getRandomResponse('default');
        }

        // Add barista response with delay
        setTimeout(() => {
            addMessage(response, 'barista');
        }, 1000);
    }

    // Handle sending messages
    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            userInput.value = '';
            processMessage(message);
        }
    }

    // Event Listeners
    // Send button click
    sendButton.addEventListener('click', sendMessage);
    
    // Enter key press
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Quick button clicks
    quickButtons.forEach(button => {
        button.addEventListener('click', () => {
            const question = button.textContent;
            addMessage(question, 'user');
            processMessage(question);
        });
    });

    // Turkey avatar easter egg
    baristaAvatar.addEventListener('click', () => {
        addMessage("🦃 Happy Thanksgiving! Could I BE wearing any more clothes?", 'barista');
    });
}); 