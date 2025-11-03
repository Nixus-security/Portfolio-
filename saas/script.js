// ===================================
// SAAS JAVASCRIPT
// ===================================

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Email Input Validation
const emailInput = document.querySelector('.email-input');
const heroBtn = document.querySelector('.hero-cta .btn-primary');

if (heroBtn) {
    heroBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const email = emailInput.value;
        
        if (!email) {
            showNotification('Veuillez entrer votre email', 'error');
            emailInput.focus();
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Veuillez entrer un email valide', 'error');
            emailInput.focus();
            return;
        }
        
        // Simulate success
        showNotification('Merci ! Votre essai gratuit commence maintenant 🎉', 'success');
        emailInput.value = '';
        
        // Simulate redirect
        setTimeout(() => {
            console.log('Redirection vers le dashboard...');
        }, 2000);
    });
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Pricing Cards Hover Effect
const pricingCards = document.querySelectorAll('.pricing-card');

pricingCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('featured')) {
            this.style.transform = '';
        }
    });
});

// Pricing Buttons
const pricingButtons = document.querySelectorAll('.pricing-card button');

pricingButtons.forEach(button => {
    button.addEventListener('click', function() {
        const planName = this.closest('.pricing-card').querySelector('h3').textContent;
        showNotification(`Vous avez sélectionné le plan ${planName} !`, 'success');
    });
});

// Stats Counter Animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const animateValue = (element, start, end, duration) => {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const updateCounter = () => {
        current += increment;
        if ((increment > 0 && current < end) || (increment < 0 && current > end)) {
            element.textContent = formatNumber(Math.floor(current));
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = formatNumber(end);
        }
    };
    
    updateCounter();
};

const formatNumber = (num) => {
    const original = document.querySelector('.stat-item h3')?.getAttribute('data-original');
    if (original && original.includes('+')) {
        return num.toLocaleString() + '+';
    }
    if (original && original.includes('%')) {
        return num + '%';
    }
    if (original && original.includes('TB')) {
        return num + 'TB+';
    }
    return num.toLocaleString();
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const h3 = entry.target.querySelector('h3');
            if (h3) {
                h3.setAttribute('data-original', h3.textContent);
                const value = parseInt(h3.textContent.replace(/[^0-9]/g, ''));
                h3.textContent = '0';
                animateValue(h3, 0, value, 2000);
                entry.target.classList.add('counted');
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// Feature Cards Animation
const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.5s ease';
    featureObserver.observe(card);
});

// Testimonials Slider (simple version)
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');

if (testimonials.length > 3) {
    setInterval(() => {
        testimonials[currentTestimonial].style.opacity = '0.5';
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        testimonials[currentTestimonial].style.opacity = '1';
    }, 5000);
}

// CTA Button
const ctaButton = document.querySelector('.cta .btn-primary');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        showNotification('Redirection vers l\'inscription...', 'info');
        // Scroll to hero
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#6366f1',
        warning: '#f59e0b'
    };
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        info: 'fa-info-circle',
        warning: 'fa-exclamation-circle'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${colors[type]};
        color: white;
        padding: 1.2rem 2rem;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.4s ease;
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 500;
        max-width: 400px;
    `;
    
    notification.innerHTML = `
        <i class="fas ${icons[type]}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.4s ease';
        setTimeout(() => notification.remove(), 400);
    }, 4000);
}

// Add Animations
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
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Dashboard Preview Hover Effects
const sidebarItems = document.querySelectorAll('.sidebar-item');
sidebarItems.forEach(item => {
    item.addEventListener('click', function() {
        sidebarItems.forEach(i => i.classList.remove('active'));
        this.classList.add('active');
    });
});

const fileCards = document.querySelectorAll('.file-card');
fileCards.forEach(card => {
    card.addEventListener('click', function() {
        showNotification('Ouverture du fichier...', 'info');
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});

// Easter Egg - Konami Code
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        showNotification('🎮 Code Konami activé ! Vous êtes un vrai geek !', 'success');
        document.body.style.animation = 'rainbow 2s ease infinite';
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// Parallax Effect on Scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Console Messages
console.log('%c☁️ CloudSync - SaaS Platform DEMO', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%c✨ Interface tech moderne créée par Anthony Nagul', 'color: #818cf8; font-size: 14px;');
console.log('%c⚡ Powered by modern web technologies', 'color: #64748b; font-size: 12px;');
console.log('%c📝 Ceci est une démonstration - Les fonctionnalités sont simulées', 'color: #f59e0b; font-size: 11px;');

// Loading Animation Complete
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});