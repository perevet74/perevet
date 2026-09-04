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

    initLanguage();

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

/* === Language / i18n === */
const LANG_STORAGE_KEY = 'webpulse-lang';
const LANG_CODES = { pcm: 'PCM', en: 'EN', fr: 'FR' };

const TRANSLATIONS = {
    en: {
        'nav.about': 'About',
        'nav.expertise': 'Expertise',
        'nav.portfolio': 'Portfolio',
        'nav.services': 'Services',
        'nav.reviews': 'Reviews',
        'nav.cta': "Let's Talk",
        'nav.status': 'Available for projects',
        'hero.kicker': 'Product-minded projects for ambitious brands',
        'hero.badge': '✦ Full-Stack Developer & Solutions Architect',
        'hero.title1': 'I craft digital',
        'hero.title2': 'experiences',
        'hero.title3': 'that captivate',
        'hero.sub': 'Full-Stack Developer & Solutions specializing in Web Applications, trading platforms, e-commerce, and SaaS — from concept to deployment.',
        'hero.proof1Label': 'Fast delivery',
        'hero.proof1Strong': 'Clear milestones from kickoff to launch',
        'hero.proof2Label': 'Built for growth',
        'hero.proof2Strong': 'Performance, security, and SEO included',
        'hero.explore': 'Explore My Work',
        'hero.start': 'Start a Project',
        'hero.statProjects': 'Projects',
        'hero.statClients': 'Clients',
        'hero.statScripts': 'Scripts',
        'hero.statYears': 'Years',
        'about.label': 'About Me',
        'about.heading': 'Complex problems,<br><span class="gradient-text">elegant solutions.</span>',
        'about.lead': "I'm a Full-Stack Developer based in Cameroon with 4+ years building production-grade software for fintech, crypto, forex, e-commerce, and enterprise clients across Africa and beyond.",
        'about.body': 'With 50+ delivered projects and 22+ premium scripts, I ship clean, scalable code that performs. Every project includes responsive design, SEO, secure auth, admin panels, and full documentation.',
        'about.openWork': 'Open to Work',
        'expertise.label': 'What I Do',
        'expertise.heading': 'Areas of <span class="gradient-text">Expertise</span>',
        'portfolio.label': 'Selected Work',
        'portfolio.heading': 'Featured <span class="gradient-text">Projects</span>',
        'portfolio.sub': 'Click "Live Preview" to see a live homepage preview of each project.',
        'services.label': 'Services',
        'services.heading': 'What I <span class="gradient-text">Offer</span>',
        'services.sub': 'Flexible collaboration for new products, high-stakes rebuilds, and technical rescue work.',
        'reviews.label': 'Reviews',
        'reviews.heading': 'What <span class="gradient-text">Clients Say</span>',
        'contact.label': 'Get In Touch',
        'contact.heading': 'Let\'s build something<br><span class="gradient-text">great together.</span>',
        'contact.sub': "Have a project in mind? Reach out and I'll respond within a few hours with a free consultation.",
        'footer.tagline': 'Crafting digital excellence since 2021',
        'footer.contact': 'Contact',
        'footer.copyright': '© 2026 WebPulse. Crafted with precision.',
        'reviewBtn': 'Leave a Review',
        'lang.title': 'Choose Your Language',
        'lang.sub': "Select the language you'd like to browse in",
        'page.title': 'My Portfolio | Full-Stack Developer & Digital Solutions',
        'cat.fintech': 'Fintech',
        'cat.trading': 'Trading',
        'cat.ecommerce': 'E-Commerce',
        'cat.logistics': 'Logistics',
        'panel.eyebrow': 'Current Focus',
        'panel.title': 'Shipping platforms people trust',
        'panel.availability': 'Open for select 2026 builds',
        'panel.flagshipLabel': 'Flagship work',
        'panel.flagshipText': 'Banking, trading, logistics, and custom SaaS systems.',
        'panel.deliveryLabel': 'Delivery style',
        'panel.deliveryText': 'Clean architecture, sharp UI, and launch-ready documentation.',
        'panel.signal1': 'Typical first response',
        'panel.signal2Value': 'End-to-end',
        'panel.signal2': 'Design, build, optimize, deploy',
        'about.chipLocation': 'Cameroon',
        'about.chipYears': '4+ Years Experience',
        'about.chipLangs': 'EN / FR',
        'about.approachLabel': 'Approach',
        'about.approachText': 'Strategy first, code second',
        'about.promiseLabel': 'Promise',
        'about.promiseText': 'Thoughtful UX with maintainable systems',
        'about.stackTitle': 'Tech Stack',
        'exp1.title': 'Fintech & Banking',
        'exp1.desc': 'Full-stack banking platforms with crypto wallets, multi-currency accounts, KYC verification, and real-time reporting dashboards.',
        'exp1.tag1': 'Payment Systems',
        'exp1.tag2': 'Crypto',
        'exp1.tag3': 'KYC/AML',
        'exp2.title': 'Trading Platforms',
        'exp2.desc': 'Forex & crypto trading with TradingView charts, automated signals, copy trading, and risk analytics dashboards.',
        'exp2.tag1': 'Forex',
        'exp2.tag2': 'Copy Trading',
        'exp2.tag3': 'Signals',
        'exp3.title': 'E-Commerce',
        'exp3.desc': 'Modern online stores with Stripe, PayPal, mobile money integration, inventory management, and mobile-first design.',
        'exp3.tag2': 'Payments',
        'exp3.tag3': 'Mobile-First',
        'exp4.title': 'Logistics & Shipping',
        'exp4.desc': 'End-to-end logistics with GPS tracking, route optimization, fleet management, and automated delivery notifications.',
        'exp4.tag1': 'Tracking',
        'exp4.tag2': 'Fleet Mgmt',
        'exp4.tag3': 'Automation',
        'exp5.title': 'Blockchain & Web3',
        'exp5.desc': 'Multi-chain wallet integrations, smart contract interfaces, DeFi platforms, and token dashboards with intuitive UX.',
        'exp5.tag1': 'Smart Contracts',
        'exp5.tag3': 'Wallets',
        'exp6.title': 'Custom Development',
        'exp6.desc': 'Bespoke SaaS platforms, CMS, admin panels, REST APIs, and enterprise solutions with clean architecture.',
        'exp6.tag3': 'Enterprise',
        'portfolio.intro1Label': 'Outcome-driven',
        'portfolio.intro1Text': 'Each build is designed to convert, scale, and stay easy to manage.',
        'portfolio.intro2Label': 'What you will notice',
        'portfolio.intro2Text': 'Clear interfaces, strong architecture, and business-focused features.',
        'proj1.title': 'Banking with Crypto Integration',
        'proj1.desc': 'Digital banking platform with crypto wallets, multi-currency accounts, P2P transfers, KYC verification, and admin panel.',
        'proj1.hl1': 'Crypto wallets',
        'proj1.hl2': 'Multi-currency accounts',
        'proj1.hl3': 'KYC dashboard',
        'proj2.title': 'Forex Trading Platform',
        'proj2.desc': 'Professional forex trading with TradingView charts, automated signals, copy trading, and risk management dashboard.',
        'proj2.tech4': 'Charts',
        'proj2.hl1': 'Signal automation',
        'proj2.hl2': 'Copy trading',
        'proj2.hl3': 'Risk controls',
        'proj3.title': 'E-Commerce Platform',
        'proj3.desc': 'Full online store with smart search, multi-gateway payments, abandoned cart recovery, and powerful admin dashboard.',
        'proj3.hl1': 'Smart search',
        'proj3.hl2': 'Checkout flows',
        'proj3.hl3': 'Admin analytics',
        'proj4.title': 'Fintech Mobile Banking',
        'proj4.desc': 'Mobile-first banking with instant transfers, bill payments, biometric login, and transaction notifications.',
        'proj4.tech2': 'Mobile-First',
        'proj4.tech3': 'Auth',
        'proj4.hl1': 'Mobile-first UX',
        'proj4.hl2': 'Biometric login',
        'proj4.hl3': 'Fast transfers',
        'proj5.title': 'Shipping & Logistics Suite',
        'proj5.desc': 'Complete logistics with GPS tracking, route optimization, driver management, and real-time delivery notifications.',
        'proj5.hl1': 'Live tracking',
        'proj5.hl2': 'Route planning',
        'proj5.hl3': 'Fleet operations',
        'proj6.title': 'AI Content Detection Website',
        'proj6.desc': 'AI-powered content authenticity platform to detect AI-generated text, review confidence scores, and support quick verification workflows.',
        'proj6.tech3': 'Web App',
        'proj6.tech4': 'Analytics',
        'proj6.hl1': 'AI detection',
        'proj6.hl2': 'Confidence scoring',
        'proj6.hl3': 'Fast verification',
        'btn.livePreview': 'Live Preview',
        'btn.visitSite': 'Visit Live Site',
        'btn.preview': 'Preview',
        'btn.newTab': 'Open in new tab',
        'btn.loading': 'Loading preview...',
        'btn.comingSoon': 'Coming Soon',
        'btn.demoSoon': 'Demo Coming Soon',
        'svc.from': 'From',
        'svc.popular': 'Most Popular',
        'svc1.title': 'Full Website Development',
        'svc1.desc': 'Complete professional websites from scratch — responsive, SEO-optimized, fast, and fully deployed.',
        'svc1.f1': 'Modern responsive design',
        'svc1.f2': 'SEO & analytics setup',
        'svc1.f3': 'Post-launch support',
        'svc1.cta': 'Discuss Project',
        'svc2.title': 'Code Fixing & Optimization',
        'svc2.desc': 'Debugging, performance, security, mobile fixes, and complete code cleanup for any stack.',
        'svc2.f1': 'Performance optimization',
        'svc2.f2': 'Security patching',
        'svc2.f3': 'Detailed fix report',
        'svc2.cta': 'Get Help',
        'svc3.title': 'AI Website Building Course',
        'svc3.badge': 'Lifetime Access',
        'svc3.desc': 'Build professional websites from zero using AI tools — no coding experience needed.',
        'svc3.f1': 'Zero to production',
        'svc3.f2': 'Project templates',
        'svc3.f3': 'Private community',
        'svc3.cta': 'Enroll Now',
        'testi1.quote': '"Amazing work! Set up my banking site in a short time frame. Clean code, excellent documentation, and outstanding support."',
        'testi1.role': 'Fintech Startup, Douala',
        'testi2.quote': '"The trading platform exceeded our expectations. Professional scripts with excellent support. Highly recommended."',
        'testi2.role': 'Trading Firm, Yaoundé',
        'testi3.quote': '"Best investment for my web dev business. The code quality is exceptional and clients love the end result."',
        'testi3.role': 'Agency Owner, Bamenda',
        'testi4.quote': '"The e-commerce solution handles thousands of orders daily without issues. Clean code, easy to customize."',
        'testi4.role': 'E-Commerce, Buea',
        'proof.projects': '50+ Projects Delivered',
        'proof.clients': '30+ Happy Clients',
        'proof.rating': '4.9/5 Average Rating',
        'contact.bestForLabel': 'Best for',
        'contact.bestForText': 'Startup launches, redesigns, platform upgrades, bug rescue, and custom software delivery.',
        'form.name': 'Name',
        'form.namePlaceholder': 'Your name',
        'form.email': 'Email',
        'form.subject': 'Subject',
        'form.subjectPlaceholder': 'Project inquiry',
        'form.message': 'Message',
        'form.messagePlaceholder': 'Tell me about your project...',
        'form.send': 'Send Message',
        'form.sending': 'Sending...',
        'form.successTitle': 'Message Sent!',
        'form.successText': "Thank you for reaching out. I'll get back to you within 24 hours.",
        'aria.menu': 'Toggle navigation',
        'aria.prev': 'Previous',
        'aria.next': 'Next',
        'aria.review': 'Leave a review by email',
        'aria.changeLang': 'Change language',
        'aria.close': 'Close',
    },
    fr: {
        'nav.about': 'À propos',
        'nav.expertise': 'Expertise',
        'nav.portfolio': 'Portfolio',
        'nav.services': 'Services',
        'nav.reviews': 'Avis',
        'nav.cta': 'Discutons',
        'nav.status': 'Disponible pour des projets',
        'hero.kicker': 'Des projets orientés produit pour des marques ambitieuses',
        'hero.badge': '✦ Développeur Full-Stack & Architecte de solutions',
        'hero.title1': 'Je crée des',
        'hero.title2': 'expériences',
        'hero.title3': 'numériques captivantes',
        'hero.sub': 'Développeur Full-Stack spécialisé en applications web, plateformes de trading, e-commerce et SaaS — de la conception au déploiement.',
        'hero.proof1Label': 'Livraison rapide',
        'hero.proof1Strong': 'Jalons clairs du lancement à la mise en ligne',
        'hero.proof2Label': 'Conçu pour grandir',
        'hero.proof2Strong': 'Performance, sécurité et SEO inclus',
        'hero.explore': 'Voir mes projets',
        'hero.start': 'Démarrer un projet',
        'hero.statProjects': 'Projets',
        'hero.statClients': 'Clients',
        'hero.statScripts': 'Scripts',
        'hero.statYears': 'Années',
        'about.label': 'À propos de moi',
        'about.heading': 'Problèmes complexes,<br><span class="gradient-text">solutions élégantes.</span>',
        'about.lead': 'Je suis développeur Full-Stack basé au Cameroun avec plus de 4 ans d\'expérience dans la création de logiciels de production pour la fintech, la crypto, le forex, l\'e-commerce et les entreprises en Afrique et au-delà.',
        'about.body': 'Avec plus de 50 projets livrés et 22+ scripts premium, je livre un code propre et évolutif. Chaque projet inclut un design responsive, le SEO, une authentification sécurisée, des panneaux admin et une documentation complète.',
        'about.openWork': 'Disponible',
        'expertise.label': 'Ce que je fais',
        'expertise.heading': 'Domaines d\'<span class="gradient-text">expertise</span>',
        'portfolio.label': 'Travaux sélectionnés',
        'portfolio.heading': 'Projets <span class="gradient-text">en vedette</span>',
        'portfolio.sub': 'Cliquez sur « Aperçu en direct » pour voir la page d\'accueil de chaque projet.',
        'services.label': 'Services',
        'services.heading': 'Ce que je <span class="gradient-text">propose</span>',
        'services.sub': 'Collaboration flexible pour nouveaux produits, refontes importantes et sauvetage technique.',
        'reviews.label': 'Avis',
        'reviews.heading': 'Ce que disent les <span class="gradient-text">clients</span>',
        'contact.label': 'Contactez-moi',
        'contact.heading': 'Construisons quelque chose<br><span class="gradient-text">de grand ensemble.</span>',
        'contact.sub': 'Un projet en tête ? Contactez-moi et je répondrai dans quelques heures avec une consultation gratuite.',
        'footer.tagline': 'L\'excellence numérique depuis 2021',
        'footer.contact': 'Contact',
        'footer.copyright': '© 2026 WebPulse. Conçu avec précision.',
        'reviewBtn': 'Laisser un avis',
        'lang.title': 'Choisissez votre langue',
        'lang.sub': 'Sélectionnez la langue dans laquelle vous souhaitez naviguer',
        'page.title': 'Mon Portfolio | Développeur Full-Stack & Solutions Digitales',
        'cat.fintech': 'Fintech',
        'cat.trading': 'Trading',
        'cat.ecommerce': 'E-Commerce',
        'cat.logistics': 'Logistique',
        'panel.eyebrow': 'Focus actuel',
        'panel.title': 'Des plateformes fiables et durables',
        'panel.availability': 'Disponible pour quelques projets 2026',
        'panel.flagshipLabel': 'Projets phares',
        'panel.flagshipText': 'Banque, trading, logistique et systèmes SaaS personnalisés.',
        'panel.deliveryLabel': 'Style de livraison',
        'panel.deliveryText': 'Architecture propre, interface soignée et documentation prête au lancement.',
        'panel.signal1': 'Première réponse habituelle',
        'panel.signal2Value': 'De A à Z',
        'panel.signal2': 'Concevoir, développer, optimiser, déployer',
        'about.chipLocation': 'Cameroun',
        'about.chipYears': '4+ ans d\'expérience',
        'about.chipLangs': 'EN / FR',
        'about.approachLabel': 'Approche',
        'about.approachText': 'La stratégie d\'abord, le code ensuite',
        'about.promiseLabel': 'Promesse',
        'about.promiseText': 'Une UX réfléchie avec des systèmes maintenables',
        'about.stackTitle': 'Technologies',
        'exp1.title': 'Fintech & Banque',
        'exp1.desc': 'Plateformes bancaires full-stack avec portefeuilles crypto, comptes multi-devises, vérification KYC et tableaux de bord en temps réel.',
        'exp1.tag1': 'Systèmes de paiement',
        'exp1.tag2': 'Crypto',
        'exp1.tag3': 'KYC/AML',
        'exp2.title': 'Plateformes de trading',
        'exp2.desc': 'Trading forex et crypto avec graphiques TradingView, signaux automatisés, copy trading et tableaux de bord de risque.',
        'exp2.tag1': 'Forex',
        'exp2.tag2': 'Copy Trading',
        'exp2.tag3': 'Signaux',
        'exp3.title': 'E-Commerce',
        'exp3.desc': 'Boutiques en ligne modernes avec Stripe, PayPal, mobile money, gestion des stocks et design mobile-first.',
        'exp3.tag2': 'Paiements',
        'exp3.tag3': 'Mobile-First',
        'exp4.title': 'Logistique & Livraison',
        'exp4.desc': 'Logistique de bout en bout avec suivi GPS, optimisation d\'itinéraires, gestion de flotte et notifications automatiques.',
        'exp4.tag1': 'Suivi',
        'exp4.tag2': 'Gestion de flotte',
        'exp4.tag3': 'Automatisation',
        'exp5.title': 'Blockchain & Web3',
        'exp5.desc': 'Intégrations de portefeuilles multi-chaînes, interfaces de smart contracts, plateformes DeFi et tableaux de bord de tokens.',
        'exp5.tag1': 'Smart Contracts',
        'exp5.tag3': 'Portefeuilles',
        'exp6.title': 'Développement sur mesure',
        'exp6.desc': 'Plateformes SaaS personnalisées, CMS, panneaux admin, API REST et solutions d\'entreprise avec une architecture propre.',
        'exp6.tag3': 'Entreprise',
        'portfolio.intro1Label': 'Orienté résultats',
        'portfolio.intro1Text': 'Chaque projet est conçu pour convertir, évoluer et rester facile à gérer.',
        'portfolio.intro2Label': 'Ce que vous remarquerez',
        'portfolio.intro2Text': 'Des interfaces claires, une architecture solide et des fonctionnalités axées sur le business.',
        'proj1.title': 'Banque avec intégration crypto',
        'proj1.desc': 'Plateforme bancaire digitale avec portefeuilles crypto, comptes multi-devises, transferts P2P, vérification KYC et panneau admin.',
        'proj1.hl1': 'Portefeuilles crypto',
        'proj1.hl2': 'Comptes multi-devises',
        'proj1.hl3': 'Tableau de bord KYC',
        'proj2.title': 'Plateforme de trading Forex',
        'proj2.desc': 'Trading forex professionnel avec graphiques TradingView, signaux automatisés, copy trading et gestion des risques.',
        'proj2.tech4': 'Graphiques',
        'proj2.hl1': 'Signaux automatisés',
        'proj2.hl2': 'Copy trading',
        'proj2.hl3': 'Contrôle des risques',
        'proj3.title': 'Plateforme E-Commerce',
        'proj3.desc': 'Boutique en ligne complète avec recherche intelligente, paiements multi-passerelles, récupération de paniers abandonnés et tableau de bord admin.',
        'proj3.hl1': 'Recherche intelligente',
        'proj3.hl2': 'Tunnels de paiement',
        'proj3.hl3': 'Analytique admin',
        'proj4.title': 'Banque mobile Fintech',
        'proj4.desc': 'Banque mobile-first avec transferts instantanés, paiement de factures, connexion biométrique et notifications de transactions.',
        'proj4.tech2': 'Mobile-First',
        'proj4.tech3': 'Authentification',
        'proj4.hl1': 'UX mobile-first',
        'proj4.hl2': 'Connexion biométrique',
        'proj4.hl3': 'Transferts rapides',
        'proj5.title': 'Suite Logistique & Livraison',
        'proj5.desc': 'Logistique complète avec suivi GPS, optimisation d\'itinéraires, gestion des chauffeurs et notifications de livraison en temps réel.',
        'proj5.hl1': 'Suivi en direct',
        'proj5.hl2': 'Planification d\'itinéraires',
        'proj5.hl3': 'Opérations de flotte',
        'proj6.title': 'Site de détection de contenu IA',
        'proj6.desc': 'Plateforme d\'authenticité de contenu propulsée par l\'IA pour détecter les textes générés par IA, consulter les scores de confiance et vérifier rapidement.',
        'proj6.tech3': 'Application web',
        'proj6.tech4': 'Analytique',
        'proj6.hl1': 'Détection IA',
        'proj6.hl2': 'Score de confiance',
        'proj6.hl3': 'Vérification rapide',
        'btn.livePreview': 'Aperçu en direct',
        'btn.visitSite': 'Visiter le site',
        'btn.preview': 'Aperçu',
        'btn.newTab': 'Ouvrir dans un nouvel onglet',
        'btn.loading': 'Chargement de l\'aperçu...',
        'btn.comingSoon': 'Bientôt disponible',
        'btn.demoSoon': 'Démo bientôt disponible',
        'svc.from': 'À partir de',
        'svc.popular': 'Le plus demandé',
        'svc1.title': 'Développement de site complet',
        'svc1.desc': 'Sites web professionnels créés de zéro — responsives, optimisés SEO, rapides et entièrement déployés.',
        'svc1.f1': 'Design responsive moderne',
        'svc1.f2': 'Configuration SEO & analytics',
        'svc1.f3': 'Support après lancement',
        'svc1.cta': 'Discuter du projet',
        'svc2.title': 'Correction & optimisation de code',
        'svc2.desc': 'Débogage, performance, sécurité, correctifs mobiles et nettoyage complet du code, toutes technologies.',
        'svc2.f1': 'Optimisation des performances',
        'svc2.f2': 'Correctifs de sécurité',
        'svc2.f3': 'Rapport de correction détaillé',
        'svc2.cta': 'Obtenir de l\'aide',
        'svc3.title': 'Formation création de sites avec l\'IA',
        'svc3.badge': 'Accès à vie',
        'svc3.desc': 'Créez des sites professionnels à partir de zéro avec des outils IA — aucune expérience en code requise.',
        'svc3.f1': 'De zéro à la production',
        'svc3.f2': 'Modèles de projets',
        'svc3.f3': 'Communauté privée',
        'svc3.cta': 'S\'inscrire',
        'testi1.quote': '« Travail incroyable ! Mon site bancaire a été mis en place très rapidement. Code propre, excellente documentation et support exceptionnel. »',
        'testi1.role': 'Startup Fintech, Douala',
        'testi2.quote': '« La plateforme de trading a dépassé nos attentes. Des scripts professionnels avec un excellent support. Vivement recommandé. »',
        'testi2.role': 'Société de trading, Yaoundé',
        'testi3.quote': '« Le meilleur investissement pour mon activité de développement web. La qualité du code est exceptionnelle et les clients adorent le résultat. »',
        'testi3.role': 'Propriétaire d\'agence, Bamenda',
        'testi4.quote': '« La solution e-commerce gère des milliers de commandes par jour sans problème. Code propre et facile à personnaliser. »',
        'testi4.role': 'E-Commerce, Buea',
        'proof.projects': '50+ projets livrés',
        'proof.clients': '30+ clients satisfaits',
        'proof.rating': 'Note moyenne 4,9/5',
        'contact.bestForLabel': 'Idéal pour',
        'contact.bestForText': 'Lancements de startups, refontes, mises à niveau de plateformes, correction de bugs et logiciels sur mesure.',
        'form.name': 'Nom',
        'form.namePlaceholder': 'Votre nom',
        'form.email': 'E-mail',
        'form.subject': 'Sujet',
        'form.subjectPlaceholder': 'Demande de projet',
        'form.message': 'Message',
        'form.messagePlaceholder': 'Parlez-moi de votre projet...',
        'form.send': 'Envoyer le message',
        'form.sending': 'Envoi en cours...',
        'form.successTitle': 'Message envoyé !',
        'form.successText': 'Merci de m\'avoir contacté. Je vous répondrai dans les 24 heures.',
        'aria.menu': 'Afficher le menu',
        'aria.prev': 'Précédent',
        'aria.next': 'Suivant',
        'aria.review': 'Laisser un avis par e-mail',
        'aria.changeLang': 'Changer de langue',
        'aria.close': 'Fermer',
    },
    pcm: {
        'nav.about': 'About Me',
        'nav.expertise': 'Wetin I Sabi Do',
        'nav.portfolio': 'My Work Dem',
        'nav.services': 'Services',
        'nav.reviews': 'Client Talk',
        'nav.cta': 'Make We Talk',
        'nav.status': 'I dey available for project dem',
        'hero.kicker': 'Product-minded project dem for big brand dem',
        'hero.badge': '✦ Full-Stack Developer & Solutions Architect',
        'hero.title1': 'I dey build digital',
        'hero.title2': 'experience dem',
        'hero.title3': 'wey go catch people',
        'hero.sub': 'Full-Stack Developer wey sabi Web Applications, trading platform dem, e-commerce, and SaaS — from idea go reach launch.',
        'hero.proof1Label': 'Fast delivery',
        'hero.proof1Strong': 'Clear milestone from start go reach launch',
        'hero.proof2Label': 'Build for grow',
        'hero.proof2Strong': 'Performance, security, and SEO dey inside',
        'hero.explore': 'See My Work Dem',
        'hero.start': 'Start Project',
        'hero.statProjects': 'Projects',
        'hero.statClients': 'Clients',
        'hero.statScripts': 'Scripts',
        'hero.statYears': 'Years',
        'about.label': 'About Me',
        'about.heading': 'Hard problem dem,<br><span class="gradient-text">fine solution dem.</span>',
        'about.lead': 'Na Full-Stack Developer I be for Cameroon with 4+ years wey I don dey build strong software for fintech, crypto, forex, e-commerce, and big company dem for Africa and other place dem.',
        'about.body': 'With 50+ project dem wey I don deliver and 22+ premium scripts, I dey ship clean code wey go work well. Every project get responsive design, SEO, secure login, admin panel, and full documentation.',
        'about.openWork': 'I Dey Open for Work',
        'expertise.label': 'Wetin I Dey Do',
        'expertise.heading': 'Area of <span class="gradient-text">Expertise</span>',
        'portfolio.label': 'Selected Work',
        'portfolio.heading': 'Featured <span class="gradient-text">Projects</span>',
        'portfolio.sub': 'Click "Live Preview" for see live homepage preview of each project.',
        'services.label': 'Services',
        'services.heading': 'Wetin I <span class="gradient-text">Offer</span>',
        'services.sub': 'Flexible collaboration for new product dem, big rebuild dem, and technical rescue work.',
        'reviews.label': 'Reviews',
        'reviews.heading': 'Wetin <span class="gradient-text">Clients Dey Talk</span>',
        'contact.label': 'Reach Me',
        'contact.heading': 'Make we build something<br><span class="gradient-text">fine together.</span>',
        'contact.sub': 'You get project for mind? Reach me and I go reply within few hours with free consultation.',
        'footer.tagline': 'Dey craft digital excellence since 2021',
        'footer.contact': 'Contact',
        'footer.copyright': '© 2026 WebPulse. Craft with precision.',
        'reviewBtn': 'Leave Review',
        'lang.title': 'Choose Your Language',
        'lang.sub': 'Pick language wey you want browse with',
        'page.title': 'My Portfolio | Full-Stack Developer & Digital Solutions',
        'cat.fintech': 'Fintech',
        'cat.trading': 'Trading',
        'cat.ecommerce': 'Online Market',
        'cat.logistics': 'Logistics',
        'panel.eyebrow': 'Wetin I Dey Focus On',
        'panel.title': 'I dey ship platform dem wey people go trust',
        'panel.availability': 'I dey open for some 2026 build dem',
        'panel.flagshipLabel': 'My big work dem',
        'panel.flagshipText': 'Banking, trading, logistics, and custom SaaS system dem.',
        'panel.deliveryLabel': 'How I dey deliver',
        'panel.deliveryText': 'Clean architecture, sharp UI, and documentation wey ready for launch.',
        'panel.signal1': 'How I dey first reply',
        'panel.signal2Value': 'From start go finish',
        'panel.signal2': 'Design, build, make am fast, put am online',
        'about.chipLocation': 'Cameroon',
        'about.chipYears': '4+ Years Experience',
        'about.chipLangs': 'EN / FR',
        'about.approachLabel': 'How I Dey Work',
        'about.approachText': 'Strategy first, code come after',
        'about.promiseLabel': 'My Promise',
        'about.promiseText': 'Fine UX with system wey easy for maintain',
        'about.stackTitle': 'Tech Wey I Dey Use',
        'exp1.title': 'Fintech & Banking',
        'exp1.desc': 'Full-stack banking platform dem with crypto wallet, multi-currency account, KYC check, and dashboard wey dey report live.',
        'exp1.tag1': 'Payment System',
        'exp1.tag2': 'Crypto',
        'exp1.tag3': 'KYC/AML',
        'exp2.title': 'Trading Platform Dem',
        'exp2.desc': 'Forex and crypto trading with TradingView chart, signal wey dey automatic, copy trading, and risk dashboard.',
        'exp2.tag1': 'Forex',
        'exp2.tag2': 'Copy Trading',
        'exp2.tag3': 'Signal Dem',
        'exp3.title': 'Online Market',
        'exp3.desc': 'Modern online shop with Stripe, PayPal, mobile money, stock management, and design wey dey fine for phone.',
        'exp3.tag2': 'Payment Dem',
        'exp3.tag3': 'Phone First',
        'exp4.title': 'Logistics & Shipping',
        'exp4.desc': 'Complete logistics with GPS tracking, better road planning, fleet management, and delivery message wey dey automatic.',
        'exp4.tag1': 'Tracking',
        'exp4.tag2': 'Fleet Management',
        'exp4.tag3': 'Automation',
        'exp5.title': 'Blockchain & Web3',
        'exp5.desc': 'Multi-chain wallet integration, smart contract interface, DeFi platform dem, and token dashboard wey easy for use.',
        'exp5.tag1': 'Smart Contract',
        'exp5.tag3': 'Wallet Dem',
        'exp6.title': 'Custom Development',
        'exp6.desc': 'Custom SaaS platform, CMS, admin panel, REST API, and enterprise solution with clean architecture.',
        'exp6.tag3': 'Enterprise',
        'portfolio.intro1Label': 'Result na di target',
        'portfolio.intro1Text': 'Every build dey design for bring customer, grow, and stay easy for manage.',
        'portfolio.intro2Label': 'Wetin you go notice',
        'portfolio.intro2Text': 'Clear interface, strong architecture, and feature dem wey help business.',
        'proj1.title': 'Banking with Crypto Inside',
        'proj1.desc': 'Digital banking platform with crypto wallet, multi-currency account, P2P transfer, KYC check, and admin panel.',
        'proj1.hl1': 'Crypto wallet dem',
        'proj1.hl2': 'Multi-currency account',
        'proj1.hl3': 'KYC dashboard',
        'proj2.title': 'Forex Trading Platform',
        'proj2.desc': 'Professional forex trading with TradingView chart, signal wey dey automatic, copy trading, and risk management dashboard.',
        'proj2.tech4': 'Chart Dem',
        'proj2.hl1': 'Automatic signal',
        'proj2.hl2': 'Copy trading',
        'proj2.hl3': 'Risk control',
        'proj3.title': 'Online Market Platform',
        'proj3.desc': 'Complete online shop with smart search, plenty payment gateway, cart recovery, and strong admin dashboard.',
        'proj3.hl1': 'Smart search',
        'proj3.hl2': 'Checkout flow',
        'proj3.hl3': 'Admin analytics',
        'proj4.title': 'Fintech Mobile Banking',
        'proj4.desc': 'Phone-first banking with instant transfer, bill payment, finger login, and transaction alert.',
        'proj4.tech2': 'Phone First',
        'proj4.tech3': 'Login',
        'proj4.hl1': 'Phone-first UX',
        'proj4.hl2': 'Finger login',
        'proj4.hl3': 'Fast transfer',
        'proj5.title': 'Shipping & Logistics Suite',
        'proj5.desc': 'Complete logistics with GPS tracking, better road planning, driver management, and live delivery alert.',
        'proj5.hl1': 'Live tracking',
        'proj5.hl2': 'Road planning',
        'proj5.hl3': 'Fleet operation',
        'proj6.title': 'AI Content Detection Website',
        'proj6.desc': 'AI platform wey dey check if text na AI write am, show confidence score, and help you verify quick quick.',
        'proj6.tech3': 'Web App',
        'proj6.tech4': 'Analytics',
        'proj6.hl1': 'AI detection',
        'proj6.hl2': 'Confidence score',
        'proj6.hl3': 'Fast checking',
        'btn.livePreview': 'See Am Live',
        'btn.visitSite': 'Go See Di Site',
        'btn.preview': 'Preview',
        'btn.newTab': 'Open for new tab',
        'btn.loading': 'Preview dey load...',
        'btn.comingSoon': 'E Dey Come',
        'btn.demoSoon': 'Demo dey come',
        'svc.from': 'From',
        'svc.popular': 'Plenty People Dey Choose Am',
        'svc1.title': 'Full Website Development',
        'svc1.desc': 'Complete professional website from scratch — e dey fit any screen, SEO ready, fast, and fully online.',
        'svc1.f1': 'Modern design wey fit any screen',
        'svc1.f2': 'SEO and analytics setup',
        'svc1.f3': 'Support after launch',
        'svc1.cta': 'Make We Talk About Am',
        'svc2.title': 'Code Fixing & Optimization',
        'svc2.desc': 'Debugging, performance, security, phone fix, and complete code cleanup for any stack.',
        'svc2.f1': 'Make am fast',
        'svc2.f2': 'Security patch',
        'svc2.f3': 'Full report of wetin I fix',
        'svc2.cta': 'I Need Help',
        'svc3.title': 'AI Website Building Course',
        'svc3.badge': 'You Get Am For Life',
        'svc3.desc': 'Build professional website from zero with AI tool dem — you no need sabi code.',
        'svc3.f1': 'From zero go reach production',
        'svc3.f2': 'Project template dem',
        'svc3.f3': 'Private community',
        'svc3.cta': 'Register Now',
        'testi1.quote': '"Fine work! E setup my banking site sharp sharp. Clean code, better documentation, and support wey pass."',
        'testi1.role': 'Fintech Startup, Douala',
        'testi2.quote': '"Di trading platform pass wetin we expect. Professional script with better support. I recommend am well well."',
        'testi2.role': 'Trading Firm, Yaoundé',
        'testi3.quote': '"Na di best investment for my web dev business. Di code quality na correct one and client dem dey like di result."',
        'testi3.role': 'Agency Owner, Bamenda',
        'testi4.quote': '"Di e-commerce solution dey handle thousands of order every day without wahala. Clean code, easy for change."',
        'testi4.role': 'Online Market, Buea',
        'proof.projects': '50+ Project Wey I Don Deliver',
        'proof.clients': '30+ Happy Client Dem',
        'proof.rating': '4.9/5 Average Rating',
        'contact.bestForLabel': 'E Better For',
        'contact.bestForText': 'Startup launch, redesign, platform upgrade, bug rescue, and custom software delivery.',
        'form.name': 'Your Name',
        'form.namePlaceholder': 'Put your name',
        'form.email': 'Email',
        'form.subject': 'Wetin E Concern',
        'form.subjectPlaceholder': 'Project question',
        'form.message': 'Message',
        'form.messagePlaceholder': 'Tell me about your project...',
        'form.send': 'Send Message',
        'form.sending': 'E dey send...',
        'form.successTitle': 'Message Don Go!',
        'form.successText': 'Thank you for reach out. I go reply you within 24 hours.',
        'aria.menu': 'Open di menu',
        'aria.prev': 'Go back',
        'aria.next': 'Go front',
        'aria.review': 'Leave review with email',
        'aria.changeLang': 'Change language',
        'aria.close': 'Close am',
    },
};

