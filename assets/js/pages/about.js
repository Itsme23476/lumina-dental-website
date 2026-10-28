(function () {
  'use strict';
  const founder = window.UI.dentistById('amelia-hart');
  document.getElementById('founder-avatar').innerHTML = window.ART.avatar(founder.avatar, 'Illustrated portrait of ' + founder.name);
})();
