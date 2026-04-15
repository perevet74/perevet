/* ============================================
   WebPulse — Ultra Dark Glass JS v4
   Iframe previews · Carousel · Tilt · Particles
   Cursor glow · Counter · Reveal · Nav
   ============================================ */

const PERFORMANCE_FLAGS = {
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    isTouchDevice: window.matchMedia('(hover: none), (pointer: coarse)').matches,
    isNarrowViewport: window.innerWidth <= 900,
    saveData: Boolean(navigator.connection && navigator.connection.saveData),
};

PERFORMANCE_FLAGS.reduceVisualEffects =
    PERFORMANCE_FLAGS.prefersReducedMotion ||
    PERFORMANCE_FLAGS.saveData ||
    (PERFORMANCE_FLAGS.isTouchDevice && PERFORMANCE_FLAGS.isNarrowViewport);

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.toggle('reduce-effects', PERFORMANCE_FLAGS.reduceVisualEffects);

    if (!PERFORMANCE_FLAGS.reduceVisualEffects) {
        initCursorGlow();
        initParticles();
        initParallaxOrbs();
    }
    initScrollProgress();
    initNav();
    initMobileMenu();
    initSmoothScroll();
    initRevealAnimations();
    initHeroStagger();
    initCountUp();
    initContactForm();
    initActiveNavHighlight();
    initTiltCards();
    initIframePreviews();
    initCarousel();
});

/* === Cursor Glow (smoother lerp) === */
function initCursorGlow() {
    const glow = document.getElementById('cursorGlow');
    if (!glow || window.innerWidth < 769) return;

    let mx = 0, my = 0, gx = 0, gy = 0, active = false;
    document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        if (!active) { active = true; glow.classList.add('active'); }
    });
    document.addEventListener('mouseleave', () => { active = false; glow.classList.remove('active'); });

    (function tick() {
        gx += (mx - gx) * 0.08;
        gy += (my - gy) * 0.08;
        glow.style.transform = `translate(${gx - 300}px, ${gy - 300}px)`;
        requestAnimationFrame(tick);
    })();
}

/* === Scroll Progress (rAF throttled) === */
function initScrollProgress() {
    const bar = document.getElementById('scrollProgress');
    if (!bar) return;
    let ticking = false;
    function update() {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
        ticking = false;
    }
    window.addEventListener('scroll', () => {
        if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
}

/* === Nav Scroll (smooth class toggle) === */
function initNav() {
    const header = document.getElementById('navHeader');
    if (!header) return;
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                header.classList.toggle('scrolled', window.scrollY > 50);
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

/* === Mobile Menu === */
function initMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');
    if (!toggle || !menu) return;

    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    const open = () => { toggle.classList.add('active'); menu.classList.add('active'); overlay.classList.add('active'); document.body.style.overflow = 'hidden'; };
    const close = () => { toggle.classList.remove('active'); menu.classList.remove('active'); overlay.classList.remove('active'); document.body.style.overflow = ''; };

    toggle.addEventListener('click', () => menu.classList.contains('active') ? close() : open());
    overlay.addEventListener('click', close);
    menu.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', close));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

/* === Smooth Scroll with Custom Easing === */
function initSmoothScroll() {
    if (PERFORMANCE_FLAGS.reduceVisualEffects) return;

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            const offset = 84;
            const targetY = target.getBoundingClientRect().top + window.scrollY - offset;
            smoothScrollTo(targetY, 900);
        });
    });
}

function smoothScrollTo(targetY, duration) {
    const startY = window.scrollY;
    const diff = targetY - startY;
    if (Math.abs(diff) < 2) return;
    const start = performance.now();
    function ease(t) {
        return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        window.scrollTo(0, startY + diff * ease(progress));
        if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}

/* === Reveal on Scroll with Stagger === */
function initRevealAnimations() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    const revealQueue = new Map();

    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const parent = entry.target.parentElement;
            if (!revealQueue.has(parent)) revealQueue.set(parent, []);

            const siblings = revealQueue.get(parent);
            siblings.push(entry.target);
            obs.unobserve(entry.target);

            clearTimeout(parent._revealTimer);
            parent._revealTimer = setTimeout(() => {
                const items = revealQueue.get(parent) || [];
                items.forEach((el, i) => {
                    setTimeout(() => el.classList.add('visible'), i * 80);
                });
                revealQueue.delete(parent);
            }, 60);
        });
    }, { threshold: 0.04, rootMargin: '0px 0px -30px 0px' });
    els.forEach(el => obs.observe(el));
}

/* === Hero Stagger === */
function initHeroStagger() {
    const items = document.querySelectorAll('.anim-item');
    if (PERFORMANCE_FLAGS.reduceVisualEffects) {
        items.forEach(el => el.classList.add('visible'));
        return;
    }
    items.forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), 200 + i * 140);
    });
}

