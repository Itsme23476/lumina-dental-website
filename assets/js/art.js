/* Self-contained SVG illustrations: avatars and before/after smiles */
window.ART = (function () {
  'use strict';
  let uid = 0;

  function avatar(a, label) {
    a = a || {};
    const skin = a.skin || '#f1c7a5', hair = a.hair || '#3b2a20', style = a.style || 'short';
    const coat = a.coat || '#ffffff', shirt = a.shirt || '#0d9488', bg = a.bg || '#ccfbf1';
    const back = {
      long: '<path d="M56 92C50 40 150 40 144 92L150 168C124 178 76 178 50 168Z" fill="' + hair + '"/>',
      bun: '<circle cx="100" cy="40" r="17" fill="' + hair + '"/>',
      curly: '<g fill="' + hair + '">' + [[62, 70, 16], [72, 52, 17], [92, 42, 18], [112, 42, 18], [130, 52, 17], [140, 70, 16], [58, 94, 14], [144, 94, 14], [56, 116, 12], [146, 116, 12]].map((c) => '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="' + c[2] + '"/>').join('') + '</g>'
    }[style] || '';
    const front = {
      short: '<path d="M63 86C58 54 80 44 102 44C126 44 142 56 137 86C132 74 122 66 108 64C92 62 74 68 63 86Z" fill="' + hair + '"/>',
      long: '<path d="M63 90C60 56 80 46 100 46C122 46 141 56 137 90C126 72 110 62 96 64C82 66 70 76 63 90Z" fill="' + hair + '"/>',
      bun: '<path d="M64 86C62 58 82 48 100 48C120 48 138 58 136 86C126 70 112 64 100 64C88 64 72 70 64 86Z" fill="' + hair + '"/>',
      buzz: '<path d="M65 80C66 58 84 50 100 50C118 50 134 58 135 80C124 68 112 64 100 64C88 64 76 68 65 80Z" fill="' + hair + '" opacity=".9"/>',
      curly: ''
    }[style] || '';
    const body = '<path d="M34 200C36 158 64 138 100 138C136 138 164 158 166 200Z" fill="' + coat + '" stroke="#dfe7ee" stroke-width="1.5"/>';
    const collar = a.scrubs
      ? '<path d="M87 138L100 158L113 138Z" fill="' + skin + '"/><path d="M85 138L100 160L115 138" stroke="rgba(0,0,0,.18)" stroke-width="3" fill="none"/>'
      : '<path d="M88 138L100 160L112 138Z" fill="' + shirt + '"/><path d="M88 138L100 172L95 200M112 138L100 172L105 200" stroke="#d3dde6" stroke-width="2" fill="none"/><rect x="118" y="168" width="22" height="8" rx="2" fill="' + shirt + '" opacity=".85"/>';
    const glasses = a.glasses ? '<g stroke="#26303b" stroke-width="2.2" fill="rgba(255,255,255,.18)"><rect x="76" y="82" width="20" height="15" rx="5"/><rect x="104" y="82" width="20" height="15" rx="5"/><path d="M96 89h8" fill="none"/></g>' : '';
    return '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + (label || 'Portrait illustration') + '">' +
      '<rect width="200" height="200" fill="' + bg + '"/><circle cx="162" cy="38" r="52" fill="#fff" opacity=".35"/>' +
      back + body + '<rect x="89" y="112" width="22" height="30" rx="8" fill="' + skin + '"/>' + collar +
      '<circle cx="64" cy="92" r="7" fill="' + skin + '"/><circle cx="136" cy="92" r="7" fill="' + skin + '"/>' +
      '<circle cx="100" cy="88" r="36" fill="' + skin + '"/>' + front +
      '<path d="M81 81Q87 78 93 81M107 81Q113 78 119 81" stroke="' + hair + '" stroke-width="2.6" fill="none" stroke-linecap="round"/>' +
      '<circle cx="87" cy="90" r="3.4" fill="#26303b"/><circle cx="113" cy="90" r="3.4" fill="#26303b"/>' + glasses +
      '<path d="M89 104Q100 113 111 104" stroke="#8a3b2e" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '<circle cx="79" cy="101" r="5" fill="#ef8f80" opacity=".28"/><circle cx="121" cy="101" r="5" fill="#ef8f80" opacity=".28"/></svg>';
  }

  /* Before/after smile illustration. issues: stain | gap | crooked | chip | missing */
  function smile(opts) {
    opts = opts || {};
    const id = 'sm' + (++uid);
    const after = !!opts.after;
    const issues = opts.issues || [];
    const has = (k) => !after && issues.includes(k);
    const fill = after ? 'url(#' + id + 'w)' : has('stain') ? '#d9c27f' : '#ebe0bd';
    const line = after ? '#dde5eb' : '#cdbf96';
    const dark = '#3d0f1a';

    const uw = [24, 26, 28, 32, 36, 36, 32, 28, 26, 24];
    const uh = [36, 40, 46, 44, 52, 52, 44, 46, 40, 36];
    const gap = has('gap') ? 4 : 1.5, mid = has('gap') ? 9 : 0;
    const rot = has('crooked') ? { 2: -8, 3: 7, 6: -6, 7: 9 } : {};
    const shift = has('crooked') ? { 3: 5, 6: -3, 7: 3 } : {};
    let total = uw.reduce((s, w) => s + w, 0) + gap * (uw.length - 1) + mid;
    let x = 200 - total / 2;
    let upper = '';
    uw.forEach((w, i) => {
      const cx = x + w / 2, d = (cx - 200) / 150, off = d * d * 30;
      const y = 96 + off + (shift[i] || 0), h = uh[i] - off * 0.6;
      if (!(has('missing') && i === 7)) {
        const tr = rot[i] ? ' transform="rotate(' + rot[i] + ' ' + cx.toFixed(1) + ' ' + (y + h / 2).toFixed(1) + ')"' : '';
        upper += '<g' + tr + '><rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + w + '" height="' + h.toFixed(1) + '" rx="8" fill="' + fill + '" stroke="' + line + '" stroke-width="1"/>';
        if (has('stain')) upper += '<rect x="' + (x + 2).toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + (w - 4) + '" height="12" rx="5" fill="#b8954a" opacity=".45"/>';
        if (has('chip') && i === 4) upper += '<path d="M' + (x + w - 14).toFixed(1) + ' ' + (y + h + 1).toFixed(1) + 'L' + (x + w + 1).toFixed(1) + ' ' + (y + h - 16).toFixed(1) + 'L' + (x + w + 1).toFixed(1) + ' ' + (y + h + 1).toFixed(1) + 'Z" fill="' + dark + '"/>';
        if (after && (i === 4 || i === 5)) upper += '<rect x="' + (x + 6).toFixed(1) + '" y="' + (y + 10).toFixed(1) + '" width="6" height="' + (h * 0.45).toFixed(1) + '" rx="3" fill="#fff" opacity=".8"/>';
        upper += '</g>';
      }
      x += w + gap + (i === 4 ? mid : 0);
    });

    const lw = [20, 22, 22, 22, 22, 22, 22, 22, 20];
    const lrot = has('crooked') ? { 3: 10, 4: -8, 5: 9 } : {};
    total = lw.reduce((s, w) => s + w, 0) + 1.5 * (lw.length - 1);
    x = 200 - total / 2;
    let lower = '';
    lw.forEach((w, i) => {
      const cx = x + w / 2, d = (cx - 200) / 150;
      const y = 145 - d * d * 14, h = 30 - d * d * 6;
      const tr = lrot[i] ? ' transform="rotate(' + lrot[i] + ' ' + cx.toFixed(1) + ' ' + (y + h / 2).toFixed(1) + ')"' : '';
      lower += '<rect' + tr + ' x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + w + '" height="' + h.toFixed(1) + '" rx="7" fill="' + fill + '" stroke="' + line + '" stroke-width="1"/>';
      x += w + 1.5;
    });

    const inner = 'M60 128C110 86 160 92 200 96C240 92 290 86 340 128C292 182 108 182 60 128Z';
    const sparkle = after ? '<path d="M318 58l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" fill="#fff" opacity=".95"/><path d="M80 52l2.5 6 6 2.5-6 2.5-2.5 6-2.5-6-6-2.5 6-2.5z" fill="#fff" opacity=".85"/>' : '';
    return '<svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
      '<defs><linearGradient id="' + id + 's" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + (opts.skin || '#f6d7c3') + '"/><stop offset="1" stop-color="#e9bea3"/></linearGradient>' +
      '<linearGradient id="' + id + 'w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#eaf1f5"/></linearGradient>' +
      '<clipPath id="' + id + 'c"><path d="' + inner + '"/></clipPath></defs>' +
      '<rect width="400" height="260" fill="url(#' + id + 's)"/>' +
      '<path d="M30 128C70 70 140 62 175 74C188 78 196 80 200 76C204 80 212 78 225 74C260 62 330 70 370 128C330 205 70 205 30 128Z" fill="#c4566a"/>' +
      '<path d="' + inner + '" fill="' + dark + '"/>' +
      '<g clip-path="url(#' + id + 'c)"><path d="M40 230H360V150Q200 202 40 150Z" fill="#d9707f"/>' + lower +
      '<path d="M40 40H360V134Q200 66 40 134Z" fill="#e0808e"/>' + upper + '</g>' +
      '<path d="' + inner + '" fill="none" stroke="#9e3a50" stroke-width="3"/>' +
      '<path d="M130 188Q200 200 270 188" stroke="#e98fa0" stroke-width="6" opacity=".5" fill="none" stroke-linecap="round"/>' + sparkle + '</svg>';
  }

  /* Interactive compare slider markup */
  function compare(issues, label) {
    return '<div class="compare" style="--pos:50%"><div class="compare-after">' + smile({ after: true, issues }) + '</div>' +
      '<div class="compare-before">' + smile({ issues }) + '</div>' +
      '<span class="compare-label compare-label--before">Before</span><span class="compare-label compare-label--after">After</span>' +
      '<span class="compare-handle" aria-hidden="true"><span class="compare-knob">' + window.UI.icon('move') + '</span></span>' +
      '<input type="range" min="0" max="100" value="50" aria-label="Compare before and after: ' + (label || 'smile') + '"></div>';
  }
  document.addEventListener('input', (e) => {
    if (e.target.matches('.compare input[type="range"]')) e.target.closest('.compare').style.setProperty('--pos', e.target.value + '%');
  });

  return { avatar, smile, compare };
})();
