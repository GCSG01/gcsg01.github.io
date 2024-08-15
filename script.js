// script.js
document.addEventListener('DOMContentLoaded', (event) => {
    // 动态生成侧边栏导航栏
    const sidebarNav = document.getElementById('sidebar-nav');
    const headings = document.querySelectorAll('.content-box h2, .content-box h3');

    headings.forEach(heading => {
        const a = document.createElement('a');
        a.href = `#${heading.id}`;
        a.textContent = heading.textContent;
        a.className = 'scroll-link';
        a.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.currentTarget.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            const headerHeight = document.querySelector('.header').offsetHeight;
            const offsetPosition = targetElement.offsetTop - headerHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
        sidebarNav.appendChild(a);
    });
});
