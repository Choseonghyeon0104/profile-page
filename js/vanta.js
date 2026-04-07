// 페이지가 완전히 로드된 후 실행되도록 설정합니다.
window.addEventListener('DOMContentLoaded', () => {
    VANTA.CLOUDS({
        el: "#vanta-canvas",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        skyColor: 0x7ca9fc,
        cloudColor: 0xcad4f7,
        cloudShadowColor: 0x2f4c75,
        sunColor: 0xc0500,
        sunGlareColor: 0x966e18,
        sunlightColor: 0x7a4c0e,
        speed: 0.5,
        mouseEase: 1,
    })

});