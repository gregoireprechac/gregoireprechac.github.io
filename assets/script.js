/* Grégoire Préchac — script.js */

function renderPageStars() {
  document.querySelectorAll('[data-rating]').forEach(el => {
    const n = parseInt(el.dataset.rating) || 0;
    el.innerHTML = Array.from({length:5}, (_,i) =>
      `<span class="star" aria-hidden="true"><svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg"><polygon points="6,1 7.5,4.5 11.5,4.8 8.7,7.3 9.7,11 6,9 2.3,11 3.3,7.3 0.5,4.8 4.5,4.5" fill="${i<n?'#1c2e4a':'none'}" stroke="#1c2e4a" stroke-width="${i<n?0:.8}" opacity="${i<n?.85:.3}"/></svg></span>`
    ).join('');
  });
}

const navbar  = document.getElementById('navbar');
const burger  = document.getElementById('navBurger');
const navMenu = document.getElementById('navLinks');

window.addEventListener('scroll', () => { navbar.classList.toggle('scrolled', window.scrollY > 50); }, {passive:true});

burger.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open'); burger.classList.remove('open');
    burger.setAttribute('aria-expanded','false'); document.body.style.overflow = '';
  });
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && navMenu.classList.contains('open')) {
    navMenu.classList.remove('open'); burger.classList.remove('open');
    burger.setAttribute('aria-expanded','false'); document.body.style.overflow = '';
  }
});

const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObs.unobserve(entry.target); }
  });
}, {threshold:.07, rootMargin:'0px 0px -30px 0px'});

document.querySelectorAll('.research-card, .essay-card, .reading-card, .cv-item, .aside-block, .about-text, .about-aside, .cv-preview-item, .channel-card').forEach((el,i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i%4)*.07}s`;
  revealObs.observe(el);
});

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
    btn.classList.add('active'); btn.setAttribute('aria-selected','true');
    const f = btn.dataset.filter;
    document.querySelectorAll('#readingCards .reading-card').forEach(card => {
      card.style.display = (f==='all' || card.dataset.type===f) ? '' : 'none';
    });
  });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) { e.preventDefault(); window.scrollTo({top: target.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight - 8, behavior:'smooth'}); }
  });
});

renderPageStars();
