// Scroll Animation Implementation
document.addEventListener('DOMContentLoaded', function() {
    // Get all elements that should be animated
    const animatedElements = document.querySelectorAll(
        '.pricing-card, .testimonial-card, .benefit-card, .faq-item, ' +
        '.hero-content, .section h2, .section p, .step-detailed, ' +
        '.cta, .footer-grid > div'
    );
    
    // Add the animation class to all elements
    animatedElements.forEach(element => {
        // Determine which animation to apply based on element type
        if (element.classList.contains('pricing-card') || 
            element.classList.contains('testimonial-card') || 
            element.classList.contains('benefit-card')) {
            element.classList.add('fade-in-element');
        } else if (element.classList.contains('hero-content')) {
            element.classList.add('scale-in');
        } else if (element.classList.contains('step-detailed')) {
            // Alternate between left and right animations for steps
            const stepIndex = Array.from(element.parentNode.children).indexOf(element);
            if (stepIndex % 2 === 0) {
                element.classList.add('fade-in-left');
            } else {
                element.classList.add('fade-in-right');
            }
        } else {
            element.classList.add('fade-in-element');
        }
    });
    
    // Function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
            rect.bottom >= 0
        );
    }
    
    // Function to handle scroll and show elements
    function handleScroll() {
        animatedElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('visible');
            }
        });
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Trigger once on load to show elements already in viewport
    handleScroll();
});
