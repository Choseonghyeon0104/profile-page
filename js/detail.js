// =========================================
// 상세페이지 전용 모달 스크립트 (스크롤 버그 완벽 해결)
// =========================================

function openDetailModal(imgSrc, title, desc) {
    const modal = document.getElementById("detailCustomModal");
    const modalImg = document.getElementById("detailModalFullImg");
    const modalTitle = document.getElementById("detailModalTitle");
    const modalDesc = document.getElementById("detailModalDesc");
    const scrollArea = document.querySelector(".detail-modal-scroll-area");

    if (!modal || !modalImg) return;

    modalImg.src = imgSrc;
    modalTitle.innerText = title;
    modalDesc.innerHTML = desc;

    modal.style.display = "flex";
    
    // 모달 띄운 직후 스크롤 강제 초기화
    if (scrollArea) {
        setTimeout(() => {
            scrollArea.scrollTop = 0;
        }, 10);
    }

    document.body.style.overflowY = "hidden";
}

function closeDetailModal() {
    const modal = document.getElementById("detailCustomModal");
    if (!modal) return;
    
    modal.style.display = "none";
    
    document.getElementById("detailModalFullImg").src = "";
    document.getElementById("detailModalTitle").innerText = "";
    document.getElementById("detailModalDesc").innerText = "";

    document.body.style.overflowY = "";
}

window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        const modal = document.getElementById("detailCustomModal");
        if (modal && modal.style.display === "flex") {
            closeDetailModal();
        }
    }
});