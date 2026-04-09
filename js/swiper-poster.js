let posterSwiperInstance = null;

function initPosterSection() {
    // 1024px 기준으로 모바일/태블릿 여부 판단
    const isMobile = window.innerWidth <= 1024;
    const isSmallMobile = window.innerWidth <= 768;
    const posterContainer = document.querySelector(".posterSwiper");
    
    if (!posterContainer) return;

    // 기존 인스턴스가 있다면 삭제하고 새로 생성 (리사이즈 대응)
    if (posterSwiperInstance) {
        posterSwiperInstance.destroy(true, true);
        posterSwiperInstance = null;
    }

    posterSwiperInstance = new Swiper(".posterSwiper", {
        slidesPerView: "auto",      // CSS에서 설정한 너비를 따름
        centeredSlides: true,       // 활성화된 카드를 무조건 화면 중앙에 배치
        
        // [수정] 768px 이하 작은 모바일에서는 간격을 20으로 좁혀서 옆 카드가 더 잘 보이게 함
        spaceBetween: isSmallMobile ? 20 : 50, 
        
        loop: true,
        loopedSlides: 12, 
        loopAdditionalSlides: 5, 
        
        // 모바일은 사용자가 직접 미는 느낌을 위해 속도를 빠르게, PC는 흐르듯 느리게
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
                // 초기화 시점에 지그재그 클래스 부여 로직
                this.slides.forEach((slide, index) => {
                    // 일단 모든 클래스 제거 (리사이즈 시 꼬임 방지)
                    slide.classList.remove('up-slide', 'down-slide');
                    
                    // [수정] 1024px 초과(PC)일 때만 지그재그 효과 적용
                    if (window.innerWidth > 1024) {
                        if (index % 2 === 0) {
                            slide.classList.add('up-slide');
                        } else {
                            slide.classList.add('down-slide');
                        }
                    }
                });
            },
            touchEnd: function() {
                // 모바일이 아닐 때 터치 후 자동재생이 멈추지 않도록 처리
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

// 초기 로드 및 리사이즈 시 재실행
window.addEventListener('load', initPosterSection);
window.addEventListener("resize", initPosterSliderWithDelay);

let posterResizeTimer;
function initPosterSliderWithDelay() {
    clearTimeout(posterResizeTimer);
    posterResizeTimer = setTimeout(initPosterSection, 300);
}