document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper(".posterSwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        loop: false, // 무한 루프 없음
        
        /* [중요] 화살표 버튼 기능 활성화 */
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        
        speed: 600,
        coverflowEffect: {
            rotate: 40,
            stretch: -20,
            depth: 300,
            modifier: 1,
            slideShadows: false,
        },
        /* [이 부분을 추가하세요] */
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        
        on: {
            init: function () {
                updatePosterDetail(this);
            },
            slideChange: function () {
                updatePosterDetail(this);
            }
        }
    });

    function updatePosterDetail(swiperInstance) {
        const activeSlide = swiperInstance.slides[swiperInstance.activeIndex];
        if (!activeSlide) return;

        const title = activeSlide.getAttribute('data-title');
        const desc = activeSlide.getAttribute('data-desc');

        const titleTarget = document.getElementById('poster-detail-title');
        const textTarget = document.getElementById('poster-detail-text');

        if (title && desc) {
            titleTarget.innerText = title;
            textTarget.innerText = desc;
        }
    }
});