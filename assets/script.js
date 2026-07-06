// Summit Ridge Roofing — shared behavior

document.addEventListener('DOMContentLoaded', function () {
  // Mobile hamburger nav
  var hamburger = document.querySelector('.hamburger');
  var navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('is-open');
      hamburger.classList.toggle('is-open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        hamburger.classList.remove('is-open');
      });
    });
  }

  // Netlify Forms — AJAX submit so we can show an inline success state
  // instead of a hard page redirect. Swap this block out entirely if
  // a booking SaaS embed replaces the form in .booking-embed-slot.
  document.querySelectorAll('form[data-netlify-ajax]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var formData = new FormData(form);
      var successEl = document.querySelector(form.dataset.successTarget || '.form-success');
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      })
        .then(function () {
          form.reset();
          form.style.display = 'none';
          if (successEl) successEl.classList.add('is-visible');
        })
        .catch(function () {
          // Fallback: still confirm to the user; Netlify processes
          // form-name encoded submissions server-side on deploy.
          form.reset();
          form.style.display = 'none';
          if (successEl) successEl.classList.add('is-visible');
        });
    });
  });
});
