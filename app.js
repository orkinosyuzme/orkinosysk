/* ORKINOS YÜZME SPOR KULÜBÜ - site motoru
   config.js içindeki ayarları okur, sayfayı kurar, kaydırma animasyonlarını çalıştırır. */
(function(){
'use strict';
var $=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var esc=function(v){return String(v==null?'':v).replace(/[&<>"']/g,function(m){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]})};
var br=function(v){return esc(v).replace(/\n/g,'<br>')};
var clamp=function(v,a,b){return Math.min(b,Math.max(a,v))};
var reduced=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
var fine=window.matchMedia&&matchMedia('(hover:hover) and (pointer:fine)').matches;
var cfg={},ac=null,raf=0,state={level:''},preview=/[?&]preview=1/.test(location.search);
var DAYS=['Pazar','Pazartesi','Salı','Çarşamba','Perşembe','Cuma','Cumartesi'],DS=['Paz','Pzt','Sal','Çar','Per','Cum','Cmt'],MS=['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];
function getCfg(){var c=window.ORKINOS||{};return Object.assign({},window.DEFAULTS,c.s||{},c.lists||{})}
function S(k){return cfg[k]==null?'':cfg[k]}
function T(k){return esc(S(k))}
function L(k){var v=cfg[k];return Array.isArray(v)?v:[]}
function on(k){var v=cfg[k];return v&&v!=='0'}
function lines(s){return String(s||'').split(/\r?\n/).map(function(x){return x.trim()}).filter(Boolean)}
function wa(msg){return'https://wa.me/'+S('wa')+(msg?'?text='+encodeURIComponent(msg):'')}
function split(t){return String(t).split(' ').map(function(w,i){return'<span class="sw"><span style="--w:'+i+'">'+esc(w)+'</span></span>'}).join(' ')}

var IC={
 drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/><path d="M9.5 15a2.5 2.5 0 0 0 2.5 2.5"/>',
 swim:'<circle cx="17" cy="6" r="2"/><path d="M3 18c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2"/><path d="M6 13l4-4 4 1 2 3"/>',
 timer:'<circle cx="12" cy="14" r="7"/><path d="M12 14l3-3M9 3h6M12 3v4"/>',
 heart:'<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
 star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
 wave:'<path d="M2 9c2.5 0 2.5-3 5-3s2.5 3 5 3 2.5-3 5-3 2.5 3 5 3"/><path d="M2 16c2.5 0 2.5-3 5-3s2.5 3 5 3 2.5-3 5-3 2.5 3 5 3"/>'};
var ICN=['drop','swim','timer','heart','star','wave'];
function svg(n,c){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"'+(c?' class="'+c+'"':'')+' aria-hidden="true">'+IC[n]+'</svg>'}
var WA='<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.5 3.5A11 11 0 0 0 3.2 17.2L2 22l4.9-1.2A11 11 0 1 0 20.5 3.5zm-8.5 17a9 9 0 0 1-4.6-1.3l-.3-.2-2.9.7.8-2.8-.2-.3a9 9 0 1 1 7.2 3.9zm5-6.7c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-3.7-3.2c-.3-.5.3-.5.8-1.5a.5.5 0 0 0 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4.1c1.7.7 2.4.8 3.2.7a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.6-.3z"/></svg>';
var PLAY='<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6 3l15 9-15 9z"/></svg>';
var ARW=function(d){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'+d+'"/></svg>'};
var WAVE='<div class="wave top" aria-hidden="true"><svg viewBox="0 0 1200 70" preserveAspectRatio="none"><path d="M0 35C150 5 300 65 450 35S750 5 900 35 1050 65 1200 35 1350 5 1500 35 1650 65 1800 35 1950 5 2100 35 2250 65 2400 35V70H0z"/></svg><svg viewBox="0 0 1200 70" preserveAspectRatio="none"><path d="M0 45C200 15 350 70 600 40S1000 10 1200 45 1600 70 1800 40 2200 15 2400 45V70H0z"/></svg></div>';

/* ---------- medya ---------- */
function media(){return L('media').filter(function(m){return m&&m.src&&m.show!==''&&m.show!==false&&m.show!=='0'&&m.place!=='hidden'})}
function first(place){return media().filter(function(m){return m.place===place})[0]}
function isVid(m){return m.type==='video'||/\.(mp4|webm|mov)(\?|#|$)/i.test(m.src)}
function mediaEl(m,attrs){
  if(isVid(m))return'<video src="'+esc(m.src)+'"'+(m.poster?' poster="'+esc(m.poster)+'"':'')+' muted loop playsinline preload="'+(m.poster?'none':'metadata')+'" '+(attrs||'')+'></video>';
  return'<img src="'+esc(m.src)+'" alt="'+esc(m.title)+'" loading="lazy" '+(attrs||'')+'>'}

/* ---------- sayfa şablonu ---------- */
function build(){
  var h=[],nm=S('site_name').split(' '),b1=nm[0]||'',b2=nm.slice(1).join(' '),hero=first('hero'),about=first('about'),gl=media().filter(function(m){return!m.place||m.place==='gallery'});
  var menu=[['top','m1'],['hakkimizda','m2'],['egitimler','m3'],['seviyeler','m4'],['galeri','m5'],['adimlar','m6'],['sss','m7']];
  h.push('<div id="rope" aria-hidden="true"><i></i><img id="ropeFish" src="img/f2.png" alt=""></div>');
  h.push('<nav id="nav"><a class="brand" href="#top" aria-label="Ana sayfa"><img src="'+esc(S('logo'))+'" alt=""><span><b>'+esc(b1)+'</b><small>'+esc(b2)+'</small></span></a><button id="mb" type="button" aria-label="Menüyü aç" aria-expanded="false" aria-controls="drawer"><i></i><i></i><i></i></button></nav>');
  h.push('<div id="ov"></div><aside id="drawer" aria-label="Menü">'+menu.map(function(x,i){return'<a class="l" style="--i:'+i+'" href="#'+x[0]+'">'+T(x[1])+'</a>'}).join('')+'<a class="btn" href="#kayit">'+T('m8')+'</a><small>'+T('phone')+'</small></aside>');
  if(on('fx_depth'))h.push('<div id="depth" aria-hidden="true"><div class="ln"></div><div class="tk"></div><div class="mk"><b id="dm">0 m</b><i></i></div></div>');
  if(on('fx_fish'))h.push('<div class="swimlane" aria-hidden="true"><div><img id="sf1" src="img/f3.png" alt=""></div><div><img id="sf2" src="img/f2.png" alt=""></div><div><img id="sf3" src="img/f3.png" alt=""></div></div>');
  if(on('fx_swim')){h.push('<div id="wavefx" aria-hidden="true"><div class="a" id="wa1"><svg viewBox="0 0 2400 60" preserveAspectRatio="none"><path d="'+wavePath()+'"/></svg></div><div class="a b" id="wa2"><svg viewBox="0 0 2400 60" preserveAspectRatio="none"><path d="'+wavePath()+'"/></svg></div></div><div id="swm" aria-hidden="true">'+SWIM+'</div>')}
  h.push('<div id="app-in">');
  // ana ekran
  h.push('<header class="hero" id="top"><div class="bg" data-par="-.12">'+(hero?(isVid(hero)?'<video src="'+esc(hero.src)+'"'+(hero.poster?' poster="'+esc(hero.poster)+'"':'')+' autoplay muted loop playsinline preload="auto"></video>':'<img src="'+esc(hero.src)+'" alt="">'):'')+'</div><div class="hb" aria-hidden="true">'+bubbles(16)+'</div>'
   +'<div class="wrap"><div class="tx"><h1 class="split">'+split(S('h_title'))+'</h1><p class="lead rv0" data-rv style="--d:.5s">'+br(S('h_text'))+'</p><div class="cta rv0" data-rv style="--d:.7s"><a class="btn" href="#kayit">'+T('h_b1')+'</a><a class="btn ghost" href="'+wa()+'" target="_blank" rel="noopener">'+T('h_b2')+'</a></div></div></div>'
   +'<a class="cue" href="#hakkimizda"><i></i>'+T('h_scroll')+'</a></header>');
  var mq=lines(S('marquee'));if(mq.length){var spans=mq.map(function(t){return'<span>'+esc(t)+'</span>'}).join('');h.push('<div class="mq" id="mq" aria-hidden="true"><div class="in">'+spans+spans+spans+spans+'</div></div>')}
  if(on('c_on')){var ci=S('c_img');h.push('<section class="camp"><div class="wrap"><div class="box'+(ci?'':' noimg')+' rv0" data-rv="zoom"><div class="tt"><b>'+T('c_title')+'</b><p>'+br(S('c_text'))+'</p><a class="btn" href="#kayit">'+T('c_btn')+'</a></div>'+(ci?'<img src="'+esc(ci)+'" alt="Kampanya">':'')+'</div></div></section>')}
  var st=L('stats');if(st.length)h.push('<section class="stats"><div class="wrap"><div class="row">'+st.map(function(s,i){return'<div class="st rv0" data-rv style="--d:'+(i*.12)+'s"><b data-n="'+esc(s.n)+'" data-suf="'+esc(s.suf)+'">0'+esc(s.suf)+'</b><span>'+esc(s.l)+'</span></div>'}).join('')+'</div></div></section>');
  // hakkımızda
  h.push('<section class="about sec" id="hakkimizda">'+WAVE+'<div class="wrap grid"><div class="rv0" data-rv="left"><div class="frame">'+(about?'<div class="m" data-par=".1">'+(isVid(about)?'<video src="'+esc(about.src)+'" autoplay muted loop playsinline></video>':'<img src="'+esc(about.src)+'" alt="'+esc(about.title)+'" loading="lazy">')+'</div>':'')+'</div>'
   +'<svg class="seal" id="seal" viewBox="0 0 160 160" aria-hidden="true"><defs><path id="spth" d="M80,80 m-58,0 a58,58 0 1,1 116,0 a58,58 0 1,1 -116,0"/><clipPath id="spc"><circle cx="80" cy="80" r="40"/></clipPath></defs><circle class="disc" cx="80" cy="80" r="79"/><g class="rot"><text><textPath href="#spth" textLength="356" lengthAdjust="spacing">'+esc(S('site_name').toUpperCase())+' • SUYU SEV • </textPath></text></g><circle cx="80" cy="80" r="42" fill="#fff"/><image href="'+esc(S('logo'))+'" x="40" y="40" width="80" height="80" clip-path="url(#spc)"/></svg></div>'
   +'<div class="tx"><h2 class="split">'+split(S('a_title'))+'</h2><p class="rv0" data-rv style="--d:.15s">'+br(S('a_text'))+'</p><p class="rv0" data-rv style="--d:.25s">'+br(S('a_text2'))+'</p>'
   +'<div class="loc rv0" data-rv style="--d:.35s"><span class="pin"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-6.2 7-11.5a7 7 0 0 0-14 0C5 14.800 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg></span><span style="flex:1;min-width:200px">'+br(S('a_loc'))+'</span><a class="btn ghost" href="'+T('map')+'" target="_blank" rel="noopener">'+T('a_btn')+'</a></div></div></div></section>');
  // eğitimler
  h.push('<section class="programs sec alt" id="egitimler">'+WAVE+'<div class="wrap"><h2 class="split">'+split(S('e_title'))+'</h2><p class="lead rv0" data-rv>'+br(S('e_sub'))+'</p><div class="cards" data-stagger>'+L('programs').map(function(p,i){return'<div class="card rv0" data-rv data-tilt><div class="gl"></div><div class="ico">'+svg(ICN[i%ICN.length])+'</div><h3>'+esc(p.t)+'</h3><p>'+br(p.d)+'</p></div>'}).join('')+'</div></div></section>');
  // seviyeler
  var lv=L('levels');if(lv.length){h.push('<section class="levels sec" id="seviyeler">'+WAVE+'<div class="wrap"><h2 class="split">'+split(S('l_title'))+'</h2><p class="lead rv0" data-rv>'+br(S('l_sub'))+'</p><div class="path" id="path" style="--n:'+lv.length+'"><div class="trk"><div class="fill"></div><img class="sw" src="img/f3.png" alt=""></div><ol>'+lv.map(function(x,i){return'<li class="rv0" data-rv style="--d:'+(i*.1)+'s"><span class="no">'+(i+1)+'</span><div class="bx"><span class="tag">'+esc(x.tag)+'</span><h3>'+esc(x.name)+'</h3><p>'+br(x.text)+'</p><ul>'+lines(x.skills).map(function(k){return'<li>'+esc(k)+'</li>'}).join('')+'</ul></div></li>'}).join('')+'</ol></div></div></section>')}
  // seviye bulucu
  var qs=L('q_list');if(on('q_on')&&lv.length&&qs.length){h.push('<section class="quiz sec alt" id="seviye-bulucu">'+WAVE+'<div class="wrap"><div style="text-align:center;margin-bottom:34px"><h2 class="split">'+split(S('q_title'))+'</h2><p class="lead rv0" data-rv style="margin-inline:auto">'+br(S('q_sub'))+'</p></div><div class="box rv0" data-rv="zoom" id="quiz"><div class="dots">'+'<i></i>'.repeat(qs.length+1)+'</div>'
   +'<div class="qstep on" data-s="0"><h3>'+T('q_age')+'</h3><div class="opts">'+['4-6 yaş','7-9 yaş','10-14 yaş','15 yaş ve üzeri'].map(function(a){return'<button type="button" class="opt" data-age="'+a+'">'+a+'</button>'}).join('')+'</div></div>'
   +qs.map(function(q,i){return'<div class="qstep" data-s="'+(i+1)+'"><h3>'+esc(q.t)+'</h3><div class="opts"><button type="button" class="opt" data-a="1">'+T('q_yes')+'</button><button type="button" class="opt" data-a="0">'+T('q_no')+'</button></div></div>'}).join('')
   +'<div class="qres" id="qres"><div class="lane" id="qlane">'+lv.map(function(x,i){return'<i class="bu" style="left:'+((i+.5)/lv.length*100)+'%"></i>'}).join('')+'<img class="f" id="qfish" src="img/f2.png" alt=""></div><div class="nm" id="qnm"></div><p id="qtx"></p><a class="btn" href="#kayit" id="qgo">'+T('q_btn')+'</a><button type="button" class="qagain" id="qagain">'+T('q_again')+'</button></div></div></div></section>')}
  // galeri
  if(gl.length){h.push('<section class="gal sec" id="galeri">'+WAVE+'<div class="pin" id="gpin"><div class="sticky"><div class="wrap head"><h2 class="split">'+split(S('g_title'))+'</h2><p class="lead rv0" data-rv>'+br(S('g_sub'))+'</p></div><div class="trk" id="gtrk">'+gl.map(function(m,i){return'<button type="button" class="tile" data-i="'+i+'" aria-label="'+esc(m.title)+' '+S('lb_hint')+'">'+mediaEl(m)+(m.tag?'<span class="tg">'+esc(m.tag)+'</span>':'')+(isVid(m)?'<span class="pl">'+PLAY+'</span>':'')+'<span class="cp"><b>'+esc(m.title)+'</b><span>'+esc(m.text)+'</span></span></button>'}).join('')+'</div><div class="wrap"><div class="gbar"><i></i></div></div></div></div></section>')}
  // adımlar
  if(on('st_on')&&L('steps').length){h.push('<section class="book sec" id="adimlar">'+WAVE+'<div class="wrap" style="max-width:760px"><h2 class="split">'+split(S('steps_title'))+'</h2><ol class="steps" id="steps">'+L('steps').map(function(s,i){return'<li class="rv0" data-rv style="--d:'+(i*.1)+'s"><h3>'+esc(s.t)+'</h3><p>'+br(s.d)+'</p></li>'}).join('')+'</ol><a class="btn rv0" data-rv href="#kayit">'+T('st_btn')+'</a></div></section>')}
  // güvenli yüzücü
  var sk=L('sw_list');if(on('sw_on')&&sk.length){h.push('<section class="swim sec alt" id="guvenli">'+WAVE+'<div class="wrap grid"><div class="rv0" data-rv="left"><h2 class="split">'+split(S('sw_title'))+'</h2><p class="lead" style="margin-bottom:26px">'+br(S('sw_sub'))+'</p><div class="ring"><svg viewBox="0 0 220 220"><circle class="bg" cx="110" cy="110" r="95"/><circle class="fg" id="rfg" cx="110" cy="110" r="95"/></svg><div class="ct"><span id="rct">0/'+sk.length+'</span><small>beceri</small></div></div><div class="done" id="sdone">'+T('sw_done')+'</div></div><ul class="ck" data-stagger>'+sk.map(function(k,i){return'<li class="rv0" data-rv="right"><label><input type="checkbox" class="sc"><span class="bx"><svg viewBox="0 0 24 24"><path d="M5 12l5 5 9-10"/></svg></span><span class="tx">'+esc(k.t)+'</span></label></li>'}).join('')+'</ul></div></section>')}
  // karşılaştırma
  var rows=L('cm_rows');if(on('cm_on')&&rows.length){h.push('<section class="compare sec" id="karsilastir">'+WAVE+'<div class="wrap"><h2 class="split">'+split(S('cm_title'))+'</h2><p class="lead rv0" data-rv>'+br(S('cm_sub'))+'</p><div class="cmp rv0" data-rv="wipe"><div class="h"></div><div class="h a">'+T('cm_c1')+'</div><div class="h b">'+T('cm_c2')+'</div>'+rows.map(function(r){return'<div class="r">'+esc(r.r)+'</div><div data-l="'+T('cm_c1')+'">'+br(r.a)+'</div><div data-l="'+T('cm_c2')+'">'+br(r.b)+'</div>'}).join('')+'</div></div></section>')}
  // sss + rehber
  var fq=L('faq'),bring=L('bring'),rules=L('rules');if(fq.length||bring.length||rules.length){h.push('<section class="faq sec alt" id="sss">'+WAVE+'<div class="wrap grid"><div><h2 class="split">'+split(S('fq_title'))+'</h2><div class="acc">'+fq.map(function(q,i){return'<div class="it rv0" data-rv style="--d:'+(i*.06)+'s"><button type="button" class="q" aria-expanded="false">'+esc(q.q)+'<i></i></button><div class="an"><div><p>'+br(q.a)+'</p></div></div></div>'}).join('')+'</div></div><div class="guide">'
   +(bring.length?'<div class="gc rv0" data-rv="right"><h3>'+T('bring_title')+'</h3><ul>'+bring.map(function(x){return'<li>'+esc(x.t)+'</li>'}).join('')+'</ul></div>':'')+(rules.length?'<div class="gc r rv0" data-rv="right" style="--d:.1s"><h3>'+T('rules_title')+'</h3><ul>'+rules.map(function(x){return'<li>'+esc(x.t)+'</li>'}).join('')+'</ul></div>':'')+'</div></div></section>')}
  var rv=L('reviews');if(rv.length)h.push('<section class="sec"><div class="wrap"><h2 class="split">'+split(S('rv_title'))+'</h2><div class="rvs" data-stagger>'+rv.map(function(r){return'<div class="rv rv0" data-rv><p>'+br(r.text)+'</p><b>'+esc(r.name)+'</b></div>'}).join('')+'</div></div></section>');
  var nw=L('news');if(nw.length)h.push('<section class="sec alt"><div class="wrap"><h2 class="split">'+split(S('nw_title'))+'</h2><div class="nws" data-stagger>'+nw.map(function(n){return'<div class="nw rv0" data-rv><time>'+esc(n.date)+'</time><div><h3>'+esc(n.title)+'</h3><p>'+br(n.text)+'</p></div></div>'}).join('')+'</div></div></section>');
  // kayıt formu
  h.push('<section class="sec" id="kayit">'+WAVE+'<div class="wrap"><div style="text-align:center;margin-bottom:34px"><h2 class="split">'+split(S('f_title'))+'</h2><p class="lead rv0" data-rv style="margin-inline:auto">'+br(S('f_sub'))+'</p></div>'
   +'<form class="formbox rv0" data-rv="zoom" id="frm" novalidate><div class="pr"><i></i></div><div class="rec" id="rec"></div><div class="row2"><div class="fld"><input id="ad" placeholder=" " autocomplete="name"><label for="ad">'+T('fm_name')+'</label><div class="er">Ad soyad gerekli.</div></div><div class="fld"><input id="yas" type="number" inputmode="numeric" min="4" max="99" placeholder=" "><label for="yas">'+T('fm_age')+'</label><div class="er">4 yaş ve üzeri olmalı.</div></div></div>'
   +'<div class="grp"><b>'+T('fm_gender')+'</b><div class="chips"><label><input type="radio" name="cins" value="Kız" checked><span>'+T('fm_girl')+'</span></label><label><input type="radio" name="cins" value="Erkek"><span>'+T('fm_boy')+'</span></label></div></div>'
   +'<div class="grp"><b>'+T('fm_prev')+'</b><div class="chips"><label><input type="radio" name="onc" value="Hayır" checked><span>'+T('fm_no')+'</span></label><label><input type="radio" name="onc" value="Evet"><span>'+T('fm_yes')+'</span></label></div></div>'
   +'<div class="grp" id="lvb" style="display:none"><b>'+T('fm_lvl')+'</b><div class="chips"><label><input type="radio" name="lvl" value="Başlangıç" checked><span>Başlangıç</span></label><label><input type="radio" name="lvl" value="Orta"><span>Orta</span></label><label><input type="radio" name="lvl" value="İleri"><span>İleri</span></label></div></div>'
   +'<div class="fld"><input id="tel" type="tel" inputmode="tel" autocomplete="tel" placeholder=" "><label for="tel">'+T('fm_tel')+'</label><div class="er">Geçerli bir telefon numarası yaz.</div></div><div class="fld"><textarea id="not" rows="2" placeholder=" "></textarea><label for="not">'+T('fm_note')+'</label></div>'
   +'<button class="btn wa" type="submit" style="width:100%">'+WA+T('f_btn')+'</button><div class="fb" id="fb">WhatsApp açılmadıysa <a id="wafb" href="#" target="_blank" rel="noopener">buraya dokun</a>.</div>'
   +'<div class="okv" id="okv"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46"/><path d="M28 52l16 16 30-34"/></svg><b>'+T('f_ok')+'</b></div></form></div></section>');
  // alt bilgi
  var tel=S('wa');h.push('<footer>'+WAVE+'<div class="wrap"><div class="big" aria-hidden="true">'+esc(b1.toUpperCase())+'</div><img class="lg" src="'+esc(S('logo'))+'" alt=""><p><b>'+T('site_name')+'</b></p><p>'+T('ft_addr')+'</p><p>'+T('phone')+'</p><div class="fl"><a class="btn" href="tel:+'+esc(tel)+'" data-n="'+T('phone')+'">'+T('ft_call')+'</a><a class="btn wa" href="'+wa()+'" target="_blank" rel="noopener">'+T('ft_wa')+'</a><a class="btn ghost" href="'+T('map')+'" target="_blank" rel="noopener">'+T('ft_map')+'</a>'+(S('ins')?'<a class="btn ghost" href="'+T('ins')+'" target="_blank" rel="noopener">Instagram</a>':'')+'<button type="button" class="btn ghost" id="cpn">'+T('ft_copy')+'</button></div></div></footer>');
  h.push('</div><a class="fab" href="'+wa()+'" target="_blank" rel="noopener" aria-label="WhatsApp">'+WA+'</a><button class="top" id="topb" type="button" aria-label="Yukarı çık">'+ARW('M12 19V5M5 12l7-7 7 7')+'</button>');
  h.push('<div id="lb" role="dialog" aria-modal="true" aria-label="Galeri"><button class="x" type="button" aria-label="Kapat">'+ARW('M6 6l12 12M18 6L6 18')+'</button><button class="pv" type="button" aria-label="Önceki">'+ARW('M15 5l-7 7 7 7')+'</button><button class="nx" type="button" aria-label="Sonraki">'+ARW('M9 5l7 7-7 7')+'</button><div id="lbm"></div><div class="ti"><b id="lbt"></b><span id="lbd"></span></div></div>');
  return h.join('')}

var SWIM='<svg viewBox="0 0 330 140" aria-hidden="true"><g class="sbob"><g class="kick"><path d="M18 88c-10-8-14-20-10-30 8 6 16 16 22 26z" fill="#f0bd96"/><path d="M30 90c-12-2-22-10-26-22 10 2 22 8 30 18z" fill="#e9ae85" class="k2"/></g><path d="M24 86C70 72 150 66 214 74l-2 20C150 96 70 100 24 90z" fill="#f0bd96"/><path d="M96 76C120 72 150 70 176 72l-1 20c-28 2-54 2-78 0z" fill="#0b4f86"/><path d="M96 80h80" stroke="#3fd0ea" stroke-width="3"/><g class="arm"><path d="M208 76c34-4 62-34 76-62" stroke="#f0bd96" stroke-width="15" stroke-linecap="round" fill="none"/><circle cx="286" cy="12" r="10" fill="#f0bd96"/></g><circle cx="240" cy="70" r="24" fill="#f0bd96"/><path d="M216 66a24 24 0 0 1 48-6c-14-8-34-6-48 6z" fill="#3fd0ea"/><path d="M224 58c8-4 20-5 30-2" stroke="#e0243c" stroke-width="5" stroke-linecap="round" fill="none"/><rect x="246" y="62" width="24" height="15" rx="7" fill="#06304f"/><ellipse cx="258" cy="69" rx="8" ry="5" fill="#7fe3f5" opacity=".85"/><path d="M218 70h28" stroke="#fff" stroke-width="3"/><path d="M262 84q6 3 10 0" stroke="#b8714a" stroke-width="2.5" fill="none" stroke-linecap="round"/></g><g class="spl"><circle cx="300" cy="50" r="3.5"/><circle cx="312" cy="62" r="2.6"/><circle cx="292" cy="38" r="2.4"/><circle cx="14" cy="70" r="3"/><circle cx="40" cy="62" r="2.4"/></g><path class="fw" d="M0 96q20-12 40 0t40 0 40 0 40 0 40 0 40 0 40 0 40 0 40 0V140H0z" fill="rgba(20,140,200,.62)"/><path class="fw2" d="M0 102q20-9 40 0t40 0 40 0 40 0 40 0 40 0 40 0 40 0 40 0" stroke="rgba(230,250,255,.85)" stroke-width="3" fill="none"/></svg>';
function wavePath(){return'M0 30q75-28 150 0'+' t150 0'.repeat(15)+'V60H0z'}
function bubbles(n){var o='';for(var i=0;i<n;i++){var s=6+Math.random()*22;o+='<s style="--x:'+(Math.random()*100)+'%;--s:'+s+'px;--t:'+(7+Math.random()*9)+'s;--dl:'+(-Math.random()*14)+'s;--sx:'+((Math.random()-.5)*80)+'px"></s>'}return o}

/* ---------- ayarlar -> sayfa ---------- */
function apply(){
  var r=document.documentElement.style;
  r.setProperty('--top',S('col_top'));r.setProperty('--mid',S('col_mid'));r.setProperty('--bot',S('col_bot'));r.setProperty('--acc',S('col_acc'));r.setProperty('--red',S('col_red'));r.setProperty('--txt',S('col_txt'));
  document.title=S('site_name')+(S('city')?' | '+S('city'):'');
  var md=$('meta[name=description]');if(md)md.setAttribute('content',S('seo'));
  var ic=$('link[rel=icon]');if(ic)ic.setAttribute('href',S('logo'))}
function render(){cfg=getCfg();apply();var app=$('#app');app.innerHTML=build()}

/* ---------- etkileşimler ---------- */
function listen(t,ev,fn,o){t.addEventListener(ev,fn,Object.assign({signal:ac.signal},o||{}))}
function fx(){
  ac=new AbortController();var vh=window.innerHeight,vw=window.innerWidth;
  // açılır menü
  var mb=$('#mb'),dr=$('#drawer'),ov=$('#ov');
  function tg(o){mb.classList.toggle('open',o);dr.classList.toggle('open',o);ov.classList.toggle('open',o);mb.setAttribute('aria-expanded',o?'true':'false')}
  listen(mb,'click',function(){tg(!dr.classList.contains('open'))});listen(ov,'click',function(){tg(false)});
  $$('a',dr).forEach(function(a){listen(a,'click',function(){tg(false)})});
  listen(document,'keydown',function(e){if(e.key==='Escape'){tg(false);lbClose()}});
  // kelimeleri ve bloklari saklı başlat
  var pre=$$('.rv0,.split');pre.forEach(function(e){e.classList.add('pre')});
  $$('[data-stagger]').forEach(function(p){$$('.rv0',p).forEach(function(c,i){c.style.setProperty('--d',(i*.09)+'s')})});
  window._ork_reveal=function(){
    if(!('IntersectionObserver' in window)||reduced){pre.forEach(function(e){e.classList.remove('pre')});counters(true);return}
    var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.remove('pre');io.unobserve(en.target)}})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
    pre.forEach(function(e){io.observe(e)});
    var co=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){count(en.target);co.unobserve(en.target)}})},{threshold:.5});
    $$('.stats b').forEach(function(b){co.observe(b)});
    ac.signal.addEventListener('abort',function(){io.disconnect();co.disconnect()})};
  function count(b){var n=parseFloat(b.dataset.n)||0,suf=b.dataset.suf||'',t0=0;function st(t){if(!t0)t0=t;var p=clamp((t-t0)/1500,0,1),e=1-Math.pow(1-p,3);b.textContent=Math.round(n*e)+suf;if(p<1)requestAnimationFrame(st)}requestAnimationFrame(st)}
  function counters(now){$$('.stats b').forEach(function(b){b.textContent=(b.dataset.n||0)+(b.dataset.suf||'')})}
  // video oynat/durdur
  if('IntersectionObserver' in window){var vo=new IntersectionObserver(function(es){es.forEach(function(en){var v=en.target;if(en.isIntersecting){var p=v.play();if(p&&p.catch)p.catch(function(){})}else v.pause()})},{threshold:.35});
    $$('video').forEach(function(v){if(!reduced)vo.observe(v)});ac.signal.addEventListener('abort',function(){vo.disconnect()})}
  // kart eğimi
  if(fine&&!reduced)$$('[data-tilt]').forEach(function(c){
    listen(c,'pointermove',function(e){if(e.pointerType!=='mouse')return;var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;c.style.transform='rotateY('+((x-.5)*14)+'deg) rotateX('+(-(y-.5)*14)+'deg) translateY(-4px)';c.style.setProperty('--mx',(x*100)+'%');c.style.setProperty('--my',(y*100)+'%')});
    listen(c,'pointerleave',function(){c.style.transform=''})});
  // tıklama animasyonları
  var bubOn=on('fx_bubbles');
  function pop(x,y,n){for(var i=0;i<n;i++){var b=document.createElement('i');b.className='bub';var s=6+Math.random()*14;b.style.cssText='left:'+(x-s/2)+'px;top:'+(y-s/2)+'px;width:'+s+'px;height:'+s+'px;--dx:'+((Math.random()-.5)*130)+'px;--dy:'+(-50-Math.random()*110)+'px;--t:'+(.8+Math.random()*.7)+'s';document.body.appendChild(b);setTimeout(function(bb){bb.remove()},1700,b)}}
  listen(document,'pointerdown',function(e){var t=e.target.closest&&e.target.closest('.btn,.opt,.day,.slot,.chips label,.tile,#mb,.acc .q,.ck label,.fab,.top');if(!t)return;
    if(t.classList.contains('btn')){var r=t.getBoundingClientRect(),s=Math.max(r.width,r.height)*2,d=document.createElement('span');d.className='rip';d.style.cssText='width:'+s+'px;height:'+s+'px;left:'+(e.clientX-r.left-s/2)+'px;top:'+(e.clientY-r.top-s/2)+'px';t.appendChild(d);setTimeout(function(){d.remove()},750)}
    if(bubOn&&!reduced)pop(e.clientX,e.clientY,t.classList.contains('btn')?9:5)});
  if(bubOn&&fine&&!reduced){var lt=0;listen(document,'pointermove',function(e){if(e.pointerType!=='mouse')return;var n=performance.now();if(n-lt<90)return;lt=n;pop(e.clientX,e.clientY,1)})}
  // sss
  $$('.acc .q').forEach(function(q){listen(q,'click',function(){var it=q.parentNode,o=!it.classList.contains('open');$$('.acc .it.open').forEach(function(x){x.classList.remove('open');$('.q',x).setAttribute('aria-expanded','false')});if(o){it.classList.add('open');q.setAttribute('aria-expanded','true')}})});
  // telefon
  var cp=$('#cpn');if(cp)listen(cp,'click',function(){var n=S('phone');function ok(){cp.textContent='Kopyalandı'}try{navigator.clipboard.writeText(n).then(ok,function(){fall()})}catch(e){fall()}function fall(){var t=document.createElement('textarea');t.value=n;document.body.appendChild(t);t.select();try{document.execCommand('copy');ok()}catch(e){}t.remove()}});
  quiz();swim();form();gallery();
  // ----- kaydırma döngüsü -----
  var nav=$('#nav'),rope=$('#rope'),depth=$('#depth'),dm=$('#dm'),topb=$('#topb'),mq=$('#mq'),hbg=$('.hero .bg'),seal=$('#seal'),path=$('#path'),steps=$('#steps'),pars=$$('[data-par]'),
      sf=[$('#sf1'),$('#sf2'),$('#sf3')],wfx=$('#wavefx'),wa1=$('#wa1'),wa2=$('#wa2'),swm=$('#swm'),vel=0,last=window.scrollY,ticking=false,gpin=$('#gpin'),gtrk=$('#gtrk'),gdist=0,gfree=true;
  var SF=[{w:.30,y:.30,s:2.3,d:-1,o:.34},{w:.22,y:.62,s:3.1,d:1,o:.3},{w:.14,y:.82,s:1.5,d:1,o:.22}];
  function layout(){vh=window.innerHeight;vw=window.innerWidth;
    if(gpin){gfree=reduced||vw<900||$$('.tile',gtrk).length<3;$('#galeri').classList.toggle('free',gfree);
      if(!gfree){gtrk.style.transform='';var tw=gtrk.scrollWidth;gdist=Math.max(0,tw-vw+40);gpin.style.height=(gdist+vh)+'px'}else{gpin.style.height='';gtrk.style.transform=''}}
    sf.forEach(function(im,i){if(!im)return;var w=SF[i].w*Math.min(vw,1100)*(vw<700?1.5:1);im.style.width=Math.max(100,w)+'px'})}
  function tick(){ticking=false;var y=window.scrollY,H=document.documentElement.scrollHeight-vh,p=H>0?clamp(y/H,0,1):0,v=y-last;last=y;
    document.documentElement.style.setProperty('--p',p);
    if(rope)rope.style.setProperty('--p',p);if(depth){depth.style.setProperty('--p',p);dm.textContent=(p*12).toFixed(1).replace('.',',')+' m'}
    vel=vel*.9+Math.abs(v)*.1;
    if(wfx){wfx.style.setProperty('--wv',clamp(vel/40,0,1).toFixed(3));var per=vw*.5;wa1.style.transform='translate3d('+(-((y*.55)%per))+'px,0,0)';wa2.style.transform='translate3d('+(-(per-((y*.8)%per)))+'px,0,0)';
      if(!reduced){var sw=swm.offsetWidth||240,fr=((p*3.4)%1+1)%1;swm.style.transform='translate3d('+(-sw+fr*(vw+sw*2))+'px,0,0)'}else swm.style.transform='translate3d('+(vw*.4)+'px,0,0)';
      if(vel>.4&&!reduced)onScroll()}
    nav.classList.toggle('on',y>40);if(topb)topb.classList.toggle('on',y>700);
    
    if(!reduced){
      if(hbg&&y<vh*1.3)hbg.style.transform='translate3d(0,'+(y*.18)+'px,0) scale('+(1+y/vh*.08)+')';
      pars.forEach(function(e){var r=e.parentNode.getBoundingClientRect();if(r.bottom<-200||r.top>vh+200)return;var c=(r.top+r.height/2-vh/2)/vh;e.style.transform='translate3d(0,'+(c*parseFloat(e.dataset.par)*-200)+'px,0)'});
      if(seal)seal.style.setProperty('--rot',y*.12);
      sf.forEach(function(im,i){if(!im)return;var c=SF[i],w=im.offsetWidth,span=vw+w*2,pos=((p*c.s*span*3)%span+span)%span,xx=c.d>0?pos-w:vw-pos+0;if(c.d<0)xx=vw+w-pos-w;im.style.transform='translate3d('+xx+'px,'+(c.y*vh+Math.sin(p*26+i*2)*26)+'px,0) scaleX('+c.d*-1+')';im.style.opacity=c.o});
      if(gpin&&!gfree){var r=gpin.getBoundingClientRect(),pr=clamp(-r.top/Math.max(1,gpin.offsetHeight-vh),0,1);gtrk.style.transform='translate3d('+(-pr*gdist)+'px,0,0)';gpin.style.setProperty('--gp',pr);var gb=$('.gbar i',gpin);if(gb)gb.style.setProperty('--gp',pr)}}
    if(path){var r2=path.getBoundingClientRect(),pp=clamp((vh*.8-r2.top)/(r2.height+vh*.2),0,1);path.style.setProperty('--p',pp);var n=$$('ol>li',path);n.forEach(function(li,i){li.classList.toggle('on',pp>=(n.length>1?i/(n.length-1):0)*.92+.02)})}
    if(steps){var r3=steps.getBoundingClientRect(),sp=clamp((vh*.72-r3.top)/(r3.height),0,1);steps.style.setProperty('--sp',sp);var s2=$$('li',steps);s2.forEach(function(li,i){li.classList.toggle('on',sp>=i/s2.length+.02)})}}
  function onScroll(){if(!ticking){ticking=true;raf=requestAnimationFrame(tick)}}
  listen(window,'scroll',onScroll,{passive:true});listen(window,'resize',function(){layout();onScroll()});
  var tp=$('#topb');if(tp)listen(tp,'click',function(){window.scrollTo({top:0,behavior:reduced?'auto':'smooth'})});
  layout();tick();setTimeout(function(){layout();tick()},600);window.addEventListener('load',function(){layout();tick()},{once:true});
  ac.signal.addEventListener('abort',function(){cancelAnimationFrame(raf)})}

/* ---------- galeri + büyütme ---------- */
var lbI=0,lbL=[];
function gallery(){lbL=media().filter(function(m){return!m.place||m.place==='gallery'});
  $$('.tile').forEach(function(t){listen(t,'click',function(){lbOpen(+t.dataset.i)})});
  var lb=$('#lb');if(!lb)return;listen($('.x',lb),'click',lbClose);listen($('.pv',lb),'click',function(){lbGo(-1)});listen($('.nx',lb),'click',function(){lbGo(1)});
  listen(lb,'click',function(e){if(e.target===lb)lbClose()});
  listen(document,'keydown',function(e){if(!lb.classList.contains('open'))return;if(e.key==='ArrowLeft')lbGo(-1);if(e.key==='ArrowRight')lbGo(1)});
  var sx=0;listen(lb,'touchstart',function(e){sx=e.changedTouches[0].clientX},{passive:true});listen(lb,'touchend',function(e){var d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>60)lbGo(d<0?1:-1)},{passive:true})}
function lbOpen(i){var lb=$('#lb');lbI=i;lbShow();lb.classList.add('open');document.documentElement.style.overflow='hidden'}
function lbClose(){var lb=$('#lb');if(!lb||!lb.classList.contains('open'))return;lb.classList.remove('open');$('#lbm').innerHTML='';document.documentElement.style.overflow=''}
function lbGo(d){lbI=(lbI+d+lbL.length)%lbL.length;lbShow()}
function lbShow(){var m=lbL[lbI];if(!m)return;$('#lbm').innerHTML=isVid(m)?'<video class="md" src="'+esc(m.src)+'" controls autoplay loop playsinline'+(m.poster?' poster="'+esc(m.poster)+'"':'')+'></video>':'<img class="md" src="'+esc(m.src)+'" alt="'+esc(m.title)+'">';$('#lbt').textContent=m.title||'';$('#lbd').textContent=m.text||''}

/* ---------- seviye bulucu ---------- */
function quiz(){var q=$('#quiz');if(!q)return;var qs=L('q_list'),lv=L('levels'),n=qs.length,score=0,age='',step=0;
  var dots=$$('.dots i',q);
  function show(s){step=s;$$('.qstep',q).forEach(function(e){e.classList.toggle('on',+e.dataset.s===s)});dots.forEach(function(d,i){d.classList.toggle('d',i<s)})}
  function result(){$$('.qstep',q).forEach(function(e){e.classList.remove('on')});dots.forEach(function(d){d.classList.add('d')});
    var idx=Math.min(lv.length-1,Math.floor(score*lv.length/(n+1))),L2=lv[idx];state.level=L2.name;
    $('#qnm').textContent=L2.name;$('#qtx').textContent=age+' için önerilen seviye: '+L2.tag+'. '+L2.text;var rs=$('#qres');rs.classList.add('on');
    var f=$('#qfish');f.style.left='0%';setTimeout(function(){f.style.left=((idx+.5)/lv.length*100)+'%'},120);recLevel()}
  $$('.opt[data-age]',q).forEach(function(b){listen(b,'click',function(){age=b.dataset.age;$$('.opt[data-age]',q).forEach(function(x){x.classList.toggle('sel',x===b)});setTimeout(function(){show(1)},260)})});
  $$('.qstep[data-s]',q).forEach(function(st){if(!+st.dataset.s)return;$$('.opt',st).forEach(function(b){listen(b,'click',function(){$$('.opt',st).forEach(function(x){x.classList.toggle('sel',x===b)});score+=+b.dataset.a;setTimeout(function(){+st.dataset.s>=n?result():show(+st.dataset.s+1)},280)})})});
  listen($('#qagain'),'click',function(){score=0;age='';state.level='';$('#qres').classList.remove('on');$$('.opt',q).forEach(function(x){x.classList.remove('sel')});show(0);recLevel()})}
function recLevel(){var r=$('#rec');if(r){r.classList.toggle('on',!!state.level);r.textContent=state.level?'Seviye bulucu önerisi: '+state.level:''}}

function openWa(msg,aid,fid){var u=wa(msg);$('#'+aid).href=u;$('#'+fid).classList.add('on');var a=document.createElement('a');a.href=u;a.target='_blank';a.rel='noopener';document.body.appendChild(a);a.click();a.remove()}
function pop2(el){if(!el||reduced)return;var r=el.getBoundingClientRect();for(var i=0;i<14;i++){var b=document.createElement('i');b.className='bub';var s=6+Math.random()*16;b.style.cssText='left:'+(r.left+Math.random()*r.width)+'px;top:'+(r.top+r.height/2)+'px;width:'+s+'px;height:'+s+'px;--dx:'+((Math.random()-.5)*80)+'px;--dy:'+(-70-Math.random()*130)+'px;--t:'+(.9+Math.random()*.8)+'s';document.body.appendChild(b);setTimeout(function(bb){bb.remove()},1900,b)}}

/* ---------- güvenli yüzücü ---------- */
function swim(){var cs=$$('.sc');if(!cs.length)return;var fg=$('#rfg'),ct=$('#rct'),dn=$('#sdone'),C=597;
  function up(){var n=cs.filter(function(c){return c.checked}).length;fg.style.strokeDashoffset=C*(1-n/cs.length);ct.textContent=n+'/'+cs.length;var all=n===cs.length;dn.classList.toggle('on',all);if(all)pop2($('.ring'))}
  cs.forEach(function(c){listen(c,'change',up)})}

/* ---------- ön kayıt formu ---------- */
function form(){var f=$('#frm');if(!f)return;var pr=f.querySelector('.pr i');
  $$('input[name=onc]',f).forEach(function(r){listen(r,'change',function(){$('#lvb').style.display=$('input[name=onc]:checked',f).value==='Evet'?'block':'none'})});
  function prog(){var n=($('#ad').value.trim().length>=3?1:0)+(+$('#yas').value>=4?1:0)+($('#tel').value.replace(/\D/g,'').length>=10?1:0);f.style.setProperty('--fp',n/3)}
  ['ad','yas','tel'].forEach(function(id){listen($('#'+id),'input',function(){$('#'+id).closest('.fld').classList.remove('bad');prog()})});
  listen(f,'submit',function(e){e.preventDefault();var bad=0;function chk(id,c){$('#'+id).closest('.fld').classList.toggle('bad',!c);if(!c)bad=1}
    chk('ad',$('#ad').value.trim().length>=3);chk('yas',+$('#yas').value>=4);chk('tel',$('#tel').value.replace(/\D/g,'').length>=10);if(bad)return;
    var onc=$('input[name=onc]:checked',f).value,nt=$('#not').value.trim();
    var msg='*'+S('msg_title')+'*\n\nAd soyad: '+$('#ad').value.trim()+'\nYaş: '+$('#yas').value+'\nCinsiyet: '+$('input[name=cins]:checked',f).value+'\nDaha önce eğitim: '+(onc==='Evet'?'Aldı ('+$('input[name=lvl]:checked',f).value+' seviye)':'Almadı')+(state.level?'\nÖnerilen seviye: '+state.level:'')+'\nTelefon: '+$('#tel').value.trim()+(nt?'\nNot: '+nt:'');
    openWa(msg,'wafb','fb');$('#okv').classList.add('on');pop2($('#frm .btn'));setTimeout(function(){$('#okv').classList.remove('on')},4200)});
  recLevel()}

/* ---------- açılış + başlatma ---------- */
function stop(){if(ac)ac.abort();cancelAnimationFrame(raf)}
function go(){document.documentElement.style.overflow='';document.body.classList.add('go');setTimeout(function(){window._ork_reveal&&window._ork_reveal();window.scrollTo(0,window.scrollY)},preview?0:300);
  setTimeout(function(){document.body.classList.remove('boot','go')},2200)}
function boot(){
  var once=false;try{once=on('i_once')&&sessionStorage.getItem('ork_intro')==='1'}catch(e){}
  render();fx();
  var show=on('i_on')&&!preview&&!once&&!reduced&&window.OrkIntro;
  if(show){document.body.classList.add('boot');document.documentElement.style.overflow='hidden';
    var d=document.createElement('div');d.id='intro';d.innerHTML='<canvas></canvas><div class="t"><img src="'+esc(S('logo'))+'" alt=""><h2>'+T('i_text')+'</h2></div>'+(on('i_skip')?'<button id="skip" type="button">Geç</button>':'');document.body.appendChild(d);
    try{sessionStorage.setItem('ork_intro','1')}catch(e){}
    window.OrkIntro({sec:+S('i_sec')||7,onDone:go})}
  else go()}
window.addEventListener('message',function(e){if(e.source!==window.parent||!e.data||e.data.type!=='orkinos-cfg')return;
  var y=window.scrollY;window.ORKINOS=e.data.cfg;stop();render();fx();document.body.classList.add('go');window._ork_reveal&&window._ork_reveal();window.scrollTo(0,y)});
function start(){window.DEFAULTS=window.DEFAULTS||{};boot()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
