/* ===================================================
   DARIA MŁYNEK PORTFOLIO — JAVASCRIPT
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- Elements ---
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  const navOverlay = document.getElementById('navOverlay');
  const scrollTopBtn = document.getElementById('scrollTop');
  const navLinks = document.querySelectorAll('.header__nav a');

  // --- Sticky Header ---
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  // --- Mobile Menu Toggle ---
  function toggleMenu() {
    hamburger.classList.toggle('active');
    nav.classList.toggle('open');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMenu);
  navOverlay.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('open')) {
        toggleMenu();
      }
    });
  });

  // --- Scroll to Top Button ---
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // --- Scroll Animations (Intersection Observer) ---
  const animatedElements = document.querySelectorAll('[data-animate]');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger animation delay for collage items
        const parent = entry.target.parentElement;
        const siblings = parent ? parent.querySelectorAll('[data-animate]') : [];
        let delay = 0;

        if (siblings.length > 1) {
          const siblingIndex = Array.from(siblings).indexOf(entry.target);
          delay = siblingIndex * 100;
        }

        setTimeout(() => {
          entry.target.classList.add('is-visible');
        }, delay);

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => observer.observe(el));

  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerHeight = header.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // --- Random Project Link ---
  const randomProjectLink = document.getElementById('randomProjectLink');
  if (randomProjectLink) {
    const urls = ['grafika.html', 'branding.html', 'foto.html', 'www.html'];
    const randomUrl = urls[Math.floor(Math.random() * urls.length)];
    randomProjectLink.href = randomUrl;
  }

});

const naprawSierotki = () => {
  const kontenery = document.querySelectorAll('p, h1, h2, h3, li, blockquote, span');

  const spojniki = ['i', 'a', 'o', 'u', 'w', 'z', 'na', 'za', 'do', 'od', 'że', 'po', 'we', 'ze'];

  kontenery.forEach(el => {
    let tekst = el.innerHTML;

    spojniki.forEach(spojnik => {
      const regex = new RegExp(`(^|\\s|&nbsp;|>)+(${spojnik})\\s+`, 'gi');

      tekst = tekst.replace(regex, `$1$2&nbsp;`);
    });

    el.innerHTML = tekst;
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', naprawSierotki);
} else {
  naprawSierotki();
}
