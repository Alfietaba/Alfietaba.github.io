(function(){
"use strict";
var SITE = window.SITE || {}, PROJECTS = (window.PROJECTS || []).filter(function(p){ return p && p.id; });
var app = document.getElementById("app"), lastHash = null;

function h(tag, props){
  var e = document.createElement(tag), k, v, i, c;
  if (props) for (k in props){
    v = props[k];
    if (v == null || v === false) continue;
    if (k === "class") e.className = v;
    else if (k === "text") e.textContent = v;
    else e.setAttribute(k, v === true ? "" : v);
  }
  var kids = [];
  for (i = 2; i < arguments.length; i++) kids = kids.concat(arguments[i]);
  for (i = 0; i < kids.length; i++){
    c = kids[i];
    if (c == null || c === false) continue;
    e.appendChild(c.nodeType ? c : document.createTextNode(String(c)));
  }
  return e;
}
function s(v){ return typeof v === "string" ? v.trim() : ""; }
function num(i){ return (i + 1 < 10 ? "0" : "") + (i + 1); }
function metaLine(p){ return [s(p.kind), s(p.discipline)].filter(Boolean).join(" · "); }
function ext(url){ return /^https?:/i.test(url) ? {target:"_blank", rel:"noopener"} : {}; }
function link(cls, url, text){
  var o = ext(url); o.href = url; o.text = text; if (cls) o["class"] = cls;
  return h("a", o);
}

function topBar(home){
  return h("header", {class:"top"},
    h("div", {class:"status"}, s(SITE.status) ? [h("span", {class:"dot", "aria-hidden":"true"}), h("span", {text: SITE.status})] : null),
    h("nav", {class:"nav", "aria-label":"Sections"},
      h("a", {href: home ? "#index" : "#home", text: home ? "Index" : "Home"}),
      home ? h("a", {href:"#about", text:"About"}) : null,
      s(SITE.resume) ? link("", SITE.resume, "Résumé") : null,
      h("a", {href: home ? "#contact" : "#home", text: home ? "Contact" : "All projects"})));
}
function footer(){
  var links = h("div", {class:"links"});
  if (s(SITE.email)) links.appendChild(h("a", {href:"mailto:" + s(SITE.email), text: s(SITE.email)}));
  if (s(SITE.linkedin)) links.appendChild(link("", SITE.linkedin, "LinkedIn ↗"));
  if (s(SITE.github)) links.appendChild(link("", SITE.github, "GitHub ↗"));
  return h("footer", {class:"foot", id:"contact"}, h("div", {class:"shout"}, "Let's build", h("br"), "something."), links);
}
function viewHome(){
  var parts = (s(SITE.name) || "Your Name").split(" ");
  var first = parts.shift(), rest = parts.join(" ");
  var rows = PROJECTS.map(function(p, i){
    return h("div", {class:"row"}, h("a", {class:"row-link", href:"#p-" + p.id},
      h("span", {class:"row-num", text: num(i)}),
      h("span", {class:"row-title", text: p.title || "Untitled project"}),
      h("span", {class:"row-meta", text: metaLine(p)}),
      h("span", {class:"row-arrow", "aria-hidden":"true", text:"↗"})));
  });
  var hasAbout = s(SITE.about) || s(SITE.offDuty) || s(SITE.photo);
  return [
    topBar(true),
    h("section", {class:"hero", id:"home"},
      h("h1", {class:"name"}, first, rest ? [h("br"), rest] : null),
      h("div", {class:"hero-row"}, h("p", {class:"intro", text: s(SITE.intro)}), h("a", {class:"pill", href:"#index", text:"See the work ↓"}))),
    h("section", {class:"index", id:"index"},
      h("div", {class:"label"}, h("span", {text:"Project index"})),
      rows.length ? rows : h("div", {class:"empty", text:"Projects will appear here soon."})),
    hasAbout ? h("section", {class:"about", id:"about"},
      s(SITE.photo) ? h("div", {class:"photo"}, h("img", {src: SITE.photo, alt: s(SITE.name)})) : null,
      h("div", {class:"about-text"},
        h("div", {class:"label", style:"padding:0"}, "About"),
        s(SITE.about) ? h("p", {class:"lead", text: SITE.about}) : null,
        s(SITE.offDuty) ? h("p", {class:"soft", text: SITE.offDuty}) : null)) : null,
    footer()
  ];
}
function viewProject(p, i){
  var images = Array.isArray(p.images) ? p.images.filter(s) : [];
  var next = PROJECTS.length > 1 ? PROJECTS[(i + 1) % PROJECTS.length] : null;
  var facts = [["Type", p.kind], ["Discipline", p.discipline], ["Year", p.year]].filter(function(f){ return s(String(f[1] == null ? "" : f[1])); });
  var paras = String(p.body || "").split(/\n\s*\n/).filter(function(t){ return t.trim(); });
  return [
    topBar(false),
    h("article", null,
      h("a", {class:"back", href:"#home", text:"← All projects"}),
      h("header", {class:"proj-head"},
        h("div", {class:"label", style:"padding:0"}, h("span", {text:"Project " + num(i)})),
        h("h1", {class:"proj-title", text: p.title || "Untitled project"}),
        s(p.summary) ? h("p", {class:"proj-summary", text: p.summary}) : null,
        s(p.link) ? h("div", null, link("pill", p.link, s(p.linkText) || "Open the project ↗")) : null),
      facts.length ? h("div", {class:"facts"}, facts.map(function(f){ return h("div", {class:"fact"}, h("b", {text: f[0]}), h("span", {text: String(f[1])})); })) : null,
      images.length ? h("figure", {class:"cover"}, h("img", {src: images[0], alt: (p.title || "Project") + " cover image"})) : null,
      paras.length ? h("div", {class:"prose"}, paras.map(function(t){ return h("p", {text: t.trim()}); })) : h("div", {style:"height:48px"}),
      images.length > 1 ? h("div", {class:"gallery"}, images.slice(1).map(function(src, n){ return h("img", {src: src, alt: (p.title || "Project") + " image " + (n + 2), loading:"lazy"}); })) : null,
      videos(p),
      revisions(p),
      next ? h("a", {class:"next", href:"#p-" + next.id},
        h("span", {class:"row-meta", style:"flex:none", text:"Next project"}),
        h("span", {class:"row-title", style:"flex:none", text: (next.title || "Untitled project") + " →"})) : null),
    footer()
  ];
}
/* Optional clips: p.videos = [{ src, poster, caption }] (MP4 files in images/) */
function videos(p){
  var vids = Array.isArray(p.videos) ? p.videos.filter(function(v){ return v && s(v.src); }) : [];
  if (!vids.length) return null;
  return h("section", {class:"vids"},
    h("div", {class:"label"}, h("span", {text:"Video"}), h("span", {text: vids.length + (vids.length === 1 ? " clip" : " clips")})),
    h("div", {class:"vid-grid"}, vids.map(function(v){
      return h("figure", null,
        h("video", {src: v.src, poster: s(v.poster) || null, controls: true, playsinline: true, preload: "metadata", muted: true}),
        s(v.caption) ? h("figcaption", {text: v.caption}) : null);
    })));
}
/* Optional design history: p.revisions = [{ rev, date, title, why, stats: [[label, value]], changes: [..], images: [{src, caption}] }] */
function revisions(p){
  var revs = Array.isArray(p.revisions) ? p.revisions.filter(function(r){ return r && s(r.title); }) : [];
  if (!revs.length) return null;
  return h("section", {class:"revs"},
    h("div", {class:"label"}, h("span", {text:"Revision history"}), h("span", {text: revs.length + " revisions"})),
    revs.map(function(r){
      var pics = Array.isArray(r.images) ? r.images.filter(function(im){ return im && s(im.src); }) : [];
      var changes = Array.isArray(r.changes) ? r.changes.filter(s) : [];
      var stats = Array.isArray(r.stats) ? r.stats.filter(function(st){ return st && s(st[0]) && s(st[1]); }) : [];
      return h("div", {class:"rev"},
        h("div", {class:"rev-tag"}, h("b", {text: s(r.rev)}), s(r.date) ? h("span", {text: r.date}) : null),
        h("div", {class:"rev-body"},
          h("h3", {class:"rev-title", text: r.title}),
          s(r.why) ? h("p", {class:"rev-why", text: r.why}) : null,
          stats.length ? h("div", {class:"rev-stats"}, stats.map(function(st){ return h("div", null, h("b", {text: st[0]}), h("span", {text: st[1]})); })) : null,
          changes.length ? h("ul", {class:"rev-changes"}, changes.map(function(c){ return h("li", {text: c}); })) : null,
          pics.length ? h("div", {class:"rev-pics"}, pics.map(function(im){
            return h("figure", null, h("img", {src: im.src, alt: s(im.caption) || r.title, loading:"lazy"}), s(im.caption) ? h("figcaption", {text: im.caption}) : null);
          })) : null));
    }));
}
function render(){
  var hash = location.hash || "#home", isProject = hash.indexOf("#p-") === 0, nodes, idx = -1;
  if (isProject){
    PROJECTS.forEach(function(p, i){ if (p.id === hash.slice(3)) idx = i; });
    nodes = idx >= 0 ? viewProject(PROJECTS[idx], idx)
      : [topBar(false), h("div", {class:"empty", style:"margin:56px 0", text:"This project isn't available."}), h("p", null, h("a", {href:"#home", text:"← All projects"}))];
  } else nodes = viewHome();
  app.replaceChildren.apply(app, [].concat(nodes).filter(Boolean));
  document.title = (isProject && idx >= 0 ? PROJECTS[idx].title + " | " : "") + (s(SITE.name) || "Portfolio");
  if (hash !== lastHash){
    lastHash = hash;
    var target = (!isProject && hash.length > 1) ? document.getElementById(hash.slice(1)) : null;
    if (target && hash !== "#home") target.scrollIntoView(); else window.scrollTo(0, 0);
  }
}
window.addEventListener("hashchange", render);
render();
})();
