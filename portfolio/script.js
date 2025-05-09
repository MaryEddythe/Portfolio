document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();
  
  // Initialize animations
  initCursor();
  initNavbar();
  initHeroBackground();
  initTypewriter();
  initScrollAnimations();
  initContactForm();
});

// Custom cursor
function initCursor() {
  const cursorOuter = document.querySelector('.cursor-outer');
  const cursorInner = document.querySelector('.cursor-inner');
  
  document.addEventListener('mousemove', (e) => {
    // Add smooth animation with requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      // Position the outer cursor with spring effect
      const outerX = e.clientX;
      const outerY = e.clientY;
      
      cursorOuter.style.transform = `translate(${outerX - 16}px, ${outerY - 16}px)`;
      cursorInner.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
    });
  });
  
  // Hide cursor when leaving the window
  document.addEventListener('mouseout', () => {
    cursorOuter.style.opacity = '0';
    cursorInner.style.opacity = '0';
  });
  
  document.addEventListener('mouseover', () => {
    cursorOuter.style.opacity = '1';
    cursorInner.style.opacity = '1';
  });
  
  // Scale cursor on clickable elements
  const clickables = document.querySelectorAll('a, button, input, textarea, .project-card');
  clickables.forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursorOuter.style.transform = `translate(${cursorOuter.offsetLeft}px, ${cursorOuter.offsetTop}px) scale(1.5)`;
      cursorOuter.style.backgroundColor = 'rgba(139, 92, 246, 0.2)';
      cursorOuter.style.borderColor = 'transparent';
    });
    
    element.addEventListener('mouseleave', () => {
      cursorOuter.style.transform = `translate(${cursorOuter.offsetLeft}px, ${cursorOuter.offsetTop}px) scale(1)`;
      cursorOuter.style.backgroundColor = 'transparent';
      cursorOuter.style.borderColor = 'var(--accent-primary)';
    });
  });
}

// Navbar scroll effect
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Hero background blobs
function initHeroBackground() {
  const heroBg = document.querySelector('.hero-bg');
  
  // Create blobs
  for (let i = 0; i < 20; i++) {
    const blob = document.createElement('div');
    blob.classList.add('blob');
    
    // Random size
    const size = Math.random() * 300 + 50;
    blob.style.width = `${size}px`;
    blob.style.height = `${size}px`;
    
    // Random position
    blob.style.left = `${Math.random() * 100}%`;
    blob.style.top = `${Math.random() * 100}%`;
    
    // Random opacity
    blob.style.opacity = 0.1 + Math.random() * 0.2;
    
    heroBg.appendChild(blob);
  }
  
  // Animate blobs on mousemove
  const hero = document.querySelector('.hero');
  hero.addEventListener('mousemove', (e) => {
    const { left, top, width, height } = hero.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    const blobs = document.querySelectorAll('.blob');
    blobs.forEach((blob, index) => {
      const factor = (index % 5) + 1;
      blob.style.transform = `translate(${x * 20 * factor}px, ${y * 20 * factor}px)`;
    });
  });
}

// Typewriter effect
function initTypewriter() {
  const typewriterElement = document.querySelector('.typewriter-text');
  if (!typewriterElement) return;
  
  const texts = JSON.parse(typewriterElement.getAttribute('data-text'));
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      typewriterElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typewriterElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      typingSpeed = 1000; // Pause at the end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingSpeed = 500; // Pause before typing next
    }
    
    setTimeout(type, typingSpeed);
  }
  
  // Start the typewriter effect
  setTimeout(type, 1000);
}

// Scroll animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.about-content, .stats, .project-grid, .contact-content');
  
  animatedElements.forEach(element => {
    element.classList.add('fade-in');
  });
  
  function checkScroll() {
    animatedElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('visible');
      }
    });
  }
  
  // Check elements on load
  checkScroll();
  
  // Check elements on scroll
  window.addEventListener('scroll', checkScroll);
}

// Contact form
function initContactForm() {
  const form = document.getElementById('contactForm');
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Simple validation
      if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
      }

      alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
      form.reset();
    });
  }
}