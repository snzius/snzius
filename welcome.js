document.addEventListener('DOMContentLoaded', () => {
    // Animación de entrada
    const tl = gsap.timeline();
    tl.from(".welcome-label", { opacity: 0, y: 20, duration: 1 })
      .from(".welcome-title", { opacity: 0, y: 30, duration: 1 }, "-=0.7")
      .from(".enter-btn", { opacity: 1, y: 15, duration: 0.8 }, "-=0.5"); 
      // En ".enter-btn", si pongo la opacidad en 0 como con las otras clases, el botón no me aparece directamente.
    
    // Movimiento
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 100;
        const y = (e.clientY / window.innerHeight - 0.5) * 100;

        // Luz 1
        gsap.to(".welcome-glow-1", {
            x: x,
            y: y,
            duration: 2,
            ease: "power2.out",
            overwrite: "auto"
        });

        // Luz 2
        gsap.to(".welcome-glow-2", {
            x: -x,
            y: -y,
            duration: 3,
            ease: "power2.out",
            overwrite: "auto"
        });
    });
});