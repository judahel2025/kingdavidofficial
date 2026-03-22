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

// 4. Typewriter Effect (Kept but enhanced speed)
const typedTitle = document.getElementById('typed-title');
const textToType = "Kingdavid Babalola";
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 150; 

const type = () => {
    const currentText = textToType.substring(0, charIndex);
    if (typedTitle) {
        typedTitle.textContent = currentText;
    }

    if (!isDeleting && charIndex < textToType.length) {
        charIndex++;
        typeSpeed = 150;
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        typeSpeed = 100;
    } else if (!isDeleting && charIndex === textToType.length) {
        isDeleting = true;
        typeSpeed = 4000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        typeSpeed = 1000;
    }

    setTimeout(type, typeSpeed);
};

if (typedTitle) {
    setTimeout(type, 1000);
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
