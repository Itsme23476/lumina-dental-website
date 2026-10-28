(function () {
  'use strict';
  const { $, $$, icon, priceLabel, money, serviceById, Modal, observeReveal, param } = window.UI;
  const D = window.DATA;
  const grid = $('#services-grid');
  const search = $('#service-search');
  const filters = $('#service-filters');
  let active = D.categories[param('category')] ? param('category') : 'all';

  filters.innerHTML = [['all', 'All services']].concat(Object.entries(D.categories))
    .map(([k, v]) => '<button class="chip" type="button" data-cat="' + k + '" aria-pressed="' + (k === active) + '">' + v + '</button>').join('');

  function render() {
    const q = search.value.trim().toLowerCase();
    const list = D.services.filter((s) => (active === 'all' || s.category === active) &&
      (!q || (s.name + ' ' + s.short + ' ' + s.description + ' ' + D.categories[s.category]).toLowerCase().includes(q)));
    grid.innerHTML = list.length
      ? list.map((s) => window.CARDS.service(s, { modal: true })).join('')
      : '<div class="empty">' + icon('search') + '<p>No services match “' + window.UI.escapeHTML(search.value) + '”.</p><button class="btn btn-outline btn-sm" type="button" id="reset-filters">Clear filters</button></div>';
    $('#service-count').textContent = 'Showing ' + list.length + ' of ' + D.services.length + ' services';
    observeReveal(grid);
  }

  filters.addEventListener('click', (e) => {
    const b = e.target.closest('[data-cat]');
    if (!b) return;
    active = b.dataset.cat;
    $$('[data-cat]', filters).forEach((c) => c.setAttribute('aria-pressed', String(c === b)));
    render();
  });
  search.addEventListener('input', render);
  grid.addEventListener('click', (e) => {
    if (e.target.closest('#reset-filters')) {
      search.value = ''; active = 'all';
      $$('[data-cat]', filters).forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.cat === 'all')));
      render();
    }
  });

  // Price table
  $('#price-table').innerHTML = D.services.map((s) => '<tr><th scope="row">' + s.name + '</th><td>' + D.categories[s.category] + '</td><td>' + s.minutes + ' min</td><td class="price">' +
    (s.price == null ? s.priceLabel : money(s.price) + (s.priceNote ? ' <small>' + s.priceNote + '</small>' : '')) +
    '</td><td><button class="btn btn-outline btn-sm" type="button" data-service="' + s.id + '">Details</button></td></tr>').join('');

  // Service detail modal
  function openService(id, pushHash) {
    const s = serviceById(id);
    if (!s) return;
    if (pushHash) history.replaceState(null, '', '#' + id);
    Modal.open(
      '<span class="icon-badge">' + icon(s.icon) + '</span><span class="badge badge--muted">' + D.categories[s.category] + '</span>' +
      '<h2 class="mt-1">' + s.name + '</h2>' +
      '<div class="meta-pills"><span class="pill">' + icon('clock') + s.minutes + ' min visit</span><span class="pill">' + icon('tag') + priceLabel(s) + '</span></div>' +
      '<p>' + s.description + '</p><h3 style="font-size:1.05rem;font-family:var(--font-sans)">Benefits</h3>' +
      '<ul class="check-list">' + s.benefits.map((b) => '<li>' + icon('check') + b + '</li>').join('') + '</ul>' +
      '<div class="btn-group"><a class="btn btn-accent" href="book.html?service=' + s.id + '">' + icon('calendar') + 'Book this service</a>' +
      '<a class="btn btn-outline" href="contact.html?subject=service&amp;service=' + s.id + '">Ask a question</a>' +
      '<button class="btn btn-ghost" type="button" data-modal-close>Close</button></div>',
      { label: s.name, onClose: () => history.replaceState(null, '', location.pathname + location.search) }
    );
  }
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-service]');
    if (b) openService(b.dataset.service, true);
  });
  function fromHash() {
    const id = location.hash.slice(1);
    if (serviceById(id)) openService(id, false);
  }
  window.addEventListener('hashchange', fromHash);

  render();
  fromHash();
})();
