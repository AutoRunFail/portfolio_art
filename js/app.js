/* =====================================================================
   APP  -  turns the data in data.js into the pages. Used by both
   index.html (home), work.html and about.html. No need to edit unless you
   want to change how things look or behave.
   ===================================================================== */
(function () {
  'use strict';

  const S = SETTINGS;
  const PAGE = document.body.dataset.page;               // 'home', 'work' or 'about'
  const M = Object.fromEntries(MEDIUMS.map(m => [m.id, m]));
  const BY = Object.fromEntries(PROJECTS.map(p => [p.slug, p]));
  const $ = (s, r) => (r || document).querySelector(s);

  /* text color that stays readable on each medium's color */
  const lum = hex => {
    const n = parseInt(hex.slice(1), 16);
    const f = v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); };
    return .2126 * f(n >> 16 & 255) + .7152 * f(n >> 8 & 255) + .0722 * f(n & 255);
  };
  MEDIUMS.forEach(m => { m.on = lum(m.color) > .18 ? '#1D1A3B' : '#FFFFFF'; });

  /* tiny element builder */
  const h = (tag, props, ...kids) => {
    const e = document.createElement(tag);
    for (const k in (props || {})) {
      const v = props[k];
      if (v == null || v === false) continue;
      if (k === 'class') e.className = v;
      else if (k === 'text') e.textContent = v;
      else if (k === 'style') e.setAttribute('style', v);
      else e.setAttribute(k, v === true ? '' : v);
    }
    kids.flat().forEach(c => { if (c != null && c !== false) e.append(c.nodeType ? c : document.createTextNode(c)); });
    return e;
  };
  const tint = m => `--c:${m.color};--on:${m.on}`;
  const plural = (n, w) => n + ' ' + w + (n === 1 ? '' : 's');

  /* ---------- prepare projects ---------- */
  PROJECTS.forEach(p => {
    p.primary = M[p.tools[0]];
    p.flat = p.phases.flatMap(ph => ph.items.map(it => ({ ph, it })));
    p.imgCount = p.flat.filter(x => !x.it.video).length;
    p.hasVideo = p.flat.some(x => x.it.video);
    p.coverRef = p.flat.find(x => x.it.file === p.cover) || [...p.flat].reverse().find(x => !x.it.video);
  });

  /* ---------- text shared by both pages ---------- */
  const set = (sel, fn) => { const e = $(sel); if (e) fn(e); };
  set('#site-name', e => { e.textContent = S.name; });
  set('#hero-name', e => { e.textContent = S.name; });
  set('#intro', e => { e.textContent = S.intro; });
  set('#where', e => { e.textContent = S.places; });
  set('#mail', e => { e.textContent = S.email; e.href = 'mailto:' + S.email; });
  set('#year', e => { e.textContent = new Date().getFullYear(); });
  const BASE_TITLE = PAGE === 'work' ? 'Work | ' + S.name : S.name + ' | Illustration, design and 3D';
  document.title = BASE_TITLE;

  /* ---------- home: the tool swatches (each opens the Work page for that tool) ---------- */
  if (PAGE === 'home') {
    const box = $('#chips');
    let i = 0;
    Object.keys(FAMILIES).forEach(fam => {
      const row = h('div', { class: 'row' });
      MEDIUMS.filter(m => m.family === fam).forEach(m => {
        const n = PROJECTS.filter(p => p.tools.includes(m.id)).length;
        row.append(h('a', { class: 'swatch', href: 'work.html?m=' + m.id, style: tint(m) + ';--i:' + (i++) },
          h('span', { class: 'blk', text: plural(n, 'project') }),
          h('span', { class: 'nm', text: m.name })));
      });
      box.append(h('div', { class: 'fam' }, h('h2', { text: FAMILIES[fam] }), row));
    });
    return;
  }
  if (PAGE === 'about') return;

  /* =================== work page =================== */

  /* ---------- where a file lives ---------- */
  function src(p, ph, it, w) {
    if (S.source === 'drive') {
      return it.video ? `https://drive.google.com/file/d/${it.id}/preview`
                      : `https://lh3.googleusercontent.com/d/${it.id}=w${w || 1400}`;
    }
    const path = [p.dir, ph && ph.dir, it.file].filter(Boolean).join('/');
    return S.localRoot + path.split('/').map(encodeURIComponent).join('/');
  }

  const toolChip = m => h('span', { class: 'tool', style: tint(m) }, h('i'), m.name);
  const countText = p => plural(p.imgCount, 'image') + (p.hasVideo ? ' + video' : '');
  const byYear = (a, b) => (b.year || 0) - (a.year || 0);

  function cover(p) {
    const r = p.coverRef;
    const f = h('figure', { class: 'cover' + (p.fit === 'contain' ? ' contain' : '') });
    const img = h('img', { src: src(p, r.ph, r.it, 720), alt: '', loading: 'lazy', decoding: 'async' });
    img.addEventListener('error', () => f.classList.add('broken'));
    f.append(img, h('span', { class: 'ph', text: p.title }));
    return f;
  }

  function card(p, m) {
    return h('button', { class: 'card', type: 'button', 'data-slug': p.slug, style: tint(m), 'aria-label': 'Open ' + p.title },
      cover(p),
      h('div', { class: 'body' },
        h('h4', { text: p.title }),
        h('div', { class: 'meta' }, p.year ? h('span', { class: 'pill', text: p.year }) : null, p.tools.map(t => toolChip(M[t]))),
        h('p', { class: 'count', text: (p.group ? p.group + ' \u00b7 ' : '') + countText(p) })
      ));
  }

  /* ---------- filter chips + project grid ---------- */
  const ALL = { color: '#F2A900', on: '#1D1A3B' };
  let filter = 'all';

  function renderFilters() {
    const box = $('#filters');
    box.replaceChildren();
    const chip = (id, m, label, n) => h('button', {
      class: 'fchip', type: 'button', 'data-f': id, 'aria-pressed': String(filter === id), style: tint(m) },
      id === 'all' ? null : h('i'), label, h('span', { class: 'k', text: n }));
    box.append(chip('all', ALL, 'All', PROJECTS.length));
    Object.keys(FAMILIES).forEach(fam => {
      const g = h('div', { class: 'fgroup', role: 'group', 'aria-label': FAMILIES[fam] });
      MEDIUMS.filter(m => m.family === fam).forEach(m =>
        g.append(chip(m.id, m, m.name, PROJECTS.filter(p => p.tools.includes(m.id)).length)));
      box.append(g);
    });
  }

  /* on phones the chips scroll sideways: keep the chosen one in view */
  function centerChip() {
    const box = $('#filters'), on = $('.fchip[aria-pressed="true"]');
    if (on && box.scrollWidth > box.clientWidth) box.scrollLeft = on.offsetLeft - (box.clientWidth - on.offsetWidth) / 2;
  }

  function renderWork() {
    const m = M[filter];
    const list = (m ? PROJECTS.filter(p => p.tools.includes(m.id)) : PROJECTS.slice()).sort(byYear);
    const head = $('#work-head');
    head.setAttribute('style', tint(m || ALL));
    head.replaceChildren(
      h('h2', { text: m ? m.name : 'All projects' }),
      h('p', { text: m ? m.blurb : 'Newest first. Pick a tool above to narrow it down.' }),
      h('span', { class: 'n', text: plural(list.length, 'project') }));
    $('#work-body').replaceChildren(...list.map(p => card(p, m || p.primary)));
  }

  function setFilter(f) {
    filter = M[f] ? f : 'all';
    document.querySelectorAll('.fchip').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.f === filter)));
    renderWork();
    centerChip();
    const q = filter === 'all' ? '' : '?m=' + filter;
    history.replaceState(null, '', location.pathname + q + location.hash);
  }
  $('#filters').addEventListener('click', e => {
    const b = e.target.closest('.fchip');
    if (b) setFilter(b.dataset.f);
  });

  /* ---------- project viewer ---------- */
  const viewer = $('#viewer'), body = $('#v-body'), lb = $('#lb');
  let current = null, lbList = [], lbIdx = 0;

  function shot(p, ph, it, big) {
    const f = h('figure', { class: 'shot' + (it.video ? ' is-video' : '') });
    if (it.video) {
      if (S.source === 'drive') {
        f.append(h('iframe', { src: src(p, ph, it), allow: 'autoplay', loading: 'lazy', title: it.cap }));
      } else {
        const v = h('video', { src: src(p, ph, it), controls: true, preload: 'none', playsinline: true });
        v.addEventListener('error', () => f.classList.add('broken'));
        f.append(v, h('span', { class: 'ph', text: 'Video unavailable' }));
      }
    } else {
      const idx = lbList.length;
      lbList.push({ p, ph, it });
      const img = h('img', { src: src(p, ph, it, big ? 1600 : 800), alt: it.cap, loading: 'lazy', decoding: 'async' });
      const b = h('button', { class: 'zoom', type: 'button', 'data-i': idx, 'aria-label': 'Enlarge: ' + it.cap }, img, h('span', { class: 'ph', text: it.cap }));
      img.addEventListener('error', () => b.classList.add('broken'));
      f.append(b);
    }
    f.append(h('figcaption', { text: it.cap }));
    return f;
  }

  function buildViewer(p) {
    const m = p.primary;
    viewer.setAttribute('style', tint(m));
    lbList = [];
    const seq = !!p.process && p.phases.length > 1;
    const head = h('header', { class: 'v-head' },
      h('h2', { id: 'v-title', text: p.title }),
      h('div', { class: 'meta' }, p.year ? h('span', { class: 'pill', text: p.year }) : null, p.tools.map(t => toolChip(M[t]))),
      h('p', { class: 'sub', text: (p.group ? 'From ' + p.group + ' \u00b7 ' : '') + countText(p) }));

    const phases = h('div', { class: 'phases' }, p.phases.map((ph, i) => {
      const n = ph.items.length;
      const cls = ph.tile === 'sm' ? 'sm' : n === 1 ? 'one' : n === 2 ? 'two' : n >= 8 ? 'many' : '';
      const shots = h('div', { class: 'shots ' + cls }, ph.items.map(it => shot(p, ph, it, n <= 2)));
      const title = p.phases.length > 1 && h('div', { class: 'p-title' }, h('h3', { text: ph.t }), ph.tool ? toolChip(M[ph.tool]) : null);
      const mine = ph.tool && M[ph.tool] ? tint(M[ph.tool]) : null;
      return h('section', { class: 'phase' + (seq ? ' seq' : ''), style: seq && mine ? mine : null },
        seq ? h('div', { class: 'rail' }, h('span', { class: 'num', text: i + 1 })) : null,
        h('div', { class: 'phase-body' }, title, shots));
    }));
    body.replaceChildren(head, phases);
    viewer.scrollTop = 0;
  }

  function openProject(slug, push) {
    const p = BY[slug];
    if (!p) return;
    current = slug;
    buildViewer(p);
    if (!viewer.open) { viewer.showModal(); viewer.focus(); }
    document.documentElement.classList.add('lock');
    document.title = p.title + ' | ' + S.name;
    if (push) history.pushState(null, '', '#' + slug);
  }

  viewer.addEventListener('close', () => {
    document.documentElement.classList.remove('lock');
    document.title = BASE_TITLE;
    if (location.hash.slice(1) === current) history.pushState(null, '', location.pathname + location.search);
    current = null;
  });
  viewer.addEventListener('click', e => { if (e.target === viewer) viewer.close(); });
  $('.v-close').addEventListener('click', () => viewer.close());

  /* ---------- lightbox ---------- */
  function showLb(i) {
    lbIdx = (i + lbList.length) % lbList.length;
    const { p, ph, it } = lbList[lbIdx];
    const img = $('#lb-img');
    img.src = src(p, ph, it, 2200);
    img.alt = it.cap;
    $('#lb-cap').textContent = it.cap + '  (' + (lbIdx + 1) + ' of ' + lbList.length + ')';
    document.querySelectorAll('.lb-nav').forEach(b => { b.hidden = lbList.length < 2; });
  }
  body.addEventListener('click', e => {
    const b = e.target.closest('.zoom');
    if (!b || b.classList.contains('broken')) return;
    showLb(+b.dataset.i);
    lb.showModal();
  });
  $('.lb-prev').addEventListener('click', () => showLb(lbIdx - 1));
  $('.lb-next').addEventListener('click', () => showLb(lbIdx + 1));
  $('.lb-close').addEventListener('click', () => lb.close());
  lb.addEventListener('click', e => { if (e.target === lb || e.target.classList.contains('lb-in')) lb.close(); });
  lb.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') showLb(lbIdx - 1);
    if (e.key === 'ArrowRight') showLb(lbIdx + 1);
  });

  /* ---------- wiring ---------- */
  $('#work-body').addEventListener('click', e => {
    const c = e.target.closest('.card');
    if (c) openProject(c.dataset.slug, true);
  });

  function route() {
    const s = location.hash.slice(1);
    if (s && BY[s]) openProject(s, false);
    else if (viewer.open) viewer.close();
  }
  window.addEventListener('popstate', route);

  const start = new URLSearchParams(location.search).get('m');
  filter = M[start] ? start : 'all';
  renderFilters();
  renderWork();
  centerChip();
  route();
})();
