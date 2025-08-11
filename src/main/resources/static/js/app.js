// Scroll animation for elements
document.addEventListener('DOMContentLoaded', () => {
  // Animate cards on scroll
  const animateCards = () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('visible');
      }, 100 * index);
    });
  };

  // Animate skill bars on scroll
  const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach((bar) => {
      const progress = bar.getAttribute('data-progress') || 0;
      bar.style.width = '0';
      setTimeout(() => {
        bar.style.width = `${progress}%`;
      }, 300);
    });
  };

  // Intersection Observer for sections
  const observeSections = () => {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.id === 'skills') {
            animateSkillBars();
          } else if (entry.target.id === 'projects') {
            animateCards();
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    sections.forEach(section => {
      observer.observe(section);
    });
  };

  // Initialize animations
  observeSections();

  // Navbar scroll effect
  const navbar = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Project card hover effects
  const projectCards = document.querySelectorAll('.card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.querySelector('img')?.classList.add('img-hover');
    });
    card.addEventListener('mouseleave', () => {
      card.querySelector('img')?.classList.remove('img-hover');
    });
  });
});

// Glitch text effect for main heading
const glitchText = () => {
  const glitchElement = document.querySelector('.glitch-text');
  if (!glitchElement) return;
  
  setInterval(() => {
    glitchElement.classList.add('glitch-active');
    setTimeout(() => {
      glitchElement.classList.remove('glitch-active');
    }, 200);
  }, 5000);
};

// Initialize glitch effect
setTimeout(glitchText, 2000);

// Cursor blink effect
setInterval(() => {
  const cursor = document.querySelector('.cursor');
  if (cursor) {
    cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
  }
}, 500);

// Parallax effect for background elements
document.addEventListener('mousemove', (e) => {
  const blob = document.querySelector('.blob-bg');
  if (blob) {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    blob.style.transform = `translate(-50%, -50%) translate(${x * 20}px, ${y * 20}px)`;
  }
});

// Form validation
const validateForm = (form) => {
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  
  if (name.length < 2) {
    showNotification('Please enter a valid name', 'error');
    return false;
  }
  
  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    showNotification('Please enter a valid email address', 'error');
    return false;
  }
  
  if (message.length < 10) {
    showNotification('Message must be at least 10 characters long', 'error');
    return false;
  }
  
  return true;
};

// Show notification
const showNotification = (message, type = 'success') => {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${message}`;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('fade-out');
    setTimeout(() => notification.remove(), 500);
  }, 5000);
};

// Preload images for better performance
const preloadImages = () => {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    const src = img.getAttribute('src');
    if (src) {
      const newImg = new Image();
      newImg.src = src;
    }
  });
};

// Call preload on window load
window.addEventListener('load', preloadImages);
