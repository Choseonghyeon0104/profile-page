window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('smoke-cursor-canvas');
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
            // [수정] 처음 생성될 때 크기를 조금 더 다양하게 해서 풍성하게 함
            this.size = Math.random() * 30 + 50; 
            
            // [수정] 초기 투명도를 진하게 해서 퍼질 때 존재감이 확실하게 함 (0.4 -> 0.6)
            this.opacity = 0.6; 
            
            // [핵심 수정] 퍼지는 초기 속도를 약 4배 정도 높였습니다.
            // 사방으로 팡 터지면서 빠르게 퍼지는 느낌을 줍니다.
            this.vx = (Math.random() - 0.5) * 8; 
            this.vy = (Math.random() - 0.5) * 8 - 1.5; // 위로 뜨는 힘도 약간 보강
            
            this.rotation = Math.random() * Math.PI * 2;
            
            // [수정] 회전 속도를 높여서 더 역동적인 느낌을 줌
            this.rotationSpeed = (Math.random() - 0.5) * 0.1;
        }

        update() {
            // [핵심 수정] 부드러운 마찰력(Friction) 추가 (0.95 ~ 0.98 추천)
            // 처음엔 빠르고 나중엔 몽글몽글하게 멈추게 하여 '물 흐르는' 느낌 구현
            this.vx *= 0.96;
            this.vy *= 0.96;
            
            this.x += this.vx;
            this.y += this.vy;

            // [수정] 사이즈가 커지는 속도를 높여 확 부풀어 오르는 느낌 강조
            this.size += 3.0; 

            // [핵심 수정] 투명도 감소치를 높여서 빠르게 사라지게 함 (0.012 -> 0.025)
            // 이 값이 클수록 깔끔하게 사라지고 꼬리가 짧아집니다.
            this.opacity -= 0.025; 
            this.rotation += this.rotationSpeed;
        }

        draw() {
            if (this.opacity <= 0) return;
            
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.globalAlpha = this.opacity;
            
            // [팁] 이전에 말씀하신 연한 하늘색을 은은하게 적용했습니다.
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'; 
            
            ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
            ctx.restore();
        }
    }

    window.addEventListener('mousemove', (e) => {
        // 잔상이 빨리 사라지므로 입자를 조금 더 자주 생성해도 깔끔합니다
        particles.push(new SmokeParticle(e.clientX, e.clientY));
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // 입자가 투명해지거나 너무 커지면 즉시 제거
            if (particles[i].opacity <= 0 || particles[i].size > 200) {
                particles.splice(i, 1);
                i--;
            }
        }
        requestAnimationFrame(animate);
    }

    animate();
});