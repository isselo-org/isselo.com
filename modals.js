// Download Modal Functions
function openDownloadModal() {
    const modal = document.getElementById('downloadModal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }
}

function closeDownloadModal() {
    const modal = document.getElementById('downloadModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = 'auto';
    }
}

// Form Handling
document.addEventListener('DOMContentLoaded', function () {
    const downloadForm = document.getElementById('downloadForm');

    if (downloadForm) {
        downloadForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Form validation
            const formData = new FormData(this);
            let isValid = true;

            // Validate required fields
            for (const [key, value] of formData.entries()) {
                const field = document.querySelector(`[name="${key}"]`);
                if (field && field.hasAttribute('required') && !value.trim()) {
                    field.classList.add('border-red-500');
                    isValid = false;
                } else if (field) {
                    field.classList.remove('border-red-500');
                }
            }

            if (!isValid) {
                return;
            }

            // Simulate download start
            const selectedOS = formData.get('os');
            const downloadLinks = {
                windows: 'https://download.isselo.com/windows/latest',
                mac: 'https://download.isselo.com/mac/latest',
                android: 'https://play.google.com/store/apps/details?id=com.isselo.pos',
                ios: 'https://apps.apple.com/app/isselo-pos/id123456789'
            };

            if (downloadLinks[selectedOS]) {
                window.location.href = downloadLinks[selectedOS];
                closeDownloadModal();
            }
        });
    }
}); 