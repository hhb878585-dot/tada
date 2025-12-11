// Accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const isActive = accordionItem.classList.contains('active');

            // Close all accordion items
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                accordionItem.classList.add('active');
            }
        });
    });

    // Fragrance selection functionality
    const fragranceOptions = document.querySelectorAll('.fragrance-option');

    fragranceOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            fragranceOptions.forEach(opt => opt.classList.remove('active'));

            // Add active class to clicked option
            this.classList.add('active');

            // Check the radio button
            const radio = this.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
            }
        });
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;

            if (email) {
                alert('Thank you for subscribing!');
                this.reset();
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add to cart functionality
    const addToCartBtn = document.querySelector('.btn-full');

    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const selectedFragrance = document.querySelector('.fragrance-option.active');
            const selectedSubscription = document.querySelector('input[name="subscription"]:checked');

            if (selectedFragrance && selectedSubscription) {
                const fragranceName = selectedFragrance.querySelector('.fragrance-header span').textContent;
                const subscriptionType = selectedSubscription.nextElementSibling.textContent;

                alert(`Added to cart:\n${fragranceName} - ${subscriptionType}`);
            }
        });
    }

    // Subscription radio button changes
    const subscriptionRadios = document.querySelectorAll('input[name="subscription"]');

    subscriptionRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            // Update UI based on selected subscription
            const cards = document.querySelectorAll('.subscription-card');
            cards.forEach(card => {
                card.classList.remove('selected');
            });

            this.closest('.subscription-card').classList.add('selected');
        });
    });
});
