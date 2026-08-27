document.addEventListener('DOMContentLoaded', () => {
    // Scroll-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-up').forEach((el) => observer.observe(el));

    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', String(isOpen));
        });
        mobileMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Portfolio carousel
    const track = document.getElementById('carousel-track');
    const dots = document.querySelectorAll('#carousel-dots button');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentIndex = 0;

    const updateCarousel = (index) => {
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((dot, i) => {
            dot.classList.toggle('bg-primary', i === index);
            dot.classList.toggle('bg-outline-variant/50', i !== index);
        });
        currentIndex = index;
    };

    if (track && dots.length) {
        nextBtn.addEventListener('click', () => updateCarousel((currentIndex + 1) % dots.length));
        prevBtn.addEventListener('click', () => updateCarousel((currentIndex - 1 + dots.length) % dots.length));
        dots.forEach((dot, i) => dot.addEventListener('click', () => updateCarousel(i)));
    }

    // Footer year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Contact form -> mailto (no backend required for static hosting)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            const to = contactForm.dataset.contactEmail || 'contact@example.com';
            const subject = encodeURIComponent(`Nouveau message de ${name} via le portfolio`);
            const body = encodeURIComponent(`${message}\n\n---\nEmail: ${email}`);
            window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
        });
    }
});
