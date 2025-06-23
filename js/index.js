document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // Slider Functionality
    // ======================
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    
    if (slides.length > 0) {
        let currentSlide = 0;
        const slideCount = slides.length;
        let slideInterval;

        // Show specific slide
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            currentSlide = index;
        }

        // Go to next slide
        function nextSlide() {
            let newIndex = (currentSlide + 1) % slideCount;
            showSlide(newIndex);
        }

        // Start auto-sliding
        function startSlider() {
            slideInterval = setInterval(nextSlide, 5000);
        }

        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(slideInterval);
                showSlide(index);
                startSlider();
            });
        });

        // Initialize slider
        startSlider();

        // Pause on hover
        const slider = document.querySelector('.hero-slider');
        if (slider) {
            slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
            slider.addEventListener('mouseleave', startSlider);
        }
    }

    // ======================
    // FAQ Functionality
    // ======================
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

    // ======================
    // Scroll Animations
    // ======================
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    if (animateElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        animateElements.forEach(element => {
            observer.observe(element);
        });
    }

    // ======================
    // Form Submission
    // ======================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Add your form submission logic here
            // e.preventDefault();
            // Submit form via AJAX or let it submit normally
        });
    }
});