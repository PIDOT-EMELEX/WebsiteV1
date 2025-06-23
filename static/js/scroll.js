const header = document.querySelector('header');
    const announcementHeight = document.querySelector('.announcement-bar').offsetHeight;
    
    window.addEventListener('scroll', function() {
      if (window.scrollY > announcementHeight) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    });