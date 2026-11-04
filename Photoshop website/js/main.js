/**
 * Classic Photography - Core Motion & Interactivity Engine
 * Tailored for Indian clientele with WhatsApp integration & rich animations
 */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initNavbar();
  initHeroSlideshow();
  initPortfolioFilter();
  initLightbox();
  initBookingForm();
  initScrollAnimations();
});

/* 1. Custom Smooth Cursor */
function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  const follower = document.querySelector('.custom-cursor-follower');

  if (!cursor || !follower) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover effect on interactable elements
  const hoverElements = document.querySelectorAll('a, button, .gallery-item, .filter-btn, input, select, textarea');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      follower.style.transform = 'translate(-50%, -50%) scale(1.6)';
      follower.style.borderColor = '#ffffff';
      follower.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
    });
    el.addEventListener('mouseleave', () => {
      follower.style.transform = 'translate(-50%, -50%) scale(1)';
      follower.style.borderColor = 'rgba(255, 255, 255, 0.4)';
      follower.style.backgroundColor = 'transparent';
    });
  });
}

/* 2. Navigation & Mobile Drawer */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active state highlighting based on scroll position
    let currentSection = '';
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) {
        currentSection = sec.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    links.forEach(l => {
      l.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }
}

/* 3. Hero Dynamic Changing Background Slideshow */
function initHeroSlideshow() {
  const slides = document.querySelectorAll('.hero-slide');
  const indicators = document.querySelectorAll('.slide-indicator');
  if (!slides || slides.length === 0) return;

  let current = 0;
  const total = slides.length;
  let slideInterval = null;

  function goToSlide(index) {
    slides[current].classList.remove('active');
    if (indicators[current]) indicators[current].classList.remove('active');

    current = (index + total) % total;

    slides[current].classList.add('active');
    if (indicators[current]) indicators[current].classList.add('active');
  }

  function nextSlide() {
    goToSlide(current + 1);
  }

  function startSlideshow() {
    stopSlideshow();
    slideInterval = setInterval(nextSlide, 5200);
  }

  function stopSlideshow() {
    if (slideInterval) clearInterval(slideInterval);
  }

  indicators.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      goToSlide(idx);
      startSlideshow();
    });
  });

  startSlideshow();
}

/* 4. Portfolio Filter System */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      items.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          item.classList.remove('hide');
          item.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
          item.classList.add('hide');
        }
      });
    });
  });
}

/* 5. Lightbox Modal Preview */
function initLightbox() {
  const modal = document.getElementById('lightboxModal');
  const closeBtn = document.querySelector('.lightbox-close');
  const modalImg = document.getElementById('lightboxImg');
  const modalTitle = document.getElementById('lightboxTitle');
  const modalDesc = document.getElementById('lightboxDesc');
  const modalCategory = document.getElementById('lightboxCategory');
  const modalLocation = document.getElementById('lightboxLocation');
  const inquireBtn = document.getElementById('lightboxInquireBtn');

  if (!modal) return;

  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('.gallery-item-title')?.innerText || 'Classic Shoot';
      const cat = item.querySelector('.gallery-tag-pill')?.innerText || 'Portfolio';
      const loc = item.querySelector('.gallery-item-location')?.innerText || 'India';
      const desc = item.getAttribute('data-description') || 'Captured with precision and artistic flair for an indelible lifetime memory.';

      modalImg.src = img.src;
      modalTitle.innerText = title;
      modalCategory.innerText = cat;
      modalLocation.innerText = loc;
      modalDesc.innerText = desc;

      if (inquireBtn) {
        inquireBtn.onclick = () => {
          modal.classList.remove('active');
          const shootTypeSelect = document.getElementById('shootType');
          if (shootTypeSelect) {
            const mappedCat = item.getAttribute('data-category');
            if (mappedCat) shootTypeSelect.value = mappedCat;
          }
          const bookingSection = document.getElementById('contact');
          if (bookingSection) {
            bookingSection.scrollIntoView({ behavior: 'smooth' });
          }
        };
      }

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* 6. Contact Form & WhatsApp Direct Connect */
function initBookingForm() {
  const form = document.getElementById('bookingForm');
  const whatsappBtn = document.getElementById('whatsappBookBtn');

  if (!form) return;

  // 1-Click WhatsApp Booking Generator
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = document.getElementById('clientName')?.value.trim() || 'Client';
      const phone = document.getElementById('clientPhone')?.value.trim() || 'Not specified';
      const shoot = document.getElementById('shootType')?.value || 'Wedding Photography';
      const date = document.getElementById('shootDate')?.value || 'Upcoming Season';
      const city = document.getElementById('shootCity')?.value.trim() || 'India';
      const notes = document.getElementById('clientMessage')?.value.trim() || 'Looking forward to details.';

      const studioWhatsAppNumber = '919579295463'; // Official Studio WhatsApp Number
      const message = `*Namaste Rahul Rathod / Classic Photography!* 📸✨%0A%0A` +
        `I would like to inquire about booking a shoot with your team:%0A` +
        `• *Client Name:* ${encodeURIComponent(name)}%0A` +
        `• *Contact Number:* ${encodeURIComponent(phone)}%0A` +
        `• *Shoot Type:* ${encodeURIComponent(shoot)}%0A` +
        `• *Preferred Date:* ${encodeURIComponent(date)}%0A` +
        `• *Event Location / City:* ${encodeURIComponent(city)}%0A` +
        `• *Requirement Notes:* ${encodeURIComponent(notes)}%0A%0A` +
        `Please share your availability and package details.`;

      window.open(`https://wa.me/${studioWhatsAppNumber}?text=${message}`, '_blank');
      showToast('Opening WhatsApp with your shoot details...', 'success');
    });
  }

  // Standard Form Submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('clientName').value.trim();
    const phone = document.getElementById('clientPhone').value.trim();
    const shoot = document.getElementById('shootType').value;

    if (!name || !phone) {
      showToast('Please provide your name and phone number.', 'error');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Securing Your Slot...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      form.reset();
      showToast(`Dhanyawad ${name}! Your consultation request for ${shoot} has been logged. Rahul Rathod and our senior team will connect with you shortly.`, 'success');
    }, 1200);
  });
}

/* Toast Notification Utility */
function showToast(message, type = 'info') {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  const iconClass = type === 'success' ? 'fa-circle-check text-gold' : 'fa-circle-exclamation';
  toast.innerHTML = `<i class="fa-solid ${iconClass}"></i> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

/* 8. Scroll-triggered Reveal Animations */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.service-card, .gallery-item, .about-visual-group, .about-info, .booking-info-card, .booking-form-box');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });
}
