document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel-wrapper');
    carousels.forEach(wrapper => {
        const track = wrapper.querySelector('.carousel-track');
        const btnPrev = wrapper.querySelector('.carousel-btn.prev');
        const btnNext = wrapper.querySelector('.carousel-btn.next');
        if (track && btnPrev && btnNext) {
            
            btnNext.addEventListener('click', () => {
                const slideWidth = track.clientWidth;
                track.scrollBy({ left: slideWidth, behavior: 'smooth' });
            });

            btnPrev.addEventListener('click', () => {
                const slideWidth = track.clientWidth;
                track.scrollBy({ left: -slideWidth, behavior: 'smooth' });
            });
        }
    });


    //ANIMACIONES GSAP
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    if (typeof gsap !== 'undefined') {

        const tl = gsap.timeline();

        tl.from('.navbar', { y: -50, opacity: 0, duration: 1, ease: "power3.out" })
          .from('.project-hero', { y: 30, opacity: 0, duration: 0.8 }, "-=0.5")
          .from('.main-image-container', { scale: 0.98, opacity: 0, duration: 1 }, "-=0.3")
          .from('.project-meta', { opacity: 0, y: 20, duration: 0.8 }, "-=0.5");

        gsap.utils.toArray('.text-block').forEach(block => {
            gsap.from(block, {
                scrollTrigger: {
                    trigger: block,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                y: 30,
                opacity: 0,
                duration: 1
            });
        });

        gsap.utils.toArray('.carousel-wrapper').forEach(car => {
            gsap.from(car, {
                scrollTrigger: {
                    trigger: car,
                    start: "top 85%",
                },
                scale: 0.95,
                opacity: 0,
                duration: 1
            });
        });
    }
});