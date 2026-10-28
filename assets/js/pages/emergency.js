(function () {
  'use strict';
  const { $, icon, openStatus } = window.UI;
  const C = window.DATA.clinic;

  const st = openStatus();
  $('#emergency-status').innerHTML = st.open
    ? icon('check-circle') + ' We\'re open now. Call or walk in for same-day emergency care.'
    : icon('moon') + ' The office is closed (' + st.label.replace('Closed · ', '') + '). Call the emergency line for our on-call dentist.';

  const QUESTIONS = [
    { q: 'Do you have swelling that affects breathing or swallowing, uncontrolled bleeding, or a serious injury to the head or jaw?', yes: '911' },
    { q: 'Has an adult tooth been knocked out, or do you have severe pain or facial swelling?', yes: 'now' },
    { q: 'Do you have a broken or cracked tooth, a lost filling or crown, or a swollen, painful gum?', yes: 'soon' }
  ];
  const RESULTS = {
    '911': { title: 'Call 911 or go to the nearest emergency room now', text: 'These symptoms can be life-threatening. Once you are safe, contact us so we can coordinate follow-up dental care.', actions: '<a class="btn btn-danger" href="tel:911">' + icon('phone') + 'Call 911</a>' },
    now: { title: 'Call our emergency line now', text: 'You need to be seen today. Call us and we will see you as soon as possible, often within the hour.', actions: '<a class="btn btn-accent" href="' + C.emergencyHref + '">' + icon('phone') + 'Call ' + C.emergencyPhone + '</a>' },
    soon: { title: 'Book an urgent visit within 24–48 hours', text: 'This should be checked soon to prevent it getting worse. Follow the first-aid tips below in the meantime.', actions: '<a class="btn btn-primary" href="book.html?service=emergency-care">' + icon('calendar') + 'Book urgent visit</a><a class="btn btn-outline" href="' + C.phoneHref + '">Call the office</a>' },
    routine: { title: 'This sounds non-urgent', text: 'Book a regular appointment and we will take a look. If symptoms get worse, call us right away.', actions: '<a class="btn btn-primary" href="book.html">' + icon('calendar') + 'Book an appointment</a>' }
  };
  const box = $('#triage');
  let i = 0;
  function show() {
    if (i >= QUESTIONS.length) return result('routine');
    box.innerHTML = '<p class="triage-progress">Question ' + (i + 1) + ' of ' + QUESTIONS.length + '</p><div class="progress-bar" style="margin-bottom:1.5rem"><span style="width:' + ((i / QUESTIONS.length) * 100) + '%"></span></div>' +
      '<p class="triage-q">' + QUESTIONS[i].q + '</p><div class="btn-group"><button class="btn btn-primary btn-lg" type="button" data-answer="yes">Yes</button><button class="btn btn-outline btn-lg" type="button" data-answer="no">No</button></div>';
  }
  function result(level) {
    const r = RESULTS[level];
    box.innerHTML = '<div class="triage-result level-' + level + '"><h3>' + r.title + '</h3><p>' + r.text + '</p></div><div class="btn-group">' + r.actions +
      '<button class="btn btn-ghost" type="button" data-restart>' + icon('refresh') + 'Start over</button></div>';
  }
  box.addEventListener('click', (e) => {
    const a = e.target.closest('[data-answer]');
    if (a) { if (a.dataset.answer === 'yes') result(QUESTIONS[i].yes); else { i++; show(); } return; }
    if (e.target.closest('[data-restart]')) { i = 0; show(); }
  });
  show();
})();
