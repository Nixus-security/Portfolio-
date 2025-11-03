// ===================================
// E-COMMERCE JAVASCRIPT
// ===================================

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Filter Products
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filter = button.textContent.trim().toLowerCase();
        
        // Filter products (in a real app, this would filter based on data)
        productCards.forEach(card => {
            if (filter === 'tous') {
                card.style.display = 'block';
            } else {
                // Simple demo: show/hide randomly
                card.style.display = Math.random() > 0.5 ? 'block' : 'none';
            }
        });
    });
});

// Wishlist Toggle
const wishlistButtons = document.querySelectorAll('.wishlist-btn');

wishlistButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        button.classList.toggle('active');
        
        // Show notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        if (button.classList.contains('active')) {
            notification.innerHTML = '<i class="fas fa-heart"></i> Ajouté aux favoris';
        } else {
            notification.innerHTML = '<i class="far fa-heart"></i> Retiré des favoris';
            notification.style.background = '#6b7280';
        }
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    });
});

// Add to Cart
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update cart badge
        const cartBadge = document.querySelector('.nav-btn .badge');
        if (cartBadge) {
            const currentCount = parseInt(cartBadge.textContent);
            cartBadge.textContent = currentCount + 1;
            
            // Animate badge
            cartBadge.style.animation = 'none';
            setTimeout(() => {
                cartBadge.style.animation = 'pulse 0.5s ease';
            }, 10);
        }
        
        // Change button text temporarily
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Ajouté !';
        button.style.background = '#10b981';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
        }, 2000);
        
        // Show notification
        showNotification('Produit ajouté au panier !', 'success');
    });
});

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        showNotification(`Merci de vous être inscrit avec ${email} !`, 'success');
        newsletterForm.reset();
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
    const icon = type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-times-circle' : 'fa-info-circle';
    notification.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
`;
document.head.appendChild(style);

// Search functionality
const searchInput = document.querySelector('.search-bar input');
if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value;
            if (query) {
                showNotification(`Recherche pour: ${query}`, 'info');
            }
        }
    });
}

// Quick View
const quickViewButtons = document.querySelectorAll('.quick-view');
quickViewButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        showNotification('Fonction de vue rapide (démo)', 'info');
    });
});

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.08)';
    }
    
    lastScroll = currentScroll;
});

// Product Card Hover Effect
productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Console Messages
console.log('%c🛍️ ShopModern - E-commerce DEMO', 'color: #10b981; font-size: 18px; font-weight: bold;');
console.log('%c🎨 Interface moderne créée par Anthony Nagul', 'color: #6b7280; font-size: 12px;');
console.log('%c⚠️ Ceci est une démonstration - Les fonctionnalités sont simulées', 'color: #f59e0b; font-size: 11px;');