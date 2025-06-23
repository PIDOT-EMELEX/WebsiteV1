// Testimonial Carousel
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');

function showTestimonial(n) {
  testimonials.forEach(testimonial => testimonial.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  currentTestimonial = (n + testimonials.length) % testimonials.length;
  testimonials[currentTestimonial].classList.add('active');
  dots[currentTestimonial].classList.add('active');
}

// Auto-rotate testimonials every 5s
setInterval(() => showTestimonial(currentTestimonial + 1), 5000);

// Dot click handlers
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => showTestimonial(index));
});