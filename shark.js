/* Overhead ASCII shark for the home page. The body is a chain of characters that follows the head's path and
   swishes side to side, seen from above. It prowls, sometimes darts at the mouse, thrashes its head as if
   tearing a piece off, then bolts off screen and comes back later. Decorative only: ignores clicks, hidden on
   project pages, off for prefers-reduced-motion. */
(function(){
"use strict";
if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;

var cv = document.createElement("canvas");
cv.className = "shark";
cv.setAttribute("aria-hidden", "true");
document.body.appendChild(cv);
var ctx = cv.getContext("2d"), dpr = 1, VW = 0, VH = 0;
function resize(){
  dpr = Math.min(2, window.devicePixelRatio || 1);
  VW = window.innerWidth; VH = window.innerHeight;
  cv.width = Math.round(VW * dpr); cv.height = Math.round(VH * dpr);
}
resize();
window.addEventListener("resize", resize);

var css = getComputedStyle(document.documentElement);
var INK = css.getPropertyValue("--accent").trim() || "#c6f432";
var BG = css.getPropertyValue("--bg").trim() || "#0b0b0c";

var N = 30;          // spine points, snout to tail
var STEP = 6;        // px between spine points
var L = STEP * (N - 1);
var ACROSS = 4.5;    // px between characters across the body

/* half-width of the body (px) along its length, u = 0 at the snout, 1 at the base of the tail:
   conical snout, widest just behind the pectoral fins, long taper to a narrow tail stock */
var PROFILE = [[0, 2], [0.04, 6], [0.10, 10.5], [0.18, 14], [0.28, 16], [0.38, 15.5], [0.50, 13], [0.65, 9], [0.80, 5], [0.90, 3], [1, 2.5]];
function halfWidth(u){
  for (var k = 1; k < PROFILE.length; k++){
    if (u <= PROFILE[k][0]){
      var a = PROFILE[k - 1], b = PROFILE[k], f = (u - a[0]) / (b[0] - a[0]);
      return a[1] + (b[1] - a[1]) * (f * f * (3 - 2 * f));
    }
  }
  return 2.5;
}

function rand(a, b){ return a + Math.random() * (b - a); }

var hx = -60, hy = 300, vx = 0, vy = 0, heading = 0, t = 0, phase = 0, shake = 0;
var trail = [], bits = [], bites = [], prey = null, biting = null;

/* ---- prey: a letter of the name / a project title, or the "See the work" button ---- */
function inView(r, m){ return r.width > 0 && r.bottom > m && r.top < VH - m && r.right > m && r.left < VW - m; }
function pickPrey(){
  var cands = [];
  document.querySelectorAll("#app .name, #app .row-title").forEach(function(el){
    var w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), n;
    while ((n = w.nextNode())) for (var i = 0; i < n.data.length; i++) if (/\w/.test(n.data[i])) cands.push({kind: "letter", el: el, node: n, i: i});
  });
  document.querySelectorAll("#app .pill").forEach(function(el){ for (var k = 0; k < 8; k++) cands.push({kind: "button", el: el}); });
  for (var k = cands.length - 1; k > 0; k--){ var j = Math.floor(Math.random() * (k + 1)), tmp = cands[k]; cands[k] = cands[j]; cands[j] = tmp; }
  for (k = 0; k < cands.length; k++){
    var p = cands[k], r = preyRect(p);
    if (!r || !inView(r, 50)) continue;
    // bite somewhere on the edge so it reads as a chunk taken out
    var e = Math.random();
    if (p.kind === "letter"){
      if (e < 0.5){ p.fx = rand(0.2, 0.8); p.fy = 0.08; } else if (e < 0.75){ p.fx = 0.06; p.fy = rand(0.25, 0.75); } else { p.fx = 0.94; p.fy = rand(0.25, 0.75); }
      p.rad = Math.max(8, Math.min(26, r.height * 0.24));
    } else {
      if (e < 0.4){ p.fx = rand(0.15, 0.85); p.fy = 0; } else if (e < 0.8){ p.fx = rand(0.15, 0.85); p.fy = 1; } else { p.fx = e < 0.9 ? 0.03 : 0.97; p.fy = 0.5; }
      p.rad = Math.max(10, Math.min(20, r.height * 0.38));
    }
    var st = getComputedStyle(p.el);
    p.color = p.kind === "button" ? st.backgroundColor : st.color;
    return p;
  }
  return null;
}
function preyRect(p){
  if (!p.el.isConnected) return null;
  if (p.kind === "letter"){
    var rg = document.createRange(); rg.setStart(p.node, p.i); rg.setEnd(p.node, p.i + 1);
    return rg.getBoundingClientRect();
  }
  return p.el.getBoundingClientRect();
}
/* a letter's text box is taller than the letter; measure where the ink actually sits so bites land on it */
var mctx = document.createElement("canvas").getContext("2d");
function inkBox(p, r){
  var st = getComputedStyle(p.el), ch = p.node.data[p.i];
  mctx.font = st.fontWeight + " " + st.fontSize + " " + st.fontFamily;
  var m = mctx.measureText(ch), fa = m.fontBoundingBoxAscent, fd = m.fontBoundingBoxDescent;
  if (!(fa > 0)) return r;
  var base = r.top + (r.height - (fa + fd)) / 2 + fa;
  var top = base - m.actualBoundingBoxAscent, bottom = base + Math.max(0, m.actualBoundingBoxDescent);
  return {left: r.left, width: r.width, top: top, height: Math.max(4, bottom - top)};
}
function preyPoint(p){
  var r = preyRect(p);
  if (!r || !inView(r, 0)) return null;
  if (p.kind === "letter") r = inkBox(p, r);
  return {x: r.left + r.width * p.fx, y: r.top + r.height * p.fy};
}

/* ---- bite marks: a toothed hole in the page colour, pinned to the page; heals once scrolled out of view ---- */
var TEETH = (function(){
  var pts = [], n = 30;
  for (var k = 0; k < n; k++){
    var a = k / n * Math.PI * 2, r = k % 2 ? 50 : 40 + Math.random() * 4;
    pts.push((50 + Math.cos(a) * r).toFixed(1) + "% " + (50 + Math.sin(a) * r).toFixed(1) + "%");
  }
  return "polygon(" + pts.join(",") + ")";
})();
function biteMark(x, y, rad){
  var d = document.createElement("div");
  d.className = "shark-bite";
  d.setAttribute("aria-hidden", "true");
  d.style.left = (x + window.scrollX - rad) + "px";
  d.style.top = (y + window.scrollY - rad) + "px";
  d.style.width = d.style.height = (rad * 2) + "px";
  d.style.clipPath = d.style.webkitClipPath = TEETH;
  d.style.setProperty("--rot", rand(0, 360).toFixed(0) + "deg");
  document.body.appendChild(d);
  bites.push(d);
  while (bites.length > 8) bites.shift().remove();
}
function healAll(){ bites.forEach(function(d){ d.remove(); }); bites = []; }
function healOffscreen(){
  for (var k = bites.length - 1; k >= 0; k--){
    var r = bites[k].getBoundingClientRect();
    if (r.bottom < 0 || r.top > VH || r.right < 0 || r.left > VW){ bites[k].remove(); bites.splice(k, 1); }
  }
}
window.addEventListener("hashchange", healAll);
window.addEventListener("resize", healAll);
function scraps(x, y, color, count, big){
  for (var b = 0; b < count; b++){
    var a = rand(0, Math.PI * 2), s = rand(40, big ? 160 : 110);
    bits.push({x: x, y: y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, r: rand(0, 6), ch: (big ? "#%=:.," : ".,'`")[b % (big ? 6 : 4)], life: 1, color: color});
  }
}
var tx = 0, ty = 0, mode = "away", until = 0, nextEvent = 0;
var mouseX = null, mouseY = null, mouseAt = -1e9;
var last = performance.now(), now = last;

window.addEventListener("mousemove", function(e){ mouseX = e.clientX; mouseY = e.clientY; mouseAt = performance.now(); }, {passive:true});

function resetTrail(){
  trail = [];
  for (var k = 0; k <= N + 2; k++) trail.push({x: hx - Math.cos(heading) * k * STEP, y: hy - Math.sin(heading) * k * STEP});
}
function pickTarget(){
  var m = 70;
  tx = rand(m, Math.max(m + 1, VW - m));
  ty = rand(m + 40, Math.max(m + 41, VH - m));
}
function steer(destX, destY, speed, k, dt){
  var dx = destX - hx, dy = destY - hy, d = Math.hypot(dx, dy) || 1;
  var s = Math.min(speed, Math.max(40, d * 2));
  vx += (dx / d * s - vx) * Math.min(1, dt * k);
  vy += (dy / d * s - vy) * Math.min(1, dt * k);
  return d;
}
function enter(){
  var fromLeft = Math.random() < 0.5;
  hx = fromLeft ? -20 : VW + 20;
  hy = rand(100, Math.max(101, VH - 100));
  heading = fromLeft ? 0 : Math.PI;
  vx = Math.cos(heading) * 70; vy = 0;
  resetTrail();
  pickTarget();
  mode = "prowl";
  nextEvent = now + rand(7000, 14000);
}
function leave(fast){
  mode = fast ? "bolt" : "leave";
  tx = (hx < VW / 2) ? -L - 160 : VW + L + 160;
  ty = hy + rand(-140, 140);
  if (fast){ // kick off at speed, already angled toward the exit
    var dx = tx - hx, dy = ty - hy, d = Math.hypot(dx, dy) || 1;
    vx = dx / d * 260; vy = dy / d * 260;
  }
}
function onHome(){ return (location.hash || "#home").indexOf("#p-") !== 0; }

/* sample the spine: N points spaced STEP apart along the path the head has travelled */
function spine(){
  var pts = [{x: hx, y: hy}], prev = pts[0], need = STEP;
  for (var j = 0; j < trail.length && pts.length < N; j++){
    var q = trail[j];
    for (;;){
      var d = Math.hypot(q.x - prev.x, q.y - prev.y);
      if (d >= need && d > 0){
        var f = need / d;
        prev = {x: prev.x + (q.x - prev.x) * f, y: prev.y + (q.y - prev.y) * f};
        pts.push(prev); need = STEP;
        if (pts.length >= N) break;
      } else { need -= d; prev = q; break; }
    }
  }
  while (pts.length < N){
    var a = pts[pts.length - 1], b = pts[pts.length - 2] || {x: a.x + Math.cos(heading), y: a.y + Math.sin(heading)};
    var dd = Math.hypot(a.x - b.x, a.y - b.y) || 1;
    pts.push({x: a.x + (a.x - b.x) / dd * STEP, y: a.y + (a.y - b.y) / dd * STEP});
  }
  return pts;
}

function glyph(ch, x, y, ang, alpha){
  ctx.globalAlpha = alpha;
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.fillText(ch, 0, 0); ctx.restore();
}

function draw(){
  var pts = spine(), speed = Math.hypot(vx, vy), i, u;
  var amp = 2 + Math.min(1, speed / 220) * 4;
  var ang = [];
  function angles(){
    for (var i = 0; i < N; i++){
      var p0 = pts[Math.max(0, i - 1)], p1 = pts[Math.min(N - 1, i + 1)];
      ang[i] = Math.atan2(p0.y - p1.y, p0.x - p1.x);
    }
  }
  angles();
  // swish toward the tail; during a bite the head thrashes side to side instead
  var thrash = Math.sin(t * 42) * 9 * shake;
  for (i = 0; i < N; i++){
    u = i / (N - 1);
    var off = Math.sin(phase - u * 5) * amp * Math.pow(u, 1.3) + thrash * Math.pow(1 - u, 2);
    pts[i] = {x: pts[i].x - Math.sin(ang[i]) * off, y: pts[i].y + Math.cos(ang[i]) * off};
  }
  angles();

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, VW, VH);
  ctx.font = "700 10px ui-monospace,SFMono-Regular,Consolas,'Courier New',monospace";
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillStyle = INK;

  // point beside spine point i (fractional i allowed): side = px to the right of travel, back = px backward
  function at(fi, side, back){
    var i = Math.max(0, Math.min(N - 1, Math.round(fi))), a = ang[i];
    return {x: pts[i].x - Math.sin(a) * side - Math.cos(a) * back, y: pts[i].y + Math.cos(a) * side - Math.sin(a) * back, a: a};
  }
  // fill a triangle (root front, root back, tip) given in spine-local coords [i, side, back]
  function fin(r1, r2, tip, step, alpha){
    for (var s = 0; s <= 1.001; s += step){
      for (var b = 0; b <= 1.001 - s; b += step){
        var fi = r1[0] + (r2[0] - r1[0]) * b + (tip[0] - r1[0]) * s;
        var side = r1[1] + (r2[1] - r1[1]) * b + (tip[1] - r1[1]) * s;
        var back = r1[2] + (r2[2] - r1[2]) * b + (tip[2] - r1[2]) * s;
        var q = at(fi, side, back);
        glyph(s > 0.6 ? "'" : s > 0.3 ? ":" : "=", q.x, q.y, q.a, alpha * (1 - s * 0.35));
      }
    }
  }

  // tail fin: tall upper lobe, shorter lower lobe (crescent)
  var T = N - 1;
  fin([T - 1, 2, 0], [T, 0, 0], [T, 15, 20], 0.18, 0.85);
  fin([T - 1, -2, 0], [T, 0, 0], [T, -10, 12], 0.22, 0.85);
  // pectoral fins: big, swept back, just behind the head
  var P = Math.round(0.24 * (N - 1)), wp = halfWidth(0.24);
  fin([P, wp - 2, 0], [P + 4, wp - 3, 0], [P + 6, wp + 24, 6], 0.14, 0.9);
  fin([P, -(wp - 2), 0], [P + 4, -(wp - 3), 0], [P + 6, -(wp + 24), 6], 0.14, 0.9);
  // pelvic fins: small
  var Q = Math.round(0.66 * (N - 1)), wq = halfWidth(0.66);
  fin([Q, wq - 1, 0], [Q + 2, wq - 1, 0], [Q + 3, wq + 8, 3], 0.3, 0.8);
  fin([Q, -(wq - 1), 0], [Q + 2, -(wq - 1), 0], [Q + 3, -(wq + 8), 3], 0.3, 0.8);

  // body: denser and brighter down the back, lighter toward the flanks
  for (i = 0; i < N; i++){
    u = i / (N - 1);
    var w = halfWidth(u), n = Math.max(0, Math.floor(w / ACROSS));
    for (var j = -n; j <= n; j++){
      var frac = n ? Math.abs(j) / n : 0;
      var ch = frac < 0.25 ? "#" : frac < 0.6 ? "%" : frac < 0.85 ? "=" : ":";
      var q = at(i, j * (w / Math.max(1, n)) * 0.92, 0);
      glyph(ch, q.x, q.y, ang[i], 1 - frac * 0.45);
    }
  }
  // first dorsal fin, seen from above as a bright ridge along the back
  for (i = Math.round(0.36 * (N - 1)); i <= Math.round(0.46 * (N - 1)); i++){ var d = at(i, 0, 0); glyph("|", d.x, d.y, ang[i] + Math.PI / 2, 1); }
  // eyes on the sides of the head
  var w0 = halfWidth(0.08);
  ctx.fillStyle = BG;
  var e1 = at(2.4, w0 - 2.5, 0), e2 = at(2.4, -(w0 - 2.5), 0);
  glyph("o", e1.x, e1.y, e1.a, 1); glyph("o", e2.x, e2.y, e2.a, 1);
  ctx.fillStyle = INK;

  // scraps torn off during a bite
  for (var k = bits.length - 1; k >= 0; k--){
    var bt = bits[k];
    ctx.fillStyle = bt.color || INK;
    glyph(bt.ch, bt.x, bt.y, bt.r, Math.max(0, bt.life));
  }
  ctx.fillStyle = INK;
  ctx.globalAlpha = 1;
}

