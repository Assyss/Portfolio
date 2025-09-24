document.addEventListener('DOMContentLoaded', () => {
    // Código para a animação da navbar
    const canvas = document.getElementById('nav-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const maxParticles = 50;

    function resizeCanvas() {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = Math.random() * 0.5 - 0.25;
            this.vy = Math.random() * 0.5 - 0.25;
            this.radius = Math.random() * 1.5;
            this.opacity = Math.random() * 0.5;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(88, 166, 255, ${this.opacity})`;
            ctx.fill();
        }
    }

    function connectParticles() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                const distance = Math.hypot(particles[a].x - particles[b].x, particles[a].y - particles[b].y);
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(88, 166, 255, ${1 - distance / 100})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        connectParticles();
        requestAnimationFrame(animate);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    for (let i = 0; i < maxParticles; i++) {
        particles.push(new Particle());
    }

    animate();

    // Código para esconder/mostrar a navbar
    const navbar = document.getElementById('navbar-example');
    let prevScrollPos = window.pageYOffset;

    window.addEventListener('scroll', () => {
        const currentScrollPos = window.pageYOffset;

        // Se o usuário rolar para baixo, esconde a navbar
        if (prevScrollPos < currentScrollPos) {
            navbar.classList.add('navbar-hidden');
        }
        // Se o usuário voltar para o topo, mostra a navbar
        else if (currentScrollPos < 50) { // O '50' é o limite para considerar "topo"
            navbar.classList.remove('navbar-hidden');
        }

        prevScrollPos = currentScrollPos;
    });
});