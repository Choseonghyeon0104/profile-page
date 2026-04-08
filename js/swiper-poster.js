let posterSwiperInstance = null;

function initPosterSection() {
    const isMobile = window.innerWidth <= 1024;
    const posterContainer = document.querySelector(".posterSwiper");
    
    if (!posterContainer) return;

    if (posterSwiperInstance) {
        posterSwiperInstance.destroy(true, true);
        posterSwiperInstance = null;
    }

    posterSwiperInstance = new Swiper(".posterSwiper", {
        slidesPerView: "auto",
        spaceBetween: 30,
        loop: true,
        
        /* [핵심 추가] 무한 루프 끊김 현상 방지 설정 */
        // 전체 슬라이드 개수(12개)만큼 복제본을 미리 만들어 빈 공간이 생기지 않게 합니다.
        loopedSlides: 12, 
        // 끝 지점에서 부드러운 연결을 위해 추가 복제본을 배치합니다.
        loopAdditionalSlides: 5, 
        
        speed: isMobile ? 600 : 5000, 
        autoplay: isMobile ? false : {
            delay: 0,
            disableOnInteraction: false,
        },
        freeMode: isMobile ? false : {
            enabled: true,
            sticky: false,
            momentum: false,
        },
        grabCursor: true,
        touchEventsTarget: 'container',
        
        on: {
            init: function() {
                // 초기화 및 복제된 슬라이드 포함하여 지그재그 클래스 부여
                this.slides.forEach((slide, index) => {
                    slide.classList.remove('up-slide', 'down-slide');
                    if (index % 2 === 0) {
                        slide.classList.add('up-slide');
                    } else {
                        slide.classList.add('down-slide');
                    }
                });
            },
            touchEnd: function() {
                if (!isMobile) {
                    const self = this;
                    setTimeout(() => {
                        if(self.autoplay) self.autoplay.start();
                    }, 100);
                }
            }
        }
    });
}

// 초기 로드 및 리사이즈 리스너
window.addEventListener('load', initPosterSection);
window.addEventListener("resize", () => {
    initPosterSliderWithDelay(); 
});

let posterResizeTimer;
function initPosterSliderWithDelay() {
    clearTimeout(posterResizeTimer);
    posterResizeTimer = setTimeout(initPosterSection, 300);
}