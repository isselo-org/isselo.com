// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add animation to floating elements
const floatingElements = document.querySelectorAll('.floating-element');

// Initial animation on page load
document.addEventListener('DOMContentLoaded', () => {
    floatingElements.forEach((element, index) => {
        // Add slight delay between each element animation
        setTimeout(() => {
            element.classList.add('animate');
        }, index * 200);
    });
});

// Add hover effect to buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
    });
});

// Add scroll-based navbar background
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(5px)';
    } else {
        navbar.style.backgroundColor = 'var(--white)';
        navbar.style.backdropFilter = 'none';
    }
});

// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function () {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') === '#download') {
                e.preventDefault();
                showDownloadPopup();
                return;
            }

            if (this.getAttribute('href') !== '#' && this.getAttribute('href') !== '') {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Mouse tracking gradient effect for bento cards
    const bentoItems = document.querySelectorAll('.bento-item');

    bentoItems.forEach(item => {
        item.addEventListener('mousemove', e => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            item.style.setProperty('--mouse-x', `${x}px`);
            item.style.setProperty('--mouse-y', `${y}px`);
        });

        // Add shimmering effect that moves even without mouse movement
        let shimmerX = 0;
        let shimmerY = 0;
        let direction = 1;
        let active = false;

        item.addEventListener('mouseenter', () => {
            active = true;
            animateShimmer();
        });

        item.addEventListener('mouseleave', () => {
            active = false;
        });

        function animateShimmer() {
            if (!active) return;

            const width = item.offsetWidth;
            const height = item.offsetHeight;

            shimmerX += 2 * direction;
            shimmerY += 1 * direction;

            if (shimmerX > width || shimmerX < 0) {
                direction *= -1;
            }

            if (shimmerY > height || shimmerY < 0) {
                shimmerY = height / 2;
            }

            item.style.setProperty('--mouse-x', `${shimmerX}px`);
            item.style.setProperty('--mouse-y', `${shimmerY}px`);

            requestAnimationFrame(animateShimmer);
        }
    });

    // Download popup functionality
    const downloadPopup = document.getElementById('downloadPopup');
    const closePopupBtn = document.getElementById('closePopup');

    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', function () {
            hideDownloadPopup();
        });
    }

    // Close popup when clicking outside
    window.addEventListener('click', function (e) {
        if (downloadPopup && e.target === downloadPopup) {
            hideDownloadPopup();
        }
    });

    // For download options in popup
    const androidOption = document.getElementById('androidOption');
    const windowsOption = document.getElementById('windowsOption');

    if (androidOption) {
        androidOption.addEventListener('click', function () {
            // Logic for Android download
            window.location.href = 'https://bucket-lb92bb.s3.ap-south-1.amazonaws.com/android/app-release.apk';
            hideDownloadPopup();
        });
    }

    if (windowsOption) {
        windowsOption.addEventListener('click', function () {
            // Logic for Windows download
            window.location.href = 'https://bucket-lb92bb.s3.ap-south-1.amazonaws.com/windows/isselo_windows.zip';
            hideDownloadPopup();
        });
    }

    // Detect OS for showing recommended download option
    detectUserOS();

    // Animate elements when scrolling into view
    setupScrollAnimations();

    // Development badge functionality
    const devBadge = document.querySelector('.dev-badge');
    if (devBadge) {
        // Add close button to dev badge
        const closeButton = document.createElement('span');
        closeButton.innerHTML = '&times;';
        closeButton.style.position = 'absolute';
        closeButton.style.right = '15px';
        closeButton.style.top = '50%';
        closeButton.style.transform = 'translateY(-50%)';
        closeButton.style.cursor = 'pointer';
        closeButton.style.fontSize = '18px';
        closeButton.style.fontWeight = 'bold';

        devBadge.style.position = 'relative';
        devBadge.appendChild(closeButton);

        // Close dev badge when clicking the close button
        closeButton.addEventListener('click', function () {
            devBadge.style.display = 'none';
            document.body.classList.remove('has-dev-badge');
        });
    }
});

