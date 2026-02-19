/* ============================================
   WebPulse — Premium JS v2
   Cursor glow · Scroll progress · Counters
   Reveal · Hero stagger · Nav · Mobile menu
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initCursorGlow();
    initScrollProgress();
    initNav();
    initMobileMenu();
    initSmoothScroll();
    initRevealAnimations();
    initHeroAnimations();
    initCountUp();
    initContactForm();
    initActiveNavHighlight();
    initMagneticButtons();
    initColorMode();
});

/* === Color Mode Picker === */
function initColorMode() {
    const STORAGE_KEY = 'webpulse-theme';
    const btn = document.getElementById('colorModeBtn');
    const panel = document.getElementById('colorModePanel');
    const options = document.getElementById('colorModeOptions');
    const swatchEl = document.getElementById('colorModeSwatch');
    if (!btn || !panel || !options) return;

    const themes = ['system', 'light', 'dark', 'midnight', 'ocean', 'forest', 'sunset', 'rose', 'lavender', 'terminal'];
    const themeSwatches = {
        system: null,
        light: '#ffffff',
        dark: '#0f172a',
        midnight: '#0c0a1d',
        ocean: '#0c4a6e',
        forest: '#14532d',
        sunset: '#7c2d12',
        rose: '#831843',
        lavender: '#4c1d95',
        terminal: '#052e16'
    };

    function getStored() {
        try {
            const s = localStorage.getItem(STORAGE_KEY);
            return themes.includes(s) ? s : 'system';
        } catch (_) { return 'system'; }
    }

    function getResolvedTheme() {
        const stored = getStored();
        if (stored !== 'system') return stored;
        return typeof matchMedia !== 'undefined' && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function updateSwatch(preference) {
        if (!swatchEl) return;
        if (preference === 'system') {
            swatchEl.style.background = 'linear-gradient(90deg,#fff 50%,#0f172a 50%)';
            swatchEl.style.borderColor = 'var(--border)';
            return;
        }
        const color = themeSwatches[preference] || themeSwatches.light;
        swatchEl.style.background = color;
        swatchEl.style.borderColor = preference === 'light' ? '#e2e8f0' : color;
    }

    function applyTheme(preference) {
        const resolved = preference === 'system' ? getResolvedTheme() : preference;
        document.documentElement.setAttribute('data-theme', resolved === 'light' ? '' : resolved);
        options.querySelectorAll('.color-mode-option').forEach(opt => {
            opt.classList.toggle('active', opt.dataset.theme === preference);
        });
        updateSwatch(preference);
    }

    function openPanel() {
        panel.classList.add('open');
        panel.setAttribute('aria-hidden', 'false');
        btn.setAttribute('aria-expanded', 'true');
        const opts = options.querySelectorAll('.color-mode-option');
        const active = options.querySelector('.color-mode-option.active');
        (active || opts[0])?.focus();
    }

    function closePanel() {
        panel.classList.remove('open');
        panel.setAttribute('aria-hidden', 'true');
        btn.setAttribute('aria-expanded', 'false');
        btn.focus({ preventScroll: true });
    }

    function selectTheme(theme) {
        applyTheme(theme);
        try { localStorage.setItem(STORAGE_KEY, theme); } catch (_) {}
        closePanel();
    }

    // Apply saved preference on load (inline script already set initial; we sync UI and listen for system)
    const initial = getStored();
    applyTheme(initial);

    matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (getStored() === 'system') applyTheme('system');
    });

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (panel.classList.contains('open')) closePanel();
        else openPanel();
    });

    options.querySelectorAll('.color-mode-option').forEach((opt, i) => {
        opt.addEventListener('click', () => selectTheme(opt.dataset.theme));

        opt.addEventListener('keydown', (e) => {
            const opts = Array.from(options.querySelectorAll('.color-mode-option'));
            const idx = opts.indexOf(opt);
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                e.preventDefault();
                opts[(idx + 1) % opts.length].focus();
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                e.preventDefault();
                opts[(idx - 1 + opts.length) % opts.length].focus();
            } else if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selectTheme(opt.dataset.theme);
            } else if (e.key === 'Home') {
                e.preventDefault();
                opts[0].focus();
            } else if (e.key === 'End') {
                e.preventDefault();
                opts[opts.length - 1].focus();
            }
        });
    });

    panel.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            e.preventDefault();
            closePanel();
        }
    });

    document.addEventListener('click', (e) => {
        if (panel.classList.contains('open') && !panel.contains(e.target) && !btn.contains(e.target)) {
            closePanel();
        }
    });
}

/* === Cursor Glow (desktop only) === */
function initCursorGlow() {
    const glow = document.getElementById('cursorGlow');
    if (!glow || window.innerWidth < 769) return;

    let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;
    let active = false;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (!active) {
            active = true;
            glow.classList.add('active');
        }
    });

    document.addEventListener('mouseleave', () => {
        active = false;
        glow.classList.remove('active');
    });

    function animate() {
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';
        requestAnimationFrame(animate);
    }
    animate();
}

/* === Scroll Progress Bar === */
function initScrollProgress() {
    const bar = document.getElementById('scrollProgress');
    if (!bar) return;

    function update() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = progress + '%';
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
}

/* === Navigation Scroll Effect === */
function initNav() {
    const header = document.getElementById('navHeader');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
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

    function open() {
        toggle.classList.add('active');
        menu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function close() {
        toggle.classList.remove('active');
        menu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    toggle.addEventListener('click', () => menu.classList.contains('active') ? close() : open());
    overlay.addEventListener('click', close);
    menu.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', close));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
}

/* === Smooth Scroll === */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const top = target.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
}

/* === Reveal on Scroll === */
function initRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    reveals.forEach(el => observer.observe(el));
}

/* === Hero Staggered Entrance === */
function initHeroAnimations() {
    const selectors = ['.hero-badge', '.hero-title', '.hero-subtitle', '.hero-actions', '.hero-metrics'];
    selectors.forEach((sel, i) => {
        const el = document.querySelector(sel);
        if (!el) return;
        setTimeout(() => el.classList.add('visible'), 150 + i * 120);
    });
}

/* === Counter Animation === */
function initCountUp() {
    const counters = document.querySelectorAll('.hero-metric__num');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    if (isNaN(target)) return;

    const duration = 2200;
    const start = performance.now();
    const ease = t => 1 - Math.pow(1 - t, 4);

    function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        el.textContent = Math.floor(ease(progress) * target);
        if (progress < 1) {
            requestAnimationFrame(tick);
        } else {
            el.textContent = target;
        }
    }

    requestAnimationFrame(tick);
}

/* === Contact Form === */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        btn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
        btn.disabled = true;
        btn.style.opacity = '0.7';

        setTimeout(() => {
            form.innerHTML = `
                <div class="form-success">
                    <i class="fas fa-check-circle"></i>
                    <h3>Message Sent!</h3>
                    <p>Thank you for reaching out. I'll get back to you within 24 hours.</p>
                </div>
            `;
        }, 1500);
    });
}

/* === Active Nav Highlighting === */
function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-link[href^="#"]');
    if (!sections.length || !links.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                links.forEach(l => {
                    l.classList.remove('active');
                    if (l.getAttribute('href') === `#${id}`) l.classList.add('active');
                });
            }
        });
    }, { threshold: 0.25, rootMargin: '-72px 0px -50% 0px' });

    sections.forEach(s => observer.observe(s));
}

/* === Magnetic Buttons === */
function initMagneticButtons() {
    if (window.innerWidth < 769) return;

    document.querySelectorAll('.btn--primary, .nav-link--cta').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}
