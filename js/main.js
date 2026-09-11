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
        nextBtn.addEventListener('click', () => userAdvance((currentIndex + 1) % dots.length));
        prevBtn.addEventListener('click', () => userAdvance((currentIndex - 1 + dots.length) % dots.length));
        dots.forEach((dot, i) => dot.addEventListener('click', () => userAdvance(i)));

        // --- Auto-scroll ---
        const AUTOPLAY_DELAY = 6000;
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const carousel = track.closest('.relative');
        let timer = null;
        let hovered = false;
        let inView = true;
        let videoPlaying = false;

        const canPlay = () => !hovered && inView && !videoPlaying && !document.hidden;

        const start = () => {
            if (reduceMotion || timer) return;
            if (!canPlay()) return;
            timer = setInterval(() => {
                if (canPlay()) updateCarousel((currentIndex + 1) % dots.length);
            }, AUTOPLAY_DELAY);
        };
        const stop = () => {
            if (timer) { clearInterval(timer); timer = null; }
        };
        const restart = () => { stop(); start(); };

        // Manual interaction: advance now, then restart the timer from zero
        function userAdvance(index) {
            updateCarousel(index);
            restart();
        }

        if (!reduceMotion) {
            ['mouseenter', 'focusin'].forEach((evt) =>
                carousel.addEventListener(evt, () => { hovered = true; stop(); }));
            ['mouseleave', 'focusout'].forEach((evt) =>
                carousel.addEventListener(evt, () => { hovered = false; start(); }));

            document.addEventListener('visibilitychange', () => {
                if (document.hidden) stop(); else start();
            });

            track.querySelectorAll('video').forEach((video) => {
                video.addEventListener('play', () => { videoPlaying = true; stop(); });
                ['pause', 'ended'].forEach((evt) =>
                    video.addEventListener(evt, () => { videoPlaying = false; start(); }));
            });

            new IntersectionObserver((entries) => {
                inView = entries[0].isIntersecting;
                if (inView) start(); else stop();
            }, { threshold: 0.35 }).observe(carousel);

            start();
        }
    }

    // Footer year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // --- Scroll-reveal + parallax (GSAP ScrollTrigger) ---
    // Content is visible by default (no CSS pre-hiding). This only adds the
    // animation on top once GSAP has actually loaded and initialized — if the
    // CDN is slow, blocked, or errors, the page simply stays visible as-is.
    (() => {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return;

        const init = () => {
            if (!window.gsap || !window.gsap.registerPlugin || !window.ScrollTrigger) return;
            const gsap = window.gsap;
            gsap.registerPlugin(window.ScrollTrigger);

            const revealTween = (el, vars = {}) => {
                gsap.set(el, { opacity: 0, y: 40 });
                gsap.to(el, {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    ease: 'power2.out',
                    scrollTrigger: { trigger: el, start: 'top 85%', once: true },
                    ...vars,
                });
            };

            document.querySelectorAll('[data-animate="title"]').forEach((el) => revealTween(el));
            document.querySelectorAll('[data-animate="fade"]').forEach((el) => revealTween(el, { delay: 0.1 }));

            document.querySelectorAll('[data-animate="stagger"]').forEach((group) => {
                const items = group.children;
                gsap.set(items, { opacity: 0, y: 30 });
                gsap.to(items, {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: 'power2.out',
                    stagger: 0.12,
                    scrollTrigger: { trigger: group, start: 'top 85%', once: true },
                });
            });

            // Subtle parallax — element drifts slower than the scroll
            document.querySelectorAll('[data-parallax]').forEach((el) => {
                const strength = parseFloat(el.dataset.parallax) || 0.15;
                gsap.to(el, {
                    yPercent: -strength * 100,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: el.closest('section') || el,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 0.6,
                    },
                });
            });

            window.ScrollTrigger.refresh();
        };

        if (window.gsap && window.ScrollTrigger) {
            init();
        } else {
            window.addEventListener('load', init, { once: true });
        }
    })();

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
