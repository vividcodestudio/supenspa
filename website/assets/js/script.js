/* ====================================
   SUPEN SPA - MAIN JAVASCRIPT
   ==================================== */

// ===== DOCUMENT READY =====
document.addEventListener('DOMContentLoaded', function () {
    initNavbarScroll();
    initHamburgerMenu();
    initGalleryFilter();
    initFormHandling();
    initFormValidation();
    initSmoothScroll();
    initScrollAnimations();
    initHeroCarousel();
    initInfoCarousel();
    // Initalize Gallery Collection Carousels (Fast Animation, Slow Blend requested)
    initGenericCarousel('.massage-slide', 1800, 2800);
    initGenericCarousel('.promo-slide', 1800, 2800);
    initGenericCarousel('.shop-slide', 1800, 2800);

    // Initialize Hero Typewriter Effect if exists
    initHeroTypewriter();
});

// ===== HERO TYPEWRITER SCROLL EFFECT =====
function initHeroTypewriter() {
    const el = document.getElementById('heroTypewriter');
    if (!el) return;

    const prefix = "Awaken Your Senses.<br>Restore Your ";
    const rotatingWords = ["Soul.", "Mind.", "Body.", "Peace.", "Spirit."];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let prefixIndex = 0;
    let isTag = false;
    let typedPrefix = "";

    function typeLine() {
        if (prefixIndex < prefix.length) {
            let char = prefix.charAt(prefixIndex);
            if (char === '<') isTag = true;
            if (char === '>') isTag = false;

            typedPrefix += char;
            el.innerHTML = typedPrefix + '<span class="typewriter-cursor"></span>';
            prefixIndex++;

            setTimeout(typeLine, isTag ? 0 : 40);
            return;
        }

        let currentWord = rotatingWords[wordIndex];
        let currentString = typedPrefix + currentWord.substring(0, charIndex);
        el.innerHTML = currentString + '<span class="typewriter-cursor"></span>';

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 1500; // wait before deleting
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % rotatingWords.length;
            typeSpeed = 500; // wait before typing next
        }

        if (isDeleting) {
            if (charIndex > 0) charIndex--;
        } else {
            if (charIndex < currentWord.length) charIndex++;
        }

        setTimeout(typeLine, typeSpeed);
    }

    // Start after slight delay
    setTimeout(typeLine, 600);
}

// ===== NAVBAR SCROLL EFFECT =====
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');

    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', updateNavbar);
    updateNavbar(); // Check on load
}

// ===== HERO CAROUSEL FUNCTIONALITY =====
function initHeroCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const progressBar = document.getElementById('heroProgressBar');
    let current = 0;
    const INTERVAL = 3500; // Fast rotation

    if (slides.length === 0) return;

    function resetProgress() {
        if (!progressBar) return;
        progressBar.style.transition = 'none';
        progressBar.style.width = '0%';
        // Force reflow then animate
        progressBar.getBoundingClientRect();
        progressBar.style.transition = 'width ' + INTERVAL + 'ms linear';
        progressBar.style.width = '100%';
    }

    function goTo(n) {
        if (slides.length === 0) return;
        const outgoing = slides[current];
        outgoing.classList.remove('active');
        outgoing.classList.add('leaving');

        current = (n + slides.length) % slides.length;
        slides[current].classList.add('active');

        // Clean up .leaving after crossfade completes (1.2s)
        setTimeout(() => outgoing.classList.remove('leaving'), 1200);

        resetProgress();
    }

    if (slides.length > 1) {
        resetProgress();
        setInterval(() => goTo(current + 1), INTERVAL);
    }

    if (slides.length > 0) slides[0].classList.add('active');
}

// ===== ABOUT/INFO CAROUSEL (Faster crossfade for interiors) =====
function initInfoCarousel() {
    const slides = document.querySelectorAll('.carousel-slide-info');
    let current = 0;
    const INTERVAL = 4500; // Longer interval for slow blending

    if (slides.length <= 1) return;

    function goTo(n) {
        const outgoing = slides[current];
        outgoing.classList.remove('active');
        outgoing.classList.add('leaving');

        current = (n + slides.length) % slides.length;
        slides[current].classList.add('active');

        // Clean up .leaving after slow crossfade (2.5s)
        setTimeout(() => outgoing.classList.remove('leaving'), 2500);
    }

    slides[0].classList.add('active');
    setInterval(() => goTo(current + 1), INTERVAL);
}

