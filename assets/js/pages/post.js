(function () {
  'use strict';
  const { $, icon, formatDate, dentistById, param, copyText, toast, observeReveal } = window.UI;
  const D = window.DATA;
  const idx = D.posts.findIndex((p) => p.id === param('id'));
  const root = $('#post-root');

  if (idx === -1) {
    document.title = 'Article not found | Lumina Dental Care';
    root.innerHTML = '<section class="section"><div class="container"><div class="empty">' + icon('book') + '<h1 style="font-size:2rem">Article not found</h1><p>The article you are looking for may have moved.</p><a class="btn btn-primary" href="blog.html">Browse all articles</a></div></div></section>';
    $('#related').innerHTML = D.posts.slice(0, 3).map(window.CARDS.post).join('');
    observeReveal();
    return;
  }

  const p = D.posts[idx];
  const a = dentistById(p.author);
  const prev = D.posts[idx - 1], next = D.posts[idx + 1];
  const url = location.href.split('#')[0];
  document.title = p.title + ' | Lumina Dental Care Blog';
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute('content', p.excerpt);

  root.innerHTML =
    '<section class="page-hero"><div class="container"><div class="article-head">' +
    '<nav class="breadcrumb" aria-label="Breadcrumb" style="justify-content:center"><a href="index.html">Home</a><span>/</span><a href="blog.html">Blog</a><span>/</span><span aria-current="page">' + p.category + '</span></nav>' +
    '<span class="badge">' + p.category + '</span><h1 class="mt-1">' + p.title + '</h1>' +
    '<div class="post-meta"><span>' + icon('user') + a.name + '</span><span>' + icon('calendar') + formatDate(p.date) + '</span><span>' + icon('clock') + p.read + ' min read</span></div></div>' +
    '<div class="post-cover article-cover" style="background:linear-gradient(135deg,' + p.colors[0] + ',' + p.colors[1] + ')">' + icon(p.icon) + '</div></div></section>' +
    '<section class="section"><div class="container"><article class="article"><p class="lead">' + p.excerpt + '</p>' + p.body +
    '<div class="share"><strong>Share this article</strong>' +
    '<a class="icon-btn" href="https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url) + '" target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">' + icon('facebook') + '</a>' +
    '<a class="icon-btn" href="https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(url) + '" target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">' + icon('linkedin') + '</a>' +
    '<a class="icon-btn" href="mailto:?subject=' + encodeURIComponent(p.title) + '&amp;body=' + encodeURIComponent(p.excerpt + '\n\n' + url) + '" aria-label="Share by email">' + icon('mail') + '</a>' +
    '<button class="btn btn-outline btn-sm" type="button" id="copy-link">' + icon('copy') + 'Copy link</button></div>' +
    '<div class="author-card"><div class="avatar">' + window.ART.avatar(a.avatar, a.name) + '</div><div><small class="muted">Written by</small><h3 class="mb-0" style="font-size:1.15rem">' + a.name + ', ' + a.credentials + '</h3><p>' + a.role + '. <a href="team.html#' + a.id + '">View profile</a></p></div></div>' +
    '<nav class="post-nav" aria-label="More articles">' +
    (prev ? '<a href="post.html?id=' + prev.id + '"><small>' + icon('arrow-left') + 'Newer article</small>' + prev.title + '</a>' : '<span></span>') +
    (next ? '<a class="next" href="post.html?id=' + next.id + '"><small>Older article' + icon('arrow-right') + '</small>' + next.title + '</a>' : '<span></span>') +
    '</nav></article></div></section>';

  $('#copy-link').addEventListener('click', () => {
    copyText(url).then(() => toast('Link copied to your clipboard.'), () => toast('Could not copy automatically. Please copy the address bar URL.', 'error'));
  });

  const related = D.posts.filter((x) => x.id !== p.id).sort((x, y) => (y.category === p.category) - (x.category === p.category)).slice(0, 3);
  $('#related').innerHTML = related.map(window.CARDS.post).join('');
  observeReveal();
})();
