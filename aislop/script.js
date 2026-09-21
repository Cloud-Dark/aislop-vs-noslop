// ===== AiSlop — landing page interactions =====
(function () {
  'use strict';

  // 1. Navbar shadow on scroll
  var navbar = document.getElementById('navbar');
  function onScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 2. Animated stat counters (AI slop staple: big numbers that count up)
  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10) || 0;
    var duration = 2000;
    var start = null;
    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      // ease-out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = Math.floor(eased * target);
      el.textContent = value.toLocaleString();
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString();
      }
    }
    requestAnimationFrame(step);
  }

  var statsSection = document.getElementById('stats');
  var counters = document.querySelectorAll('.stat-num');
  var countersDone = false;

  if ('IntersectionObserver' in window && statsSection) {
    var statObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !countersDone) {
          countersDone = true;
          counters.forEach(animateCounter);
          statObserver.disconnect();
        }
      });
    }, { threshold: 0.4 });
    statObserver.observe(statsSection);
  } else {
    counters.forEach(animateCounter);
  }

  // 3. Scroll reveal for cards (generic "fade up" effect)
  var revealTargets = document.querySelectorAll(
    '.feature-card, .testimonial, .pricing-card, .section-head, .cta-box'
  );
  revealTargets.forEach(function (el) { el.classList.add('reveal'); });

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('visible'); });
  }

  // 4. CTA form — fake submit (the classic "no backend" AI slop move)
  var form = document.getElementById('cta-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = document.getElementById('cta-email');
      var btn = form.querySelector('button[type="submit"]');
      var original = btn.textContent;
      btn.textContent = '✓ Welcome aboard!';
      btn.style.background = 'linear-gradient(135deg, #16a34a, #22c55e)';
      email.value = '';
      setTimeout(function () {
        btn.textContent = original;
        btn.style.background = '';
      }, 2500);
    });
  }

  // 5. Chat widget — fake open (pops a little bubble)
  var chat = document.getElementById('chat-widget');
  if (chat) {
    chat.addEventListener('click', function () {
      if (chat.querySelector('.chat-bubble')) return;
      var bubble = document.createElement('div');
      bubble.className = 'chat-bubble';
      bubble.textContent = "Hi! 👋 I'm AiBot. How can I help you dominate today?";
      bubble.style.cssText = [
        'position:absolute',
        'right:74px',
        'bottom:6px',
        'width:240px',
        'padding:.85rem 1rem',
        'border-radius:14px',
        'background:#fff',
        'color:#0f172a',
        'font-size:.9rem',
        'box-shadow:0 12px 30px rgba(15,23,42,0.18)',
        'animation:fadeIn .3s ease'
      ].join(';');
      chat.style.position = 'fixed';
      chat.appendChild(bubble);
      setTimeout(function () {
        if (bubble.parentNode) bubble.parentNode.removeChild(bubble);
      }, 4000);
    });
  }

  // 6. Smooth-scroll polish for anchor links (in case scroll-behavior unsupported)
  var links = document.querySelectorAll('a[href^="#"]');
  links.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href');
      if (id.length > 1) {
        var target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
})();
