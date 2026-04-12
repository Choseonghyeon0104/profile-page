window.addEventListener('DOMContentLoaded', () => {
    // [1] 모바일(768px 이하) 설정
    if (window.innerWidth <= 768) {
        const vantaElement = document.getElementById('vanta-canvas');
        if (vantaElement) {
            // 단색 배경 대신 이미지를 설정합니다.
            // 'your-image-url.jpg' 부분에 실제 이미지 파일 경로를 넣으세요.
            vantaElement.style.backgroundImage = "url('./img/mo-background.jpg')"; 
            
            // 이미지가 화면에 예쁘게 꽉 차도록 만드는 설정들입니다.
            vantaElement.style.backgroundSize = "cover";      // 화면 꽉 채우기
            vantaElement.style.backgroundPosition = "center"; // 가운데 정렬
            vantaElement.style.backgroundRepeat = "no-repeat"; // 반복 금지
        }
        return; // 모바일에서는 여기서 종료하여 VANTA를 실행하지 않습니다.
    }

    // [2] PC에서만 실행되는 VANTA 코드
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