/* === Counter === */
function initCountUp() {
    const nums = document.querySelectorAll('.hero-stat__num');
    if (!nums.length) return;
    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { countTo(entry.target); obs.unobserve(entry.target); }
        });
    }, { threshold: 0.5 });
    nums.forEach(el => obs.observe(el));
}

function countTo(el) {
    const target = parseInt(el.dataset.target, 10);
    if (isNaN(target)) return;
    const dur = 2200, start = performance.now();
    const ease = t => 1 - Math.pow(1 - t, 4);
    (function tick(now) {
        const p = Math.min((now - start) / dur, 1);
        el.textContent = Math.floor(ease(p) * target);
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = target;
    })(performance.now());
}

/* === Contact Form === */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    form.addEventListener('submit', e => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        btn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
        btn.disabled = true;
        btn.style.opacity = '.7';
        setTimeout(() => {
            form.innerHTML = '<div class="form-success"><i class="fas fa-check-circle"></i><h3>Message Sent!</h3><p>Thank you for reaching out. I\'ll get back to you within 24 hours.</p></div>';
        }, 1500);
    });
}

/* === Active Nav Highlight === */
function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-link[href^="#"]');
    if (!sections.length || !links.length) return;
    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                links.forEach(l => {
                    l.classList.remove('active');
                    if (l.getAttribute('href') === '#' + id) l.classList.add('active');
                });
            }
        });
    }, { threshold: 0.2, rootMargin: '-72px 0px -50% 0px' });
    sections.forEach(s => obs.observe(s));
}

/* === Tilt Cards (smoother) === */
function initTiltCards() {
    if (window.innerWidth < 769) return;
    document.querySelectorAll('[data-tilt]').forEach(card => {
        let tx = 0, ty = 0, cx = 0, cy = 0, rafId = null;

        function lerp() {
            cx += (tx - cx) * 0.12;
            cy += (ty - cy) * 0.12;
            card.style.transform = `perspective(1200px) rotateY(${cx}deg) rotateX(${cy}deg) translateY(-4px)`;
            if (Math.abs(tx - cx) > 0.01 || Math.abs(ty - cy) > 0.01) {
                rafId = requestAnimationFrame(lerp);
            }
        }

        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            tx = ((e.clientX - r.left) / r.width - 0.5) * 6;
            ty = -((e.clientY - r.top) / r.height - 0.5) * 6;
            if (!rafId) rafId = requestAnimationFrame(lerp);
        });
        card.addEventListener('mouseleave', () => {
            tx = 0; ty = 0;
            if (!rafId) rafId = requestAnimationFrame(lerp);
            setTimeout(() => { cancelAnimationFrame(rafId); rafId = null; card.style.transform = ''; }, 600);
        });
    });
}

