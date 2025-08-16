// Sample and user reviews storage
let allReviews = [
    {
        name: "Rachel Green",
        avatar: "https://i.pravatar.cc/150?img=1",  // Using pravatar for reliable placeholder
        date: "October 15, 2023",
        rating: 5,
        text: "The best coffee in NYC! I love coming here during my breaks. The atmosphere is so cozy and the staff is incredibly friendly. Their muffins are to die for!",
        images: [
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",  // Coffee image
            "https://images.unsplash.com/photo-1558961363-fa8fdf82db35"      // Muffin image
        ]
    },
    {
        name: "Joey Tribbiani",
        avatar: "https://i.pravatar.cc/150?img=3",
        date: "October 10, 2023",
        rating: 5,
        text: "How you doin'? The meatball sub here is AMAZING! Joey doesn't share food, but I might make an exception... Actually, no I won't.",
        images: [
            "https://images.unsplash.com/photo-1624374053855-39a5a1a41402"  // Sandwich image
        ]
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const reviewsWrapper = document.querySelector('.reviews-wrapper');
    const reviewForm = document.getElementById('reviewForm');
    const imageUpload = document.getElementById('imageUpload');
    const imagePreview = document.getElementById('imagePreview');

    // Display all reviews
    displayReviews();

    function displayReviews() {
        // Sort reviews by date, newest first
        const sortedReviews = allReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
        reviewsWrapper.innerHTML = sortedReviews.map(review => createReviewCard(review)).join('');
    }

    function saveReview(review) {
        // Add to current reviews and refresh display
        allReviews.unshift(review);
        displayReviews();
    }

    function handleReviewSubmission(e) {
        e.preventDefault();
        
        const reviewText = document.getElementById('reviewText').value;
        const rating = document.querySelector('input[name="rating"]:checked')?.value;
        
        if (!reviewText || !rating) {
            alert('Please provide both a review and rating!');
            return;
        }

        // Create new review object
        const newReview = {
            name: "Guest User",
            avatar: "https://i.pravatar.cc/150?img=5",  // Different avatar for guest
            date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            rating: parseInt(rating),
            text: reviewText,
            images: []
        };

        // Handle uploaded images
        const files = imageUpload.files;
        if (files.length > 0) {
            Array.from(files).forEach(file => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    newReview.images.push(e.target.result);
                    if (newReview.images.length === files.length) {
                        saveReview(newReview);
                    }
                };
                reader.readAsDataURL(file);
            });
        } else {
            saveReview(newReview);
        }

        // Show success message and reset form
        alert('Thank you for your review!');
        this.reset();
        imagePreview.innerHTML = '';
    }

    // Event Listeners
    reviewForm.addEventListener('submit', handleReviewSubmission);
    
    imageUpload.addEventListener('change', handleImageUpload);

    function handleImageUpload(e) {
        imagePreview.innerHTML = '';
        const files = e.target.files;

        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = e => {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.classList.add('preview-image');
                    imagePreview.appendChild(img);
                };
                reader.readAsDataURL(file);
            }
        });
    }

    function createReviewCard(review) {
        const mugs = Array(5).fill('')
            .map((_, i) => `<i class="fas fa-coffee${i < review.rating ? ' mug' : ''}"></i>`)
            .join('');
        
        const images = review.images && review.images.length > 0 
            ? `<div class="review-images">
                ${review.images.map(img => `<img src="${img}" alt="Review" class="review-image">`).join('')}
               </div>`
            : '';

        return `
            <div class="review-card">
                <div class="reviewer-info">
                    <img src="${review.avatar}" alt="${review.name}" class="reviewer-avatar">
                    <div>
                        <div class="reviewer-name">${review.name}</div>
                        <div class="review-date">${review.date}</div>
                    </div>
                </div>
                <div class="review-stars" data-rating="${review.rating}">
                    ${mugs}
                </div>
                <div class="review-text">${review.text}</div>
                ${images}
            </div>
        `;
    }
}); 