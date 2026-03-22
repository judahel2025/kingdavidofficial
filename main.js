import './style.css'
import { animate, inView, stagger, scroll } from "motion"

// DOM Elements
const menuToggle = document.getElementById('menu-toggle');
const sideDrawer = document.getElementById('side-drawer');
const mainNav = document.getElementById('main-nav');
const drawerLinks = document.querySelectorAll('.drawer-links a');

const closeSideDrawer = () => {
    sideDrawer.classList.remove('open');
    menuToggle.classList.remove('open');
    document.body.classList.remove('drawer-open');
};

menuToggle.addEventListener('click', () => {
    sideDrawer.classList.toggle('open');
    menuToggle.classList.toggle('open');
    document.body.classList.toggle('drawer-open');
});

// Close drawer when a link is clicked
drawerLinks.forEach(link => {
    link.addEventListener('click', closeSideDrawer);
});

// Scroll-Triggered Header & Menu Logic
window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    const fixedLogo = document.querySelector('.fixed-logo');

    // Header visibility (Pill nav)
    if (scrollPos > 400) {
        mainNav.classList.add('header-visible');
        mainNav.classList.remove('header-hidden');
        if (fixedLogo) fixedLogo.classList.add('logo-hidden');
    } else {
        mainNav.classList.remove('header-visible');
        mainNav.classList.add('header-hidden');
        if (fixedLogo) fixedLogo.classList.remove('logo-hidden');
    }
});

// Smooth Scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// --- High-Quality Animations using Motion ---

// 1. Hero Entrance Animation
animate(".hero-content > *", 
    { opacity: [0, 1], y: [30, 0] }, 
    { delay: stagger(0.2), duration: 0.8, easing: [0.16, 1, 0.3, 1] }
);

animate(".hero-image-container img", 
    { opacity: [0, 0.6], scale: [1.1, 1] }, 
    { duration: 1.5, easing: "ease-out" }
);

// 2. Section Entry Animations (on View)
inView(".section, .hero-section", (info) => {
    const target = info.target;
    // Include all cards and content blocks for a consistent reveal
    const selectors = ".section-title, .about-text, .portfolio-category, .award-card-v2, .contact-card-v2, .social-card-v2, .hero-content, .glass-about-card, .timeline-item.glass";
    const elementsToAnimate = target.querySelectorAll(selectors);
    
    if (elementsToAnimate.length > 0) {
        animate(elementsToAnimate, 
            { opacity: [0, 1], y: [40, 0] }, 
            { delay: stagger(0.15), duration: 1, easing: [0.16, 1, 0.3, 1] }
        );
    }
});

// 3. Foundation Scroll Sequence (Image Stack Parallax)
const foundationSection = document.querySelector('.foundation-scroll-section');
const stackImages = document.querySelectorAll('.stack-image');

if (foundationSection && stackImages.length > 0) {
    stackImages.forEach((img, index) => {
        scroll(
            animate(img, { 
                opacity: [0, 1, 1, 0],
                scale: [0.9, 1, 1, 1.1],
                filter: ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]
            }),
            {
                target: foundationSection,
                offset: [
                    `${(index / stackImages.length) * 100}%`, 
                    `${((index + 1) / stackImages.length) * 100}%`
                ]
            }
        );
    });
}

// 4. Ancient Chisel Typewriter & Tagline Loop
const typedTitle = document.getElementById('typed-title');
const taglineEl = document.getElementById('hero-tagline');
const nameLines = ["Kingdavid", "Babalola"];
const taglines = [
    "Creative Director · Brand Strategist",
    "Architect of Visual Identities",
    "Forging Brands That Endure",
    "Creative Alchemist",
    "Brand Oracle"
];

let taglineIndex = 0;
let taglineCycleId = 0;