function frame(ts){
  now = ts;
  var dt = Math.min(0.05, (ts - last) / 1000); last = ts; t += dt;
  if (bites.length) healOffscreen();
  var home = onHome() && !document.hidden;
  if (!home){
    if (mode !== "away"){ mode = "away"; until = now + 1500; bits = []; ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, cv.width, cv.height); }
    requestAnimationFrame(frame); return;
  }

  if (mode === "away"){
    if (now >= until) enter();
    else { requestAnimationFrame(frame); return; }
  }
  if (mode === "prowl"){
    if (steer(tx, ty, 60, 1.1, dt) < 40) pickTarget();
    if (now >= nextEvent){
      var mouseFresh = mouseX !== null && now - mouseAt < 12000, roll = Math.random();
      if (roll < 0.55 && (prey = pickPrey())){ mode = "hunt"; until = now + 6000; }
      else if (mouseFresh && roll < 0.9){ mode = "attack"; until = now + 3500; }
      else leave(false);
    }
  } else if (mode === "hunt"){
    var pt = preyPoint(prey);
    if (!pt || now >= until){ prey = null; mode = "prowl"; nextEvent = now + rand(3000, 7000); }
    else {
      steer(pt.x, pt.y, 400, 4.5, dt);
      if (Math.hypot(pt.x - hx, pt.y - hy) < 12){
        mode = "bite"; until = now + 550; biting = prey; prey = null;
        vx *= 0.2; vy *= 0.2;
        biteMark(pt.x, pt.y, biting.rad);
        scraps(pt.x, pt.y, biting.color, 9, true);
      }
    }
  } else if (mode === "attack"){
    steer(mouseX, mouseY, 460, 4.5, dt);
    if (Math.hypot(mouseX - hx, mouseY - hy) < 16){
      mode = "bite"; until = now + 450; biting = null;
      vx *= 0.25; vy *= 0.25;
      scraps(hx, hy, null, 7, false);
    } else if (now >= until) leave(false);
  } else if (mode === "bite"){
    vx *= 0.85; vy *= 0.85;
    if (biting){ var bp = preyPoint(biting); if (bp){ hx += (bp.x - hx) * 0.3; hy += (bp.y - hy) * 0.3; } } // hang on while thrashing
    if (now >= until){ biting = null; leave(true); }
  } else if (mode === "leave"){
    steer(tx, ty, 300, 2.5, dt);
  } else if (mode === "bolt"){
    steer(tx, ty, 620, 4, dt);
  }
  if ((mode === "leave" || mode === "bolt") && (hx < -L - 40 || hx > VW + L + 40)){ mode = "away"; until = now + rand(3000, 8000); }

  shake += ((mode === "bite" ? 1 : 0) - shake) * Math.min(1, dt * 25);
  hx += vx * dt; hy += vy * dt;
  var sp = Math.hypot(vx, vy);
  if (sp > 5) heading = Math.atan2(vy, vx);
  var head = trail[0];
  if (!head || Math.hypot(hx - head.x, hy - head.y) > 0.75){
    trail.unshift({x: hx, y: hy});
    if (trail.length > 600) trail.length = 600;
  }
  for (var k = bits.length - 1; k >= 0; k--){
    var bt = bits[k];
    bt.x += bt.vx * dt; bt.y += bt.vy * dt; bt.vx *= 0.94; bt.vy *= 0.94; bt.life -= dt * 1.2;
    if (bt.life <= 0) bits.splice(k, 1);
  }
  phase += dt * (3 + Math.min(1, sp / 150) * 8);
  if (mode !== "away") draw();
  else { ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, cv.width, cv.height); }
  requestAnimationFrame(frame);
}
until = performance.now() + 1200;
requestAnimationFrame(frame);
})();
