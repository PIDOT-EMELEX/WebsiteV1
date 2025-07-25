document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuToggle.addEventListener('click', function() {
      mobileMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
    
    mobileMenuClose.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
    
    // Mobile Dropdowns
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown > a');
    
    mobileDropdowns.forEach(dropdown => {
      dropdown.addEventListener('click', function(e) {
        e.preventDefault();
        const content = this.nextElementSibling;
        content.classList.toggle('active');
      });
    });
    
    // Close mobile menu when clicking on links
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (!this.parentElement.classList.contains('mobile-dropdown')) {
          mobileMenu.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    const announcementHeight = document.querySelector('.announcement-bar').offsetHeight;
    
    window.addEventListener('scroll', function() {
      if (window.scrollY > announcementHeight) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#') return;
        
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const headerHeight = header.offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Initialize sliders
    initSliders();
    
    // Initialize animations
    initAnimations();
    
    // Initialize counters
    initCounters();
  });
  
  function initSliders() {
    // Case Study Slider
    const caseStudySlider = document.querySelector('.case-study-slider');
    if (caseStudySlider) {
      const caseStudies = caseStudySlider.querySelectorAll('.case-study');
      const prevBtn = document.querySelector('.slider-prev');
      const nextBtn = document.querySelector('.slider-next');
      
      let currentIndex = 0;
      
      function showCaseStudy(index) {
        caseStudies.forEach((study, i) => {
          study.style.display = i === index ? 'grid' : 'none';
        });
      }
      
      prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + caseStudies.length) % caseStudies.length;
        showCaseStudy(currentIndex);
      });
      
      nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % caseStudies.length;
        showCaseStudy(currentIndex);
      });
      
      // Show first case study initially
      showCaseStudy(0);
    }
    
    // Testimonial Slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
      const testimonials = testimonialSlider.querySelectorAll('.testimonial');
      let currentTestimonial = 0;
      
      function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
          testimonial.style.display = i === index ? 'block' : 'none';
        });
      }
      
      // Auto-rotate testimonials
      setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
      }, 5000);
      
      // Show first testimonial initially
      showTestimonial(0);
    }
  }
  
  function initAnimations() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkScroll() {
      animateElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
          element.classList.add('animated');
          
          if (element.classList.contains('slide-up')) {
            element.classList.add('slide-up');
          }
        }
      });
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
  }
  
  function initCounters() {
  const counters = document.querySelectorAll('.stat-number');

  const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-count');
    let count = 0;

    const step = () => {
      const increment = Math.max(1, Math.ceil(target / 100)); // Adjustable for speed
      count += increment;

      if (count < target) {
        counter.innerText = count;
        requestAnimationFrame(step);
      } else {
        counter.innerText = target;
      }
    };

    step();
  };

  // Start counting when stats section is in view
  // const statsSection = document.querySelector('.stats-section');
  // const observer = new IntersectionObserver((entries) => {
  //   if (entries[0].isIntersecting) {
  //     counters.forEach(counter => animateCounter(counter));
  //     observer.unobserve(statsSection);
  //   }
  // });

  // if (statsSection) {
  //   observer.observe(statsSection);
  // }
}





document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.stats-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animate counters
                const statNumbers = document.querySelectorAll('.stat-number');
                statNumbers.forEach(number => {
                    const target = parseInt(number.getAttribute('data-count'));
                    const duration = 1800;
                    const start = 0;
                    const increment = target / (duration / 16);
                    let current = start;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            clearInterval(timer);
                            current = target;
                        }
                        number.textContent = Math.floor(current);
                    }, 16);
                });
            }
        });
    }, { threshold: 0.2 });

    observer.observe(statsSection);
});
