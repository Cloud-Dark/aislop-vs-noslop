// noslop - theme toggle + honest CTA feedback + restrained motion (MOTION 2:
// a one-shot reveal per section, and a quiet hero backdrop, both with a
// prefers-reduced-motion off-switch).
(function () {
  "use strict";

  var root = document.documentElement;
  var btn = document.getElementById("theme-toggle");
  var meta = document.getElementById("theme-color");

  var META = { light: "#faf7f1", dark: "#14110d" };

  function currentAccent() {
    return root.getAttribute("data-theme") === "dark" ? 0xd97757 : 0x9a3412;
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (btn) {
      btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
      btn.setAttribute("aria-label", theme === "dark" ? "Pakai mode terang" : "Pakai mode gelap");
    }
    if (meta) meta.setAttribute("content", META[theme] || META.light);
    if (window.__noslopSetAccent) window.__noslopSetAccent(currentAccent());
  }

  var stored = null;
  try { stored = localStorage.getItem("theme"); } catch (e) {}
  var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(stored || (prefersDark ? "dark" : "light"));

  if (btn) {
    btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  // CTA form: honest feedback, never a fake success (antislop R-26).
  // This demo form is not wired to a backend; it says so out loud.
  var form = document.getElementById("cta-form");
  var feedback = document.getElementById("cta-feedback");
  if (form && feedback) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = document.getElementById("cta-email");
      var value = email ? email.value.trim() : "";
      if (!value || (email && !email.validity.valid)) {
        feedback.textContent = "Masukkan email yang valid supaya kami tahu ke mana membalas.";
        if (email) email.focus();
        return;
      }
      feedback.textContent =
        "Form demo ini tidak terhubung ke backend. Ganti dengan alur signup Anda yang nyata.";
    });
  }

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Reveal-on-scroll: each section fades up once, the first time it enters
  // view. One shot, not a loop; purpose is to point at the section that
  // just arrived (antislop R-19).
  if (!reduceMotion && "IntersectionObserver" in window) {
    var sections = document.querySelectorAll(".reveal");
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    sections.forEach(function (el) { observer.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  // Hero backdrop: a quiet drifting wireframe sphere behind the headline,
  // in the accent color, moving slowly and never competing with the text
  // (antislop R-13: one accent, one focal element, not everywhere).
  var canvas = document.getElementById("hero-canvas");
  if (canvas && !reduceMotion && window.THREE) {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 6;

    var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    var geometry = new THREE.IcosahedronGeometry(2.4, 1);
    var material = new THREE.MeshBasicMaterial({
      color: currentAccent(),
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(2.2, 0, 0);
    scene.add(mesh);

    window.__noslopSetAccent = function (hex) { material.color.setHex(hex); };

    function resize() {
      var rect = canvas.parentElement.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height, false);
      camera.aspect = rect.width / Math.max(rect.height, 1);
      camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener("resize", resize);

    var start = null;
    function tick(ts) {
      if (start === null) start = ts;
      var t = (ts - start) / 1000;
      mesh.rotation.x = t * 0.06;
      mesh.rotation.y = t * 0.09;
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
})();