/* === Particles === */
function initParticles() {
    if (PERFORMANCE_FLAGS.reduceVisualEffects) return;

    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h;
    const particles = [];
    const count = window.innerWidth < 769 ? 16 : Math.min(32, Math.floor(window.innerWidth / 42));

    function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
    function create() {
        return { x: Math.random() * w, y: Math.random() * h, size: Math.random() * 1.5 + .5, sx: (Math.random() - .5) * .25, sy: (Math.random() - .5) * .25, o: Math.random() * .25 + .08 };
    }
    function init() { resize(); particles.length = 0; for (let i = 0; i < count; i++) particles.push(create()); }

    function animate() {
        ctx.clearRect(0, 0, w, h);
        for (const p of particles) {
            p.x += p.sx; p.y += p.sy;
            if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
            if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(29,78,216,${p.o})`;
            ctx.fill();
        }
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < 140) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(6,182,212,${.05 * (1 - d / 140)})`;
                    ctx.lineWidth = .5;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }

    init(); animate();
    window.addEventListener('resize', init);
}

/* === Inline Iframe Previews === */
function initIframePreviews() {
    let activeWrap = null;

    document.querySelectorAll('.project__iframe-wrap iframe').forEach(iframe => {
        iframe.addEventListener('load', () => {
            iframe.closest('.project__iframe-wrap')?.classList.add('loaded');
        }, { once: true });
    });

    document.querySelectorAll('.btn--preview').forEach(btn => {
        btn.addEventListener('click', () => togglePreview(btn));
    });

    document.querySelectorAll('.project__thumb[data-preview]').forEach(thumb => {
        thumb.addEventListener('click', () => {
            const project = thumb.closest('.project');
            const btn = project.querySelector('.btn--preview');
            if (btn) togglePreview(btn);
        });
    });

    function togglePreview(btn) {
        const project = btn.closest('.project');
        const wrap = project.querySelector('.project__iframe-wrap');
        if (!wrap) return;

        if (wrap === activeWrap) {
            collapsePreview(wrap, btn);
            activeWrap = null;
            return;
        }

        if (activeWrap) {
            const prevBtn = activeWrap.closest('.project')?.querySelector('.btn--preview');
            collapsePreview(activeWrap, prevBtn);
        }

        expandPreview(wrap, btn);
        activeWrap = wrap;
    }

    function expandPreview(wrap, btn) {
        wrap.classList.add('open');
        if (btn) btn.classList.add('active');

        const iframe = wrap.querySelector('iframe');
        if (iframe) {
            if (!iframe.src && iframe.dataset.src) {
                iframe.src = iframe.dataset.src;
            }
            if (!wrap.classList.contains('loaded')) {
                if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
                    wrap.classList.add('loaded');
                } else {
                    iframe.addEventListener('load', () => wrap.classList.add('loaded'), { once: true });
                }
            }
        }

        setTimeout(() => {
            wrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 150);
    }

    function collapsePreview(wrap, btn) {
        wrap.classList.remove('open');
        if (btn) btn.classList.remove('active');
    }
}

/* === Testimonial Carousel === */
function initCarousel() {
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    if (!track || !prevBtn || !nextBtn) return;

    const cards = track.querySelectorAll('.testi-card');
    if (cards.length < 2) return;

    let index = 0;
    let autoSlideId = null;
    const getStep = () => {
        const card = cards[0];
        const gap = parseFloat(getComputedStyle(track).gap) || 20;
        return card.offsetWidth + gap;
    };

    function slide() {
        if (window.innerWidth <= 768) {
            const step = cards[0].offsetWidth + (parseFloat(getComputedStyle(track).gap) || 0);
            track.scrollTo({ left: index * step, behavior: 'smooth' });
            return;
        }
        const step = getStep();
        const visibleCards = Math.max(1, Math.floor(track.parentElement.offsetWidth / step));
        const maxIndex = Math.max(0, cards.length - visibleCards);
        index = Math.max(0, Math.min(index, maxIndex));
        track.style.transform = `translateX(-${index * step}px)`;
    }

    function nextSlide() {
        if (window.innerWidth <= 768) {
            index = (index + 1) % cards.length;
            slide();
            return;
        }

        const step = getStep();
        const visibleCards = Math.max(1, Math.floor(track.parentElement.offsetWidth / step));
        const maxIndex = Math.max(0, cards.length - visibleCards);
        index = index >= maxIndex ? 0 : index + 1;
        slide();
    }

    function prevSlide() {
        if (window.innerWidth <= 768) {
            index = index <= 0 ? cards.length - 1 : index - 1;
            slide();
            return;
        }

        const step = getStep();
        const visibleCards = Math.max(1, Math.floor(track.parentElement.offsetWidth / step));
        const maxIndex = Math.max(0, cards.length - visibleCards);
        index = index <= 0 ? maxIndex : index - 1;
        slide();
    }

    function stopAutoSlide() {
        if (autoSlideId) clearInterval(autoSlideId);
    }

    function startAutoSlide() {
        stopAutoSlide();
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        autoSlideId = window.setInterval(nextSlide, 4200);
    }

    prevBtn.addEventListener('click', () => { prevSlide(); startAutoSlide(); });
    nextBtn.addEventListener('click', () => { nextSlide(); startAutoSlide(); });

    ['mouseenter', 'focusin', 'touchstart'].forEach(eventName => {
        track.addEventListener(eventName, stopAutoSlide, { passive: true });
    });
    ['mouseleave', 'focusout', 'touchend'].forEach(eventName => {
        track.addEventListener(eventName, startAutoSlide, { passive: true });
    });

    window.addEventListener('resize', () => {
        index = 0;
        track.style.transform = '';
        slide();
        startAutoSlide();
    });

    slide();
    startAutoSlide();
}

/* === Parallax Orbs on Scroll === */
function initParallaxOrbs() {
    const orbs = document.querySelectorAll('.orb');
    if (!orbs.length || window.innerWidth < 769) return;
    const speeds = [0.03, -0.02, 0.015];
    let sy = 0, cy = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
        sy = window.scrollY;
        if (!ticking) {
            requestAnimationFrame(updateOrbs);
            ticking = true;
        }
    }, { passive: true });

    function updateOrbs() {
        cy += (sy - cy) * 0.1;
        orbs.forEach((orb, i) => {
            const speed = speeds[i] || 0.02;
            orb.style.transform = `translateY(${cy * speed * 100}px)`;
        });
        ticking = false;
        if (Math.abs(sy - cy) > 0.5) {
            requestAnimationFrame(updateOrbs);
            ticking = true;
        }
    }
}
