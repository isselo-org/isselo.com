// Contact Form Handling
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitSpinner = document.getElementById('submitSpinner');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Show loading spinner
            submitSpinner.classList.remove('hidden');

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

            // Validate email format
            const email = formData.get('email');
            const emailField = document.querySelector('[name="email"]');
            if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                emailField.classList.add('border-red-500');
                isValid = false;
            }

            if (!isValid) {
                // Show error message
                formStatus.textContent = 'Please check the form for errors';
                formStatus.className = 'bg-red-100 text-red-700 p-4 rounded-lg mt-4';
                formStatus.classList.remove('hidden');
                submitSpinner.classList.add('hidden');
                return;
            }

            // Simulate form submission (replace with actual AJAX submission)
            setTimeout(() => {
                // Success message
                contactForm.innerHTML = `
                    <div class="text-center py-8" role="status">
                        <svg class="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <h4 class="text-xl font-bold mb-2">Message Sent!</h4>
                        <p class="text-gray-600">Thank you for reaching out. We'll get back to you shortly.</p>
                    </div>
                `;
            }, 1500);
        });
    }
}); 