// Show download popup
function showDownloadPopup() {
    const downloadPopup = document.getElementById('downloadPopup');
    if (downloadPopup) {
        downloadPopup.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

// Hide download popup
function hideDownloadPopup() {
    const downloadPopup = document.getElementById('downloadPopup');
    if (downloadPopup) {
        downloadPopup.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    }
}

// Detect user's OS and highlight the recommended option
function detectUserOS() {
    const userAgent = window.navigator.userAgent;
    const platform = window.navigator.platform;
    const androidBadge = document.querySelector('#androidOption .badge-recommended');
    const windowsBadge = document.querySelector('#windowsOption .badge-recommended');
    const macBadge = document.querySelector('#macOption .badge-recommended');
    const iosBadge = document.querySelector('#iosOption .badge-recommended');

    // Update badge text to "Current OS" instead of "Recommended"
    if (androidBadge) androidBadge.textContent = 'Current OS';
    if (windowsBadge) windowsBadge.textContent = 'Current OS';
    if (macBadge) macBadge.textContent = 'Current OS';
    if (iosBadge) iosBadge.textContent = 'Current OS';

    // Hide all badges first
    if (androidBadge) androidBadge.style.display = 'none';
    if (windowsBadge) windowsBadge.style.display = 'none';
    if (macBadge) macBadge.style.display = 'none';
    if (iosBadge) iosBadge.style.display = 'none';

    // Determine OS
    if (userAgent.indexOf("Android") !== -1) {
        if (androidBadge) androidBadge.style.display = 'block';
    } else if (userAgent.indexOf("Win") !== -1 || platform.indexOf("Win") !== -1) {
        if (windowsBadge) windowsBadge.style.display = 'block';
    } else if (userAgent.indexOf("Mac") !== -1 || platform.indexOf("Mac") !== -1) {
        // For Mac users, show macOS as current OS even if it's coming soon
        if (macBadge) macBadge.style.display = 'block';
    } else if (userAgent.indexOf("iPhone") !== -1 || userAgent.indexOf("iPad") !== -1 ||
        platform.indexOf("iPhone") !== -1 || platform.indexOf("iPad") !== -1) {
        // For iOS users, show iOS as current OS even if it's coming soon
        if (iosBadge) iosBadge.style.display = 'block';
    } else {
        // Default to Windows for unknown platforms
        if (windowsBadge) windowsBadge.style.display = 'block';
    }
}

// Add animations to elements when they scroll into view
function setupScrollAnimations() {
    // Add animated class to bento items when they come into view
    const bentoItems = document.querySelectorAll('.bento-item');
    const featuresHeading = document.querySelector('.smaller-heading');

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    // Observer for feature heading
    if (featuresHeading) {
        const headingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add a clean animation to the heading
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';

                    // Animate the highlight separately with a slight delay
                    const highlight = entry.target.querySelector('.highlight');
                    if (highlight) {
                        setTimeout(() => {
                            highlight.style.opacity = '1';
                            highlight.style.transform = 'translateY(0)';
                        }, 400);
                    }

                    headingObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Set initial styles
        featuresHeading.style.opacity = '0';
        featuresHeading.style.transform = 'translateY(20px)';
        featuresHeading.style.transition = 'all 0.8s ease';

        const highlight = featuresHeading.querySelector('.highlight');
        if (highlight) {
            highlight.style.opacity = '0';
            highlight.style.transform = 'translateY(10px)';
            highlight.style.transition = 'all 0.5s ease';
        }

        headingObserver.observe(featuresHeading);
    }

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    bentoItems.forEach((item, index) => {
        // Set initial styles
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `all 0.5s ease ${index * 0.1}s`;

        // Observe the item
        observer.observe(item);
    });
}
