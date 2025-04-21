// Infinite scrolling reviews for YTonic
const reviewsData = [
    {
        content: "I was struggling to reach the 4,000 watch hours requirement for months. With YTonic, I was able to skip that hurdle and start monetizing immediately. The channel transfer was smooth and secure.",
        author: "James Wilson",
        role: "Tech Creator",
        avatar: "images/avatars/james-wilson.png",
        rating: 5
    },
    {
        content: "The Premium package was worth every penny. I got a channel in a profitable niche with existing revenue, and their support team helped me transition smoothly. Now earning $1,200/month!",
        author: "Sarah Johnson",
        role: "Finance Creator",
        avatar: "images/sarah-johnson.png",
        rating: 5
    },
    {
        content: "As someone running multiple faceless channels, YTonic has been a game-changer for scaling my business. Their secure transfer process gave me confidence, and the channels perform exactly as advertised.",
        author: "Michael Wilson",
        role: "Content Entrepreneur",
        avatar: "images/michael-wilson.png",
        rating: 5
    },
    {
        content: "I was skeptical at first, but YTonic delivered exactly what they promised. My channel had 1,000+ subscribers and was fully monetized. I started earning within the first week!",
        author: "Emma Rodriguez",
        role: "Lifestyle Vlogger",
        avatar: "images/avatar-4.jpg",
        rating: 5
    },
    {
        content: "The instant withdrawal feature on the Premium package is amazing! I can access my earnings immediately without waiting for the typical payout period. This alone made the upgrade worth it.",
        author: "David Kim",
        role: "Gaming Creator",
        avatar: "images/avatars/david-kim.png",
        rating: 5
    },
    {
        content: "YTonic's customer service is exceptional. They guided me through every step of the transfer process and were available whenever I had questions. Highly recommend!",
        author: "Jessica Patel",
        role: "Educational Content Creator",
        avatar: "images/avatar-6.jpg",
        rating: 5
    },
    {
        content: "I purchased a channel in the finance niche and it's performing better than expected. The analytics provided were accurate and the channel had great engagement metrics.",
        author: "Robert Thompson",
        role: "Finance Advisor",
        avatar: "images/avatars/robert-thompson.png",
        rating: 5
    },
    {
        content: "After trying to grow my own channel for a year with little success, I decided to try YTonic. Best decision ever! I'm now monetized and growing faster than I could have imagined.",
        author: "Sophia Martinez",
        role: "Beauty Creator",
        avatar: "images/avatar-8.jpg",
        rating: 5
    },
    {
        content: "The Premium package offers so much value. The revenue history and priority support have been invaluable for my business planning. Already seeing ROI within the first month.",
        author: "Thomas Wright",
        role: "Business Channel Owner",
        avatar: "images/avatar-9.jpg",
        rating: 5
    },
    {
        content: "I've purchased three channels from YTonic so far, and all of them have been exactly as described. Their verification process ensures you get quality channels that are ready to monetize.",
        author: "Olivia Johnson",
        role: "Content Agency Owner",
        avatar: "images/avatar-10.jpg",
        rating: 5
    }
];

// Function to create a review card element
function createReviewCard(review) {
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    
    // Create rating stars
    const starsContainer = document.createElement('div');
    starsContainer.className = 'rating-stars';
    
    for (let i = 0; i < 5; i++) {
        const star = document.createElement('i');
        star.className = i < review.rating ? 'fas fa-star' : 'far fa-star';
        starsContainer.appendChild(star);
    }
    
    const content = document.createElement('div');
    content.className = 'testimonial-content';
    content.textContent = review.content;
    
    const author = document.createElement('div');
    author.className = 'testimonial-author';
    
    // Create avatar (image or initials)
    let avatar;
    if (review.avatar && review.avatar.startsWith('images/')) {
        // Use image avatar
        avatar = document.createElement('img');
        avatar.className = 'testimonial-avatar';
        avatar.src = review.avatar;
        avatar.alt = review.author;
    } else {
        // Create initials avatar
        avatar = document.createElement('div');
        avatar.className = 'testimonial-avatar-initials';
        
        // Get initials from author name
        const nameParts = review.author.split(' ');
        const initials = nameParts.map(part => part[0]).join('');
        avatar.textContent = initials;
        
        // Assign a color based on the author's name (for consistency)
        const colors = ['#6c5ce7', '#00b894', '#fdcb6e', '#e17055', '#74b9ff'];
        const colorIndex = review.author.charCodeAt(0) % colors.length;
        avatar.style.backgroundColor = colors[colorIndex];
    }
    
    const info = document.createElement('div');
    info.className = 'testimonial-info';
    
    const name = document.createElement('h4');
    name.textContent = review.author;
    
    const role = document.createElement('p');
    role.textContent = review.role;
    
    info.appendChild(name);
    info.appendChild(role);
    
    author.appendChild(avatar);
    author.appendChild(info);
    
    card.appendChild(starsContainer);
    card.appendChild(content);
    card.appendChild(author);
    
    return card;
}

// Function to initialize infinite reviews
function initInfiniteReviews() {
    const container = document.querySelector('.infinite-reviews-container');
    if (!container) return;
    
    // Initial load of reviews
    loadMoreReviews();
    
    // Set up intersection observer for infinite scrolling
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadMoreReviews();
            }
        });
    }, { threshold: 0.1 });
    
    // Observe the last review card
    const observeLastCard = () => {
        const cards = container.querySelectorAll('.testimonial-card');
        if (cards.length > 0) {
            observer.observe(cards[cards.length - 1]);
        }
    };
    
    // Function to load more reviews
    function loadMoreReviews() {
        // Unobserve the current last card
        const currentCards = container.querySelectorAll('.testimonial-card');
        if (currentCards.length > 0) {
            observer.unobserve(currentCards[currentCards.length - 1]);
        }
        
        // Add 3 random reviews
        for (let i = 0; i < 3; i++) {
            const randomIndex = Math.floor(Math.random() * reviewsData.length);
            const review = reviewsData[randomIndex];
            const card = createReviewCard(review);
            container.appendChild(card);
            
            // Add animation
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, i * 150);
        }
        
        // Observe the new last card
        observeLastCard();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initInfiniteReviews);
