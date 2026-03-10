import './style.css'

// DOM Elements
const menuToggle = document.getElementById('menu-toggle');
const sideDrawer = document.getElementById('side-drawer');
const closeDrawer = document.getElementById('close-drawer');
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

    // Header visibility (Pill nav)
    if (scrollPos > 400) {
        mainNav.classList.add('header-visible');
        mainNav.classList.remove('header-hidden');
    } else {
        mainNav.classList.remove('header-visible');
        mainNav.classList.add('header-hidden');
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

// Animation on Scroll (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Scroll Sequence Logic (Foundation Section)
const section = document.querySelector('.foundation-scroll-section');
const stackImages = document.querySelectorAll('.stack-image');

window.addEventListener('scroll', () => {
    if (!section) return;

    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const scrollPos = window.scrollY;

    // Calculate progress (0 to 1) through the section
    let progress = (scrollPos - sectionTop) / (sectionHeight - window.innerHeight);
    progress = Math.max(0, Math.min(1, progress));

    // Determine which image to show
    const totalImages = stackImages.length;
    const activeIndex = Math.floor(progress * totalImages);

    stackImages.forEach((img, index) => {
        if (index === Math.min(activeIndex, totalImages - 1)) {
            img.classList.add('active');
        } else {
            img.classList.remove('active');
        }
    });
});

// Typewriter Effect for Hero Title
const typedTitle = document.getElementById('typed-title');
const textToType = "Kingdavid Babalola";
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 300; // Significantly slower

const type = () => {
    const currentText = textToType.substring(0, charIndex);
    if (typedTitle) {
        typedTitle.textContent = currentText;
    }

    if (!isDeleting && charIndex < textToType.length) {
        charIndex++;
        typeSpeed = 300; // Slower typing
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        typeSpeed = 200; // Slower erasing
    } else if (!isDeleting && charIndex === textToType.length) {
        isDeleting = true;
        typeSpeed = 5000; // Long pause at completion
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        typeSpeed = 1500; // Pause before restart
    }

    setTimeout(type, typeSpeed);
};

// Start typewriter after a short delay
if (typedTitle) {
    setTimeout(type, 1000);
}

// Fix Hero visibility (Ensure it shows up)
const hero = document.getElementById('hero');
if (hero) {
    hero.style.opacity = '1';
    hero.style.transform = 'translateY(0)';
}

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
    preloadImages: false,
    lazy: {
        loadPrevNext: true,
    },
    allowTouchMove: true,
};

window.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('branding-swiper')) {
        new Swiper('#branding-swiper', swiperOptions);
    }
    if (document.getElementById('campaign-swiper')) {
        new Swiper('#campaign-swiper', swiperOptions);
    }
    if (document.getElementById('events-swiper')) {
        new Swiper('#events-swiper', swiperOptions);
    }

    // Lightbox Logic
    const lightbox = document.getElementById('portfolio-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-lightbox');
    const backToSiteBtn = document.querySelector('.back-to-site');

    document.querySelectorAll('.swiper-slide img').forEach(img => {
        img.addEventListener('click', () => {
            lightbox.classList.add('active');
            lightboxImg.src = img.src;
            const caption = img.nextElementSibling ? img.nextElementSibling.querySelector('h3').textContent : '';
            lightboxCaption.textContent = caption;
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    closeBtn.addEventListener('click', closeLightbox);
    backToSiteBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
});
