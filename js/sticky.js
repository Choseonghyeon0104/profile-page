// ==========================================
// 스티키 네비게이션 & 스크롤 애니메이션 전용 코드
// (다른 JS 파일과 충돌하지 않도록 독립적으로 작성됨)
// ==========================================

// 1. 버튼 클릭 시 100% 강제로 부드럽게 미끄러지는 커스텀 애니메이션 함수
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const nav = document.querySelector('.design-nav');
    const navHeight = nav ? nav.offsetHeight : 0;
    
    // 출발지와 목적지, 이동할 거리 계산
    const startPosition = window.scrollY || window.pageYOffset;
    const targetPosition = section.getBoundingClientRect().top + startPosition - navHeight - 30;
    const distance = targetPosition - startPosition;
    
    // 이동 시간 (밀리초 단위, 600 = 0.6초)
    const duration = 600; 
    let startTime = null;

    // 부드러운 가감속을 위한 수학 함수 (스르륵~ 슝~ 사르륵)
    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    // 화면을 쪼개서 부드럽게 스크롤을 이동시키는 루프
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        } else {
            window.scrollTo(0, targetPosition);
        }
    }

    // 애니메이션 슛!
    requestAnimationFrame(animation);
}

// 2. 스크롤 시 버튼에 불 켜기 (Scrollspy)
window.addEventListener('scroll', () => {
    const sections = ['section-popup', 'section-poster', 'section-banner', 'section-detail'];
    const navButtons = document.querySelectorAll('.design-nav button');
    let currentSection = '';

    sections.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
            // 화면 상단에서 250px 이내로 들어오면 인식
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < 250) {
                currentSection = id;
            }
        }
    });

    navButtons.forEach(btn => {
        btn.classList.remove('active');
        if (currentSection && btn.getAttribute('onclick').includes(currentSection)) {
            btn.classList.add('active');
        }
    });
});