
const siteName = "Sabores del Chef";
const currentYear = new Date().getFullYear();
let visitCount = 0;


if (localStorage.getItem('visitCount')) {
    visitCount = parseInt(localStorage.getItem('visitCount'));
}
visitCount++;
localStorage.setItem('visitCount', visitCount);

console.log('%c¡Bienvenido a ' + siteName + '! 🍳', 'color: #FFB6C1; font-size: 24px; font-weight: bold;');
console.log('%cVisita número: ' + visitCount, 'color: #FF69B4; font-size: 16px;');
console.log('%cDesarrollado con ❤️ usando HTML, CSS y JavaScript', 'color: #666; font-style: italic;');
console.log('====================================');


document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    
    if (menuToggle && mainNav) {
        menuToggle.onclick = function() {
            mainNav.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        };

        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    mainNav.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }


    
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        window.onscroll = function() {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        };

        backToTop.onclick = function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        };
    }

 
    const contactForm = document.querySelector('.contacto form');
    
    if (contactForm) {
        const errorMessages = [
            '⚠️ Por favor, completa todos los campos requeridos.',
            '📧 El formato del email no es válido.',
            '✍️ El mensaje debe tener al menos 10 caracteres.',
            '👤 El nombre debe tener al menos 3 caracteres.'
        ];

        const successMessages = [
            '¡Gracias por contactarnos! 🎉',
            'Mensaje enviado con éxito ✅',
            'Te responderemos pronto 💌'
        ];

        const nombreInput = document.getElementById('nombre');
        const emailInput = document.getElementById('email');
        const mensajeInput = document.getElementById('mensaje');

        if (nombreInput) {
            nombreInput.oninput = function() {
                validateField(this, this.value.length >= 3);
            };
        }

        if (emailInput) {
            emailInput.oninput = function() {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                validateField(this, emailPattern.test(this.value));
            };
        }

        if (mensajeInput) {
            mensajeInput.oninput = function() {
                validateField(this, this.value.length >= 10);
                const counter = document.getElementById('charCounter');
                if (!counter) {
                    const newCounter = document.createElement('small');
                    newCounter.id = 'charCounter';
                    newCounter.style.color = '#666';
                    this.parentNode.appendChild(newCounter);
                }
                document.getElementById('charCounter').textContent = this.value.length + ' caracteres';
            };
        }

        function validateField(field, isValid) {
            if (isValid) {
                field.style.borderColor = '#4CAF50';
            } else if (field.value.length > 0) {
                field.style.borderColor = '#f44336';
            } else {
                field.style.borderColor = '#e0e0e0';
            }
        }

        contactForm.onsubmit = function(event) {
            event.preventDefault();
            
            const nombre = nombreInput.value.trim();
            const email = emailInput.value.trim();
            const tipo = document.getElementById('tipo').value;
            const nivel = document.querySelector('input[name="nivel"]:checked');
            const mensaje = mensajeInput.value.trim();

         
            let errores = [];

            if (nombre.length < 3) {
                errores.push('El nombre debe tener al menos 3 caracteres');
            }

            if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                errores.push('Email inválido');
            }

            if (!tipo) {
                errores.push('Selecciona un tipo de consulta');
            }

            if (!nivel) {
                errores.push('Selecciona tu nivel de experiencia');
            }

            if (mensaje.length < 10) {
                errores.push('El mensaje debe tener al menos 10 caracteres');
            }

            if (errores.length > 0) {
                let mensajeError = 'Por favor corrige los siguientes errores:\n\n';
                for (let i = 0; i < errores.length; i++) {
                    mensajeError += '• ' + errores[i] + '\n';
                }
                alert(mensajeError);
                showToast(errorMessages[0], 'error');
            } else {
                const confirmacion = confirm('¿Deseas enviar el formulario?');
                
                if (confirmacion) {
                    const comentarioAdicional = prompt('¿Tienes algún comentario adicional? (opcional)');
                    
        
                    console.log('=== FORMULARIO ENVIADO ===');
                    console.log('Nombre:', nombre);
                    console.log('Email:', email);
                    console.log('Tipo:', tipo);
                    console.log('Nivel:', nivel.value);
                    console.log('Mensaje:', mensaje);
                    if (comentarioAdicional) {
                        console.log('Comentario adicional:', comentarioAdicional);
                    }
                    console.log('========================');

                   
                    const randomIndex = Math.floor(Math.random() * successMessages.length);
                    alert(successMessages[randomIndex]);
                    showToast(successMessages[randomIndex], 'success');
                    
                 
                    contactForm.reset();
                    
                    const inputs = contactForm.querySelectorAll('input, textarea, select');
                    inputs.forEach(input => {
                        input.style.borderColor = '#e0e0e0';
                    });
                }
            }
        };
    }

    const recetasGrid = document.querySelector('.recetas-grid');
    
    if (recetasGrid) {
        createRecipeFilter();
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.receta-card, .feature-card');
    animatedElements.forEach(el => observer.observe(el));

    if (document.querySelector('.recetas')) {
        addPortionCalculator();
    }

    createDarkModeToggle();

    if (visitCount === 1) {
        setTimeout(function() {
            showToast('¡Bienvenido a Sabores del Chef! 🍳 Es tu primera visita.', 'info');
        }, 1000);
    }
});

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = 'toast ' + type;
    
    let icon = '';
    if (type === 'success') icon = '<i class="fas fa-check-circle"></i> ';
    if (type === 'error') icon = '<i class="fas fa-exclamation-circle"></i> ';
    if (type === 'info') icon = '<i class="fas fa-info-circle"></i> ';
    
    toast.innerHTML = icon + message;
    
    document.body.appendChild(toast);
    
    setTimeout(function() {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(function() {
        toast.classList.remove('show');
        setTimeout(function() {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

function createRecipeFilter() {
    const recetasSection = document.querySelector('.recetas');
    if (!recetasSection) return;
    
    const container = recetasSection.querySelector('.container');
    const heading = container.querySelector('h2');
    
    const filterDiv = document.createElement('div');
    filterDiv.style.cssText = 'text-align: center; margin-bottom: 2rem;';
    filterDiv.innerHTML = `
        <label style="margin-right: 1rem; font-weight: 600;">Filtrar por dificultad:</label>
        <select id="difficultyFilter" style="padding: 0.5rem 1rem; border-radius: 5px; border: 2px solid #FFB6C1; cursor: pointer;">
            <option value="todas">Todas</option>
            <option value="fácil">Fácil</option>
            <option value="media">Media</option>
            <option value="avanzado">Avanzado</option>
        </select>
    `;
    
    heading.insertAdjacentElement('afterend', filterDiv);
    
    document.getElementById('difficultyFilter').onchange = function() {
        const selectedDifficulty = this.value.toLowerCase();
        const recipeCards = document.querySelectorAll('.receta-card');
        
        recipeCards.forEach(function(card) {
            const cardText = card.textContent.toLowerCase();
            
            if (selectedDifficulty === 'todas') {
                card.style.display = 'block';
            } else {
                if (cardText.includes('dificultad: ' + selectedDifficulty)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
        
        showToast('Filtro aplicado: ' + this.value, 'info');
    };
}

function addPortionCalculator() {
    const recetasSection = document.querySelector('.recetas');
    if (!recetasSection) return;
    
    const container = recetasSection.querySelector('.container');
    
    const calculatorDiv = document.createElement('div');
    calculatorDiv.style.cssText = 'background: linear-gradient(135deg, #FFD1DC 0%, #FFB6C1 100%); padding: 2rem; border-radius: 15px; margin-top: 3rem; text-align: center; color: white;';
    calculatorDiv.innerHTML = `
        <h3 style="margin-bottom: 1rem;"><i class="fas fa-calculator"></i> Calculadora de Porciones</h3>
        <p style="margin-bottom: 1rem;">Ajusta las cantidades según el número de personas:</p>
        <div>
            <label style="margin-right: 1rem;">Porciones base: 4</label>
            <label style="margin-right: 0.5rem;">Calcular para:</label>
            <input type="number" id="portions" min="1" max="20" value="4" style="padding: 0.5rem; border-radius: 5px; border: none; width: 80px; text-align: center;">
            <button onclick="calculatePortions()" style="margin-left: 1rem; padding: 0.5rem 1.5rem; background: white; color: #FF69B4; border: none; border-radius: 5px; cursor: pointer; font-weight: 600;">Calcular</button>
        </div>
        <div id="portionResult" style="margin-top: 1rem; font-size: 1.2rem; font-weight: 600;"></div>
    `;
    
    container.appendChild(calculatorDiv);
}

function calculatePortions() {
    const portionsInput = document.getElementById('portions');
    const resultDiv = document.getElementById('portionResult');
    const basePortion = 4;
    const newPortions = parseInt(portionsInput.value);
    
    if (newPortions < 1 || newPortions > 20 || isNaN(newPortions)) {
        alert('Por favor ingresa un número entre 1 y 20');
        return;
    }
    
    const multiplier = newPortions / basePortion;
    
    const baseIngredients = {
        'Pasta': 400,
        'Huevos': 4,
        'Bacon': 200,
        'Queso Parmesano': 100
    };
    
    let resultHTML = '<div style="background: rgba(255,255,255,0.2); padding: 1rem; border-radius: 10px; margin-top: 1rem;">';
    resultHTML += '<strong>Ingredientes para ' + newPortions + ' personas:</strong><br><br>';
    
    for (let ingredient in baseIngredients) {
        const newAmount = Math.round(baseIngredients[ingredient] * multiplier);
        resultHTML += ingredient + ': ' + newAmount + 'g<br>';
    }
    
    resultHTML += '</div>';
    resultDiv.innerHTML = resultHTML;
    
    console.log('Calculando para', newPortions, 'personas. Multiplicador:', multiplier);
}

function createDarkModeToggle() {
    const darkModeBtn = document.createElement('button');
    darkModeBtn.id = 'darkModeToggle';
    darkModeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeBtn.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        background: linear-gradient(135deg, #FFB6C1 0%, #FFC0CB 100%);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 1.2rem;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 999;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(darkModeBtn);
    
    if (localStorage.getItem('darkMode') === 'enabled') {
        enableDarkMode();
    }
    
    darkModeBtn.onclick = function() {
        if (document.body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    };
}

function enableDarkMode() {
    document.body.classList.add('dark-mode');
    document.getElementById('darkModeToggle').innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem('darkMode', 'enabled');
    
    if (!document.getElementById('darkModeStyles')) {
        const darkStyles = document.createElement('style');
        darkStyles.id = 'darkModeStyles';
        darkStyles.textContent = `
            .dark-mode {
                background-color: #1a1a1a !important;
                color: #ffffff !important;
            }
            .dark-mode header {
                background: linear-gradient(135deg, #8B4789 0%, #9B5B9A 100%) !important;
            }
            .dark-mode .hero {
                background: linear-gradient(135deg, #9B5B9A 0%, #8B4789 100%) !important;
            }
            .dark-mode .receta-card,
            .dark-mode .feature-card,
            .dark-mode form {
                background: #2a2a2a !important;
                color: #ffffff !important;
            }
            .dark-mode .receta-card p,
            .dark-mode .feature-card p {
                color: #cccccc !important;
            }
            .dark-mode table tbody {
                background: #2a2a2a !important;
            }
            .dark-mode th, .dark-mode td {
                border-color: #444 !important;
            }
            .dark-mode .nutrition-tips,
            .dark-mode .about-section {
                background: #2a2a2a !important;
                color: #ffffff !important;
            }
        `;
        document.head.appendChild(darkStyles);
    }
    
    showToast('Modo oscuro activado 🌙', 'info');
}

function disableDarkMode() {
    document.body.classList.remove('dark-mode');
    document.getElementById('darkModeToggle').innerHTML = '<i class="fas fa-moon"></i>';
    localStorage.setItem('darkMode', 'disabled');
    
    showToast('Modo claro activado ☀️', 'info');
}

document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        const searchTerm = prompt('🔍 Búsqueda rápida:\n\n¿Qué receta estás buscando?');
        
        if (searchTerm) {
            console.log('Buscando:', searchTerm);
            showToast('Buscando: ' + searchTerm + '...', 'info');
        }
    }
});

if (document.querySelector('.nutricion table')) {
    console.log('=== CÁLCULOS NUTRICIONALES ===');
    
    const rows = document.querySelectorAll('.nutricion table tbody tr');
    let totalCalorias = 0;
    let recetasCount = 0;
    
    for (let i = 0; i < rows.length - 1; i++) { // -1 para evitar la fila de promedio
        const cells = rows[i].querySelectorAll('td');
        if (cells.length > 0) {
            const calorias = parseInt(cells[4].textContent);
            if (!isNaN(calorias)) {
                totalCalorias += calorias;
                recetasCount++;
                console.log('Receta', (i + 1) + ':', calorias, 'calorías');
            }
        }
    }
    
    const promedioCalorias = totalCalorias / recetasCount;
    console.log('Total de calorías:', totalCalorias);
    console.log('Promedio de calorías:', Math.round(promedioCalorias));
    console.log('============================');
}

const testimonios = [
    {
        nombre: "María García",
        texto: "Las recetas son excelentes y fáciles de seguir",
        rating: 5
    },
    {
        nombre: "Juan Pérez",
        texto: "Me encanta la variedad de platos disponibles",
        rating: 5
    },
    {
        nombre: "Ana Martínez",
        texto: "Perfectas para cocinar en familia",
        rating: 4
    }
];

function mostrarTestimonioAleatorio() {
    const randomIndex = Math.floor(Math.random() * testimonios.length);
    const testimonio = testimonios[randomIndex];
    
    console.log('💬 Testimonio de', testimonio.nombre + ':', testimonio.texto);
    console.log('⭐ Calificación:', testimonio.rating + '/5');
}

if (document.querySelector('.hero')) {
    mostrarTestimonioAleatorio();
}

console.log('%c✅ Script de Sabores del Chef cargado correctamente', 'color: #4CAF50; font-weight: bold;');

function showModal(title, content) {
    let modal = document.getElementById('genericModal');
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'genericModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2 id="modalTitle"></h2>
                    <button class="close-modal" onclick="closeModal('genericModal')">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" id="modalBody"></div>
            </div>
        `;
        document.body.appendChild(modal);
        
        modal.onclick = function(event) {
            if (event.target === modal) {
                closeModal('genericModal');
            }
        };
    }
    
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').innerHTML = content;
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modals = document.querySelectorAll('.modal.show');
        modals.forEach(modal => modal.classList.remove('show'));
        document.body.style.overflow = 'auto';
        
        const lightbox = document.getElementById('lightbox');
        if (lightbox && lightbox.classList.contains('show')) {
            closeLightbox();
        }
    }
});

function initRatingSystem() {
    const recipeCards = document.querySelectorAll('.receta-card');
    
    recipeCards.forEach((card, index) => {
        if (card.querySelector('.rating-container')) return;
        
        const ratingDiv = document.createElement('div');
        ratingDiv.className = 'rating-container';
        ratingDiv.innerHTML = `
            <div class="stars" data-recipe="${index}">
                ${[1, 2, 3, 4, 5].map(star => `
                    <span class="star" data-value="${star}">
                        <i class="fas fa-star"></i>
                    </span>
                `).join('')}
            </div>
            <span class="rating-value">0.0</span>
        `;
        
        const lastP = card.querySelector('p:last-child');
        if (lastP) {
            lastP.parentNode.insertBefore(ratingDiv, lastP);
        }
        
        const savedRating = localStorage.getItem(`rating_${index}`) || 0;
        updateStars(index, parseFloat(savedRating));
        
        const stars = ratingDiv.querySelectorAll('.star');
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const value = parseInt(this.dataset.value);
                rateRecipe(index, value);
            });
            
            star.addEventListener('mouseenter', function() {
                const value = parseInt(this.dataset.value);
                highlightStars(index, value);
            });
        });
        
        ratingDiv.querySelector('.stars').addEventListener('mouseleave', function() {
            const savedRating = localStorage.getItem(`rating_${index}`) || 0;
            updateStars(index, parseFloat(savedRating));
        });
    });
}

function rateRecipe(recipeId, rating) {
    localStorage.setItem(`rating_${recipeId}`, rating);
    updateStars(recipeId, rating);
    showToast(`Has calificado esta receta con ${rating} estrella${rating > 1 ? 's' : ''} ⭐`, 'success');
    console.log(`Receta ${recipeId} calificada con ${rating} estrellas`);
}

function updateStars(recipeId, rating) {
    const starsContainer = document.querySelector(`.stars[data-recipe="${recipeId}"]`);
    if (!starsContainer) return;
    
    const stars = starsContainer.querySelectorAll('.star');
    const ratingValue = starsContainer.parentElement.querySelector('.rating-value');
    
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
    
    if (ratingValue) {
        ratingValue.textContent = rating.toFixed(1);
    }
}

function highlightStars(recipeId, count) {
    const stars = document.querySelectorAll(`.stars[data-recipe="${recipeId}"] .star`);
    stars.forEach((star, index) => {
        if (index < count) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

function initLightbox() {
    if (!document.getElementById('lightbox')) {
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close" onclick="closeLightbox()">
                    <i class="fas fa-times"></i>
                </button>
                <img id="lightboxImage" src="" alt="Imagen ampliada">
            </div>
        `;
        document.body.appendChild(lightbox);
        
        lightbox.onclick = function(event) {
            if (event.target === lightbox) {
                closeLightbox();
            }
        };
    }
    
    const images = document.querySelectorAll('.receta-card img, .hero-image');
    images.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            openLightbox(this.src);
        });
    });
}

function openLightbox(imageSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    
    if (lightbox && lightboxImage) {
        lightboxImage.src = imageSrc;
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

let timerInterval = null;
let timerSeconds = 0;
let timerRunning = false;

function createCookingTimer() {
    const recipesSection = document.querySelector('.recetas');
    if (!recipesSection) return;
    
    const container = recipesSection.querySelector('.container');
    if (!container) return;
    
    if (document.getElementById('cookingTimer')) return;
    
    const timerDiv = document.createElement('div');
    timerDiv.id = 'cookingTimer';
    timerDiv.className = 'timer-container';
    timerDiv.innerHTML = `
        <h3><i class="fas fa-clock"></i> Temporizador de Cocina</h3>
        <div class="timer-display" id="timerDisplay">00:00</div>
        <div class="timer-controls">
            <button class="timer-btn" onclick="startTimer()">
                <i class="fas fa-play"></i> Iniciar
            </button>
            <button class="timer-btn" onclick="pauseTimer()">
                <i class="fas fa-pause"></i> Pausar
            </button>
            <button class="timer-btn" onclick="resetTimer()">
                <i class="fas fa-redo"></i> Reiniciar
            </button>
            <button class="timer-btn" onclick="setCustomTimer()">
                <i class="fas fa-edit"></i> Personalizar
            </button>
        </div>
        <div class="timer-preset">
            <button class="preset-btn" onclick="setTimer(180)">3 min</button>
            <button class="preset-btn" onclick="setTimer(300)">5 min</button>
            <button class="preset-btn" onclick="setTimer(600)">10 min</button>
            <button class="preset-btn" onclick="setTimer(900)">15 min</button>
            <button class="preset-btn" onclick="setTimer(1200)">20 min</button>
            <button class="preset-btn" onclick="setTimer(1800)">30 min</button>
        </div>
    `;
    
    container.appendChild(timerDiv);
}

function setTimer(seconds) {
    timerSeconds = seconds;
    updateTimerDisplay();
    showToast(`Temporizador ajustado a ${formatTime(seconds)}`, 'info');
}

function startTimer() {
    if (timerRunning) return;
    
    if (timerSeconds === 0) {
        alert('Por favor, establece un tiempo primero usando los botones preestablecidos o personaliza uno.');
        return;
    }
    
    timerRunning = true;
    showToast('Temporizador iniciado ⏱️', 'success');
    
    timerInterval = setInterval(function() {
        if (timerSeconds > 0) {
            timerSeconds--;
            updateTimerDisplay();
        } else {
            finishTimer();
        }
    }, 1000);
}

function pauseTimer() {
    if (!timerRunning) return;
    
    timerRunning = false;
    clearInterval(timerInterval);
    showToast('Temporizador pausado', 'info');
}

function resetTimer() {
    timerRunning = false;
    clearInterval(timerInterval);
    timerSeconds = 0;
    updateTimerDisplay();
    showToast('Temporizador reiniciado', 'info');
}

function finishTimer() {
    timerRunning = false;
    clearInterval(timerInterval);
    updateTimerDisplay();
    
    alert('⏰ ¡Tiempo terminado! Tu comida está lista.');
    showToast('¡Tiempo terminado! 🍳', 'success');
    
    console.log('%c🔔 DING DING DING - ¡Temporizador finalizado!', 'color: #FF6B6B; font-size: 20px; font-weight: bold;');
}

function setCustomTimer() {
    const minutes = prompt('¿Cuántos minutos deseas programar? (1-60)');
    
    if (minutes === null) return;
    
    const minutesNum = parseInt(minutes);
    
    if (isNaN(minutesNum) || minutesNum < 1 || minutesNum > 60) {
        alert('Por favor ingresa un número válido entre 1 y 60.');
        return;
    }
    
    setTimer(minutesNum * 60);
}

function updateTimerDisplay() {
    const display = document.getElementById('timerDisplay');
    if (display) {
        display.textContent = formatTime(timerSeconds);
    }
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function showRecipeDetails(recipeName) {
    const recipes = {
        'Pasta Carbonara': {
            image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop',
            time: '25 minutos',
            difficulty: 'Media',
            servings: 4,
            ingredients: [
                '400g de pasta (espagueti o fettuccine)',
                '200g de bacon o panceta',
                '4 huevos',
                '100g de queso parmesano rallado',
                'Pimienta negra molida',
                'Sal al gusto'
            ],
            instructions: [
                'Cocinar la pasta en agua con sal según las instrucciones del paquete.',
                'Mientras tanto, cortar el bacon en tiras y freír en una sartén hasta que esté crujiente.',
                'Batir los huevos con el queso parmesano rallado.',
                'Escurrir la pasta reservando un poco del agua de cocción.',
                'Mezclar la pasta caliente con el bacon y retirar del fuego.',
                'Agregar la mezcla de huevos removiendo rápidamente.',
                'Si es necesario, añadir un poco del agua de cocción para obtener una salsa cremosa.',
                'Servir inmediatamente con pimienta negra recién molida y más parmesano.'
            ],
            tips: 'El secreto está en mezclar los huevos fuera del fuego para que no se cuajen. El calor de la pasta los cocinará creando una salsa cremosa.'
        },
        'Pizza Margherita': {
            image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop',
            time: '45 minutos',
            difficulty: 'Media',
            servings: 2,
            ingredients: [
                '250g de harina de trigo',
                '150ml de agua tibia',
                '1 cucharadita de levadura seca',
                '1 cucharadita de azúcar',
                'Sal al gusto',
                '200g de salsa de tomate',
                '200g de mozzarella fresca',
                'Hojas de albahaca fresca',
                'Aceite de oliva'
            ],
            instructions: [
                'Mezclar agua tibia, levadura y azúcar. Dejar reposar 5 minutos.',
                'Agregar harina y sal. Amasar hasta obtener una masa suave.',
                'Dejar reposar la masa cubierta por 30 minutos.',
                'Estirar la masa en forma circular sobre una superficie enharinada.',
                'Esparcir la salsa de tomate dejando un borde.',
                'Distribuir la mozzarella cortada en rodajas.',
                'Hornear a 220°C durante 12-15 minutos.',
                'Decorar con albahaca fresca y un chorrito de aceite de oliva.'
            ],
            tips: 'Para una base más crujiente, precalienta bien el horno y usa una piedra para pizza si tienes.'
        },
        'Ensalada César': {
            image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop',
            time: '15 minutos',
            difficulty: 'Fácil',
            servings: 2,
            ingredients: [
                '2 pechugas de pollo',
                '1 lechuga romana',
                '50g de queso parmesano',
                'Crotones',
                '2 cucharadas de mayonesa',
                '1 cucharada de jugo de limón',
                '1 diente de ajo',
                '2 anchoas (opcional)',
                'Sal y pimienta'
            ],
            instructions: [
                'Cocinar las pechugas de pollo a la parrilla y cortar en tiras.',
                'Lavar y trozar la lechuga romana.',
                'Preparar el aderezo mezclando mayonesa, limón, ajo picado y anchoas.',
                'En un bowl grande, mezclar la lechuga con el aderezo.',
                'Agregar el pollo, parmesano rallado y crotones.',
                'Servir inmediatamente.'
            ],
            tips: 'El aderezo César tradicional lleva huevo crudo, pero esta versión con mayonesa es más segura y igualmente deliciosa.'
        }
    };
    
    const recipe = recipes[recipeName];
    
    if (!recipe) {
        showToast('Receta no encontrada', 'error');
        return;
    }
    
    const content = `
        <img src="${recipe.image}" alt="${recipeName}">
        <div style="display: flex; gap: 1rem; margin: 1rem 0; flex-wrap: wrap;">
            <span class="badge badge-medium">
                <i class="fas fa-clock"></i> ${recipe.time}
            </span>
            <span class="badge badge-${recipe.difficulty.toLowerCase()}">
                <i class="fas fa-signal"></i> ${recipe.difficulty}
            </span>
            <span class="badge">
                <i class="fas fa-users"></i> ${recipe.servings} porciones
            </span>
        </div>
        
        <h3><i class="fas fa-list-ul"></i> Ingredientes</h3>
        <ul style="line-height: 2;">
            ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
        </ul>
        
        <h3><i class="fas fa-tasks"></i> Instrucciones</h3>
        <ol style="line-height: 2;">
            ${recipe.instructions.map(inst => `<li>${inst}</li>`).join('')}
        </ol>
        
        <div style="background: #FFF0F5; padding: 1rem; border-radius: 10px; margin-top: 1rem;">
            <h4 style="color: #FF69B4; margin-bottom: 0.5rem;">
                <i class="fas fa-lightbulb"></i> Consejo del Chef
            </h4>
            <p style="margin: 0;">${recipe.tips}</p>
        </div>
        
        <div class="card-actions" style="border-top: none; padding-top: 0;">
            <button class="btn-action btn-secondary" onclick="printRecipe('${recipeName}')">
                <i class="fas fa-print"></i> Imprimir
            </button>
            <button class="btn-action btn-primary" onclick="shareRecipe('${recipeName}')">
                <i class="fas fa-share-alt"></i> Compartir
            </button>
        </div>
    `;
    
    showModal(recipeName, content);
    console.log('Mostrando detalles de receta:', recipeName);
}

function printRecipe(recipeName) {
    showToast('Preparando receta para imprimir... 🖨️', 'info');
    console.log('Imprimiendo receta:', recipeName);
    setTimeout(() => {
        showToast('La receta se abrirá en una nueva ventana (función simulada)', 'info');
    }, 1000);
}

function shareRecipe(recipeName) {
    const url = window.location.href;
    const text = `¡Mira esta deliciosa receta de ${recipeName}! ${url}`;
    
    navigator.clipboard.writeText(text).then(() => {
        showToast('Enlace copiado al portapapeles 📋', 'success');
    }).catch(() => {
        prompt('Copia este enlace para compartir:', text);
    });
    
    console.log('Compartiendo receta:', recipeName);
}

function addRecipeButtons() {
    const recipeCards = document.querySelectorAll('.receta-card');
    
    recipeCards.forEach(card => {
        if (card.querySelector('.card-actions')) return;
        
        const recipeName = card.querySelector('h3').textContent.trim().replace(/^.*?\s/, '');
        
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'card-actions';
        actionsDiv.innerHTML = `
            <button class="btn-action btn-primary" onclick="showRecipeDetails('${recipeName}')">
                <i class="fas fa-eye"></i> Ver Detalles
            </button>
            <button class="btn-action btn-secondary" onclick="toggleFavorite('${recipeName}', this)">
                <i class="far fa-heart"></i> Favorito
            </button>
        `;
        
        card.appendChild(actionsDiv);
        
        checkFavoriteStatus(recipeName, actionsDiv.querySelector('.btn-secondary'));
    });
}

function toggleFavorite(recipeName, button) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const index = favorites.indexOf(recipeName);
    
    if (index > -1) {
        favorites.splice(index, 1);
        button.innerHTML = '<i class="far fa-heart"></i> Favorito';
        showToast('Receta eliminada de favoritos', 'info');
    } else {
        favorites.push(recipeName);
        button.innerHTML = '<i class="fas fa-heart"></i> Favorito';
        showToast('Receta agregada a favoritos ❤️', 'success');
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    console.log('Favoritos actualizados:', favorites);
}

function checkFavoriteStatus(recipeName, button) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (favorites.includes(recipeName)) {
        button.innerHTML = '<i class="fas fa-heart"></i> Favorito';
    }
}

function showLoading(message = 'Cargando...') {
    let spinner = document.getElementById('loadingSpinner');
    
    if (!spinner) {
        spinner = document.createElement('div');
        spinner.id = 'loadingSpinner';
        spinner.className = 'spinner-overlay';
        spinner.innerHTML = `
            <div>
                <div class="spinner"></div>
                <div class="spinner-text">${message}</div>
            </div>
        `;
        document.body.appendChild(spinner);
    } else {
        spinner.querySelector('.spinner-text').textContent = message;
    }
    
    spinner.classList.add('show');
}

function hideLoading() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.classList.remove('show');
    }
}

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function createImageGallery() {
    const videosSection = document.querySelector('.multimedia');
    if (!videosSection) return;
    
    const container = videosSection.querySelector('.container');
    if (!container || document.getElementById('imageGallery')) return;
    
    const galleryDiv = document.createElement('div');
    galleryDiv.id = 'imageGallery';
    galleryDiv.innerHTML = `
        <h2 style="text-align: center; color: #FF69B4; margin: 3rem 0 2rem;">
            <i class="fas fa-images"></i> Galería de Platos
        </h2>
        <div class="gallery-grid">
            ${generateGalleryItems()}
        </div>
    `;
    
    container.appendChild(galleryDiv);
    
    setTimeout(() => {
        const galleryImages = document.querySelectorAll('.gallery-item img');
        galleryImages.forEach(img => {
            img.parentElement.addEventListener('click', function() {
                openLightbox(img.src);
            });
        });
    }, 100);
}

function generateGalleryItems() {
    const images = [
        { url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop', name: 'Pizza Artesanal' },
        { url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=400&fit=crop', name: 'Pasta Fresca' },
        { url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop', name: 'Ensalada Fresca' },
        { url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=400&fit=crop', name: 'Hamburguesa Gourmet' },
        { url: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=400&fit=crop', name: 'Sushi Variado' },
        { url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=400&fit=crop', name: 'Tacos Mexicanos' }
    ];
    
    return images.map(img => `
        <div class="gallery-item">
            <img src="${img.url}" alt="${img.name}">
            <div class="gallery-overlay">
                <strong>${img.name}</strong>
            </div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        console.log('%c🚀 Inicializando funcionalidades avanzadas...', 'color: #FFB6C1; font-size: 16px; font-weight: bold;');
        
        if (document.querySelector('.recetas')) {
            initRatingSystem();
            addRecipeButtons();
            createCookingTimer();
            console.log('✅ Sistema de calificación inicializado');
            console.log('✅ Botones de recetas agregados');
            console.log('✅ Temporizador de cocina creado');
        }
        
        initLightbox();
        console.log('✅ Lightbox inicializado');
        
        initSmoothScroll();
        console.log('✅ Smooth scroll configurado');
        
        if (document.querySelector('.multimedia')) {
            createImageGallery();
            console.log('✅ Galería de imágenes creada');
        }
        
        console.log('%c✨ Todas las funcionalidades avanzadas están listas!', 'color: #4CAF50; font-size: 16px; font-weight: bold;');
        
    }, 500);
});

function showStats() {
    const visitCount = localStorage.getItem('visitCount') || 0;
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const ratings = [];
    
    for (let i = 0; i < 10; i++) {
        const rating = localStorage.getItem(`rating_${i}`);
        if (rating) ratings.push(parseFloat(rating));
    }
    
    const avgRating = ratings.length > 0 
        ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2)
        : 0;
    
    const stats = `
        <div style="text-align: center;">
            <h3 style="color: #FF69B4; margin-bottom: 2rem;">
                <i class="fas fa-chart-bar"></i> Tus Estadísticas
            </h3>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin: 2rem 0;">
                <div style="background: linear-gradient(135deg, #FFD1DC 0%, #FFB6C1 100%); padding: 1.5rem; border-radius: 10px; color: white;">
                    <div style="font-size: 2rem; font-weight: bold;">${visitCount}</div>
                    <div>Visitas</div>
                </div>
                <div style="background: linear-gradient(135deg, #FFB6C1 0%, #FFC0CB 100%); padding: 1.5rem; border-radius: 10px; color: white;">
                    <div style="font-size: 2rem; font-weight: bold;">${favorites.length}</div>
                    <div>Favoritos</div>
                </div>
                <div style="background: linear-gradient(135deg, #FFC0CB 0%, #FFD1DC 100%); padding: 1.5rem; border-radius: 10px; color: white;">
                    <div style="font-size: 2rem; font-weight: bold;">${ratings.length}</div>
                    <div>Calificadas</div>
                </div>
                <div style="background: linear-gradient(135deg, #FFD1DC 0%, #FFE4E1 100%); padding: 1.5rem; border-radius: 10px; color: white;">
                    <div style="font-size: 2rem; font-weight: bold;">${avgRating} ⭐</div>
                    <div>Promedio</div>
                </div>
            </div>
            
            ${favorites.length > 0 ? `
                <div style="background: #FFF0F5; padding: 1rem; border-radius: 10px; margin-top: 1rem; text-align: left;">
                    <h4 style="color: #FF69B4;">❤️ Tus Recetas Favoritas:</h4>
                    <ul style="list-style: none; padding: 0;">
                        ${favorites.map(fav => `<li style="padding: 0.5rem 0;">✨ ${fav}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
        </div>
    `;
    
    showModal('Estadísticas de Uso', stats);
}

setTimeout(() => {
    const footer = document.querySelector('footer .container');
    if (footer && !document.getElementById('statsBtn')) {
        const statsBtn = document.createElement('p');
        statsBtn.id = 'statsBtn';
        statsBtn.innerHTML = '<a href="#" onclick="event.preventDefault(); showStats();"><i class="fas fa-chart-line"></i> Ver mis estadísticas</a>';
        footer.appendChild(statsBtn);
    }
}, 1000);

console.log('%c🎉 Fase 3 y 4 completadas exitosamente!', 'color: #FF69B4; font-size: 18px; font-weight: bold;');
