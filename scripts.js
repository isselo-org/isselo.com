// Main Scripts for isselo website

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all components
    initNavigation();
    initAnimations();
    initModals();
    initForms();
    initCounters();
    initTestimonialSlider();
    // initScreenshotsViewer();
});

// Function to change screenshots on the main page
/*
function changeScreenshot(screenshotNum) {
    const mainImage = document.getElementById('mainScreenshot');
    const thumbs = document.querySelectorAll('.screenshot-thumb');
    const descriptions = document.querySelectorAll('.screenshot-description');
    const mainContainer = document.querySelector('.main-screenshot-container');

    // Color map for backgrounds
    const colorMap = {
        '1': '#6ac5a2',  // Dashboard
        '2': '#e06e79',  // Menu Management
        '3': '#4154d6',  // Order Processing
        '4': '#4154d6',  // Inventory Control
        '5': '#797b80',  // Analytics
        '6': '#cd4b94'   // Customer Management
    };

    // Update active thumb
    thumbs.forEach(thumb => thumb.classList.remove('active'));
    const activeThumb = document.querySelector(`.screenshot-thumb[data-screenshot="${screenshotNum}"]`);
    if (activeThumb) {
        activeThumb.classList.add('active');

        // Update background color from the color map
        if (mainContainer && colorMap[screenshotNum]) {
            mainContainer.style.backgroundColor = colorMap[screenshotNum];
        }
    }

    // Update main image
    if (mainImage) {
        mainImage.src = `assets/images/screenshots/${screenshotNum}.png`;
    }

    // Update description
    descriptions.forEach(desc => desc.style.display = 'none');
    const descriptionElement = document.getElementById(`description-${screenshotNum}`);
    if (descriptionElement) {
        descriptionElement.style.display = 'block';
    }

    console.log('Changed to screenshot:', screenshotNum);
}
*/

// Navigation functions
function initNavigation() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
            document.body.classList.toggle('overflow-hidden');
        });
    }

    // Dropdown menus
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            const dropdown = this.nextElementSibling;
            dropdown.classList.toggle('hidden');
        });
    });

    // Scroll spy - highlight active nav item
    window.addEventListener('scroll', function () {
        const sections = document.querySelectorAll('section[id]');
        let scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            if (section.offsetTop <= scrollPosition &&
                (section.offsetTop + section.offsetHeight) > scrollPosition) {

                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + section.getAttribute('id')) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Animation functions
function initAnimations() {
    // Animate elements when they come into view
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Pulse animation for CTA buttons
    const ctaButtons = document.querySelectorAll('.btn-primary');
    ctaButtons.forEach(btn => {
        btn.classList.add('pulse-animation');
    });
}

// Modal functions
function initModals() {
    // Generic modal functions
    const modalTriggers = document.querySelectorAll('[data-modal-target]');
    const modalCloseButtons = document.querySelectorAll('[data-modal-close]');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function (e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal-target');
            const modal = document.getElementById(modalId);

            if (modal) {
                modal.classList.remove('hidden');
                modal.classList.add('flex');
                document.body.classList.add('overflow-hidden');
            }
        });
    });

    modalCloseButtons.forEach(button => {
        button.addEventListener('click', function () {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
                document.body.classList.remove('overflow-hidden');
            }
        });
    });

    // Close modal when clicking outside content
    document.addEventListener('click', function (e) {
        const modals = document.querySelectorAll('.modal:not(.hidden)');
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
                document.body.classList.remove('overflow-hidden');
            }
        });
    });
}

// Form handling
function initForms() {
    // Contact form submission
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Form validation
            const formData = new FormData(this);
            let isValid = true;

            // Simple validation example
            for (const [key, value] of formData.entries()) {
                const field = document.querySelector(`[name="${key}"]`);
                if (field && field.hasAttribute('required') && !value.trim()) {
                    field.classList.add('border-red-500');
                    isValid = false;
                } else if (field) {
                    field.classList.remove('border-red-500');
                }
            }

            if (isValid) {
                // AJAX submission would go here in a real implementation

                // Show success message
                contactForm.innerHTML = `
                    <div class="text-center py-8">
                        <svg class="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <h4 class="text-xl font-bold mb-2">Message Sent!</h4>
                        <p class="text-gray-600">Thank you for reaching out. We'll get back to you shortly.</p>
                    </div>
                `;
            }
        });
    }

    // Demo request form
    const demoForm = document.getElementById('demoForm');

    if (demoForm) {
        demoForm.addEventListener('submit', handleDemoSubmit);
    }

    // Download form
    const downloadForm = document.getElementById('downloadForm');

    if (downloadForm) {
        downloadForm.addEventListener('submit', handleDownloadSubmit);
    }
}

