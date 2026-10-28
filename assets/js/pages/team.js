(function () {
  'use strict';
  const { $, $$, icon, dentistById, Modal, observeReveal, DAYS } = window.UI;
  const D = window.DATA;
  const grid = $('#team-grid');
  const filters = $('#team-filters');
  const specialties = ['all'].concat(Array.from(new Set(D.team.map((d) => d.specialty))));
  let active = 'all';

  filters.innerHTML = specialties.map((k) => '<button class="chip" type="button" data-spec="' + k + '" aria-pressed="' + (k === active) + '">' + (k === 'all' ? 'All dentists' : D.categories[k]) + '</button>').join('');

  function render() {
    const list = D.team.filter((d) => active === 'all' || d.specialty === active);
    grid.innerHTML = list.map((d) => window.CARDS.dentist(d, { modal: true })).join('');
    $('#team-count').textContent = list.length + (list.length === 1 ? ' dentist' : ' dentists');
    observeReveal(grid);
  }
  filters.addEventListener('click', (e) => {
    const b = e.target.closest('[data-spec]');
    if (!b) return;
    active = b.dataset.spec;
    $$('[data-spec]', filters).forEach((c) => c.setAttribute('aria-pressed', String(c === b)));
    render();
  });

  $('#staff-grid').innerHTML = D.staff.map((s) => '<div class="card staff-card reveal"><div class="avatar">' + window.ART.avatar(s.avatar, 'Illustrated portrait of ' + s.name) + '</div><h3>' + s.name + '</h3><p>' + s.role + '</p></div>').join('');

  function openProfile(id, pushHash) {
    const d = dentistById(id);
    if (!d) return;
    if (pushHash) history.replaceState(null, '', '#' + id);
    const services = D.services.filter((s) => d.categories.includes(s.category)).slice(0, 6);
    Modal.open(
      '<div class="profile"><div class="avatar">' + window.ART.avatar(d.avatar, 'Illustrated portrait of ' + d.name) + '</div><div>' +
      '<span class="badge">' + D.categories[d.specialty] + '</span><h2 class="mt-1">' + d.name + ', ' + d.credentials + '</h2><p class="role">' + d.role + ' · ' + d.years + ' years experience</p>' +
      '<p>' + d.bio + '</p>' +
      '<h4>Education</h4><ul>' + d.education.map((e) => '<li>' + e + '</li>').join('') + '</ul>' +
      '<h4>Languages</h4><p class="mb-0">' + d.languages.join(', ') + '</p>' +
      '<h4>Available</h4><p class="mb-0">' + d.days.map((n) => DAYS[n].slice(0, 3)).join(', ') + '</p>' +
      '<h4>Treats</h4><div class="chips">' + services.map((s) => '<a class="chip" href="services.html#' + s.id + '">' + s.name + '</a>').join('') + '</div>' +
      '<h4>Fun fact</h4><p>' + d.fun + '</p>' +
      '<div class="btn-group"><a class="btn btn-accent" href="book.html?dentist=' + d.id + '">' + icon('calendar') + 'Book with ' + d.name.split(' ').slice(0, 2).join(' ') + '</a><button class="btn btn-ghost" type="button" data-modal-close>Close</button></div>' +
      '</div></div>',
      { label: d.name + ' profile', onClose: () => history.replaceState(null, '', location.pathname) }
    );
  }
  grid.addEventListener('click', (e) => {
    const b = e.target.closest('[data-dentist]');
    if (b) openProfile(b.dataset.dentist, true);
  });
  function fromHash() { const id = location.hash.slice(1); if (dentistById(id)) openProfile(id, false); }
  window.addEventListener('hashchange', fromHash);

  render();
  fromHash();
})();
