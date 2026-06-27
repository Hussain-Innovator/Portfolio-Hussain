/* ============================================================
   HUSSAIN PORTFOLIO — script.js (CLEAN + OPTIMIZED VERSION)
   All interactions, animations, observers, UI logic
============================================================ */

document.documentElement.classList.remove("no-js");

/* ============================================================
   1. CUSTOM CURSOR (SMOOTH + PERFORMANCE OPTIMIZED)
============================================================ */
(function initCursor() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');

  if (!dot || !ring) return;

  let mx = 0, my = 0;
  let rx = 0, ry = 0;

  // direct cursor dot
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;

    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  });

  // smooth ring follow (lerp animation)
  function animateRing() {
    rx += (mx - rx) * 0.13;
    ry += (my - ry) * 0.13;

    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';

    requestAnimationFrame(animateRing);
  }
  animateRing();

  // hover effect on interactive elements
  const hoverTargets = document.querySelectorAll(
    'a, button, .skill-card, .project-card, .exp-nav-item, .filter-btn, .pub-item, .edu-card, .contact-link'
  );

  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
  });
})();


/* ============================================================
   2. NAVIGATION (SCROLL EFFECTS + PROGRESS BAR + BACK TO TOP)
============================================================ */
(function initNav() {
  const nav = document.getElementById('mainNav');
  const progress = document.getElementById('pageProgress');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // navbar background change
    if (nav) {
      nav.classList.toggle('scrolled', scrollY > 60);
    }

    // progress bar
    if (progress) {
      const total = document.body.scrollHeight - window.innerHeight;
      const percent = total > 0 ? (scrollY / total) * 100 : 0;
      progress.style.width = percent + '%';
    }

    // back to top
    if (backToTop) {
      backToTop.classList.toggle('visible', scrollY > 400);
    }
  });
})();


/* ============================================================
   3. MOBILE NAVIGATION TOGGLE
============================================================ */
function toggleMobileNav() {
  const nav = document.getElementById('mobileNav');
  const burger = document.getElementById('hamburger');

  if (!nav || !burger) return;

  const isOpen = nav.classList.toggle('open');
  burger.classList.toggle('open', isOpen);
}

function closeMobileNav() {
  const nav = document.getElementById('mobileNav');
  const burger = document.getElementById('hamburger');

  nav?.classList.remove('open');
  burger?.classList.remove('open');
}


/* ============================================================
   4. SCROLL REVEAL SYSTEM (INTERSECTION OBSERVER)
============================================================ */
(function initReveal() {
  const elements = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
  });

  elements.forEach(el => observer.observe(el));
})();


/* ============================================================
   5. SKILL BAR ANIMATION
============================================================ */
(function initSkillBars() {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const fills = entry.target.querySelectorAll('.skill-bar-fill');

      fills.forEach(fill => {
        const value = fill.dataset.width || "0";
        fill.style.width = value + '%';
      });

      obs.unobserve(entry.target);
    });
  }, {
    threshold: 0.25
  });

  document.querySelectorAll('.skill-card')
    .forEach(card => observer.observe(card));
})();


/* ============================================================
   6. EXPERIENCE TABS SYSTEM
============================================================ */
function switchExp(index, element) {
  document.querySelectorAll('.exp-panel')
    .forEach(panel => panel.classList.remove('active'));

  document.querySelectorAll('.exp-nav-item')
    .forEach(item => item.classList.remove('active'));

  const activePanel = document.getElementById('exp-' + index);
  if (activePanel) activePanel.classList.add('active');

  if (element) element.classList.add('active');
}


/* ============================================================
   7. PROJECT FILTER SYSTEM
============================================================ */
function filterProjects(category, button) {
  document.querySelectorAll('.filter-btn')
    .forEach(btn => btn.classList.remove('active'));

  button?.classList.add('active');

  document.querySelectorAll('.project-card').forEach(card => {
    const categories = (card.dataset.category || '').split(' ');

    const show = category === 'all' || categories.includes(category);

    card.style.opacity = show ? '1' : '0.15';
    card.style.transform = show ? 'scale(1)' : 'scale(0.96)';
    card.style.pointerEvents = show ? 'auto' : 'none';
  });
}


/* ============================================================
   8. ABOUT BADGES STAGGER ANIMATION
============================================================ */
(function initBadges() {
  const badgeContainer = document.getElementById('aboutBadges');
  if (!badgeContainer) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('badges-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  observer.observe(badgeContainer);
})();


/* ============================================================
   9. OPTIONAL: ACTIVE NAV LINK ON SCROLL (IMPROVEMENT)
   (lightweight scroll spy)
============================================================ */
(function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      const top = section.offsetTop - 120;
      const height = section.offsetHeight;

      if (window.scrollY >= top && window.scrollY < top + height) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });
})();
// ═══════════════════════════════
// ACTIVE STAGE HIGHLIGHT ON SCROLL
// ═══════════════════════════════
  // ACTIVE STAGE SCROLL HIGHLIGHT
  (function () {
    const stages = document.querySelectorAll('.stage');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelectorAll('.stage.active-stage')
            .forEach(el => el.classList.remove('active-stage'));

          entry.target.classList.add('active-stage');
        }
      });
    }, { threshold: 0.6 });

    stages.forEach(stage => observer.observe(stage));
  })();

// ═══════════════════════════════════════
// 🔥 NEURAL DATA FLOW ENHANCEMENT (SYNC)
// ═══════════════════════════════════════
(function () {
  const particles = document.querySelectorAll('.particle');

  function randomize() {
    particles.forEach(p => {
      const delay = Math.random() * 3;
      p.style.animationDelay = delay + 's';
    });
  }

  randomize();
})();

// ═══════════════════════════════
// 🧠 CLEAN PIPELINE CLICK MODE
// ═══════════════════════════════
// CLICK TO FOCUS STAGE (USER INTERACTION LAYER)
  (function () {

    const stages = document.querySelectorAll('.stage');

    stages.forEach(stage => {
      stage.addEventListener('click', () => {

        stages.forEach(s => s.classList.remove('active'));

        stage.classList.add('active');

        stage.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });

      });
    });

  })();


  // NEURAL PARTICLE RANDOMIZATION
  (function () {
    const particles = document.querySelectorAll('.particle');

    particles.forEach(p => {
      p.style.animationDelay = (Math.random() * 3) + 's';
    });
  })();