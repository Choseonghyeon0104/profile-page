window.addEventListener('DOMContentLoaded', () => {
    // [1] 모바일(768px 이하)이면 아예 실행하지 않고 종료
    if (window.innerWidth <= 768) {
        const vantaElement = document.getElementById('vanta-canvas');
        if (vantaElement) {
            // 애니메이션 대신 성현님이 정하신 하늘색 배경만 깔아줍니다.
            vantaElement.style.background = "#7c9fdbff"; 
        }
        return; // 이 뒤의 VANTA.CLOUDS 코드를 실행하지 않습니다.
    }

    // [2] PC에서만 실행되는 코드
    VANTA.CLOUDS({
        el: "#vanta-canvas",
        mouseControls: true,
        touchControls: false,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        skyColor: 0x6b94d9,
        cloudColor: 0xbdc9e8,
        cloudShadowColor: 0x3d5675,
        sunColor: 0x667899,
        sunGlareColor: 0x556178,
        sunlightColor: 0x444f61,
        speed: 0.5,
        mouseEase: 1
    });
});