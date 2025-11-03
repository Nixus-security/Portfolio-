// ===================================
// INITIALIZATION
// ===================================

// Initialiser AOS (Animation On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// ===================================
// NAVIGATION
// ===================================

// Gestion du menu mobile
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fermer le menu mobile lors du clic sur un lien
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================

const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Ajouter la classe 'scrolled' quand on scroll
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===================================
// ACTIVE NAVIGATION LINK
// ===================================

// Mettre à jour le lien actif en fonction de la section visible
const sections = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ===================================
// SMOOTH SCROLL
// ===================================

// Ajouter un smooth scroll pour tous les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// TYPING EFFECT (Hero Section)
// ===================================

const typingTexts = [
    "Développeur Front-End & Étudiant en Cybersécurité",
    "Créateur d'expériences web modernes",
    "Passionné par la sécurité informatique"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

const heroSubtitle = document.querySelector('.hero-subtitle');

function typeText() {
    const currentText = typingTexts[textIndex];
    
    if (isDeleting) {
        heroSubtitle.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        heroSubtitle.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeText, pauseTime);
        return;
    }
    
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
    }
    
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(typeText, speed);
}

// Démarrer l'effet de typing après un court délai
setTimeout(typeText, 500);

// ===================================
// SKILL BARS ANIMATION
// ===================================

// Animer les barres de progression des compétences lors du scroll
const skillBars = document.querySelectorAll('.skill-progress');
let skillsAnimated = false;

function animateSkills() {
    const skillsSection = document.getElementById('competences');
    const skillsSectionTop = skillsSection.offsetTop;
    const skillsSectionHeight = skillsSection.offsetHeight;
    const scrollPosition = window.scrollY + window.innerHeight;
    
    if (scrollPosition > skillsSectionTop + skillsSectionHeight / 3 && !skillsAnimated) {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
        skillsAnimated = true;
    }
}

window.addEventListener('scroll', animateSkills);

// ===================================
// COUNTER ANIMATION (Stats)
// ===================================

const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

function animateValue(element, start, end, duration, suffix = '') {
    let startTimestamp = null;
    
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // Calculer la valeur actuelle
        let current;
        if (typeof end === 'string' && end.includes('+')) {
            const num = parseInt(end);
            current = Math.floor(progress * num) + '+';
        } else if (typeof end === 'string' && end.includes('%')) {
            const num = parseInt(end);
            current = Math.floor(progress * num) + '%';
        } else {
            current = Math.floor(progress * end) + suffix;
        }
        
        element.textContent = current;
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    
    window.requestAnimationFrame(step);
}

function animateStats() {
    const aboutSection = document.getElementById('apropos');
    const aboutSectionTop = aboutSection.offsetTop;
    const aboutSectionHeight = aboutSection.offsetHeight;
    const scrollPosition = window.scrollY + window.innerHeight;
    
    if (scrollPosition > aboutSectionTop + aboutSectionHeight / 2 && !statsAnimated) {
        statNumbers.forEach(stat => {
            const endValue = stat.textContent;
            animateValue(stat, 0, endValue, 2000);
        });
        statsAnimated = true;
    }
}

window.addEventListener('scroll', animateStats);

// ===================================
// FORM HANDLING
// ===================================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Récupérer les valeurs du formulaire
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Validation simple
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        showNotification('Veuillez remplir tous les champs', 'error');
        return;
    }
    
    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showNotification('Veuillez entrer une adresse email valide', 'error');
        return;
    }
    
    // Simuler l'envoi du formulaire
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.innerHTML = '<span>Envoi en cours...</span><i class="fas fa-spinner fa-spin"></i>';
    submitButton.disabled = true;
    
    // Simuler un délai d'envoi
    setTimeout(() => {
        showNotification('Message envoyé avec succès !', 'success');
        contactForm.reset();
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
        
        // En production, vous remplaceriez ceci par un vrai appel API
        console.log('Données du formulaire:', formData);
    }, 2000);
});

// ===================================
// NOTIFICATION SYSTEM
// ===================================

function showNotification(message, type = 'info') {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Ajouter les styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '1rem 1.5rem',
        backgroundColor: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6',
        color: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.8rem',
        zIndex: '10000',
        animation: 'slideInRight 0.3s ease',
        fontFamily: 'Inter, sans-serif'
    });
    
    // Ajouter l'animation
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(styleSheet);
    
    // Ajouter au DOM
    document.body.appendChild(notification);
    
    // Retirer après 4 secondes
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// ===================================
// CURSOR CUSTOM EFFECT (Optional)
// ===================================

// Créer un effet de curseur personnalisé pour desktop
if (window.innerWidth > 768) {
    const cursor = document.createElement('div');
    const cursorFollower = document.createElement('div');
    
    cursor.className = 'custom-cursor';
    cursorFollower.className = 'custom-cursor-follower';
    
    Object.assign(cursor.style, {
        width: '10px',
        height: '10px',
        border: '2px solid #3b82f6',
        borderRadius: '50%',
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: '9999',
        transition: 'transform 0.1s ease'
    });
    
    Object.assign(cursorFollower.style, {
        width: '40px',
        height: '40px',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        borderRadius: '50%',
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: '9998',
        transition: 'all 0.15s ease'
    });
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    // Animation du follower avec un léger delay
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursorFollower.style.left = followerX - 20 + 'px';
        cursorFollower.style.top = followerY - 20 + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    animateFollower();
    
    // Agrandir le curseur au survol des éléments cliquables
    const clickableElements = document.querySelectorAll('a, button, .btn, .project-card, .service-card');
    clickableElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorFollower.style.transform = 'scale(1.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
        });
    });
}

// ===================================
// PARALLAX EFFECT
// ===================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroShape = document.querySelector('.hero-shape');
    
    if (heroShape && scrolled < window.innerHeight) {
        heroShape.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ===================================
// LAZY LOADING OPTIMIZATION
// ===================================

// Optimiser le chargement des images si vous ajoutez des images réelles
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Debounce function pour optimiser les événements qui se déclenchent fréquemment
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Appliquer le debounce aux événements de scroll et resize
const debouncedScroll = debounce(() => {
    updateActiveNavLink();
    animateSkills();
    animateStats();
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ===================================
// LOADING ANIMATION
// ===================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Refresh AOS après le chargement complet
    AOS.refresh();
});

// ===================================
// CONSOLE MESSAGE
// ===================================

console.log('%c👋 Bienvenue sur mon portfolio !', 'color: #3b82f6; font-size: 20px; font-weight: bold;');
console.log('%c🚀 Développé avec passion par Anthony Nagul', 'color: #60a5fa; font-size: 14px;');
console.log('%c💼 Intéressé par une collaboration ? Contactez-moi !', 'color: #94a3b8; font-size: 12px;');

// ===================================
// EASTER EGG (Konami Code)
// ===================================

let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        showNotification('🎮 Konami Code activé ! Vous avez trouvé l\'easter egg !', 'success');
        document.body.style.animation = 'rainbow 2s ease infinite';
        
        const rainbowStyle = document.createElement('style');
        rainbowStyle.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(rainbowStyle);
        
        setTimeout(() => {
            document.body.style.animation = '';
            rainbowStyle.remove();
        }, 5000);
    }
});