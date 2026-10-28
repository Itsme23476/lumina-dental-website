(function () {
  'use strict';
  const { $, $$, store, toast } = window.UI;

  $('#cookie-reset').addEventListener('click', () => {
    store.set('lumina_cookie', null);
    try { localStorage.removeItem('lumina_cookie'); } catch (e) { /* ignore */ }
    if (!$('.cookie')) {
      document.body.insertAdjacentHTML('beforeend', '<div class="cookie" role="dialog" aria-label="Cookie preferences"><p><strong>Update your cookie preferences.</strong> Choose which cookies we may use.</p><div class="btn-group"><button class="btn btn-primary btn-sm" type="button" data-cookie="accepted">Accept all</button><button class="btn btn-outline btn-sm" type="button" data-cookie="essential">Essential only</button></div></div>');
    }
    toast('Choose your new cookie preference below.');
  });

  // Table of contents scrollspy: highlight the last heading scrolled past
  const links = $$('.toc a');
  const targets = links.map((a) => document.getElementById(a.getAttribute('href').slice(1)));
  function spy() {
    let current = targets[0];
    targets.forEach((t) => { if (t && t.getBoundingClientRect().top <= 160) current = t; });
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) current = targets[targets.length - 1];
    links.forEach((a, i) => a.classList.toggle('is-active', targets[i] === current));
  }
  window.addEventListener('scroll', spy, { passive: true });
  links.forEach((a, i) => a.addEventListener('click', () => setTimeout(() => {
    links.forEach((l, j) => l.classList.toggle('is-active', j === i));
  }, 0)));
  spy();
})();
