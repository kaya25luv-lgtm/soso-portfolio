(()=>{
  'use strict';
  const viewport=document.querySelector('#viewport'),page=document.querySelector('.p10'),pageImg=page?.querySelector('img');
  if(!viewport||!page||!pageImg)return;
  let token=0,raf=0,base=null,svg=null;
  const finish=()=>{cancelAnimationFrame(raf);base?.remove();svg?.remove();base=null;svg=null;if(pageImg)pageImg.style.visibility='';};
  const values={n60:60,n30:30,nPng:30};
  function animate(pageNo){
    const current=++token; finish();
    if(pageNo!==10)return;
    pageImg.style.visibility='hidden';
    base=document.createElement('img');base.src='assets/pages/10-animation-base.png';base.alt='';base.draggable=false;
    base.style.cssText='position:absolute;inset:0;width:100%;height:100%;object-fit:contain;display:block;z-index:45;pointer-events:none';viewport.append(base);
    svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 1648 928');svg.setAttribute('preserveAspectRatio','none');
    svg.style.cssText='position:absolute;inset:0;width:100%;height:100%;display:block;z-index:46;pointer-events:none';
    const g=document.createElementNS('http://www.w3.org/2000/svg','g');g.setAttribute('font-family','Times New Roman, serif');g.setAttribute('font-style','italic');g.setAttribute('font-weight','400');g.setAttribute('text-anchor','middle');
    const text=(x,y,size,color,id,suffix,suffixSize)=>{const t=document.createElementNS('http://www.w3.org/2000/svg','text');t.setAttribute('x',x);t.setAttribute('y',y);t.setAttribute('font-size',size);t.setAttribute('fill',color);const main=document.createElementNS('http://www.w3.org/2000/svg','tspan');main.id=id;t.append(main);if(suffix){const s=document.createElementNS('http://www.w3.org/2000/svg','tspan');s.setAttribute('font-size',suffixSize);s.setAttribute('fill','#48212A');s.textContent=suffix;t.append(s)}g.append(t);return t};
    text(554,232,65,'#BF4268','n60','+',53);text(856,231,64,'#813C4C','n30',' PASS',44);const time=document.createElementNS('http://www.w3.org/2000/svg','text');time.id='nTime';time.setAttribute('x','1155');time.setAttribute('y','229');time.setAttribute('font-size','62');time.setAttribute('fill','#813C4C');time.textContent='0m 00s';g.append(time);text(1440,230,64,'#813C4C','nPng',' PNG',46);svg.append(g);viewport.append(svg);
    const started=performance.now();
    function frame(now){
      if(current!==token)return;
      const p=Math.min(1,(now-started)/2000),q=1-(1-p)*(1-p);
      svg.querySelector('#n60').textContent=Math.round(values.n60*q);svg.querySelector('#n30').textContent=`${Math.round(values.n30*q)}/30`;svg.querySelector('#nPng').textContent=Math.round(values.nPng*q);const sec=Math.round(114*q);svg.querySelector('#nTime').textContent=`${Math.floor(sec/60)}m ${String(sec%60).padStart(2,'0')}s`;
      if(p<1)raf=requestAnimationFrame(frame);else setTimeout(()=>{if(current===token){finish();pageImg.style.visibility='';}},0);
    }
    raf=requestAnimationFrame(frame);
  }
  window.onPageActivated=animate;
})();
