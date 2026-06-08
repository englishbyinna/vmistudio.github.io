(() => {
    let savedTheme = null;

    try {
        savedTheme = localStorage.getItem('theme');
    } catch (error) {
    }

    if (savedTheme !== 'light') {
        document.documentElement.classList.add('dark');
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const themeButtons = document.querySelectorAll('.theme-toggle');
    const faqButtons = document.querySelectorAll('#faq button');

    const setThemeButtonLabels = () => {
        const isDark = document.documentElement.classList.contains('dark');

        themeButtons.forEach((button) => {
            button.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
        });
    };

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            menuButton.setAttribute('aria-expanded', String(!mobileMenu.classList.contains('hidden')));
        });
    }

    faqButtons.forEach((button) => {
        const answer = button.nextElementSibling;
        const icon = button.querySelector('svg');

        button.setAttribute('type', 'button');
        button.setAttribute('aria-expanded', 'false');

        button.addEventListener('click', () => {
            const isOpen = button.getAttribute('aria-expanded') === 'true';

            faqButtons.forEach((otherButton) => {
                const otherAnswer = otherButton.nextElementSibling;
                const otherIcon = otherButton.querySelector('svg');

                otherButton.setAttribute('aria-expanded', 'false');
                otherAnswer.style.maxHeight = '0px';
                otherIcon.classList.remove('rotate-180');
            });

            if (!isOpen) {
                button.setAttribute('aria-expanded', 'true');
                answer.style.maxHeight = `${answer.scrollHeight}px`;
                icon.classList.add('rotate-180');
            }
        });
    });

    themeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');

            try {
                localStorage.setItem(
                    'theme',
                    document.documentElement.classList.contains('dark') ? 'dark' : 'light'
                );
            } catch (error) {
            }

            setThemeButtonLabels();
        });
    });

    setThemeButtonLabels();
});
