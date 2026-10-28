/* Shared UI helpers: icons, modal, toast, tabs, accordion, validation, storage */
window.UI = (function () {
  'use strict';

  const STAR = 'm12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z';
  const ICONS = {
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    pin: '<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    'check-circle': '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4 12 14.01l-3-3"/>',
    star: '<path d="' + STAR + '"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    'shield-check': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
    smile: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>',
    tooth: '<path d="M7 3C4.8 3 3 4.8 3 7.5c0 2.4 1 3.6 1.4 6 .4 2.6.9 7.5 2.6 7.5 1.6 0 1.8-4.5 3-6 .5-.6 1.5-.6 2 0 1.2 1.5 1.4 6 3 6 1.7 0 2.2-4.9 2.6-7.5.4-2.4 1.4-3.6 1.4-6C21 4.8 19.2 3 17 3c-1.8 0-3 1-5 1S8.8 3 7 3z"/>',
    sparkle: '<path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z"/>',
    heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/>',
    user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    'chevron-down': '<path d="m6 9 6 6 6-6"/>',
    'chevron-left': '<path d="m15 18-6-6 6-6"/>',
    'chevron-right': '<path d="m9 18 6-6-6-6"/>',
    'arrow-right': '<path d="M5 12h14M12 5l7 7-7 7"/>',
    'arrow-left': '<path d="M19 12H5M12 19l-7-7 7-7"/>',
    'arrow-up': '<path d="M12 19V5M5 12l7-7 7 7"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>',
    alert: '<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5M12 15V3"/>',
    printer: '<path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
    card: '<rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/>',
    award: '<circle cx="12" cy="8" r="7"/><path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12"/>',
    zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
    implant: '<path d="M7 3h10l-1.5 4h-7z"/><path d="M9 7h6l-.6 3H9.6zM9.6 10h4.8l-.6 3h-3.6zM10.2 13h3.6l-.6 3h-2.4zM12 16v5"/>',
    braces: '<rect x="2" y="8" width="20" height="8" rx="4"/><path d="M2 12h20M7 10v4M12 10v4M17 10v4"/>',
    aligner: '<path d="M3 10c0-3 4-5 9-5s9 2 9 5-2 7-9 7-9-4-9-7z"/><path d="M7 9v2M10 8.5v2.5M14 8.5v2.5M17 9v2"/>',
    crown: '<path d="m2 18 2-11 5 5 3-7 3 7 5-5 2 11z"/><path d="M2 21h20"/>',
    activity: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
    droplet: '<path d="M12 2.69 17.66 8.35a8 8 0 1 1-11.31 0z"/>',
    sun: '<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>',
    scan: '<path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M8 12h8M12 8v8"/>',
    layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
    facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01"/>',
    youtube: '<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><path d="m9.75 15.02 5.75-3.27-5.75-3.27z"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    quote: '<path d="M3 21c3 0 7-1 7-8V5c0-1.25-.76-2.02-2-2H4c-1.25 0-2 .75-2 1.97V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .01-1 1.03V20c0 1 0 1 1 1zM15 21c3 0 7-1 7-8V5c0-1.25-.76-2.02-2-2h-4c-1.25 0-2 .75-2 1.97V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>',
    wifi: '<path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"/>',
    coffee: '<path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3"/>',
    car: '<path d="M3 13l2-6h14l2 6v5h-2.5M3 13v5h2.5M3 13h18M9.5 18h5"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
    percent: '<path d="M19 5 5 19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
    send: '<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    refresh: '<path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>',
    home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
    moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/>',
    navigation: '<path d="m3 11 19-9-9 19-2-8z"/>',
    lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    tag: '<path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><path d="M7 7h.01"/>',
    move: '<path d="m15 18 6-6-6-6M9 6l-6 6 6 6"/>'
  };

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  function icon(name, cls) {
    const p = ICONS[name];
    if (!p) return '';
    return '<svg class="icon' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + p + '</svg>';
  }
  function hydrateIcons(root) {
    $$('[data-icon]', root || document).forEach((el) => {
      if (el.dataset.iconDone) return;
      el.insertAdjacentHTML('afterbegin', icon(el.dataset.icon));
      el.dataset.iconDone = '1';
    });
  }
  function stars(n, max) {
    max = max || 5;
    let out = '';
    for (let i = 0; i < max; i++) {
      out += '<svg class="icon' + (i < Math.round(n) ? '' : ' empty') + '" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" aria-hidden="true"><path d="' + STAR + '"/></svg>';
    }
    return '<span class="stars" role="img" aria-label="' + n + ' out of ' + max + ' stars">' + out + '</span>';
  }

  const escapeHTML = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const param = (name) => new URLSearchParams(location.search).get(name);
  const pad = (n) => String(n).padStart(2, '0');
  const toISO = (d) => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  const todayISO = () => toISO(new Date());
  const fromISO = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const money = (n, dec) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: dec || 0, maximumFractionDigits: dec || 0 }).format(n);
  const formatDate = (iso, opts) => fromISO(iso).toLocaleDateString('en-US', opts || { month: 'long', day: 'numeric', year: 'numeric' });
  const toMin = (t) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
  const fmtTime = (t) => { let [h, m] = t.split(':').map(Number); const ap = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12; return h + ':' + pad(m) + ' ' + ap; };
  const minToTime = (min) => pad(Math.floor(min / 60)) + ':' + pad(min % 60);
  const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  function openStatus(now) {
    now = now || new Date();
    const H = window.DATA.clinic.hours;
    const d = now.getDay();
    const mins = now.getHours() * 60 + now.getMinutes();
    const today = H[d];
    if (today) {
      if (mins >= toMin(today[0]) && mins < toMin(today[1])) return { open: true, label: 'Open now · until ' + fmtTime(today[1]) };
      if (mins < toMin(today[0])) return { open: false, label: 'Closed · opens today ' + fmtTime(today[0]) };
    }
    for (let i = 1; i <= 7; i++) {
      const nd = (d + i) % 7;
      if (H[nd]) return { open: false, label: 'Closed · opens ' + (i === 1 ? 'tomorrow' : DAYS[nd]) + ' ' + fmtTime(H[nd][0]) };
    }
    return { open: false, label: 'Closed' };
  }

  const store = {
    get(k, fb) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fb; } catch (e) { return fb; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } }
  };

  /* ---------- Toast ---------- */
  function toast(message, type) {
    type = type || 'success';
    let region = $('.toast-region');
    if (!region) {
      region = document.createElement('div');
      region.className = 'toast-region';
      region.setAttribute('role', 'status');
      region.setAttribute('aria-live', 'polite');
      document.body.appendChild(region);
    }
    const t = document.createElement('div');
    t.className = 'toast toast--' + type;
    t.innerHTML = icon(type === 'error' ? 'alert' : 'check-circle') + '<div>' + escapeHTML(message) + '</div>';
    region.appendChild(t);
    setTimeout(() => { t.classList.add('is-leaving'); setTimeout(() => t.remove(), 300); }, 4000);
  }

  /* ---------- Modal ---------- */
  const Modal = (function () {
    let el, lastFocus, onCloseCb;
    function ensure() {
      if (el) return el;
      el = document.createElement('div');
      el.className = 'modal';
      el.setAttribute('aria-hidden', 'true');
      el.innerHTML = '<div class="modal-dialog" role="dialog" aria-modal="true" tabindex="-1"><button class="icon-btn modal-close" type="button" aria-label="Close dialog">' + icon('x') + '</button><div class="modal-body"></div></div>';
      document.body.appendChild(el);
      el.addEventListener('click', (e) => {
        if (e.target === el || e.target.closest('.modal-close') || e.target.closest('[data-modal-close]')) close();
      });
      document.addEventListener('keydown', (e) => {
        if (!el.classList.contains('is-open')) return;
        if (e.key === 'Escape') close();
        if (e.key === 'Tab') trap(e);
      });
      return el;
    }
    function trap(e) {
      const f = $$('a[href], button:not([disabled]), input, select, textarea', el).filter((x) => x.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    function open(html, opts) {
      opts = opts || {};
      ensure();
      lastFocus = document.activeElement;
      const dialog = $('.modal-dialog', el);
      dialog.setAttribute('aria-label', opts.label || 'Dialog');
      $('.modal-body', el).innerHTML = html;
      hydrateIcons(el);
      el.classList.add('is-open');
      el.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      onCloseCb = opts.onClose;
      dialog.scrollTop = 0;
      setTimeout(() => dialog.focus(), 30);
    }
    function close() {
      if (!el || !el.classList.contains('is-open')) return;
      el.classList.remove('is-open');
      el.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
      if (lastFocus && lastFocus.focus) lastFocus.focus();
      const cb = onCloseCb; onCloseCb = null;
      if (cb) cb();
    }
    return { open, close, isOpen: () => !!el && el.classList.contains('is-open') };
  })();

  /* ---------- Tabs (delegated) ---------- */
  function activateTab(tab, focus) {
    const list = tab.closest('[role="tablist"]');
    $$('[role="tab"]', list).forEach((t) => {
      const sel = t === tab;
      t.setAttribute('aria-selected', String(sel));
      t.tabIndex = sel ? 0 : -1;
      const p = document.getElementById(t.getAttribute('aria-controls'));
      if (p) p.hidden = !sel;
    });
    if (focus) tab.focus();
  }
  document.addEventListener('click', (e) => {
    const tab = e.target.closest('[role="tab"]');
    if (tab) activateTab(tab);
  });
  document.addEventListener('keydown', (e) => {
    const tab = e.target.closest && e.target.closest('[role="tab"]');
    if (!tab || !['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) return;
    const tabs = $$('[role="tab"]', tab.closest('[role="tablist"]'));
    let i = tabs.indexOf(tab);
    if (e.key === 'ArrowRight') i = (i + 1) % tabs.length;
    if (e.key === 'ArrowLeft') i = (i - 1 + tabs.length) % tabs.length;
    if (e.key === 'Home') i = 0;
    if (e.key === 'End') i = tabs.length - 1;
    e.preventDefault();
    activateTab(tabs[i], true);
  });

  /* ---------- Accordion (delegated) ---------- */
  function toggleAccordion(trig, force) {
    const open = typeof force === 'boolean' ? force : trig.getAttribute('aria-expanded') !== 'true';
    trig.setAttribute('aria-expanded', String(open));
    const panel = document.getElementById(trig.getAttribute('aria-controls'));
    if (panel) panel.hidden = !open;
    const item = trig.closest('.accordion-item');
    if (item) item.classList.toggle('is-open', open);
  }
  document.addEventListener('click', (e) => {
    const trig = e.target.closest('.accordion-trigger');
    if (trig) toggleAccordion(trig);
  });
  function accordionItem(id, title, bodyHTML, open) {
    return '<div class="accordion-item' + (open ? ' is-open' : '') + '"><h3 class="accordion-heading"><button class="accordion-trigger" type="button" aria-expanded="' + (open ? 'true' : 'false') + '" aria-controls="' + id + '"><span>' + title + '</span><span class="plus">' + icon('plus') + '</span></button></h3><div class="accordion-panel" id="' + id + '"' + (open ? '' : ' hidden') + '>' + bodyHTML + '</div></div>';
  }

  /* ---------- Form validation ---------- */
  function fieldWrap(input) { return input.closest('.field') || input.parentElement; }
  function setError(input, msg) {
    const wrap = fieldWrap(input);
    let err = wrap.querySelector('.field-error');
    if (!err) {
      err = document.createElement('p');
      err.className = 'field-error';
      err.id = (input.id || input.name) + '-error';
      wrap.appendChild(err);
    }
    err.textContent = msg || '';
    if (msg) {
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', err.id);
      wrap.classList.add('is-invalid');
    } else {
      input.removeAttribute('aria-invalid');
      wrap.classList.remove('is-invalid');
    }
  }
  function checkField(input) {
    const v = (input.value || '').trim();
    if (input.type === 'checkbox') return input.required && !input.checked ? (input.dataset.msg || 'Please check this box to continue.') : '';
    if (input.type === 'radio') {
      const group = $$('input[name="' + input.name + '"]', input.form || document);
      return group.some((g) => g.required) && !group.some((g) => g.checked) ? (input.dataset.msg || 'Please choose an option.') : '';
    }
    if (input.required && !v) return input.dataset.msg || 'This field is required.';
    if (!v) return '';
    if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Please enter a valid email address.';
    if (input.type === 'tel' && v.replace(/\D/g, '').length < 10) return 'Please enter a valid phone number (at least 10 digits).';
    if (input.minLength > 0 && v.length < input.minLength) return 'Please enter at least ' + input.minLength + ' characters.';
    if (input.type === 'date' && input.hasAttribute('data-past') && v >= todayISO()) return 'Please enter a date in the past.';
    if (input.type === 'date' && input.min && v < input.min) return 'Please choose a date from today onwards.';
    return '';
  }
  function validateForm(form) {
    const seen = new Set();
    let firstInvalid = null;
    $$('input, select, textarea', form).forEach((i) => {
      if (i.disabled || ['hidden', 'submit', 'button'].includes(i.type)) return;
      if (i.type === 'radio') { if (seen.has(i.name)) return; seen.add(i.name); }
      const msg = checkField(i);
      setError(i, msg);
      if (msg && !firstInvalid) firstInvalid = i;
    });
    form.dataset.validated = '1';
    if (firstInvalid) firstInvalid.focus();
    return !firstInvalid;
  }
  function clearErrors(form) {
    delete form.dataset.validated;
    $$('input, select, textarea', form).forEach((i) => setError(i, ''));
  }
  ['input', 'change'].forEach((evt) => document.addEventListener(evt, (e) => {
    const t = e.target;
    if (!t.form || !t.form.dataset.validated || !t.matches('input, select, textarea')) return;
    if (t.type === 'radio') { const first = $('input[name="' + t.name + '"]', t.form); setError(first, checkField(first)); }
    else setError(t, checkField(t));
  }));

  /* ---------- Reveal on scroll & counters ---------- */
  let io;
  function observeReveal(root) {
    const els = $$('.reveal:not(.is-visible)', root || document);
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('is-visible')); return; }
    if (!io) {
      io = new IntersectionObserver((entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      }), { rootMargin: '0px 0px -40px 0px', threshold: 0.08 });
    }
    els.forEach((e) => io.observe(e));
  }
  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const dec = (el.dataset.count.split('.')[1] || '').length;
    const suffix = el.dataset.suffix || '';
    const dur = 1400, start = performance.now();
    function step(now) {
      const p = Math.min((now - start) / dur, 1);
      const val = target * (1 - Math.pow(1 - p, 3));
      el.textContent = (dec ? val.toFixed(dec) : Math.round(val).toLocaleString('en-US')) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  function initCounters() {
    const els = $$('[data-count]');
    // Final values are already in the HTML; only animate when motion is allowed
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cio = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { animateCount(en.target); cio.unobserve(en.target); }
    }), { threshold: 0.4 });
    els.forEach((e) => cio.observe(e));
  }

  /* ---------- Misc ---------- */
  function download(filename, content, mime) {
    const blob = new Blob([content], { type: mime || 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise((resolve, reject) => {
      const ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy') ? resolve() : reject(); } catch (e) { reject(e); }
      ta.remove();
    });
  }
  const serviceById = (id) => window.DATA.services.find((s) => s.id === id);
  const dentistById = (id) => window.DATA.team.find((d) => d.id === id);
  const priceLabel = (s) => (s.price == null ? s.priceLabel : 'From ' + money(s.price) + (s.priceNote ? ' <small>' + s.priceNote + '</small>' : ''));

  document.addEventListener('DOMContentLoaded', () => { hydrateIcons(); observeReveal(); initCounters(); });

  return { $, $$, icon, hydrateIcons, stars, escapeHTML, param, pad, toISO, todayISO, fromISO, money, formatDate, toMin, fmtTime, minToTime, DAYS,
    openStatus, store, toast, Modal, activateTab, toggleAccordion, accordionItem, validateForm, clearErrors, setError, observeReveal, download, copyText,
    serviceById, dentistById, priceLabel };
})();
