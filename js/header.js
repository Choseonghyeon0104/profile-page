document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    const navMenu = document.getElementById('nav-menu'); 
    const toggleBtn = document.querySelector('.menu-toggle-btn');
    const menuItems = document.querySelectorAll('.menu-list > li'); 
    
    let isNavigating = false; 
    let navTimeout;

    // --- [1] ScrollSpy: 섹션 감지 (메뉴 불 켜기) ---
    // 현재 사용자가 보고 있는 섹션을 감지하여 메뉴바에 하이라이트를 줍니다.
    const sectionIds = [
        '#section-home', '#section-about', '#section-popup', 
        '#section-poster', '#section-banner', '#section-detail', 
        '#section-project', '#section-contact', '#section-resume'
    ];
    
    const observerOptions = {
        root: null,
        rootMargin: '-80px 0px -70% 0px', 
        threshold: 0
    };

    const observerCallback = (entries) => {
        if (isNavigating) return; // 메뉴 클릭 이동 중에는 불 켜짐 이동 방지

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = `#${entry.target.id}`;
                menuItems.forEach(li => li.classList.remove('active'));

                const activeLink = document.querySelector(`.menu-list a[href="${id}"]`);
                if (activeLink && activeLink.parentElement.tagName === 'LI') {
                    activeLink.parentElement.classList.add('active');
                }
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sectionIds.forEach(id => {
        const section = document.querySelector(id);
        if (section) observer.observe(section);
    });

    // --- [2] 햄버거 버튼 토글 (X자 변신) ---
    if (toggleBtn) {
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            navMenu.classList.toggle('is-open');
            toggleBtn.classList.toggle('is-active');
        });
    }

    // --- [3] 메뉴 링크 클릭 시 (이동 로직) ---
    // 로고나 메뉴를 눌렀을 때 해당 섹션으로 부드럽게 이동시킵니다.
    const scrollLinks = document.querySelectorAll('.logo a, .menu-list a');
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();

                isNavigating = true; 
                
                // 모바일 메뉴가 열려있다면 닫기
                if (navMenu) navMenu.classList.remove('is-open');
                if (toggleBtn) toggleBtn.classList.remove('is-active');

                // 클릭한 메뉴 불 즉시 켜기
                menuItems.forEach(li => li.classList.remove('active'));
                if (link.parentElement.tagName === 'LI') {
                    link.parentElement.classList.add('active');
                }

                let targetPosition = 0;
                if (targetId !== '#section-top') {
                    const targetSection = document.querySelector(targetId);
                    if (targetSection) {
                        const clientRect = targetSection.getBoundingClientRect();
                        targetPosition = clientRect.top + window.pageYOffset - 70;
                    }
                }

                window.scrollTo({ top: targetPosition, behavior: 'smooth' });

                clearTimeout(navTimeout);
                navTimeout = setTimeout(() => {
                    isNavigating = false;
                }, 800);
            }
        });
    });

    // 화면 빈 곳을 누르면 열려있던 메뉴 닫기
    document.addEventListener('click', () => {
        if (navMenu) navMenu.classList.remove('is-open');
        if (toggleBtn) toggleBtn.classList.remove('is-active');
    });
});