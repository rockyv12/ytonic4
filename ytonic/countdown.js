// Countdown timer and limited stock functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize countdown timer - 30 minutes
    const countdownMinutes = 30;
    const countdownSeconds = countdownMinutes * 60;
    
    // Get stored time or initialize
    let timeRemaining;
    let endTime = localStorage.getItem('ytonic_countdown_end');
    
    if (endTime) {
        // Calculate remaining time from stored end time
        const now = Math.floor(Date.now() / 1000);
        timeRemaining = parseInt(endTime) - now;
        
        // If timer expired or invalid, reset it
        if (isNaN(timeRemaining) || timeRemaining <= 0) {
            setNewEndTime();
        }
    } else {
        setNewEndTime();
    }
    
    // Function to set a new end time
    function setNewEndTime() {
        const now = Math.floor(Date.now() / 1000);
        endTime = now + countdownSeconds;
        localStorage.setItem('ytonic_countdown_end', endTime);
        timeRemaining = countdownSeconds;
    }
    
    // Get stored stock count or initialize
    let stockCount = localStorage.getItem('ytonic_stock_count');
    if (!stockCount) {
        stockCount = 5;
        localStorage.setItem('ytonic_stock_count', stockCount);
    } else {
        stockCount = parseInt(stockCount);
    }
    
    // Create countdown elements if they don't exist
    function createCountdownElements() {
        // Create container for the countdown
        const countdownContainer = document.createElement('div');
        countdownContainer.className = 'countdown-container';
        
        // Create countdown content
        countdownContainer.innerHTML = `
            <div class="countdown-header">
                <i class="fas fa-clock"></i>
                <span>Limited Time Offer</span>
            </div>
            <div class="countdown-timer">
                <div class="countdown-time">
                    <span id="countdown-minutes">30</span>
                    <span class="countdown-label">min</span>
                </div>
                <div class="countdown-separator">:</div>
                <div class="countdown-time">
                    <span id="countdown-seconds">00</span>
                    <span class="countdown-label">sec</span>
                </div>
            </div>
        `;
        
        // Add to the hero section
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.appendChild(countdownContainer);
        }
        
        // Add to pricing cards
        const pricingCards = document.querySelectorAll('.pricing-card');
        pricingCards.forEach(card => {
            const stockBadge = document.createElement('div');
            stockBadge.className = 'stock-badge';
            stockBadge.innerHTML = `<i class="fas fa-exclamation-circle"></i> Only <span class="stock-count">${stockCount}</span> left at this price`;
            card.querySelector('.pricing-header').appendChild(stockBadge);
        });
    }
    
    // Update countdown timer
    function updateCountdown() {
        const now = Math.floor(Date.now() / 1000);
        timeRemaining = endTime - now;
        
        if (timeRemaining <= 0) {
            // Reset for demo purposes
            setNewEndTime();
        }
        
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        
        // Update the countdown display
        const minutesElement = document.getElementById('countdown-minutes');
        const secondsElement = document.getElementById('countdown-seconds');
        
        if (minutesElement && secondsElement) {
            minutesElement.textContent = minutes.toString().padStart(2, '0');
            secondsElement.textContent = seconds.toString().padStart(2, '0');
        }
        
        // Randomly decrease stock count (for demo purposes)
        if (Math.random() < 0.01) { // 1% chance each second
            decreaseStockCount();
        }
    }
    
    // Decrease stock count for urgency
    function decreaseStockCount() {
        if (stockCount > 1) {
            stockCount--;
            localStorage.setItem('ytonic_stock_count', stockCount);
            
            const stockCountElements = document.querySelectorAll('.stock-count');
            stockCountElements.forEach(element => {
                element.textContent = stockCount;
                
                // Flash the element to draw attention
                element.classList.add('flash');
                setTimeout(() => {
                    element.classList.remove('flash');
                }, 1000);
            });
        }
    }
    
    // Initialize the countdown
    createCountdownElements();
    
    // Update countdown every second
    setInterval(updateCountdown, 1000);
});
