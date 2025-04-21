// Sticky Buy Button Implementation
document.addEventListener('DOMContentLoaded', function() {
    // Create the sticky button element
    const stickyButton = document.createElement('div');
    stickyButton.className = 'sticky-buy-button';
    stickyButton.innerHTML = '<a href="https://buy.stripe.com/5kA9Ej4ygaN5f60dQU" class="button" target="_blank">Monetize Now</a>';
    document.body.appendChild(stickyButton);

    // Get all buy buttons on the page to determine when to show the sticky button
    const buyButtons = document.querySelectorAll('a[href*="buy.stripe.com"]');
    let lastBuyButtonPosition = 0;

    // Find the position of the last buy button on the page
    if (buyButtons.length > 0) {
        buyButtons.forEach(button => {
            const buttonPosition = button.getBoundingClientRect().top + window.scrollY;
            if (buttonPosition > lastBuyButtonPosition) {
                lastBuyButtonPosition = buttonPosition;
            }
        });
    } else {
        // If no buy buttons found, set a default position
        lastBuyButtonPosition = 500;
    }

    // Function to check scroll position and show/hide sticky button
    function checkScrollPosition() {
        if (window.scrollY > lastBuyButtonPosition + 200) { // 200px buffer after the last button
            stickyButton.classList.add('visible');
        } else {
            stickyButton.classList.remove('visible');
        }
    }

    // Add scroll event listener
    window.addEventListener('scroll', checkScrollPosition);
    
    // Initial check
    checkScrollPosition();
});