// ===== GENERIC COLLECTION CAROUSEL (Customizable Blending) =====
function initGenericCarousel(slideSelector, interval, fadeTime) {
    const slides = document.querySelectorAll(slideSelector);
    let current = 0;

    if (slides.length <= 1) return;

    function goTo(n) {
        const outgoing = slides[current];
        outgoing.classList.remove('active');
        outgoing.classList.add('leaving');

        current = (n + slides.length) % slides.length;
        slides[current].classList.add('active');

        // Clean up .leaving after designated crossfade time
        setTimeout(() => outgoing.classList.remove('leaving'), fadeTime);
    }

    slides[0].classList.add('active');
    setInterval(() => goTo(current + 1), interval);
}

// ===== HAMBURGER MENU FUNCTIONALITY =====
function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const dropDowns = document.querySelectorAll('.nav-item-dropdown');

    if (!hamburger) return;

    // Toggle menu
    hamburger.addEventListener('click', function () {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        const navbar = document.querySelector('.navbar');
        if (navbar) navbar.classList.toggle('menu-active');
    });

    // Handle mobile dropdowns
    dropDowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        link.addEventListener('click', function (e) {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        if (!link.parentElement.classList.contains('nav-item-dropdown')) {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                const navbar = document.querySelector('.navbar');
                if (navbar) navbar.classList.remove('menu-active');
            });
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
        const isClickInsideMenu = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);

        if (!isClickInsideMenu && !isClickOnHamburger && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            const navbar = document.querySelector('.navbar');
            if (navbar) navbar.classList.remove('menu-active');
        }
    });
}

// ===== GALLERY FILTER FUNCTIONALITY =====
function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterButtons.length === 0 || galleryItems.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            // Get filter value
            const filterValue = this.getAttribute('data-filter');

            // Filter gallery items
            galleryItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                    item.classList.add('fade-in-1');
                } else {
                    const itemFilter = item.getAttribute('data-filter');
                    if (itemFilter === filterValue) {
                        item.style.display = 'block';
                        item.classList.add('fade-in-1');
                    } else {
                        item.style.display = 'none';
                        item.classList.remove('fade-in-1');
                    }
                }
            });
        });
    });
}

// ===== FORM HANDLING =====
function initFormHandling() {
    // Contact form submission
    const contactForm = document.querySelector('.contact-form-element');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            handleContactForm();
        });
    }

    // Booking form submission
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        const submitBtn = bookingForm.querySelector('.btn-full');
        if (submitBtn) {
            submitBtn.addEventListener('click', function (e) {
                e.preventDefault();
                handleBookingForm();
            });
        }
    }

    // Booking form - Update summary on selection changes
    const treatmentSelect = document.getElementById('treatment');
    const additionalServices = document.querySelectorAll('input[name="additional-services"]');
    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');

    if (treatmentSelect) {
        treatmentSelect.addEventListener('change', updateBookingSummary);
    }

    if (additionalServices) {
        additionalServices.forEach(checkbox => {
            checkbox.addEventListener('change', updateBookingSummary);
        });
    }

    if (dateInput) {
        dateInput.addEventListener('change', updateBookingSummary);
    }

    if (timeInput) {
        timeInput.addEventListener('change', updateBookingSummary);
    }
}

// Handle contact form submission
function handleContactForm() {
    const form = document.querySelector('.contact-form-element');
    const name = form.querySelector('input[name="name"]').value;
    const email = form.querySelector('input[name="email"]').value;
    const phone = form.querySelector('input[name="phone"]').value;
    const subject = form.querySelector('select[name="subject"]').value;
    const message = form.querySelector('textarea[name="message"]').value;

    if (!name || !email || !phone || !subject || !message) {
        alert('Please fill in all fields');
        return;
    }

    // Simulate form submission
    console.log('Contact Form Data:', { name, email, phone, subject, message });

    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    form.reset();
}

// Handle booking form submission
function handleBookingForm() {
    const form = document.querySelector('form') || document.querySelector('.booking-form-element');

    if (!form) return;

    const name = form.querySelector('input[name="name"]')?.value;
    const email = form.querySelector('input[name="email"]')?.value;
    const phone = form.querySelector('input[name="phone"]')?.value;
    const treatment = form.querySelector('select[name="treatment"]')?.value;
    const date = form.querySelector('input[name="date"]')?.value;
    const time = form.querySelector('select[name="time"]')?.value;

    if (!name || !email || !phone || !treatment || !date || !time) {
        alert('Please fill in all required fields');
        return;
    }

    // Simulate booking submission
    console.log('Booking Form Data:', { name, email, phone, treatment, date, time });

    // Show confirmation modal
    showConfirmationModal();
    form.reset();
    updateBookingSummary();
}

