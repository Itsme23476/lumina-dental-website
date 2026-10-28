(function () {
  'use strict';
  const { $, $$, icon, accordionItem, toggleAccordion, escapeHTML } = window.UI;
  const D = window.DATA;
  const search = $('#faq-search');
  let active = 'all';

  const counts = D.faqs.reduce((m, f) => { m[f.cat] = (m[f.cat] || 0) + 1; return m; }, {});
  $('#faq-cats').innerHTML = [['all', 'All topics', D.faqs.length]].concat(Object.entries(D.faqCategories).map(([k, v]) => [k, v, counts[k] || 0]))
    .map(([k, v, n]) => '<button class="faq-cat" type="button" data-cat="' + k + '" aria-pressed="' + (k === active) + '">' + v + '<span>' + n + '</span></button>').join('');

  // Highlight matches in text nodes only (keeps links intact)
  function highlight(html, q) {
    if (!q) return html;
    const re = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
    return html.split(/(<[^>]+>)/).map((part) => part.startsWith('<') ? part : part.replace(re, '<mark>$1</mark>')).join('');
  }

  function render() {
    const q = search.value.trim();
    const ql = q.toLowerCase();
    const strip = (h) => h.replace(/<[^>]+>/g, '');
    const items = D.faqs.filter((f) => (active === 'all' || f.cat === active) && (!ql || (f.q + ' ' + strip(f.a)).toLowerCase().includes(ql)));
    const groups = Object.keys(D.faqCategories).filter((c) => items.some((f) => f.cat === c));
    $('#faq-list').innerHTML = items.length ? groups.map((c) => '<div class="faq-group"><h2>' + D.faqCategories[c] + '</h2><div class="accordion">' +
      items.filter((f) => f.cat === c).map((f) => accordionItem('faq-' + D.faqs.indexOf(f), highlight(escapeHTML(f.q), q), '<p>' + highlight(f.a, q) + '</p>', !!ql)).join('') + '</div></div>').join('')
      : '<div class="empty">' + icon('search') + '<p>No questions match “' + escapeHTML(q) + '”.</p><a class="btn btn-primary btn-sm" href="contact.html?subject=general">Ask us directly</a></div>';
    $('#faq-count').textContent = items.length + ' question' + (items.length === 1 ? '' : 's') + (q ? ' matching “' + q + '”' : '');
  }

  $('#faq-cats').addEventListener('click', (e) => {
    const b = e.target.closest('[data-cat]');
    if (!b) return;
    active = b.dataset.cat;
    $$('[data-cat]', $('#faq-cats')).forEach((c) => c.setAttribute('aria-pressed', String(c === b)));
    render();
  });
  search.addEventListener('input', render);
  $('#expand-all').addEventListener('click', () => $$('#faq-list .accordion-trigger').forEach((t) => toggleAccordion(t, true)));
  $('#collapse-all').addEventListener('click', () => $$('#faq-list .accordion-trigger').forEach((t) => toggleAccordion(t, false)));
  render();
})();
