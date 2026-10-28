/* Shared header, footer and global widgets */
(function () {
  'use strict';
  const C = window.DATA.clinic;
  const { icon, $, $$, store, toast, validateForm } = window.UI;

  const NAV = [
    { label: 'Home', href: 'index.html' },
    { label: 'About', href: 'about.html', children: [
      { label: 'About Us', href: 'about.html', desc: 'Our story, values & office' },
      { label: 'Smile Gallery', href: 'gallery.html', desc: 'Before & after results' },
      { label: 'Patient Reviews', href: 'reviews.html', desc: 'What our patients say' }
    ] },
    { label: 'Services', href: 'services.html' },
    { label: 'Our Team', href: 'team.html' },
    { label: 'Patients', href: 'patients.html', children: [
      { label: 'New Patients', href: 'patients.html', desc: 'Your first visit & forms' },
      { label: 'Insurance & Financing', href: 'patients.html#insurance', desc: 'Coverage, plans & payments' },
      { label: 'FAQ', href: 'faq.html', desc: 'Answers to common questions' },
      { label: 'Emergency Care', href: 'emergency.html', desc: 'Urgent help, same day' }
    ] },
    { label: 'Blog', href: 'blog.html' },
    { label: 'Contact', href: 'contact.html' }
  ];

  const file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const current = { 'post.html': 'blog.html', '': 'index.html' }[file] || file;
  const isCurrent = (href) => href.indexOf('#') === -1 && href === current;

  const LOGO = '<svg viewBox="0 0 48 60" aria-hidden="true"><path fill="currentColor" d="M14 4C7 4 2 9 2 18c0 8 3 12 4 20 1 8 3 18 7 18s4-12 7-16c2-2 6-2 8 0 3 4 3 16 7 16s6-10 7-18c1-8 4-12 4-20 0-9-5-14-12-14-4 0-7 2-10 2s-6-2-10-2z"/></svg>';
  const logo = (extra) => '<a class="logo ' + (extra || '') + '" href="index.html" aria-label="' + C.name + ' – home"><span class="logo-mark">' + LOGO + '</span><span class="logo-text">Lumina<small>Dental Care</small></span></a>';

  function navItem(item, i) {
    const childActive = item.children && item.children.some((c) => isCurrent(c.href));
    const active = isCurrent(item.href) || childActive;
    const link = '<a class="nav-link' + (active ? ' is-active' : '') + '" href="' + item.href + '"' + (isCurrent(item.href) ? ' aria-current="page"' : '') + '>' + item.label + '</a>';
    if (!item.children) return '<li class="nav-item">' + link + '</li>';
    return '<li class="nav-item has-sub"><div class="nav-row">' + link +
      '<button class="submenu-toggle" type="button" aria-expanded="false" aria-controls="submenu-' + i + '" aria-label="Show ' + item.label + ' submenu">' + icon('chevron-down') + '</button></div>' +
      '<ul class="submenu" id="submenu-' + i + '">' + item.children.map((c) =>
        '<li><a href="' + c.href + '"' + (isCurrent(c.href) ? ' class="is-active" aria-current="page"' : '') + '><strong>' + c.label + '</strong><span>' + c.desc + '</span></a></li>').join('') + '</ul></li>';
  }

  function header() {
    const st = window.UI.openStatus();
    return '<div class="topbar"><div class="container topbar-inner"><ul class="topbar-list">' +
      '<li>' + icon('phone') + '<a href="' + C.phoneHref + '">' + C.phone + '</a></li>' +
      '<li class="hide-sm">' + icon('mail') + '<a href="mailto:' + C.email + '">' + C.email + '</a></li>' +
      '<li class="hide-xs"><span class="status-dot' + (st.open ? ' is-open' : '') + '"></span>' + st.label + '</li></ul>' +
      '<a class="topbar-emergency" href="emergency.html">' + icon('alert') + '<span>Dental emergency? Get help now</span></a></div></div>' +
      '<header class="site-header" id="site-header"><div class="container header-inner">' + logo() +
      '<nav class="nav" id="primary-nav" aria-label="Primary"><ul class="nav-list">' + NAV.map(navItem).join('') + '</ul>' +
      '<div class="nav-mobile-cta"><a class="btn btn-accent btn-block" href="book.html">' + icon('calendar') + 'Book Appointment</a><a class="btn btn-outline btn-block" href="' + C.phoneHref + '">' + icon('phone') + 'Call ' + C.phone + '</a></div></nav>' +
      '<div class="header-actions"><a class="btn btn-ghost header-phone" href="' + C.phoneHref + '">' + icon('phone') + C.phone + '</a>' +
      '<a class="btn btn-accent header-book" href="book.html">' + icon('calendar') + 'Book Now</a>' +
      '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="Open menu">' + icon('menu') + '</button></div></div></header>';
  }

  function footer() {
    const H = C.hours;
    const row = (label, h) => '<li><span>' + label + '</span><span>' + (h ? window.UI.fmtTime(h[0]) + ' – ' + window.UI.fmtTime(h[1]) : 'Closed') + '</span></li>';
    const svc = ['checkup-cleaning', 'teeth-whitening', 'dental-implants', 'clear-aligners', 'kids-dentistry', 'emergency-care'].map((id) => window.UI.serviceById(id));
    return '<footer class="site-footer"><div class="container footer-grid">' +
      '<div class="footer-brand">' + logo() + '<p>Gentle, modern dentistry for the whole family. Serving Springfield since 2008.</p>' +
      '<div class="social">' + ['facebook', 'instagram', 'youtube', 'linkedin'].map((s) => '<a href="' + C.social[s] + '" target="_blank" rel="noopener noreferrer" aria-label="' + C.name + ' on ' + s + ' (opens in new tab)">' + icon(s) + '</a>').join('') + '</div></div>' +
      '<div><h4>Explore</h4><ul class="footer-links">' +
      [['about.html', 'About Us'], ['team.html', 'Our Team'], ['gallery.html', 'Smile Gallery'], ['reviews.html', 'Reviews'], ['blog.html', 'Blog'], ['faq.html', 'FAQ'], ['patients.html', 'New Patients']].map((l) => '<li><a href="' + l[0] + '">' + l[1] + '</a></li>').join('') + '</ul></div>' +
      '<div><h4>Services</h4><ul class="footer-links">' + svc.map((s) => '<li><a href="services.html#' + s.id + '">' + s.name + '</a></li>').join('') + '<li><a class="link-arrow" style="color:#5eead4" href="services.html">All services ' + icon('arrow-right') + '</a></li></ul></div>' +
      '<div><h4>Visit us</h4><ul class="footer-links footer-contact">' +
      '<li>' + icon('pin') + '<a href="' + C.mapsUrl + '" target="_blank" rel="noopener noreferrer">' + C.address + '<br>' + C.city + '</a></li>' +
      '<li>' + icon('phone') + '<a href="' + C.phoneHref + '">' + C.phone + '</a></li>' +
      '<li>' + icon('mail') + '<a href="mailto:' + C.email + '">' + C.email + '</a></li></ul>' +
      '<ul class="footer-hours">' + row('Mon – Thu', H[1]) + row('Friday', H[5]) + row('Saturday', H[6]) + row('Sunday', H[0]) + '</ul></div></div>' +
      '<div class="container footer-newsletter"><div><h4>Smile tips in your inbox</h4><p>One helpful email a month. No spam, unsubscribe anytime.</p></div>' +
      '<form class="newsletter" data-newsletter novalidate><div class="field"><label class="visually-hidden" for="footer-email">Email address</label><input type="email" id="footer-email" name="email" placeholder="you@example.com" required></div><button class="btn btn-accent" type="submit">Subscribe</button></form></div>' +
      '<div class="container footer-bottom"><p>© ' + new Date().getFullYear() + ' ' + C.name + '. All rights reserved.</p><nav aria-label="Legal"><a href="privacy.html">Privacy Policy</a><a href="privacy.html#terms">Terms of Use</a><a href="privacy.html#accessibility">Accessibility</a></nav></div></footer>';
  }

  function mount(id, html) {
    const el = document.getElementById(id);
    if (el) el.outerHTML = html;
  }
  mount('site-header-mount', header());
  mount('site-footer-mount', footer());

  /* Global widgets */
  document.body.insertAdjacentHTML('beforeend',
    '<button class="back-to-top" type="button" aria-label="Back to top">' + icon('arrow-up') + '</button>' +
    '<div class="mobile-cta"><a class="btn btn-outline" href="' + C.phoneHref + '">' + icon('phone') + 'Call</a><a class="btn btn-accent" href="book.html">' + icon('calendar') + 'Book</a></div>');
  if (!store.get('lumina_cookie')) {
    document.body.insertAdjacentHTML('beforeend', '<div class="cookie" role="dialog" aria-label="Cookie preferences"><p><strong>We value your privacy.</strong> We use essential cookies to make this site work and optional analytics cookies to improve it. <a href="privacy.html#cookies">Learn more</a></p><div class="btn-group"><button class="btn btn-primary btn-sm" type="button" data-cookie="accepted">Accept all</button><button class="btn btn-outline btn-sm" type="button" data-cookie="essential">Essential only</button></div></div>');
  }

  /* Interactions */
  const hdr = $('#site-header');
  const toggle = $('.nav-toggle');
  function setNav(open) {
    hdr.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    toggle.innerHTML = icon(open ? 'x' : 'menu');
  }
  function closeSubs(except) {
    $$('.nav-item.has-sub').forEach((li) => {
      if (li === except) return;
      li.classList.remove('is-open');
      $('.submenu-toggle', li).setAttribute('aria-expanded', 'false');
    });
  }
  toggle.addEventListener('click', () => setNav(!hdr.classList.contains('nav-open')));
  $$('.submenu-toggle').forEach((btn) => btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const li = btn.closest('.nav-item');
    const open = !li.classList.contains('is-open');
    closeSubs(li);
    li.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', String(open));
  }));
  document.addEventListener('click', (e) => { if (!e.target.closest('.nav-item.has-sub')) closeSubs(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeSubs(); if (hdr.classList.contains('nav-open')) { setNav(false); toggle.focus(); } } });
  $$('.nav a').forEach((a) => a.addEventListener('click', () => setNav(false)));

  const btt = $('.back-to-top');
  function onScroll() {
    hdr.classList.toggle('is-scrolled', window.scrollY > 10);
    btt.classList.toggle('is-visible', window.scrollY > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-cookie]');
    if (!b) return;
    store.set('lumina_cookie', b.dataset.cookie);
    b.closest('.cookie').remove();
    toast(b.dataset.cookie === 'accepted' ? 'Thanks! Your cookie preferences were saved.' : 'Only essential cookies will be used.');
  });

  /* Newsletter forms (footer + blog) */
  document.addEventListener('submit', (e) => {
    const form = e.target.closest('[data-newsletter]');
    if (!form) return;
    e.preventDefault();
    if (!validateForm(form)) return;
    const email = form.querySelector('input[type="email"]').value.trim();
    const list = store.get('lumina_newsletter', []);
    if (!list.includes(email)) list.push(email);
    store.set('lumina_newsletter', list);
    form.reset();
    window.UI.clearErrors(form);
    toast('Thanks for subscribing! Check ' + email + ' for a welcome email.');
  });
})();
