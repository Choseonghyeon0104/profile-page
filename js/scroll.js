window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    
    // 효과가 적용될 전체 구간 (숫자를 키우면 더 천천히 진행됨)
    const scrollMax = 500; 

    // 1. [구름 효과 그룹] Design with Trust
    const smokeTargets = document.querySelectorAll('.hero-txt2, .hero-txt2-smart');
    
    // 2. [일반 페이드 그룹] 나머지 텍스트
    const fadeTargets = document.querySelectorAll(
        '.hero-txt1, .hero-txt3, .hero-txt4, .hero-txt1-smart, .hero-txt3-smart, .hero-txt4-smart'
    );

    // [로직 1] 커지다가 나중에 흐려짐
    smokeTargets.forEach(el => {
        // [수정] 스크롤이 어느 정도 내려가기 전까지는 opacity 1 유지 (0.5 지점부터 흐려짐)
        const progress = scrollTop / scrollMax;
        const opacity = Math.max(0, 1 - Math.pow(progress, 3)); // 가속도를 붙여 나중에 확 사라지게 함
        const blur = progress < 0.5 ? 0 : (progress - 0.5) * 40; // 절반 내려올 때까지 블러 0
        const scale = 1 + progress * 0.8; // 커지는 건 처음부터 일정하게
        const translateY = -scrollTop * 0.2;

        el.style.opacity = opacity;
        el.style.filter = `blur(${blur}px)`;
        el.style.transform = `translateY(${translateY}px) scale(${scale})`;
    });

    // [로직 2] 나머지 텍스트도 지연 페이드
    fadeTargets.forEach(el => {
        // [수정] 70% 지점까지는 선명하다가 마지막에 사라지도록
        const opacity = scrollTop < scrollMax * 0.7 ? 1 : 1 - (scrollTop - scrollMax * 0.7) / (scrollMax * 0.3);

        el.style.opacity = Math.max(0, opacity);
    });
});