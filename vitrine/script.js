// Initialiser AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Mobile Menu Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });
}

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
            // Fermer le menu mobile si ouvert
            navLinks.classList.remove('active');
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    }
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Merci pour votre message ! Nous vous répondrons bientôt.');
        contactForm.reset();
    });
}

// Counter animation for stats
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const animateCounter = (element) => {
    const target = parseInt(element.innerText);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.innerText = Math.floor(current) + (element.innerText.includes('+') ? '+' : '') + (element.innerText.includes('%') ? '%' : '');
            requestAnimationFrame(updateCounter);
        } else {
            element.innerText = element.getAttribute('data-target') || target + (element.innerText.includes('+') ? '+' : '') + (element.innerText.includes('%') ? '%' : '');
        }
    };
    
    updateCounter();
};

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const h3 = entry.target.querySelector('h3');
            if (h3) {
                h3.setAttribute('data-target', h3.innerText);
                h3.innerText = '0';
                animateCounter(h3);
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.stat').forEach(stat => {
    statObserver.observe(stat);
});

console.log('%c✨ TechFlow - Site Vitrine DEMO', 'color: #3b82f6; font-size: 18px; font-weight: bold;');
console.log('%c🚀 Créé par Anthony Nagul', 'color: #64748b; font-size: 12px;');