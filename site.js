document.documentElement.classList.add('has-js');

const intro = document.querySelector('[data-site-intro]');
const introSkip = document.querySelector('[data-intro-skip]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (intro) {
  let introTimer;
  const dismissIntro = () => {
    window.clearTimeout(introTimer);
    intro.classList.add('is-leaving');
    document.body.classList.remove('has-intro');
    window.setTimeout(() => intro.remove(), 900);
  };

  if (reducedMotion) {
    intro.remove();
  } else {
    document.body.classList.add('has-intro');
    window.requestAnimationFrame(() => intro.classList.add('is-active'));
    introTimer = window.setTimeout(dismissIntro, 1800);
    introSkip?.addEventListener('click', dismissIntro);
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') dismissIntro();
    }, { once: true });
  }
}

const menuButton = document.querySelector('[data-menu-toggle]');
const navLinks = document.querySelector('[data-nav-links]');

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.querySelector('[aria-hidden="true"]').textContent = isOpen ? 'Close' : 'Menu';
  });

  navLinks.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.querySelector('[aria-hidden="true"]').textContent = 'Menu';
  });
}

document.querySelectorAll('[data-year]').forEach((year) => {
  year.textContent = new Date().getFullYear();
});

const revealItems = document.querySelectorAll('.reveal');

if (reducedMotion) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries, revealObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  revealItems.forEach((item) => observer.observe(item));
}