// Animated counter functions
function initCounters() {
    const counters = document.querySelectorAll('.stat-counter');

    if (counters.length === 0) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'), 10);
                const duration = 2000; // 2 seconds
                const step = target / (duration / 16); // 16ms is roughly one frame at 60fps
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Testimonial slider
function initTestimonialSlider() {
    const testimonialContainer = document.querySelector('.testimonial-slider');
    if (!testimonialContainer) return;

    const testimonials = testimonialContainer.querySelectorAll('.testimonial-slide');
    const navButtons = document.querySelectorAll('.testimonial-nav-btn');
    let currentIndex = 0;

    function showTestimonial(index) {
        if (index < 0) index = testimonials.length - 1;
        if (index >= testimonials.length) index = 0;

        testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle('hidden', i !== index);
            if (i === index) {
                testimonial.classList.add('animate-fade-in');
            }
        });

        navButtons.forEach((btn, i) => {
            btn.classList.toggle('bg-primary', i === index);
            btn.classList.toggle('bg-gray-300', i !== index);
        });

        currentIndex = index;
    }

    // Initialize
    showTestimonial(currentIndex);

    // Navigation buttons
    navButtons.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            showTestimonial(i);
        });
    });

    // Auto-scroll testimonials
    setInterval(() => {
        showTestimonial(currentIndex + 1);
    }, 5000);
}

// USP rotating text functionality
const uspContainer = document.querySelector('.usp-container');
if (uspContainer) {
    const rotatingUsp = document.getElementById('rotating-usp');
    const uspItems = document.querySelectorAll('.usp-item');
    const navBtns = document.querySelectorAll('.usp-nav-btn');
    let currentIndex = 0;

    function updateActiveButton(index) {
        navBtns.forEach(btn => btn.classList.remove('active'));
        navBtns[index].classList.add('active');
    }

    function updateUSP(index) {
        const item = uspItems[index];
        const newUsp = item.getAttribute('data-usp');
        rotatingUsp.firstChild.textContent = newUsp;
        updateActiveButton(index);
    }

    // Initialize auto-rotation
    setInterval(() => {
        currentIndex = (currentIndex + 1) % uspItems.length;
        updateUSP(currentIndex);
    }, 3000);
}

// FAQ toggles
function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    const arrow = element.querySelector('span');
    answer.classList.toggle('hidden');
    arrow.style.transform = answer.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
}

// Modal functions
function openDemoModal() {
    document.getElementById('demoModal').classList.remove('hidden');
    document.getElementById('demoModal').classList.add('flex');
    document.body.style.overflow = 'hidden';
}

function closeDemoModal() {
    document.getElementById('demoModal').classList.add('hidden');
    document.getElementById('demoModal').classList.remove('flex');
    document.body.style.overflow = 'auto';
}

function openDownloadModal() {
    document.getElementById('downloadModal').classList.remove('hidden');
    document.getElementById('downloadModal').classList.add('flex');
    document.body.style.overflow = 'hidden';
}

function closeDownloadModal() {
    document.getElementById('downloadModal').classList.add('hidden');
    document.getElementById('downloadModal').classList.remove('flex');
    document.body.style.overflow = 'auto';
}

// Function to handle demo form submission
function handleDemoSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    // This is where you'd handle the actual form submission in a real app
    console.log('Form submitted:', Object.fromEntries(formData));

    // Show success message
    form.innerHTML = `
        <div class="text-center py-8">
            <svg class="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <h4 class="text-xl font-bold mb-2">Thank you!</h4>
            <p class="text-gray-600">We've received your demo request and will contact you shortly.</p>
        </div>
    `;

    // Close modal after 3 seconds
    setTimeout(closeDemoModal, 3000);
}

