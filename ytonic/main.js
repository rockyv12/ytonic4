// YTonic - Main JavaScript
// Handles dark mode toggle, mobile menu, FAQ accordion, and other interactive elements

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            // Change icon based on menu state
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navLinks && navLinks.classList.contains('active') && 
            !event.target.closest('.nav') && !event.target.closest('.mobile-menu-toggle')) {
            navLinks.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Dark/Light mode toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or use device preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Default to dark mode for this site, but allow toggle to light mode
    if (savedTheme === 'light') {
        htmlElement.classList.add('light-mode');
        updateThemeIcon(true);
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            htmlElement.classList.toggle('light-mode');
            const isLightMode = htmlElement.classList.contains('light-mode');
            
            // Save preference to localStorage
            localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
            
            // Update icon
            updateThemeIcon(isLightMode);
        });
    }
    
    function updateThemeIcon(isLightMode) {
        const icon = themeToggle.querySelector('i');
        if (isLightMode) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
    
    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Testimonial carousel for mobile (if needed)
    const testimonialsGrid = document.querySelector('.testimonials-grid');
    let startX, scrollLeft, isDown = false;
    
    if (testimonialsGrid && window.innerWidth < 768) {
        testimonialsGrid.style.cursor = 'grab';
        
        testimonialsGrid.addEventListener('mousedown', (e) => {
            isDown = true;
            testimonialsGrid.style.cursor = 'grabbing';
            startX = e.pageX - testimonialsGrid.offsetLeft;
            scrollLeft = testimonialsGrid.scrollLeft;
        });
        
        testimonialsGrid.addEventListener('mouseleave', () => {
            isDown = false;
            testimonialsGrid.style.cursor = 'grab';
        });
        
        testimonialsGrid.addEventListener('mouseup', () => {
            isDown = false;
            testimonialsGrid.style.cursor = 'grab';
        });
        
        testimonialsGrid.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - testimonialsGrid.offsetLeft;
            const walk = (x - startX) * 2;
            testimonialsGrid.scrollLeft = scrollLeft - walk;
        });
        
        // Touch events for mobile
        testimonialsGrid.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - testimonialsGrid.offsetLeft;
            scrollLeft = testimonialsGrid.scrollLeft;
        });
        
        testimonialsGrid.addEventListener('touchend', () => {
            isDown = false;
        });
        
        testimonialsGrid.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - testimonialsGrid.offsetLeft;
            const walk = (x - startX) * 2;
            testimonialsGrid.scrollLeft = scrollLeft - walk;
        });
    }
    
    // Form validation
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let valid = true;
            const requiredInputs = form.querySelectorAll('[required]');
            
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    valid = false;
                    input.classList.add('error');
                    
                    // Add error message if not already present
                    let errorMessage = input.nextElementSibling;
                    if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                        errorMessage = document.createElement('div');
                        errorMessage.classList.add('error-message');
                        errorMessage.textContent = 'This field is required';
                        input.parentNode.insertBefore(errorMessage, input.nextSibling);
                    }
                } else {
                    input.classList.remove('error');
                    
                    // Remove error message if present
                    const errorMessage = input.nextElementSibling;
                    if (errorMessage && errorMessage.classList.contains('error-message')) {
                        errorMessage.remove();
                    }
                }
            });
            
            if (!valid) {
                e.preventDefault();
            }
        });
    });
    
    // Add animation on scroll
    const animatedElements = document.querySelectorAll('.benefit-card, .step, .pricing-card, .testimonial-card');
    
    function checkIfInView() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }
    
    // Initial check on page load
    checkIfInView();
    
    // Check on scroll
    window.addEventListener('scroll', checkIfInView);
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .benefit-card, .step, .pricing-card, .testimonial-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .benefit-card.visible, .step.visible, .pricing-card.visible, .testimonial-card.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .benefit-card:nth-child(2), .step:nth-child(2), .pricing-card:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .benefit-card:nth-child(3), .step:nth-child(3) {
            transition-delay: 0.4s;
        }
        
        .step:nth-child(4) {
            transition-delay: 0.6s;
        }
    `;
    document.head.appendChild(style);
    
    // Add light mode styles
    const lightModeStyles = document.createElement('style');
    lightModeStyles.textContent = `
        .light-mode {
            --bg-primary: #f8f9fa;
            --bg-secondary: #e9ecef;
            --bg-elevated: #ffffff;
            --bg-input: #f1f3f5;
            
            --text-primary: rgba(33, 37, 41, 0.9);
            --text-secondary: rgba(73, 80, 87, 0.7);
            
            /* Keep accent colors the same but slightly darker for better contrast */
            --accent-primary: #5f52cc;
            --accent-secondary: #00a382;
        }
        
        .light-mode .logo,
        .light-mode .footer-logo {
            color: var(--text-primary);
        }
        
        .light-mode .hero {
            background: linear-gradient(135deg, var(--bg-primary), var(--bg-secondary));
        }
    `;
    document.head.appendChild(lightModeStyles);
});
