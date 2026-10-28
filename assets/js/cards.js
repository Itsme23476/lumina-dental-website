/* Reusable card templates */
window.CARDS = (function () {
  'use strict';
  const { icon, escapeHTML, formatDate, priceLabel, dentistById } = window.UI;
  const D = window.DATA;

  function service(s, opts) {
    opts = opts || {};
    const action = opts.modal
      ? '<button class="link-arrow" type="button" data-service="' + s.id + '">Learn more ' + icon('arrow-right') + '</button>'
      : '<a class="link-arrow" href="services.html#' + s.id + '">Learn more ' + icon('arrow-right') + '</a>';
    return '<article class="card card--hover service-card reveal"><div class="card-top"><span class="icon-badge">' + icon(s.icon) + '</span>' +
      '<span class="badge badge--muted">' + D.categories[s.category] + '</span></div>' +
      '<h3>' + s.name + '</h3><p>' + s.short + '</p>' +
      '<div class="card-meta"><span class="price">' + priceLabel(s) + '</span>' + action + '</div></article>';
  }

  function dentist(d, opts) {
    opts = opts || {};
    const profile = opts.modal
      ? '<button class="btn btn-outline btn-sm" type="button" data-dentist="' + d.id + '">View profile</button>'
      : '<a class="btn btn-outline btn-sm" href="team.html#' + d.id + '">View profile</a>';
    return '<article class="card card--hover team-card reveal"><div class="avatar">' + window.ART.avatar(d.avatar, 'Illustrated portrait of ' + d.name) + '</div>' +
      '<div class="team-card-body"><h3>' + d.name + ', ' + d.credentials + '</h3><p class="role">' + d.role + '</p>' +
      '<div class="team-meta"><span>' + icon('award') + d.years + ' yrs experience</span><span>' + icon('globe') + d.languages.join(', ') + '</span></div>' +
      '<div class="btn-group">' + profile + '<a class="btn btn-primary btn-sm" href="book.html?dentist=' + d.id + '">Book with ' + d.name.split(' ')[1] + '</a></div></div></article>';
  }

  function post(p) {
    const author = dentistById(p.author);
    return '<article class="card card--hover post-card reveal"><div class="post-cover" style="background:linear-gradient(135deg,' + p.colors[0] + ',' + p.colors[1] + ')">' +
      '<span class="badge">' + p.category + '</span>' + icon(p.icon) + '</div><div class="post-body">' +
      '<div class="post-meta"><span>' + icon('calendar') + formatDate(p.date, { month: 'short', day: 'numeric', year: 'numeric' }) + '</span><span>' + icon('clock') + p.read + ' min read</span></div>' +
      '<h3><a href="post.html?id=' + p.id + '">' + p.title + '</a></h3><p class="muted">' + p.excerpt + '</p>' +
      '<div class="card-meta"><span class="muted">By ' + (author ? author.name : 'Lumina Team') + '</span><a class="link-arrow" href="post.html?id=' + p.id + '" aria-label="Read article: ' + escapeHTML(p.title) + '">Read ' + icon('arrow-right') + '</a></div></div></article>';
  }

  const initials = (name) => name.split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase();

  return { service, dentist, post, initials };
})();
