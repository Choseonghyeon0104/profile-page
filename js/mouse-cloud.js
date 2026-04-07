window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('smoke-cursor-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class SmokeParticle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 30 + 20; 
            
            // [팁] 초기 투명도는 유지
            this.opacity = 0.9; 
            
            this.vx = (Math.random() - 0.5) * 6; 
            this.vy = (Math.random() - 0.5) * 6 - 0.3; 
        }

        update() {
            this.vx *= 0.95;
            this.vy *= 0.95;
            this.x += this.vx;
            this.y += this.vy;

            this.size += 0.5; 

            // [팁] 소멸 속도 유지
            this.opacity -= Math.min(this.opacity, 0.007); 
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
            
            // [핵심 수정 1] 색상을 더 차분하고 투명하게 (0.4 -> 0.2 투명도)
            // 쨍한 흰색 톤을 낮춰서 배경과 섞이게 함
            gradient.addColorStop(0, 'rgba(230, 240, 255, 0.2)');   // 중심
            
            // [핵심 수정 2] 원 느낌을 지우기 위한 '다단계 그라데이션'
            // 0.4 지점까지는 진하게, 그 이후부터 1.0까지 아주 천천히 투명하게 빼서 경계를 없앱니다.
            gradient.addColorStop(0.3, 'rgba(230, 240, 255, 0.1)'); // 중간 1
            gradient.addColorStop(0.7, 'rgba(230, 240, 255, 0.05)');// 중간 2 (거의 투명)
            gradient.addColorStop(1, 'rgba(230, 240, 255, 0)');     // 끝 (완전 투명)

            ctx.fillStyle = gradient; 
            ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.restore();
        }
    }

    window.addEventListener('mousemove', (e) => {
        // [풍성함 추가] 입자를 한 번에 2개씩 랜덤하게 뿌려줌
        for(let i=0; i<2; i++) {
            const randomX = e.clientX + (Math.random() - 0.5) * 10;
            const randomY = e.clientY + (Math.random() - 0.5) * 10;
            particles.push(new SmokeParticle(randomX, randomY));
        }
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
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