let CURRENT_LANG = localStorage.getItem(LANG_STORAGE_KEY) || 'en';

function t(key) {
    const dict = TRANSLATIONS[CURRENT_LANG] || TRANSLATIONS.en;
    return dict[key] || TRANSLATIONS.en[key] || key;
}

function initLanguage() {
    const modal = document.getElementById('langModal');
    const backdrop = document.getElementById('langModalBackdrop');
    const closeBtn = document.getElementById('langModalClose');
    const toggleBtn = document.getElementById('langToggle');
    const codeEl = document.getElementById('langCurrentCode');
    const options = document.querySelectorAll('.lang-option');

    if (!modal) return;

    const isFirstVisit = !localStorage.getItem(LANG_STORAGE_KEY);
    let currentLang = localStorage.getItem(LANG_STORAGE_KEY) || 'en';

    function applyLanguage(lang, persist = true) {
        if (!TRANSLATIONS[lang]) lang = 'en';
        currentLang = lang;
        CURRENT_LANG = lang;
        if (persist) localStorage.setItem(LANG_STORAGE_KEY, lang);
        document.documentElement.lang = lang === 'pcm' ? 'pcm' : lang;

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (TRANSLATIONS[lang][key]) el.textContent = TRANSLATIONS[lang][key];
        });

        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            const key = el.dataset.i18nHtml;
            if (TRANSLATIONS[lang][key]) el.innerHTML = TRANSLATIONS[lang][key];
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.dataset.i18nPlaceholder;
            if (TRANSLATIONS[lang][key]) el.placeholder = TRANSLATIONS[lang][key];
        });

        document.querySelectorAll('[data-i18n-aria]').forEach(el => {
            const key = el.dataset.i18nAria;
            if (TRANSLATIONS[lang][key]) el.setAttribute('aria-label', TRANSLATIONS[lang][key]);
        });

        if (codeEl) codeEl.textContent = LANG_CODES[lang] || 'EN';

        options.forEach(opt => {
            opt.classList.toggle('active', opt.dataset.lang === lang);
        });
    }

    function openModal() {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    options.forEach(opt => {
        opt.addEventListener('click', () => {
            applyLanguage(opt.dataset.lang);
            closeModal();
        });
    });

    if (toggleBtn) toggleBtn.addEventListener('click', openModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });

    applyLanguage(currentLang, !isFirstVisit);

    if (isFirstVisit) {
        setTimeout(openModal, 600);
    }
}

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
        btn.innerHTML = `<span>${t('form.sending')}</span><i class="fas fa-spinner fa-spin"></i>`;
        btn.disabled = true;
        btn.style.opacity = '.7';
        setTimeout(() => {
            form.innerHTML = `<div class="form-success"><i class="fas fa-check-circle"></i><h3>${t('form.successTitle')}</h3><p>${t('form.successText')}</p></div>`;
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
