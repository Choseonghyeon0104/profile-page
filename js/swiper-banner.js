// 다른 js 파일(포스터, 팝업)과 절대 충돌하지 않는 고유 변수명
let uniqueBannerSwiper = null;

function initBannerSection() {
    const bannerContainer = document.querySelector(".bannerSwiper");
    if (!bannerContainer) return;

    // 창 크기를 조절할 때마다 생기는 스와이퍼 내부 꼬임 방지
    if (uniqueBannerSwiper) {
        uniqueBannerSwiper.destroy(true, true);
        uniqueBannerSwiper = null;
    }

    uniqueBannerSwiper = new Swiper(".bannerSwiper", {
        // [해결 4] PC든 1024px 이하든 "무조건 한 화면에 1개만" 보이게 강제 고정
        slidesPerView: 1, 
        spaceBetween: 0, // 슬라이드 사이 간격 없음 (옆 배너 안 보임)
        
        loop: true, // 끊김 없이 무한 슬라이드
        speed: 800, // 넘어가는 속도
        
        // 3초마다 좌우 슬라이드
        autoplay: {
            delay: 3000,
            disableOnInteraction: false, // 사용자가 드래그한 후에도 3초 슬라이드 유지
        },
        
        pagination: {
            el: ".bannerSwiper .swiper-pagination",
            clickable: true,
        },

        grabCursor: true, // 마우스 올렸을 때 손가락 모양

        // 레이아웃이 바뀔 때 스스로 새로고침 하도록 설정
        observer: true,
        observeParents: true,
    });
}

// 웹페이지가 켜지면 배너 스와이퍼 실행
window.addEventListener('load', initBannerSection);

// 창 크기가 바뀔 때 비율과 1장 노출을 다시 계산하여 오류 방지
let bannerResizeDelay;
window.addEventListener('resize', () => {
    clearTimeout(bannerResizeDelay);
    bannerResizeDelay = setTimeout(initBannerSection, 300);
});