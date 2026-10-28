(function () {
  'use strict';
  const { $, stars, escapeHTML, formatDate, store, validateForm, clearErrors, toast, todayISO, icon } = window.UI;
  const D = window.DATA;
  const PAGE = 6;
  let shown = PAGE;

  /* Summary */
  const S = D.ratingSummary;
  $('#rating-avg').textContent = S.average.toFixed(1);
  $('#rating-stars').innerHTML = stars(S.average);
  $('#rating-total').textContent = 'Based on ' + S.total.toLocaleString('en-US') + ' verified reviews';
  $('#rating-bars').innerHTML = [5, 4, 3, 2, 1].map((n) => '<div class="bar-row"><span>' + n + ' star</span><div class="bar" role="img" aria-label="' + S.distribution[n] + '% of reviews are ' + n + ' star"><span style="width:' + S.distribution[n] + '%"></span></div><span>' + S.distribution[n] + '%</span></div>').join('');

  /* Selects */
  const names = Array.from(new Set(D.services.map((s) => s.name)));
  ['#filter-service', '#rv-service'].forEach((sel) => names.forEach((n) => $(sel).appendChild(new Option(n, n))));

  const all = () => store.get('lumina_reviews', []).map((r) => Object.assign({ pending: true }, r)).concat(D.reviews);

  function render() {
    const rating = Number($('#filter-rating').value);
    const service = $('#filter-service').value;
    const sort = $('#sort-reviews').value;
    let list = all().filter((r) => (!rating || r.rating === rating) && (!service || r.service === service));
    list.sort((a, b) => sort === 'highest' ? b.rating - a.rating || b.date.localeCompare(a.date)
      : sort === 'lowest' ? a.rating - b.rating || b.date.localeCompare(a.date) : b.date.localeCompare(a.date));
    const visible = list.slice(0, shown);
    $('#review-list').innerHTML = visible.length ? visible.map((r) => '<article class="card review-card"><header><div class="reviewer"><span class="initials">' + window.CARDS.initials(r.name) + '</span><div><strong>' + escapeHTML(r.name) + '</strong><small>' + formatDate(r.date) + '</small></div></div>' + stars(r.rating) + '</header>' +
      '<p>' + escapeHTML(r.text) + '</p><footer><span class="badge badge--muted">' + escapeHTML(r.service) + '</span>' +
      (r.pending ? '<span class="badge badge--warn">' + icon('clock') + 'Pending moderation</span>' : '<span class="badge">' + icon('check') + 'Verified patient</span>') + '</footer></article>').join('')
      : '<div class="empty">' + icon('search') + '<p>No reviews match these filters yet.</p></div>';
    $('#review-count').textContent = 'Showing ' + visible.length + ' of ' + list.length + ' reviews';
    const more = $('#load-more');
    more.hidden = list.length <= shown;
  }
  ['#filter-rating', '#filter-service', '#sort-reviews'].forEach((s) => $(s).addEventListener('change', () => { shown = PAGE; render(); }));
  $('#load-more').addEventListener('click', () => { shown += PAGE; render(); });

  $('#review-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const f = e.target;
    if (!validateForm(f)) return;
    const data = new FormData(f);
    const saved = store.get('lumina_reviews', []);
    saved.unshift({ name: data.get('name').trim(), rating: Number(data.get('rating')), service: data.get('service'), text: data.get('text').trim(), date: todayISO() });
    store.set('lumina_reviews', saved);
    f.reset(); clearErrors(f);
    $('#filter-rating').value = '0'; $('#filter-service').value = ''; $('#sort-reviews').value = 'newest'; shown = PAGE;
    render();
    toast('Thank you! Your review was submitted and is awaiting moderation.');
    $('#review-list').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  render();
})();
