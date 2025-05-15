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

// Download Popup Functionality
document.addEventListener('DOMContentLoaded', () => {
    const downloadPopup = document.getElementById('downloadPopup');
    const closePopupBtn = document.getElementById('closePopup');
    const downloadButtons = document.querySelectorAll('.btn-secondary');

    const androidOption = document.getElementById('androidOption');
    const windowsOption = document.getElementById('windowsOption');
    const macOption = document.getElementById('macOption');
    const iosOption = document.getElementById('iosOption');

    const ANDROID_DOWNLOAD_URL = 'https://bucket-lb92bb.s3.ap-south-1.amazonaws.com/android/app-release.apk';
    const WINDOWS_DOWNLOAD_URL = 'https://bucket-lb92bb.s3.ap-south-1.amazonaws.com/windows/Isselo_2_artifacts.zip';

    // Detect user's OS and highlight the appropriate option
    function detectOS() {
        const userAgent = window.navigator.userAgent.toLowerCase();
        let detectedOS = '';

        if (/android/i.test(userAgent)) {
            detectedOS = 'android';
            androidOption.classList.add('recommended');
        } else if (/windows/i.test(userAgent)) {
            detectedOS = 'windows';
            windowsOption.classList.add('recommended');
        } else if (/macintosh|mac os x/i.test(userAgent)) {
            detectedOS = 'mac';
            // Mac is coming soon, so we don't add a download link
        } else if (/iphone|ipad|ipod/i.test(userAgent)) {
            detectedOS = 'ios';
            // iOS is coming soon, so we don't add a download link
        }

        return detectedOS;
    }

    // Show download popup
    function showDownloadPopup() {
        downloadPopup.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when popup is open
        detectOS();
    }

    // Hide download popup
    function hideDownloadPopup() {
        downloadPopup.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Start download based on OS
    function startDownload(os) {
        if (os === 'android') {
            window.location.href = ANDROID_DOWNLOAD_URL;
        } else if (os === 'windows') {
            window.location.href = WINDOWS_DOWNLOAD_URL;
        }

        // Close popup after starting download
        setTimeout(hideDownloadPopup, 1000);
    }

    // Add click event listeners to download buttons
    downloadButtons.forEach(button => {
        if (button.textContent.trim() === 'Download Now') {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                showDownloadPopup();
            });
        }
    });

    // Close popup when clicking the close button
    closePopupBtn.addEventListener('click', hideDownloadPopup);

    // Close popup when clicking outside the popup content
    downloadPopup.addEventListener('click', (e) => {
        if (e.target === downloadPopup) {
            hideDownloadPopup();
        }
    });

    // Add click event listeners to OS options
    androidOption.addEventListener('click', () => {
        startDownload('android');
    });

    windowsOption.addEventListener('click', () => {
        startDownload('windows');
    });

    // Escape key to close popup
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && downloadPopup.classList.contains('active')) {
            hideDownloadPopup();
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Download popup functionality
    const downloadLinks = document.querySelectorAll('a[href="#download"]');
    const downloadPopup = document.getElementById('downloadPopup');
    const closePopup = document.getElementById('closePopup');

    if (downloadLinks && downloadPopup && closePopup) {
        downloadLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                downloadPopup.style.display = 'flex';
            });
        });

        closePopup.addEventListener('click', function () {
            downloadPopup.style.display = 'none';
        });

        // Close popup when clicking outside
        window.addEventListener('click', function (e) {
            if (e.target === downloadPopup) {
                downloadPopup.style.display = 'none';
            }
        });
    }

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
