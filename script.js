// ===== ESTADO DE LA APLICACIÓN =====
let currentCategory = 'all';
let currentSearchTerm = '';
let chatbotOpen = false;

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    renderBenefits();
    renderContributors();
    initializeEventListeners();
    animateHero();
});

// ===== FUNCIONES DE RENDERIZADO =====
function renderBenefits() {
    const grid = document.getElementById('benefitsGrid');
    const noResults = document.getElementById('noResults');
    
    // Filtrar beneficios
    const filteredBenefits = studentBenefits.filter(benefit => {
        const matchesCategory = currentCategory === 'all' || benefit.category === currentCategory;
        const matchesSearch = benefit.name.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
                            benefit.description.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
                            benefit.tags.some(tag => tag.toLowerCase().includes(currentSearchTerm.toLowerCase()));
        return matchesCategory && matchesSearch;
    });
    
    // Mostrar/ocultar mensaje de sin resultados
    if (filteredBenefits.length === 0) {
        grid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    } else {
        grid.style.display = 'grid';
        noResults.style.display = 'none';
    }
    
    // Renderizar tarjetas
    grid.innerHTML = filteredBenefits.map((benefit, index) => createBenefitCard(benefit, index)).join('');
}

function createBenefitCard(benefit, index) {
    const maxBenefitsToShow = 4;
    const visibleBenefits = benefit.benefits.slice(0, maxBenefitsToShow);
    const remainingCount = benefit.benefits.length - maxBenefitsToShow;
    
    return `
        <div class="benefit-card" style="animation-delay: ${index * 0.1}s">
            <div class="card-image-container">
                <div class="gradient-overlay"></div>
                <img src="${benefit.image}" alt="${benefit.name}" class="card-image" loading="lazy">
                <div class="discount-badge">${benefit.discount}</div>
                <div class="category-badge">${benefit.category}</div>
            </div>
            
            <div class="card-content">
                <div class="card-header">
                    <h3 class="card-title">${benefit.name}</h3>
                    ${benefit.verificationRequired ? `
                        <svg class="shield-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                        </svg>
                    ` : ''}
                </div>
                
                <p class="card-description">${benefit.description}</p>
                
                <div>
                    <p class="benefits-list-title">Incluye:</p>
                    <ul class="benefits-list">
                        ${visibleBenefits.map(item => `
                            <li class="benefit-item">
                                <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M20 6 9 17l-5-5"></path>
                                </svg>
                                <span>${item}</span>
                            </li>
                        `).join('')}
                        ${remainingCount > 0 ? `
                            <li class="more-benefits">+${remainingCount} beneficios más...</li>
                        ` : ''}
                    </ul>
                </div>
                
                <div class="tags">
                    ${benefit.tags.map(tag => `
                        <span class="tag">${tag}</span>
                    `).join('')}
                </div>
                
                <div class="card-footer">
                    <button class="details-btn" onclick="openBenefitUrl('${benefit.url}')">
                        <span>Ver más detalles</span>
                        <svg class="external-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M15 3h6v6"></path>
                            <path d="M10 14 21 3"></path>
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ===== EVENTOS =====
function initializeEventListeners() {
    // Búsqueda
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        currentSearchTerm = e.target.value;
        renderBenefits();
    });
    
    // Categorías
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Actualizar estado activo
            categoryButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Actualizar categoría actual
            currentCategory = btn.dataset.category;
            renderBenefits();
        });
    });
    
    // Chatbot
    const chatbotBtn = document.getElementById('chatbotBtn');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const chatInput = document.getElementById('chatInput');
    const sendChatBtn = document.getElementById('sendChatBtn');
    
    chatbotBtn.addEventListener('click', toggleChatbot);
    closeChatBtn.addEventListener('click', toggleChatbot);
    
    sendChatBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
}

// ===== ANIMACIONES =====
function animateHero() {
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    const searchContainer = document.querySelector('.search-container');
    const categories = document.querySelector('.categories');
    
    // Las animaciones ya están definidas en CSS, solo agregamos un pequeño efecto adicional
    setTimeout(() => {
        heroTitle.style.opacity = '1';
    }, 100);
}

// ===== CHATBOT =====
function toggleChatbot() {
    chatbotOpen = !chatbotOpen;
    const chatbotWindow = document.getElementById('chatbotWindow');
    
    if (chatbotOpen) {
        chatbotWindow.classList.add('active');
    } else {
        chatbotWindow.classList.remove('active');
    }
}

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    // Agregar mensaje del usuario
    addMessage(message, 'user');
    chatInput.value = '';
    
    // Mostrar indicador de escritura
    showTypingIndicator();
    
    // Simular respuesta del bot
    setTimeout(() => {
        hideTypingIndicator();
        const response = generateBotResponse(message);
        addMessage(response, 'bot');
    }, 1000 + Math.random() * 1000);
}

function addMessage(text, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.innerHTML = `<div class="message-content">${text}</div>`;
    chatMessages.appendChild(messageDiv);
    
    // Scroll al final
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    const chatMessages = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typingIndicator';
    typingDiv.className = 'message bot-message';
    typingDiv.innerHTML = `
        <div class="typing-indicator">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function generateBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    // Buscar palabras clave relacionadas con beneficios
    const keywords = {
        'github': 'GitHub Student Developer Pack',
        'microsoft': 'Microsoft 365 Education',
        'jetbrains': 'JetBrains Educational License',
        'figma': 'Figma for Education',
        'notion': 'Notion for Education',
        'spotify': 'Spotify Premium Student',
        'adobe': 'Adobe Creative Cloud Student',
        'canva': 'Canva for Education',
        'apple': 'Apple Education Pricing',
        'aws': 'AWS Educate',
        'autodesk': 'Autodesk Education',
        'grammarly': 'Grammarly Premium Student',
        'youtube': 'YouTube Premium Student',
        'coursera': 'Coursera Plus Student',
        'lastpass': 'LastPass for Students',
        'desarrollo': 'desarrollo',
        'diseño': 'diseño',
        'productividad': 'productividad',
        'cloud': 'cloud',
        'entretenimiento': 'entretenimiento'
    };
    
    // Buscar coincidencias
    for (const [keyword, response] of Object.entries(keywords)) {
        if (lowerMessage.includes(keyword)) {
            const benefit = studentBenefits.find(b => 
                b.name.toLowerCase().includes(keyword) || 
                b.category.toLowerCase().includes(keyword)
            );
            
            if (benefit) {
                return `¡Encontré información sobre ${benefit.name}! ${benefit.description} Puedes usar el buscador arriba para ver más detalles. 🎓`;
            }
        }
    }
    
    // Respuestas genéricas basadas en contexto
    if (lowerMessage.includes('gratis') || lowerMessage.includes('free')) {
        return '¡Hay muchos beneficios 100% gratuitos! GitHub Student Pack, Microsoft 365, JetBrains, Figma Education y más. Usa el filtro "Desarrollo" o "Diseño" para explorarlos. 💜';
    }
    
    if (lowerMessage.includes('descuento') || lowerMessage.includes('precio')) {
        return 'Tenemos descuentos increíbles: Spotify 50% OFF, Adobe 60% OFF, Apple hasta $200 OFF y muchos más. Todos requieren verificación estudiantil. 🎯';
    }
    
    if (lowerMessage.includes('cómo') || lowerMessage.includes('como') || lowerMessage.includes('obtener')) {
        return 'La mayoría de beneficios requieren verificación estudiantil con tu correo @utp.ac.pa o carnet. Haz clic en "Ver más detalles" en cualquier beneficio para comenzar el proceso. 📧';
    }
    
    if (lowerMessage.includes('hola') || lowerMessage.includes('hi')) {
        return '¡Hola! 👋 Estoy aquí para ayudarte a encontrar los mejores beneficios tecnológicos para estudiantes de la UTP. ¿Qué te interesa? ¿Desarrollo, diseño, productividad?';
    }
    
    if (lowerMessage.includes('gracias') || lowerMessage.includes('thanks')) {
        return '¡De nada! 😊 Si necesitas más ayuda, aquí estoy. ¡Aprovecha todos los beneficios que puedas!';
    }
    
    // Respuesta por defecto
    return `Interesante pregunta. Te recomiendo usar el buscador arriba para encontrar beneficios específicos. Actualmente tenemos ${studentBenefits.length} beneficios disponibles en categorías como Desarrollo, Diseño, Productividad, Cloud y más. ¿Hay algo específico que te interese? 🔍`;
}

