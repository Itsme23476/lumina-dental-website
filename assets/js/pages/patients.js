(function () {
  'use strict';
  const { $, $$, icon, money, validateForm, accordionItem, escapeHTML, observeReveal } = window.UI;
  const D = window.DATA;

  /* Insurance list + checker */
  const list = $('#insurer-list');
  list.innerHTML = D.insurers.map((n) => '<span class="insurer" data-name="' + n.toLowerCase() + '">' + n + '</span>').join('');
  $('#insurer-options').innerHTML = D.insurers.map((n) => '<option value="' + n + '">').join('');
  const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
  $('#insurance-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const out = $('#insurance-result');
    $$('.insurer', list).forEach((el) => el.classList.remove('is-match'));
    if (!validateForm(e.target)) { out.innerHTML = ''; return; }
    const q = norm($('#insurer-input').value);
    const match = D.insurers.find((n) => norm(n).includes(q) || (q.length > 3 && q.includes(norm(n))));
    if (match) {
      $('.insurer[data-name="' + match.toLowerCase() + '"]', list).classList.add('is-match');
      out.innerHTML = '<div class="alert alert--success">' + icon('check-circle') + '<p><strong>Good news! We\'re in network with ' + match + '.</strong> We\'ll verify your exact benefits before your visit. <a href="book.html">Book now</a></p></div>';
    } else {
      out.innerHTML = '<div class="alert alert--warn">' + icon('info') + '<p><strong>We couldn\'t find “' + escapeHTML($('#insurer-input').value) + '”.</strong> We can still file out-of-network claims for you, or you could save with a <a href="#membership">membership plan</a>. <a href="contact.html?subject=insurance">Ask our billing team</a></p></div>';
    }
  });

  /* Financing calculator */
  const amount = $('#calc-amount'), insurance = $('#calc-insurance');
  let term = 12;
  function calc() {
    const cost = Number(amount.value);
    const portion = cost * (1 - Number(insurance.value));
    const apr = term <= 12 ? 0 : 9.9;
    const r = apr / 100 / 12;
    const monthly = r === 0 ? portion / term : (portion * r) / (1 - Math.pow(1 + r, -term));
    const total = monthly * term;
    $('#calc-amount-out').textContent = money(cost);
    $('#calc-monthly').textContent = money(monthly, 2);
    $('#calc-portion').textContent = money(portion);
    $('#calc-apr').textContent = apr + '%';
    $('#calc-interest').textContent = money(total - portion, 2);
    $('#calc-total').textContent = money(total, 2);
  }
  amount.addEventListener('input', calc);
  insurance.addEventListener('change', calc);
  $$('[data-term]').forEach((b) => b.addEventListener('click', () => {
    term = Number(b.dataset.term);
    $$('[data-term]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    calc();
  }));
  calc();

  /* Membership plans */
  $('#plans').innerHTML = D.plans.map((p) => '<div class="card plan reveal' + (p.featured ? ' plan--featured' : '') + '">' + (p.featured ? '<span class="badge">Most popular</span>' : '') +
    '<h3>' + p.name + '</h3><p class="mb-0">' + p.desc + '</p><div class="plan-price">$' + p.price + '<small>/month</small></div>' +
    '<ul class="check-list">' + p.features.map((f) => '<li>' + icon('check') + f + '</li>').join('') + '</ul>' +
    '<a class="btn ' + (p.featured ? 'btn-accent' : 'btn-outline') + ' btn-block" href="contact.html?subject=membership&amp;plan=' + p.id + '">Join ' + p.name + '</a></div>').join('');

  /* Policies */
  const policies = [
    ['Cancellations & missed appointments', '<p>Please give at least 24 hours notice to cancel or reschedule. Repeated missed appointments without notice may require a deposit to book future visits.</p>'],
    ['Late arrivals', '<p>If you arrive more than 15 minutes late we may need to shorten or reschedule your visit so other patients are not delayed.</p>'],
    ['Payment', '<p>Payment for your portion is due at the time of service. We accept cash, all major credit cards, HSA/FSA cards and approved financing.</p>'],
    ['Insurance claims', '<p>We file claims with your insurer as a courtesy. You are responsible for any balance not covered by your plan; we always provide estimates in advance.</p>'],
    ['Minors', '<p>Patients under 18 must be accompanied by a parent or legal guardian at their first visit.</p>'],
    ['Privacy', '<p>Your health information is protected under HIPAA. Read our <a href="privacy.html">privacy policy</a> for details.</p>']
  ];
  $('#policy-list').innerHTML = policies.map((p, i) => accordionItem('policy-' + i, p[0], p[1], i === 0)).join('');

  /* Sub-nav scrollspy */
  const links = $$('.subnav a');
  const sections = links.map((a) => document.getElementById(a.getAttribute('href').slice(1)));
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id));
    }), { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => s && spy.observe(s));
  }

  observeReveal();
})();
