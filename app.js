const galleryImages = Array.from(document.querySelectorAll('.gallery-image'));
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const closeButton = document.getElementById('lightbox-close');
const contactModal = document.getElementById('contact-modal');
const openContactModalButtons = Array.from(document.querySelectorAll('[data-open-contact-modal]'));
const closeContactModalButtons = Array.from(document.querySelectorAll('[data-close-contact-modal]'));
// Initialize all image carousels for menu items
const carousels = Array.from(document.querySelectorAll('.menu-image-carousel'));

if (galleryImages.length && lightbox && lightboxImage) {
  galleryImages.forEach((image) => {
    image.addEventListener('click', () => {
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
  };

  closeButton?.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeLightbox();
    }
  });
}

if (contactModal) {
  const openContactModal = () => {
    contactModal.classList.add('open');
    contactModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  };

  const closeContactModal = () => {
    contactModal.classList.remove('open');
    contactModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  };

  openContactModalButtons.forEach((button) => {
    button.addEventListener('click', openContactModal);
  });

  closeContactModalButtons.forEach((button) => {
    button.addEventListener('click', closeContactModal);
  });

  contactModal.addEventListener('click', (event) => {
    if (event.target === contactModal) {
      closeContactModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeContactModal();
    }
  });
}

if (carousels.length) {
  carousels.forEach((carousel) => {
    const carouselImages = Array.from(carousel.querySelectorAll('img'));
    let activeIndex = 0;
    let carouselInterval = null;

    const showImage = (index) => {
      carouselImages.forEach((image, idx) => {
        image.classList.toggle('active', idx === index);
      });
    };

    const nextImage = () => {
      activeIndex = (activeIndex + 1) % carouselImages.length;
      showImage(activeIndex);
    };

    const startCarousel = () => {
      if (carouselInterval) return;
      carouselInterval = setInterval(nextImage, 3200);
    };

    const stopCarousel = () => {
      clearInterval(carouselInterval);
      carouselInterval = null;
    };

    showImage(activeIndex);
    startCarousel();

    carousel.addEventListener('click', nextImage);
    carousel.addEventListener('mouseenter', stopCarousel);
    carousel.addEventListener('focus', stopCarousel);
    carousel.addEventListener('mouseleave', startCarousel);
    carousel.addEventListener('blur', startCarousel);
  });
}
