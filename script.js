(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* ===== Mobile burger menu ===== */
    var burger = document.getElementById('burgerBtn');
    var nav = document.getElementById('nav');

    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('.nav__link, .nav__phone').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });

    /* ===== Header shadow on scroll ===== */
    var header = document.querySelector('.header');
    function onScroll() {
      header.classList.toggle('header--scrolled', window.scrollY > 10);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ===== Scroll-reveal (fade-up) via IntersectionObserver ===== */
    var reveal = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          reveal.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });

    document.querySelectorAll('.fade-up').forEach(function (el) { reveal.observe(el); });

    /* ===== Active nav link based on section in view ===== */
    var links = {};
    document.querySelectorAll('.nav__link').forEach(function (link) {
      var id = link.getAttribute('href').slice(1);
      if (id) links[id] = link;
    });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = links[entry.target.id];
        if (link && entry.isIntersecting) {
          Object.keys(links).forEach(function (k) { links[k].classList.remove('active'); });
          link.classList.add('active');
        }
      });
    }, { threshold: 0.5 });
    ['catalog', 'about', 'contacts'].forEach(function (id) {
      var s = document.getElementById(id);
      if (s) spy.observe(s);
    });

    /* ===== Contact form: frontend validation + success ===== */
    var form = document.getElementById('orderForm');
    var success = document.getElementById('formSuccess');

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var required = form.querySelectorAll('[required]');
      var valid = true;
      required.forEach(function (field) {
        field.classList.remove('is-invalid');
        if (!field.checkValidity()) {
          valid = false;
          // retrigger shake animation
          void field.offsetWidth;
          field.classList.add('is-invalid');
        }
      });

      if (!valid) {
        var first = form.querySelector('.is-invalid');
        if (first) first.focus();
        return;
      }

      // TODO: заменить на реальную отправку заявки (API / почтовый сервис).
      console.log('Заявка (заглушка, без реальной отправки):', {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        comment: document.getElementById('comment').value
      });

      success.hidden = false;
      form.reset();
    });

    // clear invalid state as the user types
    form.querySelectorAll('[required]').forEach(function (field) {
      field.addEventListener('input', function () { field.classList.remove('is-invalid'); });
    });
  });
})();
