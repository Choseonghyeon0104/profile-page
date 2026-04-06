window.addEventListener('DOMContentLoaded', () => {
    // 구름 배경 초기화
    VANTA.CLOUDS({
        el: "#vanta-canvas",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        
        /* 이미지 느낌을 살린 딥 블루 & 다크 테마 */
        backgroundColor: 0x0,      /* 배경: 블랙 */
        skyColor: 0x05163d,        /* 하늘: 딥 네이비 */
        cloudColor: 0x11234a,      /* 구름: 네이비 블루 */
        cloudShadowColor: 0x0,     /* 그림자 제거로 더 깔끔하게 */
        sunColor: 0x0,             /* 태양 제거 */
        sunGlareColor: 0x0,
        sunlightColor: 0x0,
        speed: 0.8                 /* 구름 속도 (부드럽게) */
    });

    // 스크롤 시 블러 효과 (패럴랙스)
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const intro = document.getElementById('vanta-canvas');
        
        // 스크롤할수록 배경이 흐려짐
        let blurVal = Math.min(scrollY / 20, 20);
        intro.style.filter = `blur(${blurVal}px)`;
    });
});