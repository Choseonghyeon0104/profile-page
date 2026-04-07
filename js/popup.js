// 1. 마우스 움직임에 따른 미세 일렁임
document.addEventListener('mousemove', (e) => {
    const items = document.querySelectorAll('.popup-item');
    const mouseX = (e.clientX / window.innerWidth) - 0.5;
    const mouseY = (e.clientY / window.innerHeight) - 0.5;

    items.forEach((item, index) => {
        // 위치에 따라 움직임 깊이를 다르게 주어 입체감 형성
        const depth = (index % 5 + 1) * 10; 
        const moveX = mouseX * depth;
        const moveY = mouseY * depth;
        item.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

// 2. 모달 기능 (기존과 동일)
function openModal(element) {
    const modal = document.getElementById('imageModal');
    document.getElementById('modalImg').src = element.querySelector('img').src;
    document.getElementById('modalTitle').innerText = element.querySelector('h3').innerText;
    document.getElementById('modalDesc').innerText = element.querySelector('p').innerText;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; 
}

function closeModal() {
    document.getElementById('imageModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}