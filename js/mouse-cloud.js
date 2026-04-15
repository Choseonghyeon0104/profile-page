window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('smoke-cursor-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    let lastMouseX = null;
    let lastMouseY = null;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class SmokeRing {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            // 초기 크기를 살짝 키워 풍성함 유지
            this.size = Math.random() * 70 + 40; 
            this.opacity = 0.35; 
            // 💨 [수정] 퍼지는 속도를 1.3에서 2.2로 높여 더 넓게 확산됨
            this.vx = (Math.random() - 0.5) * 2.2; 
            this.vy = (Math.random() - 0.5) * 2.2; 
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            // 📈 [수정] 크기가 커지는 속도를 2.5에서 3.2로 높여 더 빨리 퍼짐
            this.size += 3.2; 
            this.opacity -= 0.01; 
        }

        draw() {
            if (this.opacity <= 0 || this.size <= 0) return;
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            
            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, this.size / 2
            );
            
            gradient.addColorStop(0, 'rgba(0, 162, 255, 0)');   
            gradient.addColorStop(0.5, 'rgba(148, 175, 255, 0.08)'); 
            gradient.addColorStop(0.8, 'rgba(110, 137, 255, 0.25)'); 
            gradient.addColorStop(1, 'rgba(0, 162, 255, 0)');     

            ctx.fillStyle = gradient; 
            ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    window.addEventListener('mousemove', (e) => {
        const currentX = e.clientX;
        const currentY = e.clientY;

        if (lastMouseX !== null && lastMouseY !== null) {
            const distance = Math.hypot(currentX - lastMouseX, currentY - lastMouseY);
            const steps = Math.max(Math.floor(distance / 5), 1);

            for (let i = 0; i < steps; i++) {
                const x = lastMouseX + (currentX - lastMouseX) * (i / steps);
                const y = lastMouseY + (currentY - lastMouseY) * (i / steps);
                
                const randomX = x + (Math.random() - 0.5) * 10;
                const randomY = y + (Math.random() - 0.5) * 10;
                particles.push(new SmokeRing(randomX, randomY));
            }
        }

        lastMouseX = currentX;
        lastMouseY = currentY;
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'screen';

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            if (particles[i].opacity <= 0) {
                particles.splice(i, 1);
                i--;
            }
        }
        requestAnimationFrame(animate);
    }

    animate();
});