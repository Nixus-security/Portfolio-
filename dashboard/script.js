// ===================================
// DASHBOARD JAVASCRIPT
// ===================================

// Counter Animation for Stats
const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    };
    
    updateCounter();
};

// Animate counters on page load
window.addEventListener('load', () => {
    const statValues = document.querySelectorAll('.stat-value[data-target]');
    statValues.forEach(stat => {
        setTimeout(() => {
            animateCounter(stat);
        }, 300);
    });
});

// Date Range Selector
const dateRange = document.getElementById('dateRange');
if (dateRange) {
    dateRange.addEventListener('change', (e) => {
        console.log('Date range changed to:', e.target.value);
        showNotification(`Période mise à jour: ${e.target.value}`, 'info');
        // In a real app, this would reload the data
    });
}

// Sales Chart (Chart.js)
const salesChartCtx = document.getElementById('salesChart');
if (salesChartCtx) {
    const salesChart = new Chart(salesChartCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
            datasets: [
                {
                    label: 'Ventes',
                    data: [3000, 4500, 4000, 5500, 4800, 6200, 7100, 6800, 7500, 8200, 7800, 8900],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 4,
                    pointHoverRadius: 6
                },
                {
                    label: 'Revenus',
                    data: [2500, 3800, 3500, 5000, 4200, 5800, 6500, 6200, 7000, 7800, 7200, 8400],
                    borderColor: '#8b5cf6',
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#1e293b',
                    padding: 12,
                    borderRadius: 8,
                    titleColor: '#f8fafc',
                    bodyColor: '#f8fafc'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#e2e8f0',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#64748b'
                    }
                },
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        color: '#64748b'
                    }
                }
            }
        }
    });
}

// Traffic Chart (Pie Chart)
const trafficChartCtx = document.getElementById('trafficChart');
if (trafficChartCtx) {
    const trafficChart = new Chart(trafficChartCtx, {
        type: 'doughnut',
        data: {
            labels: ['Recherche organique', 'Réseaux sociaux', 'Direct', 'Référents'],
            datasets: [{
                data: [45, 25, 20, 10],
                backgroundColor: [
                    '#3b82f6',
                    '#8b5cf6',
                    '#10b981',
                    '#f59e0b'
                ],
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        color: '#64748b',
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: '#1e293b',
                    padding: 12,
                    borderRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            },
            cutout: '70%'
        }
    });
}

// Activity Items Click
const activityItems = document.querySelectorAll('.activity-item');
activityItems.forEach(item => {
    item.addEventListener('click', () => {
        item.style.transform = 'scale(0.98)';
        setTimeout(() => {
            item.style.transform = '';
        }, 200);
        showNotification('Détails de l\'activité', 'info');
    });
    item.style.cursor = 'pointer';
    item.style.transition = 'transform 0.2s';
});

// Product Items Click
const productItems = document.querySelectorAll('.product-item');
productItems.forEach(item => {
    item.addEventListener('click', () => {
        const productName = item.querySelector('strong').textContent;
        showNotification(`Affichage des détails: ${productName}`, 'info');
    });
    item.style.cursor = 'pointer';
});

// Progress Bar Animation
const animateProgressBars = () => {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 300);
    });
};

// Animate progress bars on load
setTimeout(animateProgressBars, 500);

// Notification Bell
const bellButton = document.querySelector('.btn-icon');
if (bellButton) {
    bellButton.addEventListener('click', () => {
        showNotification('3 nouvelles notifications', 'info');
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6',
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
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
    `;
    
    notification.innerHTML = `
        <i class="fas ${icons[type]}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
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
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Stat Cards Hover Effect
const statCards = document.querySelectorAll('.stat-card');
statCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Chart Cards Hover Effect
const chartCards = document.querySelectorAll('.chart-card');
chartCards.forEach(card => {
    card.style.transition = 'all 0.3s ease';
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
    });
});

// Refresh Data Button Simulation
document.querySelectorAll('.btn-text').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Chargement...';
        
        setTimeout(() => {
            btn.textContent = 'Voir tout';
            showNotification('Données actualisées', 'success');
        }, 1500);
    });
});

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K for quick search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        showNotification('Recherche rapide (démo)', 'info');
    }
    
    // Ctrl/Cmd + R for refresh
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        showNotification('Actualisation des données...', 'info');
        setTimeout(() => {
            animateProgressBars();
            showNotification('Données actualisées !', 'success');
        }, 1000);
    }
});

// Sidebar Toggle for Mobile
const createMobileToggle = () => {
    const toggle = document.createElement('button');
    toggle.className = 'mobile-toggle';
    toggle.innerHTML = '<i class="fas fa-bars"></i>';
    toggle.style.cssText = `
        display: none;
        position: fixed;
        top: 60px;
        left: 20px;
        z-index: 1001;
        width: 45px;
        height: 45px;
        background: white;
        border: 1px solid var(--border);
        border-radius: 12px;
        cursor: pointer;
        font-size: 1.2rem;
        color: var(--primary);
    `;
    
    if (window.innerWidth <= 968) {
        toggle.style.display = 'flex';
        toggle.style.alignItems = 'center';
        toggle.style.justifyContent = 'center';
    }
    
    toggle.addEventListener('click', () => {
        document.querySelector('.sidebar').classList.toggle('active');
    });
    
    document.body.appendChild(toggle);
};

// Responsive handling
window.addEventListener('resize', () => {
    if (window.innerWidth <= 968) {
        const existing = document.querySelector('.mobile-toggle');
        if (!existing) {
            createMobileToggle();
        }
    }
});

// Initial check
if (window.innerWidth <= 968) {
    createMobileToggle();
}

// Real-time Data Simulation
let updateInterval;
const startRealTimeUpdates = () => {
    updateInterval = setInterval(() => {
        // Update random stat
        const stats = document.querySelectorAll('.stat-value');
        if (stats.length > 0) {
            const randomStat = stats[Math.floor(Math.random() * stats.length)];
            const currentValue = parseInt(randomStat.textContent.replace(/,/g, ''));
            const change = Math.floor(Math.random() * 100) - 50;
            const newValue = Math.max(0, currentValue + change);
            
            randomStat.style.transition = 'all 0.5s ease';
            randomStat.textContent = newValue.toLocaleString();
        }
    }, 5000);
};

// Start real-time updates after page load
setTimeout(startRealTimeUpdates, 3000);

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    if (updateInterval) {
        clearInterval(updateInterval);
    }
});

// Fade in animation on load
window.addEventListener('load', () => {
    const elements = document.querySelectorAll('.stat-card, .chart-card, .activity-card, .products-card');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.animation = `fadeIn 0.6s ease forwards ${index * 0.1}s`;
    });
});

// Console Messages
console.log('%c📊 Analytics Dashboard DEMO', 'color: #3b82f6; font-size: 20px; font-weight: bold;');
console.log('%c📈 Interface analytics créée par Anthony Nagul', 'color: #8b5cf6; font-size: 14px;');
console.log('%c💡 Raccourcis clavier: Ctrl+K (recherche), Ctrl+R (actualiser)', 'color: #64748b; font-size: 12px;');
console.log('%c⚠️ Ceci est une démonstration - Les données sont simulées', 'color: #f59e0b; font-size: 11px;');

// Welcome message
setTimeout(() => {
    showNotification('Bienvenue sur votre dashboard analytics ! 📊', 'success');
}, 1000);