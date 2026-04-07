// 모달 열기 함수
function openModal(element) {
    const modal = document.getElementById('imageModal');
    
    // 1. 클릭한 아이템 내부 요소들 가져오기
    const imgSrc = element.querySelector('img').src;
    const titleText = element.querySelector('h3').innerText;
    const descText = element.querySelector('p').innerText;

    // 2. 모달창 데이터 교체
    document.getElementById('modalImg').src = imgSrc;
    document.getElementById('modalTitle').innerText = titleText;
    document.getElementById('modalDesc').innerText = descText;

    // 3. 모달 표시 및 스크롤 방지
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; 
}

// 모달 닫기 함수
function closeModal() {
    document.getElementById('imageModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}
// 3. [추가] 마우스 움직임에 따른 구름 일렁임 효과 (Parallax)
document.addEventListener('mousemove', (e) => {
    // 팝업 아이템들 전부 가져오기
    const items = document.querySelectorAll('.popup-item');
    
    // 마우스 위치를 중앙 기준으로 계산 (-0.5 ~ 0.5 범위)
    const mouseX = (e.clientX / window.innerWidth) - 0.5;
    const mouseY = (e.clientY / window.innerHeight) - 0.5;

    items.forEach((item, index) => {
        // 아이템마다 움직이는 강도를 살짝 다르게 주어 입체감 부여
        const depth = (index % 4 + 1) * 10; 
        
        const moveX = mouseX * depth;
        const moveY = mouseY * depth;

        // CSS에서 준 translateY 기본값과 합쳐져서 부드럽게 움직임
        item.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});