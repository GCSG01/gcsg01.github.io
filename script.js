document.addEventListener('DOMContentLoaded', function() {
    const headerHeight = document.querySelector('.header').offsetHeight;
    const scrollLinks = document.querySelectorAll('.scroll-link');

    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            const offsetPosition = targetElement.offsetTop - headerHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    // 动态生成导航栏内容
    function generateNavLinks() {
        const headers = document.querySelectorAll('.content-box h1, .content-box h2, .content-box h3, .content-box h4, .content-box h5, .content-box h6');
        const sidebarNav = document.getElementById('sidebar-nav');
        let currentList = null;
        let level = 0;

        headers.forEach(header => {
            const link = document.createElement('a');
            link.href = `#${header.id}`;
            link.className = 'scroll-link';
            link.textContent = header.textContent;

            if (header.tagName === 'H1') {
                currentList = document.createElement('ul');
                sidebarNav.appendChild(currentList);
                const listItem = document.createElement('li');
                listItem.appendChild(link);
                currentList.appendChild(listItem);
                level = 0;
            } else if (header.tagName === 'H2') {
                if (currentList) {
                    const subList = document.createElement('ul');
                    const listItem = document.createElement('li');
                    listItem.appendChild(link);
                    subList.appendChild(listItem);
                    currentList.appendChild(subList);
                    currentList = subList;
                    level = 1;
                }
            } else if (header.tagName === 'H3') {
                if (currentList) {
                    const subList = document.createElement('ul');
                    const listItem = document.createElement('li');
                    listItem.appendChild(link);
                    subList.appendChild(listItem);
                    currentList.appendChild(subList);
                    currentList = subList;
                    level = 2;
                }
            } else if (header.tagName === 'H4') {
                if (currentList) {
                    const subList = document.createElement('ul');
                    const listItem = document.createElement('li');
                    listItem.appendChild(link);
                    subList.appendChild(listItem);
                    currentList.appendChild(subList);
                    currentList = subList;
                    level = 3;
                }
            } else if (header.tagName === 'H5') {
                if (currentList) {
                    const subList = document.createElement('ul');
                    const listItem = document.createElement('li');
                    listItem.appendChild(link);
                    subList.appendChild(listItem);
                    currentList.appendChild(subList);
                    currentList = subList;
                    level = 4;
                }
            } else if (header.tagName === 'H6') {
                if (currentList) {
                    const subList = document.createElement('ul');
                    const listItem = document.createElement('li');
                    listItem.appendChild(link);
                    subList.appendChild(listItem);
                    currentList.appendChild(subList);
                    currentList = subList;
                    level = 5;
                }
            }
        });

        // 添加收缩功能
        const toggleButtons = document.querySelectorAll('#sidebar-nav > ul > li > a');
        toggleButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const subList = this.nextElementSibling;
                if (subList && subList.tagName === 'UL') {
                    subList.style.display = subList.style.display === 'none' ? 'block' : 'none';
                }
            });
        });
    }

    generateNavLinks();
});
