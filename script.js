// Dark/Light Mode Toggle
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('theme-toggle');
  const userPref = localStorage.getItem('theme');

  if (userPref) {
    document.documentElement.setAttribute('data-theme', userPref);
    toggle.checked = userPref === 'dark';
  } else {
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', systemDark ? 'dark' : 'light');
    toggle.checked = systemDark;
  }

  toggle.addEventListener('change', () => {
    const newTheme = toggle.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
});

// Contact Form
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      status.className = 'hidden';
      status.textContent = '';
      ['name', 'email', 'message'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('error');
      });

      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');

      let valid = true;

      if (!name.value.trim()) {
        name.classList.add('error');
        valid = false;
      }
      if (!email.value.trim()) {
        email.classList.add('error');
        valid = false;
      }
      if (!message.value.trim()) {
        message.classList.add('error');
        valid = false;
      }

      if (!valid) {
        status.textContent = 'Please fill out all required fields.';
        status.className = 'failure';
        return;
      }

      status.textContent = 'Thanks! Your message has been sent.';
      status.className = 'success';
      form.reset();
    });
  }
});

// Back to Top Button
document.addEventListener('DOMContentLoaded', function () {
  const backToTopBtn = document.getElementById('back-to-top');

  if (backToTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', function () {
      navMenu.classList.toggle('mobile-menu-open');

      const isOpen = navMenu.classList.contains('mobile-menu-open');
      mobileMenuToggle.setAttribute('aria-expanded', isOpen);
    });

    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function () {
        navMenu.classList.remove('mobile-menu-open');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', function (event) {
      if (!event.target.closest('nav')) {
        navMenu.classList.remove('mobile-menu-open');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
});
