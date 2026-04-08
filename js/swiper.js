let swiperInstance = null;

function initApp() {
    const isMobile = window.innerWidth <= 1024;
    if (isMobile) {
        if (!swiperInstance) {
            swiperInstance = new Swiper(".mySwiper", {
                loop: true, loopedSlides: 13, loopAdditionalSlides: 3,
                slidesPerView: "auto", centeredSlides: true,
                freeMode: { enabled: true, momentum: true, momentumRatio: 1.2, sticky: false },
                touchRatio: 1.5, observer: true, observeParents: true,
            });
        }
    } else {
        if (swiperInstance) { swiperInstance.destroy(true, true); swiperInstance = null; }
        initRandomSpeed();
    }
}

function initRandomSpeed() {
    document.querySelectorAll(".pc-cloud-section .popup-item").forEach(item => {
        item.setAttribute('data-speed', (Math.random() * 1.0) + 0.5);
    });
}

window.addEventListener("mousemove", (e) => {
    if (window.innerWidth <= 1024) return;
    document.querySelectorAll(".pc-cloud-section .popup-item").forEach(item => {
        const rect = item.getBoundingClientRect();
        const speed = parseFloat(item.getAttribute('data-speed')) || 1;
        const x = (e.clientX - (rect.left + rect.width / 2)) / 25 * speed;
        const y = (e.clientY - (rect.top + rect.height / 2)) / 25 * speed;
        item.style.transform = `translate(${x}px, ${y}px) scale(1.02)`;
    });
});

function openModal(el) {
    const modal = document.getElementById("imageModal");
    const isMobile = window.innerWidth <= 1024;
    let title, desc, imgSrc;

    if (isMobile) {
        title = el.querySelector(".text-data h3").innerText;
        desc = el.querySelector(".text-data p").innerText;
    } else {
        title = el.querySelector("h3").innerText;
        desc = el.querySelector(".hidden-desc").innerText;
    }
    imgSrc = el.querySelector("img").src;

    document.getElementById("modalImg").src = imgSrc;
    document.getElementById("modalTitle").innerText = title;
    document.getElementById("modalDesc").innerText = desc;
    
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
}

function closeModal() {
    document.getElementById("imageModal").style.display = "none";
    document.body.style.overflow = "auto";
}

window.addEventListener('load', initApp);
window.addEventListener("resize", initApp);
