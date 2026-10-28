(function () {
  'use strict';
  const { $, $$, icon, observeReveal } = window.UI;
  const D = window.DATA;
  const LABELS = { all: 'All results', whitening: 'Whitening', veneers: 'Veneers', orthodontics: 'Orthodontics', implants: 'Implants', bonding: 'Bonding' };
  let active = 'all';
  const grid = $('#gallery-grid'), filters = $('#gallery-filters');

  $('#hero-compare').innerHTML = window.ART.compare(['crooked', 'stain'], 'smile makeover');
  filters.innerHTML = Object.keys(LABELS).map((k) => '<button class="chip" type="button" data-cat="' + k + '" aria-pressed="' + (k === active) + '">' + LABELS[k] + '</button>').join('');

  function render() {
    const list = D.gallery.filter((c) => active === 'all' || c.category === active);
    grid.innerHTML = list.map((c) => '<article class="card case-card reveal">' + window.ART.compare(c.issues, c.title) +
      '<div class="case-body"><div class="case-meta"><span class="badge">' + LABELS[c.category] + '</span><span class="badge badge--muted">' + icon('clock') + c.time + '</span></div>' +
      '<h3>' + c.title + '</h3><p>' + c.text + '</p>' +
      '<div class="card-meta"><span class="muted">' + icon('user') + ' ' + c.dentist + '</span><a class="btn btn-primary btn-sm" href="book.html?service=' + c.service + '">Get similar results</a></div></div></article>').join('');
    $('#gallery-count').textContent = list.length + ' case' + (list.length === 1 ? '' : 's');
    observeReveal(grid);
  }
  filters.addEventListener('click', (e) => {
    const b = e.target.closest('[data-cat]');
    if (!b) return;
    active = b.dataset.cat;
    $$('[data-cat]', filters).forEach((c) => c.setAttribute('aria-pressed', String(c === b)));
    render();
  });
  render();
})();