const runTaglineStamp = async (text, cycleId) => {
    if (cycleId !== taglineCycleId) return;
    const isBrandOracle = text === "Brand Oracle";
    taglineEl.innerHTML = '';
    taglineEl.style.opacity = '1';
    taglineEl.style.filter = 'none';

    if (isBrandOracle) {
        // Flicker in "Brand" and "Oracle" separately (like candle flame)
        const words = text.split(' ');
        for (let i = 0; i < words.length; i++) {
            if (cycleId !== taglineCycleId) return;
            const word = words[i];
            const wordSpan = document.createElement('span');
            wordSpan.className = 'stamp-word';
            wordSpan.textContent = word;
            taglineEl.appendChild(wordSpan);
            
            // Flicker effect: rapidly toggle between invisible and dim gold
            for (let flicker = 0; flicker < 8; flicker++) {
                if (cycleId !== taglineCycleId) return;
                wordSpan.style.opacity = flicker % 2 === 0 ? '0' : '0.2';
                await new Promise(r => setTimeout(r, 40));
            }
            if (cycleId !== taglineCycleId) return;
            animate(wordSpan, { opacity: 0.8 }, { duration: 0.3 }); // Lock to full dried gold
            
            if (i < words.length - 1) {
                const space = document.createTextNode(' ');
                taglineEl.appendChild(space);
                await new Promise(r => setTimeout(r, 200));
            }
        }
    } else {
        // Standard Ancient Seal Stamp
        const words = text.split(' ');
        for (let i = 0; i < words.length; i++) {
            if (cycleId !== taglineCycleId) return;
            const wordSpan = document.createElement('span');
            wordSpan.className = 'stamp-word';
            wordSpan.textContent = words[i];
            taglineEl.appendChild(wordSpan);

            // Word "Stamp" effect: wet ink (0.3) -> dry gold (0.8)
            animate(wordSpan, 
                { opacity: [0, 0.3, 0.8], scale: [1.15, 1] }, 
                { duration: 0.6, easing: "ease-out" }
            );

            if (i < words.length - 1) {
                const pause = document.createElement('span');
                pause.className = 'stamp-pause';
                pause.textContent = ' — ';
                taglineEl.appendChild(pause);
                await new Promise(r => setTimeout(r, 400));
                if (cycleId !== taglineCycleId) return;
            }
            await new Promise(r => setTimeout(r, 300));
            if (cycleId !== taglineCycleId) return;
        }
    }

    // Hold tagline for 3 seconds
    if (cycleId !== taglineCycleId) return;
    await new Promise(r => setTimeout(r, 3000));
    if (cycleId !== taglineCycleId) return;

    // Exit behavior
    if (isBrandOracle) {
        // Shatter effect: Letters scatter and vanish
        const words = taglineEl.querySelectorAll('.stamp-word');
        const letterPromises = [];
        words.forEach(wordSpan => {
            const wordText = wordSpan.textContent;
            wordSpan.innerHTML = '';
            for (const char of wordText) {
                const charSpan = document.createElement('span');
                charSpan.textContent = char;
                charSpan.className = 'shatter-letter';
                wordSpan.appendChild(charSpan);
                
                // Random scatter direction
                const angle = Math.random() * Math.PI * 2;
                const distance = 15 + Math.random() * 30;
                letterPromises.push(animate(charSpan, 
                    { 
                        x: Math.cos(angle) * distance, 
                        y: Math.sin(angle) * distance, 
                        opacity: 0,
                        rotate: (Math.random() - 0.5) * 90 
                    }, 
                    { duration: 0.6, easing: "ease-in" }
                ).finished);
            }
        });
        await Promise.all(letterPromises);
    } else {
        // Fade out like smoke dissolve
        await animate(taglineEl, { opacity: 0, filter: "blur(6px)" }, { duration: 1.2 }).finished;
    }

    if (cycleId === taglineCycleId) {
        taglineEl.innerHTML = '';
    }
};

