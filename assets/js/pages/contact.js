(function () {
  'use strict';
  const { $, param, openStatus, fmtTime, DAYS, validateForm, clearErrors, store, toast, copyText, serviceById } = window.UI;
  const D = window.DATA;
  const form = $('#contact-form');

  /* Prefill from URL, e.g. ?subject=membership&plan=premier or ?subject=service&service=veneers */
  const subject = param('subject');
  if (subject && form.elements.subject.querySelector('option[value="' + subject + '"]')) form.elements.subject.value = subject;
  const plan = D.plans.find((p) => p.id === param('plan'));
  const svc = serviceById(param('service'));
  if (plan) form.elements.message.value = "Hi, I'd like to join the " + plan.name + ' membership plan ($' + plan.price + '/month). Please let me know the next steps.';
  else if (svc) form.elements.message.value = 'Hi, I have a question about ' + svc.name + ': ';
  else if (subject === 'careers') form.elements.message.value = "Hi, I'm interested in joining the Lumina team. The role I'm interested in is: ";

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateForm(form)) { toast('Please fix the highlighted fields.', 'error'); return; }
    const data = Object.fromEntries(new FormData(form));
    const ref = 'MSG-' + Date.now().toString(36).toUpperCase().slice(-6);
    const saved = store.get('lumina_messages', []);
    saved.push(Object.assign({ ref, sent: new Date().toISOString() }, data));
    store.set('lumina_messages', saved);
    $('#contact-success-text').textContent = 'Thanks, ' + data.name.split(' ')[0] + '! Your reference is ' + ref + '. We will reply by ' + (data.method === 'email' ? 'email to ' + data.email : data.method === 'text' ? 'text message' : 'phone') + ' within one business day.';
    form.hidden = true;
    $('#contact-success').hidden = false;
    $('#contact-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  $('#contact-again').addEventListener('click', () => {
    form.reset(); clearErrors(form);
    form.hidden = false;
    $('#contact-success').hidden = true;
    form.elements.name.focus();
  });

  /* Hours */
  const today = new Date().getDay();
  const order = [1, 2, 3, 4, 5, 6, 0];
  $('#hours-body').innerHTML = order.map((d) => {
    const h = D.clinic.hours[d];
    return '<tr' + (d === today ? ' class="is-today"' : '') + '><td>' + DAYS[d] + (d === today ? ' (today)' : '') + '</td><td>' + (h ? fmtTime(h[0]) + ' – ' + fmtTime(h[1]) : 'Closed') + '</td></tr>';
  }).join('');
  const st = openStatus();
  const badge = $('#open-status');
  badge.classList.toggle('is-open', st.open);
  badge.querySelector('.status-dot').classList.toggle('is-open', st.open);
  badge.lastElementChild.textContent = st.label;

  $('#copy-address').addEventListener('click', () => {
    copyText(D.clinic.address + ', ' + D.clinic.city).then(() => toast('Address copied to clipboard.'), () => toast('Could not copy. Address: ' + D.clinic.address, 'error'));
  });
})();
