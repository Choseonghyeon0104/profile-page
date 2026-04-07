window.addEventListener('DOMContentLoaded', () => {
    VANTA.CLOUDS({
        el: "#vanta-canvas",
        /* ...기본 컨트롤 설정... */
        
        /* [기본 배경] 이전과 동일하게 유지 (맑고 차분함) */
        skyColor: 0x6b94d9,         // 차분한 하늘색
        cloudColor: 0xbdc9e8,       // 뽀얀 구름색
        cloudShadowColor: 0x3d5675, // 그림자
        
        /* [핵심 수정] 반사광을 배경 구름색에 흡수시켜 톤다운 */
        // 구름 위의 하이라이트를 아주 어두운 블루 그레이로 변경
        sunColor: 0x667899,         // 이전보다 훨씬 어두워진 빛의 중심색
        
        // 주변으로 퍼지는 광채를 어두운 회색으로 눌러줌
        sunGlareColor: 0x556178,    
        
        // 비치는 햇살의 강도를 최대로 낮춤 (거의 그림자 톤)
        sunlightColor: 0x444f61,    
        
        speed: 0.5,
        mouseEase: 1,
    })
});