const runChiselLoop = async () => {
    while (true) {
        // RESET TAGLINE ON REWRITE
        taglineCycleId++; // Increment to cancel any running tagline animation
        const currentCycleId = taglineCycleId;
        taglineIndex = 0;
        taglineEl.innerHTML = '';

        // 1. Writing phase (Name)
        typedTitle.innerHTML = '';
        const line1 = document.createElement('div');
        const line2 = document.createElement('div');
        line1.className = 'line';
        line2.className = 'line';
        typedTitle.appendChild(line1);
        typedTitle.appendChild(line2);

        const cursor = document.createElement('span');
        cursor.className = 'chisel-cursor';

        // Write Line 1: Kingdavid
        line1.appendChild(cursor);
        for (const char of nameLines[0]) {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.color = '#c8922a';
            span.style.textShadow = '0 0 10px #c8922a';
            span.style.display = 'inline-block';
            line1.insertBefore(span, cursor);
            animate(span, 
                { color: ['#c8922a', '#f5e6c8'], textShadow: ['0 0 15px #c8922a', 'none'] }, 
                { duration: 0.8, easing: "ease-out" }
            );
            await new Promise(r => setTimeout(r, 150));
        }
        line1.removeChild(cursor);

        // Write Line 2: Babalola
        line2.appendChild(cursor);
        for (const char of nameLines[1]) {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.color = '#c8922a';
            span.style.textShadow = '0 0 10px #c8922a';
            span.style.display = 'inline-block';
            line2.insertBefore(span, cursor);
            animate(span, 
                { color: ['#c8922a', '#f5e6c8'], textShadow: ['0 0 15px #c8922a', 'none'] }, 
                { duration: 0.8, easing: "ease-out" }
            );
            await new Promise(r => setTimeout(r, 150));
        }

        // 2. Waiting phase (Name is visible)
        cursor.style.display = 'none';
        
        // Start Tagline Cycle in parallel
        const taglineCycle = (async () => {
            await new Promise(r => setTimeout(r, 800)); // Initial delay after name
            while (currentCycleId === taglineCycleId) {
                await runTaglineStamp(taglines[taglineIndex], currentCycleId);
                if (currentCycleId !== taglineCycleId) break;
                taglineIndex = (taglineIndex + 1) % taglines.length;
                await new Promise(r => setTimeout(r, 500)); // 0.5s pause between descriptors
            }
        })();

        // Name wait total: 5s (Name and tagline are concurrent)
        await new Promise(r => setTimeout(r, 5000));

        // 3. Unwriting phase (Name)
        // The taglineCycle will be canceled at the start of the next loop iteration via taglineCycleId++
        // Note: The taglineCycle promise will be "abandoned" and replaced in the next loop, 
        // but runTaglineStamp should be robust to internal interruptions if we wanted to be perfect.
        // For now, simple reset in the next loop is sufficient.
        
        const line2Chars = Array.from(line2.querySelectorAll('span'));
        for (let i = line2Chars.length - 1; i >= 0; i--) {
            line2Chars[i].remove();
            await new Promise(r => setTimeout(r, 40));
        }
        const line1Chars = Array.from(line1.querySelectorAll('span'));
        for (let i = line1Chars.length - 1; i >= 0; i--) {
            line1Chars[i].remove();
            await new Promise(r => setTimeout(r, 40));
        }

        // 4. Resting phase (1s)
        await new Promise(r => setTimeout(r, 1000));
    }
};

if (typedTitle && taglineEl) {
    runChiselLoop();
}

