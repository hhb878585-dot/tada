document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    const hamburger = document.querySelector('.hamburger');
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav a');
    if (hamburger && header) {
        hamburger.addEventListener('click', () => {
            header.classList.toggle('nav-open');
            hamburger.classList.toggle('open');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                header.classList.remove('nav-open');
                hamburger.classList.remove('open');
            });
        });
    }

    const galleryMain = document.querySelector('.gallery-main');
    const dots = Array.from(document.querySelectorAll('.gallery-dots .dot'));
    const thumbs = Array.from(document.querySelectorAll('.thumb'));
    const prevBtn = document.querySelector('.gallery-nav.prev');
    const nextBtn = document.querySelector('.gallery-nav.next');
    const galleryImages = [
        { src: 'assets/product-main.webp', alt: 'Product composition' },
        { src: 'assets/bottle-arose.webp', alt: 'Product detail' },
        { src: 'assets/bottle-amber.webp', alt: 'Product detail' },
        { src: 'assets/bottle-bella.webp', alt: 'Product detail' }
    ];
    let galleryIndex = 0;

    const setGalleryImage = (index, direction = 0) => {
        galleryIndex = (index + galleryImages.length) % galleryImages.length;
        if (galleryMain) {
            galleryMain.classList.remove('slide-left', 'slide-right');
            void galleryMain.offsetWidth; // force reflow to restart animation
            if (direction < 0) galleryMain.classList.add('slide-left');
            if (direction > 0) galleryMain.classList.add('slide-right');
        }
        const item = galleryImages[galleryIndex];
        if (galleryMain) {
            galleryMain.src = item.src;
            galleryMain.alt = item.alt;
            galleryMain.dataset.index = String(galleryIndex);
        }
        dots.forEach(dot => dot.classList.toggle('active', Number(dot.dataset.index) === galleryIndex));
        thumbs.forEach(thumb => thumb.classList.remove('active'));
        const firstMatch = thumbs.find(thumb => Number(thumb.dataset.index) === galleryIndex);
        if (firstMatch) firstMatch.classList.add('active');
    };

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const target = Number(dot.dataset.index);
            const dir = target > galleryIndex ? 1 : -1;
            setGalleryImage(target, dir);
        });
    });

    thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const target = Number(thumb.dataset.index);
            const dir = target > galleryIndex ? 1 : -1;
            setGalleryImage(target, dir);
        });
    });

    if (prevBtn) prevBtn.addEventListener('click', () => setGalleryImage(galleryIndex - 1, -1));
    if (nextBtn) nextBtn.addEventListener('click', () => setGalleryImage(galleryIndex + 1, 1));

    setGalleryImage(0, 0);

    const fragranceGroups = document.querySelectorAll('.fragrance-options');
    fragranceGroups.forEach(group => {
        const options = group.querySelectorAll('.fragrance-option');
        options.forEach(option => {
            option.addEventListener('click', () => {
                options.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                const radio = option.querySelector('input[type="radio"]');
                if (radio) radio.checked = true;
                updateCartLink();
            });
        });
    });

    const subscriptionRadios = document.querySelectorAll('input[name="subscription"]');
    const detailBlocks = document.querySelectorAll('.subscription-details');

    const showSubscriptionDetails = (value) => {
        detailBlocks.forEach(block => {
            block.classList.toggle('open', block.dataset.subscription === value);
        });
        document.querySelectorAll('.subscription-card').forEach(card => {
            card.classList.toggle('selected', card.querySelector(`input[name="subscription"][value="${value}"]`)?.checked);
        });
    };

    subscriptionRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            showSubscriptionDetails(radio.value);
            updateCartLink();
        });
    });

    const getSelectedSubscription = () => {
        const active = document.querySelector('input[name="subscription"]:checked');
        return active ? active.value : 'single';
    };

    const getFragranceFromGroup = (group) => {
        if (!group) return '';
        const active = group.querySelector('.fragrance-option.active input[type="radio"]');
        if (active) return active.value;
        const checked = group.querySelector('input[type="radio"]:checked');
        return checked ? checked.value : '';
    };

    const getSelectedFragrances = (plan) => {
        const detail = document.querySelector(`.subscription-details[data-subscription="${plan}"]`);
        const primaryGroup = detail?.querySelector('.fragrance-options[data-role="primary"]');
        const secondaryGroup = detail?.querySelector('.fragrance-options[data-role="secondary"]');
        return {
            primary: getFragranceFromGroup(primaryGroup) || 'original',
            secondary: getFragranceFromGroup(secondaryGroup)
        };
    };

    const cartLink = document.querySelector('#addToCartLink');
    const updateCartLink = () => {
        if (!cartLink) return;
        const plan = getSelectedSubscription();
        const { primary, secondary } = getSelectedFragrances(plan);
        let url = `https://example.com/cart?plan=${plan}&fragrance=${primary}`;
        if (secondary) url += `&fragrance2=${secondary}`;
        cartLink.href = url;
    };

    showSubscriptionDetails(getSelectedSubscription());
    updateCartLink();

    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]')?.value;
            if (email) {
                alert('Thank you for subscribing!');
                newsletterForm.reset();
            }
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetSelector = anchor.getAttribute('href');
            if (!targetSelector || targetSelector === '#') return;
            const target = document.querySelector(targetSelector);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    const counters = document.querySelectorAll('[data-count]');
    counters.forEach(counter => {
        counter.textContent = '0%';
    });
    const runCounter = (el) => {
        const target = Number(el.dataset.count || '0');
        let current = 0;
        const step = Math.max(1, Math.floor(target / 60));
        const interval = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(interval);
            }
            el.textContent = `${current}%`;
        }, 20);
    };

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counters.forEach(counter => {
                        if (!counter.dataset.started) {
                            counter.dataset.started = 'true';
                            runCounter(counter);
                        }
                    });
                }
            });
        }, { threshold: 0.3 });
        const targetSection = document.querySelector('.brand-values-section');
        if (targetSection) observer.observe(targetSection);
    } else {
        counters.forEach(runCounter);
    }
});

