// Purchase notifications for YTonic
document.addEventListener('DOMContentLoaded', function() {
    // Array of fake purchase data
    const purchases = [
        { name: "Alex", location: "United States", package: "Premium" },
        { name: "Emma", location: "Canada", package: "Basic" },
        { name: "James", location: "United Kingdom", package: "Premium" },
        { name: "Sofia", location: "Australia", package: "Basic" },
        { name: "Daniel", location: "Germany", package: "Premium" },
        { name: "Olivia", location: "France", package: "Basic" },
        { name: "Noah", location: "Spain", package: "Premium" },
        { name: "Mia", location: "Italy", package: "Basic" },
        { name: "Liam", location: "Netherlands", package: "Premium" },
        { name: "Ava", location: "Sweden", package: "Basic" }
    ];
    
    // Create notification container if it doesn't exist
    let notificationContainer = document.querySelector('.notification-container');
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.className = 'notification-container';
        document.body.appendChild(notificationContainer);
    }
    
    // Function to create and show a notification
    function showNotification(purchase) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'purchase-notification';
        
        // Create notification content
        notification.innerHTML = `
            <div class="notification-icon">
                <i class="fas fa-shopping-cart"></i>
            </div>
            <div class="notification-content">
                <h4>New Purchase!</h4>
                <p>${purchase.name} from ${purchase.location} just purchased a ${purchase.package} package</p>
            </div>
        `;
        
        // Add to container
        notificationContainer.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 5000);
    }
    
    // Show first notification after a short delay
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * purchases.length);
        showNotification(purchases[randomIndex]);
        
        // Set up interval for subsequent notifications (random interval between 20-40 seconds)
        setInterval(() => {
            const randomIndex = Math.floor(Math.random() * purchases.length);
            showNotification(purchases[randomIndex]);
        }, Math.random() * 20000 + 20000); // Random interval between 20-40 seconds
    }, 5000); // Show first notification after 5 seconds
});
