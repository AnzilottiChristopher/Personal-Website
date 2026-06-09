/* ── Nav: solid background on scroll ───────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── Mobile nav toggle ──────────────────────────────────── */
const navToggle = document.getElementById('nav-toggle');
const mobileNav = document.getElementById('mobile-nav');
let menuOpen = false;

function setMenuOpen(open) {
  menuOpen = open;
  navToggle.setAttribute('aria-expanded', String(open));
  mobileNav.classList.toggle('open', open);
  mobileNav.setAttribute('aria-hidden', String(!open));
  document.body.style.overflow = open ? 'hidden' : '';

  const [top, mid, bot] = navToggle.querySelectorAll('span');
  if (open) {
    top.style.transform = 'rotate(45deg) translate(5px, 5px)';
    mid.style.opacity   = '0';
    bot.style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    top.style.transform = '';
    mid.style.opacity   = '';
    bot.style.transform = '';
  }
}

navToggle.addEventListener('click', () => setMenuOpen(!menuOpen));
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => setMenuOpen(false));
});

/* ── Reveal sections on scroll ──────────────────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Project filter ─────────────────────────────────────── */
const filterBtns   = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

function applyFilter(filter) {
  projectCards.forEach(card => {
    card.classList.toggle('hidden', card.dataset.category !== filter);
  });
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    applyFilter(btn.dataset.filter);
  });
});

/* Apply the default filter (whichever tab starts with class="active") */
const defaultBtn = document.querySelector('.filter-btn.active');
if (defaultBtn) applyFilter(defaultBtn.dataset.filter);

/* ── Modal ──────────────────────────────────────────────── */
const modal        = document.getElementById('modal');
const modalImg     = document.getElementById('modal-img');
const modalTitle   = document.getElementById('modal-title');
const modalDesc    = document.getElementById('modal-desc');
const modalTag     = document.getElementById('modal-tag');
const modalDate    = document.getElementById('modal-date');
const modalGithub  = document.getElementById('modal-github');
const modalCount   = document.getElementById('modal-count');
const modalClose   = document.getElementById('modal-close');
const modalBackdrop = document.getElementById('modal-backdrop');
const modalPrev    = document.getElementById('modal-prev');
const modalNext    = document.getElementById('modal-next');

let images = [];
let imgIndex = 0;

const CATEGORY_LABELS = { ai: 'AI', games: 'Games', networking: 'Networking', tools: 'Tools' };

function openModal(card) {
  images   = JSON.parse(card.dataset.images || '[]');
  imgIndex = 0;

  const category = card.dataset.category;
  const github   = card.dataset.github;

  modalTitle.textContent = card.dataset.title || '';
  modalDesc.textContent  = card.dataset.desc  || '';
  modalDate.textContent  = card.dataset.date  || '';

  modalTag.textContent = CATEGORY_LABELS[category] || category;
  modalTag.className   = `tag tag-${category}-modal`;

  if (github) {
    modalGithub.href          = github;
    modalGithub.style.display = '';
  } else {
    modalGithub.style.display = 'none';
  }

  const imgSection = document.querySelector('.modal-img-section');
  if (images.length) {
    imgSection.style.display = '';
    updateModalImage();
  } else {
    imgSection.style.display = 'none';
    modalCount.textContent   = '';
  }

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  modalClose.focus();
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = menuOpen ? 'hidden' : '';
}

function updateModalImage() {
  if (!images.length) return;
  modalImg.src = images[imgIndex];
  modalImg.alt = `${modalTitle.textContent} — screenshot ${imgIndex + 1}`;
  modalCount.textContent = `${imgIndex + 1} / ${images.length}`;

  const multiImage = images.length > 1;
  modalPrev.style.display = multiImage ? '' : 'none';
  modalNext.style.display = multiImage ? '' : 'none';
}

/* Open on card click or Enter/Space */
projectCards.forEach(card => {
  card.addEventListener('click', () => openModal(card));
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(card); }
  });
});

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);

modalPrev.addEventListener('click', e => {
  e.stopPropagation();
  imgIndex = (imgIndex - 1 + images.length) % images.length;
  updateModalImage();
});
modalNext.addEventListener('click', e => {
  e.stopPropagation();
  imgIndex = (imgIndex + 1) % images.length;
  updateModalImage();
});

/* Keyboard navigation inside modal */
document.addEventListener('keydown', e => {
  if (!modal.classList.contains('open')) return;
  if (e.key === 'Escape')      { closeModal(); }
  if (e.key === 'ArrowLeft')   { imgIndex = (imgIndex - 1 + images.length) % images.length; updateModalImage(); }
  if (e.key === 'ArrowRight')  { imgIndex = (imgIndex + 1) % images.length; updateModalImage(); }
});
