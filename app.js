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
    // Mobile menu toggle functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', function () {
            this.classList.toggle('active');
            mobileNav.classList.toggle('active');

            // Prevent scrolling when menu is open
            if (mobileNav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close mobile menu when clicking a nav link
        const mobileNavLinks = mobileNav.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

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

// Handle demo form submission
document.addEventListener('DOMContentLoaded', function () {
    const demoForm = document.getElementById('demoForm');

    if (demoForm) {
        demoForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(demoForm);
            const formValues = Object.fromEntries(formData.entries());

            // For now, we'll just log the form data and show a success message
            console.log('Form submitted with values:', formValues);

            // Show success message
            showFormSuccess(demoForm);

            // In a real implementation, you would send this data to your server
            // using fetch or another AJAX method
            // fetch('/api/submit-demo-form', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(formValues),
            // })
            // .then(response => response.json())
            // .then(data => {
            //     showFormSuccess(demoForm);
            // })
            // .catch(error => {
            //     console.error('Error submitting form:', error);
            //     showFormError(demoForm);
            // });
        });
    }
});

function showFormSuccess(form) {
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success-message';
    successMessage.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="#4CAF50">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        <h3>Thank You!</h3>
        <p>We've received your demo request and will contact you shortly to schedule your personalized walkthrough.</p>
        <button class="btn btn-secondary" id="returnToForm"><span>Back to Form</span></button>
    `;

    // Hide the form and show success message
    form.style.display = 'none';
    form.parentNode.appendChild(successMessage);

    // Add click event to return button
    document.getElementById('returnToForm').addEventListener('click', function () {
        // Reset and show the form
        form.reset();
        form.style.display = 'block';

        // Remove success message
        form.parentNode.removeChild(successMessage);
    });
}

function showFormError(form) {
    // For error handling if needed
    const errorMessage = document.createElement('div');
    errorMessage.className = 'form-error-message';
    errorMessage.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="#F44336">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
        <h3>Something went wrong</h3>
        <p>We couldn't process your request. Please try again or contact us directly.</p>
        <button class="btn btn-secondary" id="dismissError"><span>Try Again</span></button>
    `;

    // Show error message
    form.insertAdjacentElement('beforebegin', errorMessage);

    // Add click event to dismiss button
    document.getElementById('dismissError').addEventListener('click', function () {
        errorMessage.parentNode.removeChild(errorMessage);
    });
}

// Handle FAQ accordion functionality
document.addEventListener('DOMContentLoaded', function () {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        if (question) {
            question.addEventListener('click', () => {
                // Check if this item is already active
                const isActive = item.classList.contains('active');

                // Close all items
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                });

                // If the clicked item wasn't active, open it
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // Open the first FAQ item by default
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }
});

// Lead Capture Popup
document.addEventListener('DOMContentLoaded', function () {
    const leadPopup = document.getElementById('leadCapturePopup');
    const closeLeadPopup = document.getElementById('closeLeadPopup');
    const leadForm = document.getElementById('leadForm');
    let hasShownPopup = false;

    // Show popup when user scrolls down 30% of the page
    function checkScroll() {
        if (!hasShownPopup) {
            const scrollHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;
            const scrolled = window.scrollY;
            const scrollPercent = (scrolled / (scrollHeight - windowHeight)) * 100;

            if (scrollPercent > 12) {
                setTimeout(() => {
                    leadPopup.classList.add('show');
                }, 500);
                hasShownPopup = true;
            }
        }
    }

    // Add scroll event listener
    window.addEventListener('scroll', checkScroll);

    // Close popup when clicking the close button
    if (closeLeadPopup) {
        closeLeadPopup.addEventListener('click', () => {
            leadPopup.classList.remove('show');
            // Reset hasShownPopup so it can show again on next scroll
            hasShownPopup = false;
        });
    }

    // Close popup when clicking outside
    leadPopup.addEventListener('click', (e) => {
        if (e.target === leadPopup) {
            leadPopup.classList.remove('show');
            // Reset hasShownPopup so it can show again on next scroll
            hasShownPopup = false;
        }
    });

    // Handle form submission
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('leadName').value;
            const phone = document.getElementById('leadPhone').value;

            // Here you would typically send the data to your server
            console.log('Lead captured:', { name, phone });

            // Show success message
            leadForm.innerHTML = `
                <div class="success-message">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="#22C55E"/>
                        <path d="M22 4L12 14.01l-3-3" stroke="#22C55E"/>
                    </svg>
                    <h4>Thank You!</h4>
                    <p>We'll contact you shortly to get you started.</p>
                </div>
            `;

            // Hide popup after 3 seconds
            setTimeout(() => {
                leadPopup.classList.remove('show');
                // Reset hasShownPopup so it can show again on next scroll
                hasShownPopup = false;
            }, 3000);
        });
    }
});
