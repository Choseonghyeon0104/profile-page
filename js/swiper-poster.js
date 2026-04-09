let posterSwiperInstance = null;

function initPosterSection() {
    const isMobile = window.innerWidth <= 1024;
    const isSmallMobile = window.innerWidth <= 768;
    const posterContainer = document.querySelector(".posterSwiper");
    
    if (!posterContainer) return;

    if (posterSwiperInstance) {
        posterSwiperInstance.destroy(true, true);
        posterSwiperInstance = null;
    }

    // [기존 유지] 1024px 이하와 PC 설정을 완벽히 분리
    const swiperConfig = isMobile ? {
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: isSmallMobile ? 20 : 50,
        loop: true,
        speed: 600,
        autoplay: false,
        freeMode: false,
        loopedSlides: 13,
    } : {
        slidesPerView: "auto",
        centeredSlides: false, 
        spaceBetween: 50,
        loop: true,
        loopedSlides: 15,
        speed: 9000,
        autoplay: {
            delay: 0,
            disableOnInteraction: false, // 조작 후에도 재생 유지
        },
        freeMode: {
            enabled: true,
            sticky: false,
            momentum: false,
        }
    };

    posterSwiperInstance = new Swiper(".posterSwiper", {
        ...swiperConfig,
        grabCursor: true,
        touchEventsTarget: 'container',
        on: {
            init: function() {
                this.slides.forEach((slide) => {
                    slide.classList.remove('up-slide', 'down-slide');
                    const realIndex = Array.from(slide.parentNode.children).indexOf(slide);
                    if (window.innerWidth > 1024) {
                        if (realIndex % 2 === 0) slide.classList.add('up-slide');
                        else slide.classList.add('down-slide');
                    }
                });
            },
            // [수정 포인트] 짧은 드래그(flick)든 긴 드래그든 손을 떼면 무조건 다시 흐르게 함
            touchEnd: function() {
                if (!isMobile) {
                    const self = this;
                    // 브라우저가 조작이 끝났음을 확실히 인지한 뒤에 재시작하도록 지연 시간을 줌
                    setTimeout(() => {
                        if (self.autoplay) {
                            self.autoplay.stop();
                            self.autoplay.start();
                        }
                    }, 100);
                }
            }
        }
    });
}

window.addEventListener('load', initPosterSection);
window.addEventListener("resize", initPosterSliderWithDelay);

let posterResizeTimer;
function initPosterSliderWithDelay() {
    clearTimeout(posterResizeTimer);
    posterResizeTimer = setTimeout(initPosterSection, 300);
}