 const faqContainer = document.querySelector('.faq-container');
    const seeMoreBtn = document.querySelector('.see-more-btn');
    
    if (faqContainer && seeMoreBtn) {
        const faqItems = document.querySelectorAll('.faq-item');
        
        // Initialize with only 3 FAQs visible
        faqContainer.classList.add('hidden-faqs');
        seeMoreBtn.textContent = 'See More FAQs';
        
        // Toggle individual FAQ items
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Close all other open items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        });

        // Toggle See More/Less functionality
        seeMoreBtn.addEventListener('click', function() {
            faqContainer.classList.toggle('hidden-faqs');
            
            // Update button text
            if (faqContainer.classList.contains('hidden-faqs')) {
                seeMoreBtn.textContent = 'See More FAQs';
                
                // Close any expanded FAQs beyond the first 3
                faqItems.forEach((item, index) => {
                    if (index >= 3 && item.classList.contains('active')) {
                        item.classList.remove('active');
                    }
                });
            } else {
                seeMoreBtn.textContent = 'See Less FAQs';
            }
        });
    }



    // -------EDUSPHERE---------//
       // Intersection Observer for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const animateOnScroll = function() {
        const elements = document.querySelectorAll(
            '.section-title, .floating-card, .gradient-card, ' +
            '.grid-item, .number-card, .edu-card, .stat-item'
        );
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        elements.forEach(element => {
            element.style.animationPlayState = 'paused';
            element.style.opacity = '0';
            observer.observe(element);
        });
    };
    
    // Smooth scroll for anchor links
    const setupSmoothScroll = function() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update URL without jumping
                    if (history.pushState) {
                        history.pushState(null, null, targetId);
                    } else {
                        location.hash = targetId;
                    }
                }
            });
        });
    };
    
    // Card hover effects
    const setupCardHoverEffects = function() {
        const cards = document.querySelectorAll('.floating-card, .gradient-card, .number-card, .edu-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
            });
        });
    };
    
    // Initialize all functions
    animateOnScroll();
    setupSmoothScroll();
    setupCardHoverEffects();
    
    // Optional: Add resize observer for responsive adjustments
    const resizeObserver = new ResizeObserver(entries => {
        // You could add responsive JS logic here if needed
    });
    resizeObserver.observe(document.body);
});


// -------GENESIS---------//

// Intersection Observer for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const animateOnScroll = function() {
        const elements = document.querySelectorAll(
            '.section-title, .floating-card, .gradient-card, ' +
            '.grid-item, .number-card, .edu-card, .stat-item'
        );
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        elements.forEach(element => {
            element.style.animationPlayState = 'paused';
            element.style.opacity = '0';
            observer.observe(element);
        });
    };
    
    // Smooth scroll for anchor links
    const setupSmoothScroll = function() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update URL without jumping
                    if (history.pushState) {
                        history.pushState(null, null, targetId);
                    } else {
                        location.hash = targetId;
                    }
                }
            });
        });
    };
    
    // Card hover effects
    const setupCardHoverEffects = function() {
        const cards = document.querySelectorAll('.floating-card, .gradient-card, .number-card, .edu-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
            });
        });
    };
    
    // Initialize all functions
    animateOnScroll();
    setupSmoothScroll();
    setupCardHoverEffects();
    
    // Optional: Add resize observer for responsive adjustments
    const resizeObserver = new ResizeObserver(entries => {
        // You could add responsive JS logic here if needed
    });
    resizeObserver.observe(document.body);
});



// ------2-------

// Optional AOS fade-in effect
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".program-card");

  cards.forEach(card => {
    if (window.innerWidth < 768) {
      card.addEventListener("click", () => {
        card.classList.toggle("expanded");
      });
    }
  });
});


// -----3-------


 let currentSlide = 0;
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
            dots[i].classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Auto-rotate every 6s
    setInterval(nextSlide, 6000);

    // Dots click
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            currentSlide = parseInt(dot.dataset.index);
            showSlide(currentSlide);
        });
    });








const data = [
  { dateLabel: 'January 2017', title: 'Gathering Information' },
  { dateLabel: 'February 2017', title: 'Planning' },
  { dateLabel: 'March 2017', title: 'Design' },
  { dateLabel: 'April 2017', title: 'Content Writing and Assembly' },
  { dateLabel: 'May 2017', title: 'Coding' },
  { dateLabel: 'June 2017', title: 'Testing, Review & Launch' },
  { dateLabel: 'July 2017', title: 'Maintenance' }
];

new Vue({
  el: '#app', 
  data: {
    steps: data,
  },
  mounted() {
    var swiper = new Swiper('.swiper-container', {
      //pagination: '.swiper-pagination',
      slidesPerView: 4,
      paginationClickable: true,
      grabCursor: true,
      paginationClickable: true,
      nextButton: '.next-slide',
      prevButton: '.prev-slide',
    });    
  }
})