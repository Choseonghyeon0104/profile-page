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

    class SmokeRing {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            // 입자 크기를 넉넉하게 잡아서 주변부로 넓게 퍼지게 함
            this.size = Math.random() * 50 + 40; 
            
            // 아주 연하게 잔상이 남도록 시작 투명도를 낮춤
            this.opacity = 0.5; 
            
            // 밖으로 둥글게 퍼져나가는 움직임
            this.vx = (Math.random() - 0.5) * 2; 
            this.vy = (Math.random() - 0.5) * 2; 
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.size += 1.2; // 링이 점점 커지면서 흩어짐

            // 사라지는 속도를 아주 느리게 해서 뽀얀 느낌 유지
            this.opacity -= 0.005; 
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
            
            // 🎨 [핵심 수정] 도넛 형태로 색상 배치
            // 0 (중심) : 완전 투명
            gradient.addColorStop(0, 'rgba(0, 162, 255, 0)');   
            // 0.6 (중간) : 아주 연한 파랑 시작
            gradient.addColorStop(0.6, 'rgba(29, 78, 216, 0.05)'); 
            // 0.9 (테두리) : 파란색 잔상이 가장 잘 보이는 지점
            gradient.addColorStop(0.9, 'rgba(211, 219, 255, 0.2)'); 
            // 1.0 (끝) : 다시 투명하게 사라짐
            gradient.addColorStop(1, 'rgba(0, 162, 255, 0)');     

            ctx.fillStyle = gradient; 
            ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.restore();
        }
    }

    window.addEventListener('mousemove', (e) => {
        // 입자를 더 넓은 범위로 뿌려줌 (중심을 비우는 느낌 강조)
        for(let i=0; i<3; i++) {
            const randomX = e.clientX + (Math.random() - 0.5) * 20;
            const randomY = e.clientY + (Math.random() - 0.5) * 20;
            particles.push(new SmokeRing(randomX, randomY));
        }
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 겹치는 부분이 은은하게 섞이도록 설정
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