/* Açılış animasyonu: okyanus, gerçek orkinos fotoğraflarından kesilmiş balıklar.
   Balığın gövdesi dilimlenip dalgalandırılarak yüzdürülür. */
(function(){
function loadImg(src){return new Promise(function(res){var i=new Image();i.onload=function(){res(i)};i.onerror=function(){res(null)};i.src=src})}
function flip(img){var c=document.createElement('canvas');c.width=img.width;c.height=img.height;var x=c.getContext('2d');x.translate(c.width,0);x.scale(-1,1);x.drawImage(img,0,0);return c}
function tint(src,scale,col,a){var w=Math.max(8,Math.round(src.width*scale)),h=Math.max(8,Math.round(src.height*scale));
  var c=document.createElement('canvas');c.width=w;c.height=h;var x=c.getContext('2d');x.imageSmoothingQuality='high';x.drawImage(src,0,0,w,h);
  if(a>0){x.globalCompositeOperation='source-atop';x.fillStyle=col;x.globalAlpha=a;x.fillRect(0,0,w,h)}return c}
window.OrkIntro=function(o){
  var el=document.getElementById('intro');if(!el){o.onDone&&o.onDone();return}
  var cv=el.querySelector('canvas'),x=cv.getContext('2d'),W=0,H=0,dpr=Math.min(window.devicePixelRatio||1,1.5),S=Math.max(5,Math.min(10,o.sec||7))*1000;
  var t0=0,stop=false,finished=false,raf=0,txt=el.querySelector('.t');
  function size(){W=window.innerWidth;H=window.innerHeight;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);x.setTransform(dpr,0,0,dpr,0,0)}
  size();window.addEventListener('resize',size);
  function finish(fast){if(finished)return;finished=true;stop=true;cancelAnimationFrame(raf);window.removeEventListener('resize',size);
    if(txt)txt.classList.remove('on');el.classList.add('out');o.onDone&&o.onDone();setTimeout(function(){el.remove()},fast?400:1000)}
  var sk=document.getElementById('skip');if(sk)sk.onclick=function(){finish(true)};
  var cc=document.createElement('canvas');cc.width=96;cc.height=54;var cx=cc.getContext('2d'),cim=cx.createImageData(96,54);
  function caustics(t){var d=cim.data;for(var j=0;j<54;j++)for(var i=0;i<96;i++){var u=i/96*9,v=j/54*5,
    a=Math.sin(u*1.7+t*1.1+Math.sin(v*2.1+t*.7))+Math.sin(v*2.3-t*.9+Math.sin(u*1.3-t*.6))+Math.sin((u+v)*1.4+t*.8),k=Math.max(0,1-Math.abs(a)*1.05);k=k*k*k;
    var p=(j*96+i)*4;d[p]=215;d[p+1]=250;d[p+2]=255;d[p+3]=k*255}cx.putImageData(cim,0,0)}
  var snow=[],bubs=[],i;for(i=0;i<90;i++)snow.push({x:Math.random(),y:Math.random(),r:.6+Math.random()*1.7,s:.003+Math.random()*.012,p:Math.random()*6});
  for(i=0;i<34;i++)bubs.push({x:Math.random(),y:Math.random(),r:1.5+Math.random()*5,s:.05+Math.random()*.11,w:Math.random()*6});
  var fish=[],sprites=null;
  function build(imgs){
    var R=imgs[0],Lf=imgs[1];
    if(!R&&!Lf)return;var base=[];
    if(R)base.push(R);if(Lf)base.push(flip(Lf)); // hepsi sağa bakar
    sprites=base.map(function(b){return{near:tint(b,.62,'#0a6aa0',.06),mid:tint(b,.3,'#0e78b0',.34),far:tint(b,.11,'#0a6aa0',.58)}});
    var sc=Math.max(.42,Math.min(1.25,W/1100)),n=0;
    function add(k,bucket,w,y,speed,dir,alpha,delay){fish.push({s:sprites[k%sprites.length],b:bucket,w:w,y:y,sp:speed,dir:dir,a:alpha,ph:Math.random()*6.28,f:1.6+Math.random()*.7,x:dir>0?-w-delay*speed:W+w+delay*speed,k:n++})}
    for(i=0;i<16;i++)add(i,'far',(70+Math.random()*60)*sc,H*(.16+Math.random()*.55),(14+Math.random()*14)*sc,1,.5+Math.random()*.2,-Math.random()*(W/20));
    for(i=0;i<5;i++)add(i+1,'mid',(190+Math.random()*90)*sc,H*(.22+Math.random()*.5),(46+Math.random()*26)*sc,i%2?-1:1,.88,Math.random()*3);
    var big=Math.min(W*1.05,1000*Math.max(.7,sc));
    var sp=(W+big*2)/(S/1000*.82);
    add(1,'near',big,H*.58,sp,-1,1,.4);
    add(0,'near',big*.66,H*.3,sp*.8,1,1,2.4);
  }
  function drawFish(f,t){
    var i,sp=f.s[f.b],W0=f.w,Hh=W0*sp.height/sp.width,N=Math.max(14,Math.min(44,Math.round(W0/9))),sw=sp.width/N,dw=W0/N,
        u,yy,rot=Math.sin(t*.6+f.ph)*.035,amp=Hh*.1;
    x.save();x.globalAlpha=f.a;x.translate(f.x,f.y+Math.sin(t*.55+f.ph)*Hh*.09);x.rotate(rot*f.dir);x.scale(f.dir,1);
    for(i=0;i<N;i++){u=1-i/N;yy=Math.sin(t*f.f*6.28-u*2.7+f.ph)*amp*Math.pow(u,1.35)*1.0;
      x.drawImage(sp,i*sw,0,sw+1,sp.height,-W0/2+i*dw,-Hh/2+yy,dw+1.2,Hh)}
    x.restore()}
  function frame(now){
    var i;if(stop)return;if(!t0)t0=now;var el_=now-t0,p=Math.min(el_/S,1),t=el_/1000;
    x.setTransform(dpr,0,0,dpr,0,0);
    var cam=1+p*.07;x.save();x.translate(W/2,H/2);x.scale(cam,cam);x.translate(-W/2,-H/2);
    var g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#5ad2ee');g.addColorStop(.22,'#1b9ad0');g.addColorStop(.55,'#0b5b94');g.addColorStop(.82,'#06305a');g.addColorStop(1,'#021428');
    x.globalCompositeOperation='source-over';x.globalAlpha=1;x.fillStyle=g;x.fillRect(-20,-20,W+40,H+40);
    x.globalCompositeOperation='lighter';
    for(i=0;i<9;i++){var x0=(i+.5)*W/8.4+Math.sin(t*.28+i*1.9)*70,wd=34+(i%3)*28,rg=x.createLinearGradient(0,0,0,H*.95);rg.addColorStop(0,'rgba(210,248,255,.22)');rg.addColorStop(1,'rgba(210,248,255,0)');
      x.fillStyle=rg;x.beginPath();x.moveTo(x0,-10);x.lineTo(x0+wd,-10);x.lineTo(x0+wd*2.6-280,H*.95);x.lineTo(x0-wd*1.6-280,H*.95);x.closePath();x.fill()}
    caustics(t);x.globalAlpha=.34;x.imageSmoothingEnabled=true;x.drawImage(cc,0,0,96,34,0,0,W,H*.46);x.globalAlpha=1;
    x.globalCompositeOperation='source-over';
    for(i=0;i<snow.length;i++){var s=snow[i];s.y+=s.s/60;if(s.y>1.02)s.y=-.02;x.fillStyle='rgba(225,247,255,'+(.2+.25*Math.sin(t+s.p))+')';x.beginPath();x.arc((s.x+Math.sin(t*.4+s.p)*.01)*W,s.y*H,s.r,0,6.3);x.fill()}
    var dt=1/60;
    for(i=0;i<fish.length;i++){var f=fish[i];f.x+=f.dir*f.sp*dt;if(f.b!=='near'){if(f.dir>0&&f.x>W+f.w)f.x=-f.w;if(f.dir<0&&f.x<-f.w)f.x=W+f.w}}
    ['far','mid','near'].forEach(function(b){for(var j=0;j<fish.length;j++)if(fish[j].b===b)drawFish(fish[j],t)});
    x.restore();
    for(i=0;i<bubs.length;i++){var b=bubs[i];b.y-=b.s/60;if(b.y<-.05){b.y=1.05;b.x=Math.random()}var bx=b.x*W+Math.sin(t*1.5+b.w)*9,by=b.y*H;
      x.strokeStyle='rgba(225,248,255,.6)';x.lineWidth=1.3;x.beginPath();x.arc(bx,by,b.r,0,6.3);x.stroke();x.fillStyle='rgba(255,255,255,.45)';x.beginPath();x.arc(bx-b.r*.35,by-b.r*.35,b.r*.26,0,6.3);x.fill()}
    var sg=x.createLinearGradient(0,0,0,H*.12);sg.addColorStop(0,'rgba(255,255,255,.85)');sg.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=sg;x.beginPath();x.moveTo(0,0);
    for(var a=0;a<=W;a+=8)x.lineTo(a,H*.055+Math.sin(a/70+t*1.5)*5+Math.sin(a/23-t*2.2)*2);x.lineTo(W,0);x.fill();
    var v=x.createRadialGradient(W/2,H/2,H*.28,W/2,H/2,H*.98);v.addColorStop(0,'rgba(2,12,30,0)');v.addColorStop(1,'rgba(2,12,30,.62)');x.fillStyle=v;x.fillRect(0,0,W,H);
    var fi=1-Math.min(el_/800,1);if(fi>0){x.fillStyle='rgba(2,20,40,'+fi+')';x.fillRect(0,0,W,H)}
    if(p>.3&&txt&&!txt.classList.contains('on')&&!finished)txt.classList.add('on');
    if(p>=1){finish(false);return}
    raf=requestAnimationFrame(frame)}
  Promise.all([loadImg('img/f2.png'),loadImg('img/f3.png')]).then(function(imgs){if(stop)return;build(imgs);raf=requestAnimationFrame(frame)});
  setTimeout(function(){if(!finished)finish(false)},S+3500);
};
})();
