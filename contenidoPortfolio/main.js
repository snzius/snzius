document.addEventListener('DOMContentLoaded', () => {

    // GSAP + SCROLLTRIGGER
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    // INICIAR ANIMACIONES
    initAboutAnimations();

    // DATOS DE PROYECTOS DEL JSON
    fetch('./data/proyectos.json')
        .then(res => {

            if (!res.ok) throw new Error("No se pudo cargar el JSON");
            return res.json();
        })
        .then(data => {
            renderProjectsSplit(data);

            initProjectAnimations();

            initAutoScroll();
        })
        .catch(err => console.error('Error cargando proyectos:', err));

});

// FUNCIONES DE RENDERIZADO
function renderProjectsSplit(todosLosProyectos) {
    const scrollContainer = document.querySelector('.scroll-track');
    const gridContainer = document.querySelector('.grid-2x2');

    // PROYECTOS DEL 1 AL 4 CON SCROLL
    const proyectosScroll = todosLosProyectos.slice(0, 4);

    // DEL 5 EN ADELANTE EN GRID
    const proyectosGrid = todosLosProyectos.slice(4);

    // PINTAR (1-4)
    if (scrollContainer) {
        scrollContainer.innerHTML = '';
        proyectosScroll.forEach(proy => {
            const card = crearTarjetaHTML(proy);
            scrollContainer.appendChild(card);
        });
    }

    // PINTAR (5-8)
    if (gridContainer) {
        gridContainer.innerHTML = '';
        proyectosGrid.forEach(proy => {
            const card = crearTarjetaHTML(proy);
            gridContainer.appendChild(card);
        });
    }
}

// PLANTILLA CARDS PARA NO REPETIR LO MISMO 8 VECES EN EK HTML
function crearTarjetaHTML(proy) {
    const card = document.createElement('div');
    card.classList.add('project-card');

    const tagsHtml = proy.tags ? proy.tags.map(tag => `<span class="tag">${tag}</span>`).join('') : '';
    card.innerHTML = `
        <div class="img-wrapper">
            <img src="${proy.imagen}" alt="${proy.titulo}" class="card-image">
        </div>
        
        <div class="card-info">
            <span class="card-cat">${proy.categoria || 'Proyecto'}</span>
            
            <h3>${proy.titulo}</h3>
            
            <p>${proy.descripcion}</p>
            
            <div class="tags">${tagsHtml}</div>
            
            <a href="${proy.link}" class="btn-project">Ver proyecto</a>
        </div>
    `;

    return card;
}

// FUNCIONES DE INTERACCIÓN (SCROLL Y GSAP)
function initAutoScroll() {
    const track = document.querySelector('.scroll-track');

    if (!track) return;
    const velocity = 4000; 
    let autoScroll = setInterval(runScroll, velocity);

    function runScroll() {
        const firstCard = track.querySelector('.project-card');

        if (!firstCard) return;
        const gap = parseInt(window.getComputedStyle(track).gap) || 0;
        const itemWidth = firstCard.offsetWidth + gap;
        const isEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 10;

        if (isEnd) {
            track.scrollTo({ left: 0, behavior: "smooth" });
        } else {
            track.scrollBy({ left: itemWidth, behavior: "smooth" });
        }
    }

    // HOVER
    const stopFn = () => clearInterval(autoScroll);
    const startFn = () => autoScroll = setInterval(runScroll, velocity);

    track.addEventListener('mouseenter', stopFn);
    track.addEventListener('touchstart', stopFn);
    track.addEventListener('mouseleave', startFn);
    track.addEventListener('touchend', startFn);
}

// ANIMACIÓN NAVBAR Y ABOUT
function initAboutAnimations() {

    if (typeof gsap === 'undefined') return;

    const tl = gsap.timeline();

    if(document.querySelector('.navbar')) {
        tl.from('.navbar', { y: -50, opacity: 0, duration: 1, ease: "power3.out" })
          .from('.about-title', { y: 50, opacity: 0, duration: 1 }, "-=0.5")
          .from('.about-subtitle', { opacity: 0, duration: 1 }, "-=0.5");
    }
}

// ANIMACIÓN CARDS
function initProjectAnimations() {
    
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    ScrollTrigger.refresh();

    gsap.utils.toArray('.project-card').forEach((card) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none reverse"
            },
            y: 30, 
            opacity: 0, 
            duration: 0.6
        });
    });
}