// ===== UTILIDADES =====
function openBenefitUrl(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
}

// ===== BÚSQUEDA DIFUSA SIMPLE =====
function fuzzySearch(text, searchTerm) {
    const textLower = text.toLowerCase();
    const searchLower = searchTerm.toLowerCase();
    
    if (textLower.includes(searchLower)) return true;
    
    // Búsqueda por palabras individuales
    const words = searchLower.split(' ');
    return words.every(word => textLower.includes(word));
}

// ===== SMOOTH SCROLL (para futuras secciones) =====
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

// ===== LAZY LOADING DE IMÁGENES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    // Se aplicará automáticamente a las imágenes cuando se rendericen
}

// ===== RENDERIZADO DE CONTRIBUIDORES =====
function renderContributors() {
    renderFounders();
    if (contributors.contributors.length > 0) {
        renderCommunityContributors();
    }
}

function renderFounders() {
    const container = document.getElementById('foundersGrid');
    if (!container) return;
    
    container.innerHTML = contributors.founders.map(contributor => 
        createContributorCard(contributor, true)
    ).join('');
}

function renderCommunityContributors() {
    const container = document.getElementById('contributorsGrid');
    if (!container) return;
    
    // Mostrar sección de colaboradores solo si hay contribuidores
    const section = document.getElementById('contributorsCategory');
    if (section) {
        section.style.display = 'block';
    }
    
    container.innerHTML = contributors.contributors.map(contributor => 
        createContributorCard(contributor, false)
    ).join('');
}

