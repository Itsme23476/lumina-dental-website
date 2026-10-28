(function () {
  'use strict';
  const U = window.UI;
  const { $, $$, icon, escapeHTML, serviceById, dentistById, toISO, todayISO, fromISO, fmtTime, toMin, minToTime, priceLabel, validateForm, store, toast, download, param } = U;
  const D = window.DATA;
  const MAX_DAYS = 90;

  const state = { step: 1, service: null, dentist: null, date: null, time: null, patient: null, ref: null };
  const form = $('#patient-form');
  D.insurers.concat(['Other']).forEach((n) => form.elements.insurance.appendChild(new Option(n, n)));

  /* ---------- Availability ---------- */
  const eligible = () => {
    if (!state.service) return D.team;
    const list = D.team.filter((d) => d.categories.includes(state.service.category));
    return list.length ? list : D.team;
  };
  const workingDays = () => {
    const ds = state.dentist && state.dentist !== 'any' ? [dentistById(state.dentist)] : eligible();
    return new Set(ds.flatMap((d) => d.days));
  };
  const maxISO = () => { const d = new Date(); d.setDate(d.getDate() + MAX_DAYS); return toISO(d); };
  function dayAvailable(iso) {
    const day = fromISO(iso).getDay();
    return iso >= todayISO() && iso <= maxISO() && !!D.clinic.hours[day] && workingDays().has(day) && slotsFor(iso).some((s) => s.free);
  }
  function hash(str) { let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function slotsFor(iso) {
    const hrs = D.clinic.hours[fromISO(iso).getDay()];
    if (!hrs) return [];
    const len = state.service ? state.service.minutes : 60;
    const now = new Date();
    const nowMin = iso === todayISO() ? now.getHours() * 60 + now.getMinutes() + 60 : -1;
    const key = state.dentist || 'any';
    const out = [];
    for (let m = toMin(hrs[0]); m + len <= toMin(hrs[1]); m += 30) {
      const t = minToTime(m);
      out.push({ time: t, free: m > nowMin && hash(iso + t + key) % 100 >= 30 });
    }
    return out;
  }

  /* ---------- Step 1: services ---------- */
  function renderServices() {
    const q = $('#bk-search').value.trim().toLowerCase();
    const html = Object.keys(D.categories).map((cat) => {
      const items = D.services.filter((s) => s.category === cat && (!q || (s.name + ' ' + s.short).toLowerCase().includes(q)));
      if (!items.length) return '';
      return '<div class="option-group"><h3>' + D.categories[cat] + '</h3><div class="option-grid">' + items.map((s) =>
        '<button class="option" type="button" data-pick-service="' + s.id + '" aria-pressed="' + (state.service && state.service.id === s.id) + '"><span class="icon-badge icon-badge--sm">' + icon(s.icon) + '</span><span><strong>' + s.name + '</strong><small>' + s.minutes + ' min · ' + priceLabel(s).replace(/<[^>]+>/g, '') + '</small></span></button>').join('') + '</div></div>';
    }).join('');
    $('#service-options').innerHTML = html || '<div class="empty mt-1">' + icon('search') + '<p class="mb-0">No treatments match your search.</p></div>';
  }
  $('#bk-search').addEventListener('input', renderServices);
  $('#service-options').addEventListener('click', (e) => {
    const b = e.target.closest('[data-pick-service]');
    if (!b) return;
    state.service = serviceById(b.dataset.pickService);
    if (state.dentist && state.dentist !== 'any' && !eligible().some((d) => d.id === state.dentist)) state.dentist = null;
    if (state.date && !dayAvailable(state.date)) { state.date = null; state.time = null; }
    renderServices(); update();
  });

  /* ---------- Step 2: dentists ---------- */
  function renderDentists() {
    const list = eligible();
    $('#dentist-intro').textContent = state.service ? list.length + ' dentist' + (list.length > 1 ? 's offer ' : ' offers ') + state.service.name + '.' : 'Choose a dentist.';
    $('#dentist-options').innerHTML = '<button class="option" type="button" data-pick-dentist="any" aria-pressed="' + (state.dentist === 'any') + '"><span class="avatar-sm">' + icon('users') + '</span><span><strong>No preference</strong><small>First available dentist · most availability</small></span></button>' +
      list.map((d) => '<button class="option" type="button" data-pick-dentist="' + d.id + '" aria-pressed="' + (state.dentist === d.id) + '"><span class="avatar-sm">' + window.ART.avatar(d.avatar, d.name) + '</span><span><strong>' + d.name + '</strong><small>' + d.role + '</small><small>' + d.days.map((n) => U.DAYS[n].slice(0, 3)).join(' · ') + '</small></span></button>').join('');
  }
  $('#dentist-options').addEventListener('click', (e) => {
    const b = e.target.closest('[data-pick-dentist]');
    if (!b) return;
    state.dentist = b.dataset.pickDentist;
    if (state.date && !dayAvailable(state.date)) { state.date = null; state.time = null; }
    else if (state.date && state.time && !slotsFor(state.date).some((s) => s.free && s.time === state.time)) state.time = null;
    renderDentists(); update();
  });

  /* ---------- Step 3: calendar & slots ---------- */
  let view = new Date(); view = new Date(view.getFullYear(), view.getMonth(), 1);
  function renderCalendar() {
    const y = view.getFullYear(), m = view.getMonth();
    $('#cal-title').textContent = view.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const first = new Date(y, m, 1).getDay();
    const days = new Date(y, m + 1, 0).getDate();
    let html = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => '<span class="cal-dow" aria-hidden="true">' + d + '</span>').join('');
    for (let i = 0; i < first; i++) html += '<span></span>';
    for (let d = 1; d <= days; d++) {
      const iso = toISO(new Date(y, m, d));
      const ok = dayAvailable(iso);
      const label = fromISO(iso).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) + (ok ? '' : ', unavailable');
      html += '<button class="cal-day' + (iso === todayISO() ? ' is-today' : '') + '" type="button" data-date="' + iso + '" aria-label="' + label + '" aria-pressed="' + (state.date === iso) + '"' + (ok ? '' : ' disabled') + '>' + d + '</button>';
    }
    $('#cal-grid').innerHTML = html;
    const now = new Date();
    const max = fromISO(maxISO());
    $('#cal-prev').disabled = y === now.getFullYear() && m === now.getMonth();
    $('#cal-next').disabled = y === max.getFullYear() && m === max.getMonth();
  }
  function renderSlots() {
    const box = $('#slots');
    if (!state.date) { box.innerHTML = '<div class="empty" style="padding:2rem 1rem">' + icon('calendar') + '<p class="mb-0">Select a date to see available times.</p></div>'; return; }
    const slots = slotsFor(state.date);
    const group = (title, list) => list.length ? '<div class="slot-group"><h4>' + title + '</h4><div class="slots">' + list.map((s) =>
      '<button class="slot" type="button" data-time="' + s.time + '" aria-pressed="' + (state.time === s.time) + '"' + (s.free ? '' : ' disabled aria-label="' + fmtTime(s.time) + ' unavailable"') + '>' + fmtTime(s.time) + '</button>').join('') + '</div></div>' : '';
    box.innerHTML = '<p class="label" style="margin-bottom:1rem">' + fromISO(state.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) + '</p>' +
      group('Morning', slots.filter((s) => toMin(s.time) < 720)) + group('Afternoon', slots.filter((s) => toMin(s.time) >= 720));
  }
  $('#cal-prev').addEventListener('click', () => { view = new Date(view.getFullYear(), view.getMonth() - 1, 1); renderCalendar(); });
  $('#cal-next').addEventListener('click', () => { view = new Date(view.getFullYear(), view.getMonth() + 1, 1); renderCalendar(); });
  $('#cal-grid').addEventListener('click', (e) => {
    const b = e.target.closest('[data-date]');
    if (!b || b.disabled) return;
    state.date = b.dataset.date; state.time = null;
    renderCalendar(); renderSlots(); update();
  });
  $('#slots').addEventListener('click', (e) => {
    const b = e.target.closest('[data-time]');
    if (!b || b.disabled) return;
    state.time = b.dataset.time;
    renderSlots(); update();
  });

  /* ---------- Summary & review ---------- */
  const dentistLabel = () => !state.dentist ? null : state.dentist === 'any' ? 'First available dentist' : dentistById(state.dentist).name;
  const dateLabel = () => state.date ? fromISO(state.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) + (state.time ? ' at ' + fmtTime(state.time) : '') : null;
  function renderSummary() {
    const row = (ic, label, val) => '<li>' + icon(ic) + '<div><small>' + label + '</small>' + (val ? '<strong>' + escapeHTML(val) + '</strong>' : '<span class="empty-val">Not selected</span>') + '</div></li>';
    $('#summary').innerHTML = row('tooth', 'Treatment', state.service && state.service.name) + row('user', 'Dentist', dentistLabel()) + row('calendar', 'Date & time', dateLabel()) +
      row('clock', 'Duration', state.service && state.service.minutes + ' minutes') +
      (state.patient ? row('users', 'Patient', state.patient.first + ' ' + state.patient.last) : '');
  }
  function reviewRows(editable) {
    const r = (label, val, step) => '<div class="review-row"><div><small>' + label + '</small><strong>' + escapeHTML(val) + '</strong></div>' + (editable ? '<button class="btn btn-ghost btn-sm" type="button" data-goto="' + step + '">' + icon('edit') + 'Edit</button>' : '') + '</div>';
    const p = state.patient;
    return r('Treatment', state.service.name + ' (' + state.service.minutes + ' min)', 1) + r('Dentist', dentistLabel(), 2) + r('Date & time', dateLabel(), 3) +
      r('Patient', p.first + ' ' + p.last + ' · ' + p.patientType, 4) + r('Contact', p.email + ' · ' + p.phone, 4) + r('Insurance', p.insurance, 4) +
      (p.notes ? r('Notes', p.notes, 4) : '');
  }
  $('#review-list').addEventListener('click', (e) => { const b = e.target.closest('[data-goto]'); if (b) go(Number(b.dataset.goto)); });

  /* ---------- Navigation ---------- */
  const canLeave = {
    1: () => (state.service ? true : 'Please choose a treatment to continue.'),
    2: () => (state.dentist ? true : 'Please choose a dentist, or select “No preference”.'),
    3: () => (state.date && state.time ? true : state.date ? 'Please choose a time slot.' : 'Please choose a date and time.'),
    4: () => {
      if (!validateForm(form)) return 'Please complete the highlighted fields.';
      const f = form.elements;
      state.patient = { first: f.first.value.trim(), last: f.last.value.trim(), email: f.email.value.trim(), phone: f.phone.value.trim(), dob: f.dob.value,
        insurance: f.insurance.value, patientType: form.querySelector('[name="patientType"]:checked').value, notes: f.notes.value.trim(), reminders: f.reminders.checked };
      return true;
    }
  };
  function update() {
    $$('.step-panel').forEach((p) => { p.hidden = Number(p.dataset.step) !== state.step; });
    $$('#progress li').forEach((li, i) => {
      li.className = i + 1 < state.step ? 'is-done' : i + 1 === state.step ? 'is-current' : '';
      if (i + 1 === state.step) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
    });
    $('#wizard-nav').hidden = state.step === 6;
    $('#btn-back').style.visibility = state.step === 1 ? 'hidden' : 'visible';
    const next = $('#btn-next');
    next.innerHTML = state.step === 5 ? icon('check') + 'Confirm booking' : 'Continue' + icon('arrow-right');
    renderSummary();
  }
  function go(step, quiet) {
    state.step = step;
    if (step === 2) renderDentists();
    if (step === 3) {
      if (state.date) { const d = fromISO(state.date); view = new Date(d.getFullYear(), d.getMonth(), 1); }
      $('#date-intro').textContent = (state.dentist === 'any' ? 'Showing availability for all eligible dentists' : 'Showing availability for ' + dentistLabel()) + '. Times shown are for a ' + (state.service ? state.service.minutes : 60) + '-minute visit.';
      renderCalendar(); renderSlots();
    }
    if (step === 5) $('#review-list').innerHTML = reviewRows(true);
    update();
    const panel = $('.step-panel[data-step="' + step + '"] h2');
    if (quiet) return;
    $('#booking-top').scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (panel) setTimeout(() => panel.focus({ preventScroll: true }), 50);
  }
  $('#btn-back').addEventListener('click', () => { if (state.step > 1) go(state.step - 1); });
  $('#btn-next').addEventListener('click', () => {
    if (state.step === 5) return confirm();
    const ok = canLeave[state.step]();
    if (ok !== true) { toast(ok, 'error'); return; }
    go(state.step + 1);
  });

  /* ---------- Confirm ---------- */
  function confirm() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    state.ref = 'LDC-' + Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    const bookings = store.get('lumina_bookings', []);
    bookings.push({ ref: state.ref, service: state.service.id, dentist: state.dentist, date: state.date, time: state.time, patient: state.patient, created: new Date().toISOString() });
    store.set('lumina_bookings', bookings);
    $('#confirm-ref').textContent = state.ref;
    $('#confirm-text').textContent = 'Thanks, ' + state.patient.first + '! A confirmation has been sent to ' + state.patient.email + '. Your booking reference is:';
    $('#confirm-list').innerHTML = reviewRows(false);
    go(6);
    toast('Appointment confirmed for ' + dateLabel() + '.');
  }
  const icsDate = (iso, t) => iso.replace(/-/g, '') + 'T' + t.replace(':', '') + '00';
  $('#add-calendar').addEventListener('click', () => {
    const end = minToTime(toMin(state.time) + state.service.minutes);
    const stamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Lumina Dental Care//Booking//EN', 'BEGIN:VEVENT', 'UID:' + state.ref + '@luminadental.example', 'DTSTAMP:' + stamp,
      'DTSTART:' + icsDate(state.date, state.time), 'DTEND:' + icsDate(state.date, end), 'SUMMARY:Dental appointment: ' + state.service.name,
      'LOCATION:' + (D.clinic.address + ', ' + D.clinic.city).replace(/,/g, '\\,'), 'DESCRIPTION:With ' + dentistLabel() + '. Ref ' + state.ref + '. Call ' + D.clinic.phone + ' to reschedule.',
      'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    download('lumina-appointment-' + state.ref + '.ics', ics, 'text/calendar');
    toast('Calendar file downloaded.');
  });
  $('#print-booking').addEventListener('click', () => window.print());
  $('#book-another').addEventListener('click', () => {
    Object.assign(state, { service: null, dentist: null, date: null, time: null, patient: null, ref: null });
    form.reset(); U.clearErrors(form);
    $('#bk-search').value = '';
    renderServices(); go(1);
  });

  /* ---------- Prefill from URL ---------- */
  const ps = serviceById(param('service'));
  const pd = dentistById(param('dentist'));
  if (ps) state.service = ps;
  if (pd && (!ps || eligible().some((d) => d.id === pd.id))) state.dentist = pd.id;
  const pdate = param('date');
  if (pdate && /^\d{4}-\d{2}-\d{2}$/.test(pdate) && dayAvailable(pdate)) state.date = pdate;
  renderServices();
  state.step = 1;
  update();
  if (state.service) go(state.dentist ? 3 : 2, true);
})();
