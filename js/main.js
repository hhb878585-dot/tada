
const slides = [
  { src: 'https://placehold.co/400x500/dec5e9/ffffff.png', alt: 'Lavender' },
  { src: 'https://placehold.co/400x500/f4e7c5/ffffff.png', alt: 'Citrus' },
  { src: 'https://placehold.co/400x500/f6d9d9/ffffff.png', alt: 'Rose' },
  { src: 'https://placehold.co/400x500/e0f0e7/ffffff.png', alt: 'Green' }
];

const thumbsContainer = document.getElementById('thumbs');
const dotsContainer = document.getElementById('dots');
const mainImage = document.getElementById('mainImage');
const addToCart = document.getElementById('addToCart');
const expandableBlocks = document.querySelectorAll('.expandable');

let currentSlide = 0;

function renderThumbs() {
  slides.forEach((slide, index) => {
    const img = document.createElement('img');
    img.src = slide.src;
    img.alt = slide.alt;
    img.loading = 'lazy';
    img.dataset.index = index;
    img.addEventListener('click', () => setSlide(index));
    thumbsContainer.appendChild(img);

    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.dataset.index = index;
    dot.addEventListener('click', () => setSlide(index));
    dotsContainer.appendChild(dot);
  });
  updateActive();
}

function setSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  const slide = slides[currentSlide];
  mainImage.src = slide.src;
  mainImage.alt = slide.alt;
  updateActive();
}

function updateActive() {
  thumbsContainer.querySelectorAll('img').forEach((img, i) => {
    img.classList.toggle('active', i === currentSlide);
  });
  dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

document.getElementById('prevSlide').addEventListener('click', () => setSlide(currentSlide - 1));
document.getElementById('nextSlide').addEventListener('click', () => setSlide(currentSlide + 1));

renderThumbs();
setSlide(0);

function updateCartLink() {
  const fragrance = document.querySelector('input[name="fragrance"]:checked').value;
  const purchase = document.querySelector('input[name="purchase"]:checked').value;
  const url = `https://example.com/cart?fragrance=${fragrance}&type=${purchase}`;
  addToCart.href = url;
}

document.querySelectorAll('input[name="fragrance"]').forEach(input => {
  input.addEventListener('change', updateCartLink);
});

document.querySelectorAll('input[name="purchase"]').forEach(input => {
  input.addEventListener('change', e => {
    updateCartLink();
    toggleExpand(e.target.value);
  });
});

function toggleExpand(value) {
  expandableBlocks.forEach(block => {
    block.style.display = block.dataset.plan === value ? 'block' : 'none';
  });
}

toggleExpand(document.querySelector('input[name="purchase"]:checked').value);
updateCartLink();

const numberBlocks = document.querySelectorAll('.number');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = Number(entry.target.dataset.target);
      const valueEl = entry.target.querySelector('.number-value');
      animateCount(valueEl, target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

numberBlocks.forEach(block => observer.observe(block));

function animateCount(el, target) {
  let start = 0;
  const duration = 1200;
  const startTime = performance.now();
  function frame(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(start + (target - start) * eased);
    el.textContent = `${value}%`;
    if (progress < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('open');
});