function createContributorCard(contributor, isFounder) {
    const socialLinks = Object.entries(contributor.social)
        .filter(([_, url]) => url)
        .map(([platform, url]) => {
            const icons = {
                linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>',
                github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>',
                twitter: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.46 6c-.85.38-1.78.64-2.75.76 1-.6 1.76-1.55 2.12-2.68-.93.55-1.96.96-3.06 1.18-.88-.94-2.13-1.53-3.52-1.53-2.67 0-4.84 2.17-4.84 4.84 0 .38.04.75.13 1.1-4.02-.2-7.58-2.13-9.96-5.05-.42.72-.66 1.55-.66 2.44 0 1.68.85 3.16 2.15 4.03-.79-.03-1.54-.24-2.19-.6v.06c0 2.34 1.67 4.3 3.88 4.74-.41.11-.84.17-1.28.17-.31 0-.62-.03-.92-.08.62 1.94 2.42 3.35 4.55 3.39-1.67 1.31-3.77 2.09-6.05 2.09-.39 0-.78-.02-1.17-.07 2.18 1.4 4.77 2.21 7.55 2.21 9.05 0 14-7.5 14-14 0-.21 0-.42-.02-.63.96-.7 1.8-1.56 2.46-2.55z"/></svg>',
                portfolio: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>'
            };
            
            return `
                <a href="${url}" target="_blank" rel="noopener noreferrer" 
                   class="social-link ${platform}" 
                   aria-label="${platform}">
                    ${icons[platform]}
                </a>
            `;
        }).join('');
    
    return `
        <div class="contributor-card ${isFounder ? 'founder' : ''}">
            <div class="contributor-badge">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                </svg>
                <span>${contributor.badge}</span>
            </div>
            
            <div class="contributor-avatar">
                <span class="avatar-initials">${contributor.avatar}</span>
            </div>
            
            <h3 class="contributor-name">${contributor.name}</h3>
            <p class="contributor-role">${contributor.role}</p>
            <p class="contributor-bio">${contributor.bio}</p>
            
            <div class="contributor-links">
                ${socialLinks}
            </div>
        </div>
    `;
}

// ===== MANEJO DE ERRORES DE IMÁGENES =====
document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        e.target.style.opacity = '0.5';
        console.warn('Error loading image:', e.target.src);
    }
}, true);

// ===== ANALYTICS (placeholder para futuro) =====
function trackEvent(category, action, label) {
    // Aquí se puede integrar Google Analytics o similar
    console.log('Event:', category, action, label);
}

// ===== EXPORTAR FUNCIONES GLOBALES =====
window.openBenefitUrl = openBenefitUrl;