// Show confirmation modal
function showConfirmationModal() {
    const modal = document.getElementById('confirmationModal');
    if (modal) {
        modal.style.display = 'flex';

        // Close modal when clicking the close button
        const closeBtn = modal.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', function () {
                modal.style.display = 'none';
            });
        }

        // Close modal when clicking outside
        window.addEventListener('click', function (event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Close modal on return home button
        const returnBtn = modal.querySelector('.btn-primary');
        if (returnBtn) {
            returnBtn.addEventListener('click', function () {
                modal.style.display = 'none';
                window.location.href = 'index.html';
            });
        }
    }
}

// Update booking summary
function updateBookingSummary() {
    const treatmentSelect = document.getElementById('treatment');
    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');
    const additionalServices = document.querySelectorAll('input[name="additional-services"]:checked');

    const summaryTreatment = document.querySelector('.summary-treatment');
    const summaryDate = document.querySelector('.summary-date');
    const summaryTime = document.querySelector('.summary-time');
    const summaryTotal = document.querySelector('.summary-total span:last-child');

    if (treatmentSelect && summaryTreatment) {
        const selectedOption = treatmentSelect.options[treatmentSelect.selectedIndex];
        summaryTreatment.textContent = selectedOption.text || 'Not selected';
    }

    if (dateInput && summaryDate) {
        summaryDate.textContent = dateInput.value || 'Not selected';
    }

    if (timeInput && summaryTime) {
        summaryTime.textContent = timeInput.value || 'Not selected';
    }

    // Calculate total price
    if (summaryTotal) {
        let total = 0;

        // Get treatment price
        if (treatmentSelect) {
            const selectedValue = treatmentSelect.value;
            const priceMatch = selectedValue.match(/₹(\d+)/);
            if (priceMatch) {
                total = parseInt(priceMatch[1]);
            }
        }

        // Add additional services
        additionalServices.forEach(checkbox => {
            const priceMatch = checkbox.value.match(/₹(\d+)/);
            if (priceMatch) {
                total += parseInt(priceMatch[1]);
            }
        });

        summaryTotal.textContent = total > 0 ? `₹${total}` : '₹0';
    }
}

// ===== FORM VALIDATION =====
function initFormValidation() {
    const forms = document.querySelectorAll('form, .booking-form-element, .contact-form-element');

    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            if (!validateForm(this)) {
                e.preventDefault();
            }
        });

        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function () {
                validateField(this);
            });

            input.addEventListener('input', function () {
                validateField(this);
            });
        });
    });
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    return isValid;
}

function validateField(field) {
    const value = field.value.trim();

    if (field.hasAttribute('required') && !value) {
        field.style.borderColor = '#ff6b6b';
        return false;
    } else if (field.type === 'email' && value && !isValidEmail(value)) {
        field.style.borderColor = '#ff6b6b';
        return false;
    } else if (field.type === 'tel' && value && !isValidPhone(value)) {
        field.style.borderColor = '#ff6b6b';
        return false;
    } else {
        field.style.borderColor = 'rgba(212, 175, 55, 0.2)';
        return true;
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone);
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-1');
                entry.target.classList.add('visible'); // Added for .scroll-reveal support
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    const elementsToObserve = document.querySelectorAll(
        '.glass-card, .treatment-card, .feature-box, .testimony-card, ' +
        '.blog-card, .gallery-item, .pricing-card, .service-card-large, .scroll-reveal'
    );

    elementsToObserve.forEach(element => {
        observer.observe(element);
    });

    // Hard fallback: trigger all revelations after 1.5s in case observer fails (e.g. mobile Safari bugs)
    setTimeout(() => {
        document.querySelectorAll('.scroll-reveal').forEach(el => el.classList.add('visible'));
        elementsToObserve.forEach(el => el.classList.add('fade-in-1'));
    }, 1500);
}