// 5. Custom Gold Cursor System
const initCustomCursor = () => {
    const dot = document.createElement('div');
    const ring = document.createElement('div');
    dot.className = 'cursor-dot';
    ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    const lerp = (a, b, n) => (1 - n) * a + n * b;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = `${mouseX}px`;
        dot.style.top = `${mouseY}px`;
        dot.style.transform = `translate(-50%, -50%)`;
    });

    // Hover detection
    const updateInteractiveElements = () => {
        const interactiveElements = document.querySelectorAll('a, button, .btn-v2, .swiper-slide img');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => ring.classList.add('active'));
            el.addEventListener('mouseleave', () => ring.classList.remove('active'));
        });
    };
    updateInteractiveElements();

    // Glyph Flare
    const glyph = document.createElement('div');
    glyph.className = 'cursor-glyph';
    glyph.textContent = 'KB';
    document.body.appendChild(glyph);

    setInterval(() => {
        glyph.style.left = `${mouseX}px`;
        glyph.style.top = `${mouseY - 40}px`;
        glyph.style.opacity = '1';
        glyph.style.transform = 'translate(-50%, -30px)';
        setTimeout(() => {
            glyph.style.opacity = '0';
            glyph.style.transform = 'translate(-50%, -20px)';
        }, 1000);
    }, 2000);

    const tick = () => {
        // Smooth follow for ring
        ringX = lerp(ringX, mouseX, 0.15);
        ringY = lerp(ringY, mouseY, 0.15);
        ring.style.left = `${ringX}px`;
        ring.style.top = `${ringY}px`;

        // Trail particles
        if (Math.abs(mouseX - ringX) > 2 || Math.abs(mouseY - ringY) > 2) {
            const p = document.createElement('div');
            p.className = 'cursor-particle';
            p.style.left = `${mouseX}px`;
            p.style.top = `${mouseY}px`;
            p.style.transform = `translate(-50%, -50%)`;
            document.body.appendChild(p);
            
            animate(p, 
                { 
                    opacity: [1, 0], 
                    scale: [1, 0.2], 
                    x: [0, (Math.random() - 0.5) * 20],
                    y: [0, 20] 
                }, 
                { duration: 0.8 }
            ).then(() => p.remove());
        }

        requestAnimationFrame(tick);
    };
    tick();
};

if (window.innerWidth > 1024) {
    initCustomCursor();
}



