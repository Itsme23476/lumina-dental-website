(function () {
  'use strict';
  const { $, $$, icon, stars, escapeHTML, todayISO, observeReveal } = window.UI;
  const D = window.DATA;

  // Services preview
  $('#home-services').innerHTML = D.services.filter((s) => s.popular).map((s) => window.CARDS.service(s)).join('');

  // Team preview
  $('#home-team').innerHTML = D.team.slice(0, 3).map((d) => window.CARDS.dentist(d)).join('');

  // Blog preview
  $('#home-posts').innerHTML = D.posts.slice(0, 3).map(window.CARDS.post).join('');

  // Insurers
  $('#home-insurers').innerHTML = D.insurers.slice(0, 8).map((n) => '<span class="insurer">' + n + '</span>').join('');

  // Before/after teaser
  $('#home-compare').innerHTML = window.ART.compare(['stain'], 'professional whitening');

  // Quick booking form
  const sel = $('#qb-service');
  Object.keys(D.categories).forEach((cat) => {
    const group = document.createElement('optgroup');
    group.label = D.categories[cat];
    D.services.filter((s) => s.category === cat).forEach((s) => group.appendChild(new Option(s.name, s.id)));
    sel.appendChild(group);
  });
  const dateInput = $('#qb-date');
  dateInput.min = todayISO();
  $('#quick-book').addEventListener('submit', (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (sel.value) params.set('service', sel.value);
    if (dateInput.value && dateInput.value >= todayISO()) params.set('date', dateInput.value);
    const qs = params.toString();
    location.href = 'book.html' + (qs ? '?' + qs : '');
  });

  // Testimonial carousel
  const root = $('#testimonials');
  const track = $('.carousel-track', root);
  const dots = $('.dots', root);
  const items = D.reviews.filter((r) => r.rating === 5).slice(0, 5);
  track.innerHTML = items.map((r, i) => '<figure class="carousel-slide" role="group" aria-roledescription="slide" aria-label="' + (i + 1) + ' of ' + items.length + '">' +
    icon('quote', 'quote-icon') + stars(r.rating) + '<blockquote>“' + escapeHTML(r.text) + '”</blockquote>' +
    '<figcaption class="reviewer"><span class="initials">' + window.CARDS.initials(r.name) + '</span><div><strong>' + escapeHTML(r.name) + '</strong><small>' + escapeHTML(r.service) + '</small></div></figcaption></figure>').join('');
  dots.innerHTML = items.map((_, i) => '<button class="dot" type="button" aria-label="Show testimonial ' + (i + 1) + '"></button>').join('');
  let index = 0, timer;
  function go(i) {
    index = (i + items.length) % items.length;
    track.style.transform = 'translateX(' + (-index * 100) + '%)';
    $$('.dot', dots).forEach((d, j) => d.setAttribute('aria-current', String(j === index)));
    $$('.carousel-slide', track).forEach((s, j) => s.setAttribute('aria-hidden', String(j !== index)));
  }
  function auto() { clearInterval(timer); timer = setInterval(() => go(index + 1), 6500); }
  $('[data-carousel="prev"]', root).addEventListener('click', () => { go(index - 1); auto(); });
  $('[data-carousel="next"]', root).addEventListener('click', () => { go(index + 1); auto(); });
  $$('.dot', dots).forEach((d, i) => d.addEventListener('click', () => { go(i); auto(); }));
  root.addEventListener('mouseenter', () => clearInterval(timer));
  root.addEventListener('mouseleave', auto);
  go(0);
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) auto();

  observeReveal();
})();