// ===== ACTIVE NAV LINK =====
function setActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentLocation = location.pathname;

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const fileName = href.split('/').pop();
        const currentFileName = location.pathname.split('/').pop();

        if (currentFileName === fileName || (location.pathname.includes('/services/') && fileName === 'services.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Call on page load
setActiveNavLink();

// ===== PARALLAX SCROLL EFFECT (Optional) =====
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    if (parallaxElements.length === 0) return;

    window.addEventListener('scroll', function () {
        parallaxElements.forEach(element => {
            const scrollPosition = window.pageYOffset;
            const elementOffset = element.offsetTop;
            const parallaxSpeed = element.getAttribute('data-parallax') || 0.5;

            if (scrollPosition + window.innerHeight > elementOffset) {
                element.style.backgroundPosition = `center ${scrollPosition * parallaxSpeed}px`;
            }
        });
    });
}

initParallax();

// ===== COUNT UP ANIMATION (For stats/numbers) =====
function animateCounter(element, target, duration = 2000) {
    const startValue = 0;
    const increment = target / (duration / 16);
    let currentValue = startValue;

    const counter = setInterval(function () {
        currentValue += increment;
        if (currentValue >= target) {
            element.textContent = target + '+';
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(currentValue) + '+';
        }
    }, 16);
}

// ===== TESTIMONIAL CAROUSEL (Simple Auto-rotate) =====
function initTestimonialCarousel() {
    const carousel = document.querySelector('.testimonials-carousel');
    if (!carousel) return;

    const cards = carousel.querySelectorAll('.testimonial-card');
    if (cards.length <= 1) return;

    let currentIndex = 0;

    setInterval(function () {
        currentIndex = (currentIndex + 1) % cards.length;
        // Add rotation logic if needed
    }, 5000);
}

initTestimonialCarousel();

// ===== LAZY LOAD IMAGES =====
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imagesToLoad = document.querySelectorAll('img[data-src]');

        const imageLoadObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        imagesToLoad.forEach(img => imageLoadObserver.observe(img));
    }
}

initLazyLoading();

// ===== COPY TO CLIPBOARD (For sharing) =====
function copyToClipboard(text, buttonElement) {
    navigator.clipboard.writeText(text).then(function () {
        const originalText = buttonElement.textContent;
        buttonElement.textContent = 'Copied!';
        setTimeout(function () {
            buttonElement.textContent = originalText;
        }, 2000);
    });
}

// ===== MODAL HANDLERS =====
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// ===== LOCAL STORAGE HELPERS =====
function saveToLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

function getFromLocalStorage(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
    }
}

// ===== FORM PERSISTENCE =====
function initFormPersistence() {
    const forms = document.querySelectorAll('form, .booking-form-element, .contact-form-element');

    forms.forEach((form, index) => {
        const formKey = `form_${index}`;

        // Load saved form data
        const savedData = getFromLocalStorage(formKey);
        if (savedData) {
            Object.keys(savedData).forEach(key => {
                const field = form.querySelector(`[name="${key}"]`);
                if (field) {
                    if (field.type === 'checkbox') {
                        field.checked = savedData[key];
                    } else {
                        field.value = savedData[key];
                    }
                }
            });
        }

        // Save form data on change
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('change', function () {
                const formData = {};
                inputs.forEach(inp => {
                    if (inp.type === 'checkbox') {
                        formData[inp.name] = inp.checked;
                    } else {
                        formData[inp.name] = inp.value;
                    }
                });
                saveToLocalStorage(formKey, formData);
            });
        });
    });
}

initFormPersistence();

// ===== PAGE TRANSITION EFFECT =====
function addPageTransition() {
    const links = document.querySelectorAll('a:not([href^="#"]):not([target="_blank"])');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && !href.startsWith('javascript:')) {
                e.preventDefault();
                document.body.classList.add('fade-out');
                setTimeout(function () {
                    window.location.href = href;
                }, 300);
            }
        });
    });
}

addPageTransition();

// ===== DARK MODE TOGGLE (Optional) =====
function initDarkModeToggle() {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    if (prefersDarkScheme.matches) {
        document.body.classList.add('dark-mode');
    }

    prefersDarkScheme.addEventListener('change', function () {
        if (this.matches) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    });
}

initDarkModeToggle();

// ===== UTILITY FUNCTIONS =====

// Get query parameter
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(amount);
}

// Format date
function formatDate(date) {
    return new Intl.DateTimeFormat('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
}

// Debounce function
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Throttle function
function throttle(func, delay) {
    let lastCall = 0;
    return function (...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            func.apply(this, args);
            lastCall = now;
        }
    };
}

// ===== GOOGLE ANALYTICS (Add your tracking ID) =====
// Uncomment and add your tracking ID
/*
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'YOUR_TRACKING_ID');
*/

// ===== ERROR HANDLING =====
window.addEventListener('error', function (event) {
    console.error('Global error:', event.error);
    // You can send error logs to a server here if needed
});

// ===== PERFORMANCE MONITORING =====
window.addEventListener('load', function () {
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time:', pageLoadTime, 'ms');
    }
});