// Portfolio Data Mapping
const CLOUD_NAME = "dbiyrudk1";
const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto,v1/`;

const portfolioData = {
  "brands": [
    {
      "url": "https://res.cloudinary.com/dbiyrudk1/image/upload/v1773479379/portfolio/brands/remax_branding.jpg",
      "title": "REMAX BRANDING",
      "year": "2024"
    },
    {
      "url": "https://res.cloudinary.com/dbiyrudk1/image/upload/v1773479374/portfolio/brands/bridgee_escrow.jpg",
      "title": "BRIDGEE ESCROW",
      "year": "2024"
    },
    {
      "url": "https://res.cloudinary.com/dbiyrudk1/image/upload/v1773479370/portfolio/brands/allyprime_2.jpg",
      "title": "ALLYPRIME 2",
      "year": "2024"
    },
    {
      "url": "https://res.cloudinary.com/dbiyrudk1/image/upload/v1773479369/portfolio/brands/allyprime_1.jpg",
      "title": "ALLYPRIME 1",
      "year": "2024"
    }
  ],
  "campaigns": [
    {
      "url": "https://res.cloudinary.com/dbiyrudk1/image/upload/v1773479377/portfolio/campaigns/choice_estate.jpg",
      "title": "CHOICE ESTATE",
      "year": "2024"
    },
    {
      "url": "https://res.cloudinary.com/dbiyrudk1/image/upload/v1773479371/portfolio/campaigns/boys_quarters.jpg",
      "title": "BOYS QUARTERS",
      "year": "2024"
    },
    {
      "url": "https://res.cloudinary.com/dbiyrudk1/image/upload/v1773476893/portfolio/campaigns/Smart%20tips%20Academy.jpg",
      "title": "SMART TIPS ACADEMY",
      "year": "2024"
    },
    {
      "url": "https://res.cloudinary.com/dbiyrudk1/image/upload/v1773476891/portfolio/campaigns/Artix%20Solutions%20Flyer%20Mockup.jpg",
      "title": "ARTIX SOLUTIONS FLYER MOCKUP",
      "year": "2024"
    },
    {
      "url": "https://res.cloudinary.com/dbiyrudk1/image/upload/v1773476885/portfolio/campaigns/IMG_5358.jpg",
      "title": "IMG 5358",
      "year": "2024"
    },
    {
      "url": "https://res.cloudinary.com/dbiyrudk1/image/upload/v1773476883/portfolio/campaigns/IMG_5357-1.jpg",
      "title": "IMG 5357 1",
      "year": "2024"
    },
    {
      "url": "https://res.cloudinary.com/dbiyrudk1/image/upload/v1773476880/portfolio/campaigns/IMG_5356.jpg",
      "title": "IMG 5356",
      "year": "2024"
    },
    {
      "url": "https://res.cloudinary.com/dbiyrudk1/image/upload/v1773476878/portfolio/campaigns/Trading%20made%20Easy.jpg",
      "title": "TRADING MADE EASY",
      "year": "2024"
    },
    {
      "url": "https://res.cloudinary.com/dbiyrudk1/image/upload/v1773476868/portfolio/campaigns/988C342B-EEC0-43D2-9D0E-7391BFA7AC0F.jpg",
      "title": "BQ AFRICA",
      "year": "2024"
    },
    {
      "url": "https://res.cloudinary.com/dbiyrudk1/image/upload/v1773476864/portfolio/campaigns/3_20240917_155459_0001.jpg",
      "title": "QUANTUM LEAP",
      "year": "2024"
    }
  ],
  "events": [
    {
      "url": "https://res.cloudinary.com/dbiyrudk1/image/upload/v1773476927/portfolio/events/IMG_20241002_182558_682.jpg",
      "title": "BACK & BETTER",
      "year": "2024"
    },
    {
      "url": "https://res.cloudinary.com/dbiyrudk1/image/upload/v1773476923/portfolio/events/IMG_5360-1.jpg",
      "title": "EVENT ALPHA",
      "year": "2024"
    },
    {
      "url": "https://res.cloudinary.com/dbiyrudk1/image/upload/v1773476920/portfolio/events/34_20240321_112057_0004.jpg",
      "title": "EVENT Z",
      "year": "2024"
    },
    {
      "url": "https://res.cloudinary.com/dbiyrudk1/image/upload/v1773476916/portfolio/events/13_20240930_001823_0003.jpg",
      "title": "EVENT X",
      "year": "2024"
    },
    {
      "url": "https://res.cloudinary.com/dbiyrudk1/image/upload/v1773476913/portfolio/events/Copy%20of%20Victor%20Fatanmi.jpg",
      "title": "VICTOR FATANMI",
      "year": "2024"
    },
    {
      "url": "https://res.cloudinary.com/dbiyrudk1/image/upload/v1773476912/portfolio/events/Copy%20of%20Uyoyo%20Edioso_.jpg",
      "title": "UYOYO EDIOSO",
      "year": "2024"
    },
    {
      "url": "https://res.cloudinary.com/dbiyrudk1/image/upload/v1773476909/portfolio/events/Copy%20of%20Solomon_s%20Story.jpg",
      "title": "SOLOMON STORY",
      "year": "2024"
    },
    {
      "url": "https://res.cloudinary.com/dbiyrudk1/image/upload/v1773476908/portfolio/events/Copy%20of%20HyperGrowth%20Landscape.jpg",
      "title": "HYPERGROWTH LANDSCAPE",
      "year": "2024"
    },
    {
      "url": "https://res.cloudinary.com/dbiyrudk1/image/upload/v1773476906/portfolio/events/HyperGrowth%20With%20Solomon%20Cohort%202%20%281%29.jpg",
      "title": "HYPERGROWTH WITH SOLOMON",
      "year": "2024"
    },
    {
      "url": "https://res.cloudinary.com/dbiyrudk1/image/upload/v1773476904/portfolio/events/Copy%20of%20Zero%20to%20One.jpg",
      "title": "ZERO TO ONE",
      "year": "2024"
    },
    {
      "url": "https://res.cloudinary.com/dbiyrudk1/image/upload/v1773476902/portfolio/events/Copy%20of%20Metanoia_.jpg",
      "title": "METANOIA",
      "year": "2024"
    },
    {
      "url": "https://res.cloudinary.com/dbiyrudk1/image/upload/v1773476899/portfolio/events/Copy%20of%20Hyper%20Growth%20Full%20Details.jpg",
      "title": "HYPER GROWTH",
      "year": "2024"
    },
    {
      "url": "https://res.cloudinary.com/dbiyrudk1/image/upload/v1773476897/portfolio/events/Copy%20of%20FutureProof%20Static.jpg",
      "title": "FUTUREPROOF",
      "year": "2024"
    },
    {
      "url": "https://res.cloudinary.com/dbiyrudk1/image/upload/v1773476895/portfolio/events/Copy%20of%202nd%20Half%20Static.jpg",
      "title": "2ND HALF STATIC",
      "year": "2024"
    }
  ]
};

const renderPortfolio = () => {
    console.log('Starting renderPortfolio...');
    const categories = {
        brands: document.getElementById('branding-wrapper'),
        campaigns: document.getElementById('campaign-wrapper'),
        events: document.getElementById('events-wrapper')
    };

    Object.keys(portfolioData).forEach(cat => {
        const wrapper = categories[cat];
        if (!wrapper) {
            console.warn(`Wrapper for category ${cat} not found!`);
            return;
        }

        console.log(`Rendering ${portfolioData[cat].length} items for ${cat}...`);
        portfolioData[cat].forEach(item => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            
            slide.innerHTML = `
                <img src="${item.url}" alt="${item.title}" loading="lazy" decoding="async" 
                     onerror="this.onerror=null; console.error('Failed to load image:', '${item.url}'); this.src='https://res.cloudinary.com/dbiyrudk1/image/upload/v1/assets/signature.png';">
                <div class="slide-info">
                    <h3>${item.title}</h3><span>${item.year}</span>
                </div>
            `;
            wrapper.appendChild(slide);
        });
    });
    console.log('renderPortfolio complete.');
};

// Initialize Swiper for Portfolio
const swiperOptions = {
    slidesPerView: 'auto',
    spaceBetween: 30,
    centeredSlides: false,
    grabCursor: true,
    loop: true,
    speed: 8000,
    autoplay: {
        delay: 0,
        disableOnInteraction: false,
    },
    freeMode: {
        enabled: true,
        momentum: false,
    },
    watchSlidesProgress: true,
    lazy: {
        loadPrevNext: true,
        loadPrevNextAmount: 2,
    },
    allowTouchMove: true,
};

window.addEventListener('DOMContentLoaded', () => {
    // Render dynamic images first
    renderPortfolio();

    // Initialize Swipers
    if (document.getElementById('branding-swiper')) {
        new Swiper('#branding-swiper', swiperOptions);
    }
    if (document.getElementById('campaign-swiper')) {
        new Swiper('#campaign-swiper', swiperOptions);
    }
    if (document.getElementById('events-swiper')) {
        new Swiper('#events-swiper', swiperOptions);
    }

    // Lightbox Logic (Modified for Dynamic Elements)
    const lightbox = document.getElementById('portfolio-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-lightbox');
    const backToSiteBtn = document.querySelector('.back-to-site');

    // Use event delegation for dynamic images
    document.addEventListener('click', (e) => {
        if (e.target.closest('.swiper-slide img')) {
            const img = e.target.closest('.swiper-slide img');
            lightbox.classList.add('active');
            lightboxImg.src = img.src;
            const caption = img.nextElementSibling ? img.nextElementSibling.querySelector('h3').textContent : '';
            lightboxCaption.textContent = caption;
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    });

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (backToSiteBtn) backToSiteBtn.addEventListener('click', closeLightbox);
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }
});
