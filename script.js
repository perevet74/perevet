/* ============================================
   WebPulse — Ultra Modern JS v3
   Particles · Tilt · Smooth reveal · Orbit
   Counter · Marquee · Cursor glow · Nav
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
    initTiltCards();
    initParticles();
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

    const themes = ['system','light','dark','midnight','ocean','forest','sunset','rose','lavender','terminal'];
    const themeSwatches = {
        system:null, light:'#ffffff', dark:'#0a0a1a', midnight:'#0c0a1d',
        ocean:'#0c4a6e', forest:'#14532d', sunset:'#7c2d12',
        rose:'#831843', lavender:'#4c1d95', terminal:'#052e16'
    };

    function getStored() {
        try { const s = localStorage.getItem(STORAGE_KEY); return themes.includes(s) ? s : 'system'; }
        catch (_) { return 'system'; }
    }

    function getResolvedTheme() {
        const stored = getStored();
        if (stored !== 'system') return stored;
        return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function updateSwatch(preference) {
        if (!swatchEl) return;
        if (preference === 'system') {
            swatchEl.style.background = 'linear-gradient(90deg,#fff 50%,#0a0a1a 50%)';
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
        const active = options.querySelector('.color-mode-option.active');
        (active || options.querySelector('.color-mode-option'))?.focus();
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

    applyTheme(getStored());

    matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (getStored() === 'system') applyTheme('system');
    });

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        panel.classList.contains('open') ? closePanel() : openPanel();
    });

    options.querySelectorAll('.color-mode-option').forEach(opt => {
        opt.addEventListener('click', () => selectTheme(opt.dataset.theme));
        opt.addEventListener('keydown', (e) => {
            const opts = Array.from(options.querySelectorAll('.color-mode-option'));
            const idx = opts.indexOf(opt);
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); opts[(idx + 1) % opts.length].focus(); }
            else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); opts[(idx - 1 + opts.length) % opts.length].focus(); }
            else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectTheme(opt.dataset.theme); }
        });
    });

    panel.addEventListener('keydown', (e) => { if (e.key === 'Escape') { e.preventDefault(); closePanel(); } });
    document.addEventListener('click', (e) => {
        if (panel.classList.contains('open') && !panel.contains(e.target) && !btn.contains(e.target)) closePanel();
    });
}

/* === Cursor Glow === */
function initCursorGlow() {
    const glow = document.getElementById('cursorGlow');
    if (!glow || window.innerWidth < 769) return;

    let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0, active = false;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX; mouseY = e.clientY;
        if (!active) { active = true; glow.classList.add('active'); }
    });
    document.addEventListener('mouseleave', () => { active = false; glow.classList.remove('active'); });

    (function animate() {
        glowX += (mouseX - glowX) * 0.06;
        glowY += (mouseY - glowY) * 0.06;
        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';
        requestAnimationFrame(animate);
    })();
}

/* === Scroll Progress === */
function initScrollProgress() {
    const bar = document.getElementById('scrollProgress');
    if (!bar) return;
    function update() {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
}

/* === Nav Scroll === */
function initNav() {
    const header = document.getElementById('navHeader');
    if (!header) return;
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
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

    function open() { toggle.classList.add('active'); menu.classList.add('active'); overlay.classList.add('active'); document.body.style.overflow = 'hidden'; }
    function close() { toggle.classList.remove('active'); menu.classList.remove('active'); overlay.classList.remove('active'); document.body.style.overflow = ''; }

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
                window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
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
    }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => observer.observe(el));
}

/* === Hero Stagger === */
function initHeroAnimations() {
    const selectors = ['.hero-badge', '.hero-title', '.hero-subtitle', '.hero-actions', '.hero-metrics', '.hero-visual'];
    selectors.forEach((sel, i) => {
        const el = document.querySelector(sel);
        if (!el) return;
        setTimeout(() => el.classList.add('visible'), 200 + i * 150);
    });
}

/* === Counter Animation === */
function initCountUp() {
    const counters = document.querySelectorAll('.hero-metric__num');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { animateCounter(entry.target); observer.unobserve(entry.target); }
        });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    if (isNaN(target)) return;
    const duration = 2200, start = performance.now();
    const ease = t => 1 - Math.pow(1 - t, 4);

    (function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        el.textContent = Math.floor(ease(progress) * target);
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target;
    })(performance.now());
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

/* === Active Nav Highlight === */
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
    }, { threshold: 0.2, rootMargin: '-72px 0px -50% 0px' });

    sections.forEach(s => observer.observe(s));
}

/* === Tilt Cards === */
function initTiltCards() {
    if (window.innerWidth < 769) return;

    document.querySelectorAll('[data-tilt]').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'transform 0.5s cubic-bezier(.16,1,.3,1)';
            setTimeout(() => { card.style.transition = ''; }, 500);
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    });
}

/* === Floating Particles === */
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let w, h;
    const particles = [];
    const count = Math.min(50, Math.floor(window.innerWidth / 30));

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }

    function createParticle() {
        return {
            x: Math.random() * w,
            y: Math.random() * h,
            size: Math.random() * 2 + 0.5,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: (Math.random() - 0.5) * 0.3,
            opacity: Math.random() * 0.3 + 0.1,
        };
    }

    function init() {
        resize();
        particles.length = 0;
        for (let i = 0; i < count; i++) particles.push(createParticle());
    }

    function animate() {
        ctx.clearRect(0, 0, w, h);

        const style = getComputedStyle(document.documentElement);
        const accent = style.getPropertyValue('--accent').trim() || '#6366f1';

        const r = parseInt(accent.slice(1, 3), 16) || 99;
        const g = parseInt(accent.slice(3, 5), 16) || 102;
        const b = parseInt(accent.slice(5, 7), 16) || 241;

        for (const p of particles) {
            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x < 0) p.x = w;
            if (p.x > w) p.x = 0;
            if (p.y < 0) p.y = h;
            if (p.y > h) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r},${g},${b},${p.opacity})`;
            ctx.fill();
        }

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(${r},${g},${b},${0.05 * (1 - dist / 150)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    init();
    animate();
    window.addEventListener('resize', init);
}
