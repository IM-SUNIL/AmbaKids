(function() {
  function qs(selector, scope) { return (scope || document).querySelector(selector); }
  function qsa(selector, scope) { return Array.from((scope || document).querySelectorAll(selector)); }

  // Mobile nav toggle
  var toggle = qs('#navToggle');
  var nav = qs('#siteNav');
  if (toggle && nav) {
    toggle.addEventListener('click', function() {
      nav.classList.toggle('show');
    });
    qsa('a', nav).forEach(function(link) {
      link.addEventListener('click', function() {
        nav.classList.remove('show');
      });
    });
  }

  // Reveal on scroll
  var revealEls = qsa('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(function(el) { io.observe(el); });
  } else {
    revealEls.forEach(function(el) { el.classList.add('in-view'); });
  }

  // Active nav link
  var path = location.pathname.split('/').pop() || 'index.html';
  qsa('#siteNav a').forEach(function(a) {
    var href = a.getAttribute('href');
    if ((path === '' && href.endsWith('index.html')) || href.endsWith(path)) {
      a.style.background = '#eef7ff';
      a.style.borderRadius = '10px';
    }
  });

  // Form handling
  function attachFormHandler(formId) {
    var form = qs(formId);
    if (!form) return;
    var success = form.parentElement.querySelector('.success-msg');
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      if (success) {
        success.classList.add('show');
        success.textContent = 'Thank you! Your request has been received. We will contact you soon.';
      }
      form.reset();
    });
  }

  attachFormHandler('#admissions-form');
  attachFormHandler('#contact-form');
})();
