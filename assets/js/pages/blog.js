(function () {
  'use strict';
  const { $, $$, icon, formatDate, dentistById, escapeHTML, observeReveal, param } = window.UI;
  const D = window.DATA;
  const cats = ['All'].concat(Array.from(new Set(D.posts.map((p) => p.category))));
  let active = cats.includes(param('topic')) ? param('topic') : 'All';
  const search = $('#blog-search'), filters = $('#blog-filters');

  filters.innerHTML = cats.map((c) => '<button class="chip" type="button" data-cat="' + c + '" aria-pressed="' + (c === active) + '">' + c + '</button>').join('');

  function featured(p) {
    const a = dentistById(p.author);
    return '<article class="card featured-post reveal"><div class="post-cover" style="background:linear-gradient(135deg,' + p.colors[0] + ',' + p.colors[1] + ')"><span class="badge">Featured · ' + p.category + '</span>' + icon(p.icon) + '</div>' +
      '<div class="post-body"><div class="post-meta"><span>' + icon('calendar') + formatDate(p.date) + '</span><span>' + icon('clock') + p.read + ' min read</span></div>' +
      '<h2><a href="post.html?id=' + p.id + '">' + p.title + '</a></h2><p class="lead">' + p.excerpt + '</p>' +
      '<div class="reviewer" style="margin-bottom:1.5rem"><span class="initials" style="overflow:hidden">' + window.ART.avatar(a.avatar, a.name) + '</span><div><strong>' + a.name + '</strong><small>' + a.role + '</small></div></div>' +
      '<div><a class="btn btn-primary" href="post.html?id=' + p.id + '">Read article</a></div></div></article>';
  }

  function render() {
    const q = search.value.trim().toLowerCase();
    const list = D.posts.filter((p) => (active === 'All' || p.category === active) && (!q || (p.title + ' ' + p.excerpt + ' ' + p.body + ' ' + p.category).toLowerCase().includes(q)));
    const showFeatured = !q && active === 'All' && list.length > 0;
    $('#featured').innerHTML = showFeatured ? featured(list[0]) : '';
    const rest = showFeatured ? list.slice(1) : list;
    $('#posts-grid').innerHTML = rest.length || showFeatured ? rest.map(window.CARDS.post).join('')
      : '<div class="empty">' + icon('search') + '<p>No articles found for “' + escapeHTML(search.value) + '”.</p><button class="btn btn-outline btn-sm" type="button" id="clear-blog">Show all articles</button></div>';
    $('#blog-count').textContent = list.length + ' article' + (list.length === 1 ? '' : 's');
    observeReveal();
  }
  filters.addEventListener('click', (e) => {
    const b = e.target.closest('[data-cat]');
    if (!b) return;
    active = b.dataset.cat;
    $$('[data-cat]', filters).forEach((c) => c.setAttribute('aria-pressed', String(c === b)));
    render();
  });
  search.addEventListener('input', render);
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#clear-blog')) return;
    search.value = ''; active = 'All';
    $$('[data-cat]', filters).forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.cat === 'All')));
    render();
  });
  render();
})();