// Handle download form submission
function handleDownloadSubmit(event) {
    event.preventDefault();

    // Show loading spinner
    const downloadSpinner = document.getElementById('downloadSpinner');
    downloadSpinner.classList.remove('hidden');

    // Get form data
    const form = event.target;
    const formData = new FormData(form);

    // Form validation
    let isValid = true;
    const formStatus = document.getElementById('downloadFormStatus');

    // Reset previous validation errors
    form.querySelectorAll('.border-red-500').forEach(field => {
        field.classList.remove('border-red-500');
    });

    // Validate required fields
    for (const [key, value] of formData.entries()) {
        const field = form.querySelector(`[name="${key}"]`);
        if (field && field.hasAttribute('required') && !value.trim()) {
            if (field.type === 'checkbox') {
                field.nextElementSibling.classList.add('text-red-500');
            } else {
                field.classList.add('border-red-500');
            }
            isValid = false;
        }
    }

    // Validate email format
    const email = formData.get('email');
    const emailField = form.querySelector('[name="email"]');
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailField.classList.add('border-red-500');
        isValid = false;
    }

    if (!isValid) {
        // Show error message
        formStatus.textContent = 'Please fill in all required fields correctly';
        formStatus.className = 'bg-red-100 text-red-700 p-3 rounded-lg text-sm';
        formStatus.classList.remove('hidden');
        downloadSpinner.classList.add('hidden');
        return;
    }

    // Get selected OS
    const selectedOS = formData.get('os');

    // Simulate download process (normally this would redirect to actual download URL)
    setTimeout(() => {
        // Download links for different OS (for demonstration - in production these would be actual download URLs)
        const downloadLinks = {
            'windows': 'https://isselo.com/downloads/isselo-windows-installer.exe',
            'mac': 'https://isselo.com/downloads/isselo-macos.dmg',
            'android': 'https://play.google.com/store/apps/details?id=com.isselo.pos',
            'ios': 'https://apps.apple.com/app/isselo-pos/id1234567890'
        };

        // Success message
        form.innerHTML = `
            <div class="text-center py-8">
                <svg class="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h4 class="text-xl font-bold mb-2">Download Started!</h4>
                <p class="text-gray-600 mb-6">Thank you for downloading isselo POS for ${selectedOS.charAt(0).toUpperCase() + selectedOS.slice(1)}.</p>
                <p class="text-sm text-gray-500 mb-4">If your download doesn't start automatically, <a href="${downloadLinks[selectedOS]}" class="text-primary font-medium">click here</a>.</p>
                <button type="button" onclick="closeDownloadModal()" class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">Close</button>
            </div>
        `;

        // Start the download
        const downloadIframe = document.createElement('iframe');
        downloadIframe.style.display = 'none';
        downloadIframe.src = downloadLinks[selectedOS];
        document.body.appendChild(downloadIframe);

        // Remove iframe after download starts
        setTimeout(() => {
            document.body.removeChild(downloadIframe);
        }, 2000);

    }, 1500);
}

// Initialize the screenshots viewer on the dedicated screenshots page
/*
function initScreenshotsViewer() {
    const thumbs = document.querySelectorAll('.screenshot-thumb');
    const mainImage = document.getElementById('mainScreenshot');
    const descriptions = document.querySelectorAll('.screenshot-description');
    const mainContainer = document.querySelector('.main-screenshot-container');

    // Color map for backgrounds (same as in changeScreenshot function)
    const colorMap = {
        '1': '#6ac5a2',  // Dashboard
        '2': '#e06e79',  // Menu Management
        '3': '#4154d6',  // Order Processing
        '4': '#4154d6',  // Inventory Control
        '5': '#797b80',  // Analytics
        '6': '#cd4b94'   // Customer Management
    };

    if (!thumbs.length || !mainImage) return;

    thumbs.forEach(thumb => {
        thumb.addEventListener('click', function () {
            // Update active thumb
            thumbs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Update main image
            const screenshotNum = this.getAttribute('data-screenshot');
            mainImage.src = `assets/images/screenshots/${screenshotNum}.png`;

            // Update background color
            if (mainContainer && colorMap[screenshotNum]) {
                mainContainer.style.backgroundColor = colorMap[screenshotNum];
            }

            // Update description - fix display property
            descriptions.forEach(desc => desc.style.display = 'none');
            const descriptionElement = document.getElementById(`description-${screenshotNum}`);
            if (descriptionElement) {
                descriptionElement.style.display = 'block';
            }

            console.log('Screenshot clicked:', screenshotNum);
        });
    });

    // Add hover effect to screenshot preview images on homepage
    const previewImages = document.querySelectorAll('.screenshots-preview img');
    if (previewImages.length) {
        previewImages.forEach(img => {
            img.addEventListener('mouseenter', function () {
                this.classList.add('scale-105');
            });

            img.addEventListener('mouseleave', function () {
                this.classList.remove('scale-105');
            });
        });
    }
}
*/ 