(()=>{
  'use strict';
  const viewport=document.querySelector('#viewport');
  if(!viewport)return;
  const pairs=new Set(['4-5','5-4','6-7','7-6','8-9','9-8','9-10','10-9']);
  const duration=500,switchAt=325;
  window.cornerPngTurn=(from,to,done)=>{
    if(!pairs.has(`${from}-${to}`)){done();return}
    const forward=to>from;
    const holder=forward?document.createElement('img'):document.createElement('div');
    const img=forward?holder:document.createElement('img');
    img.src='assets/corner/corner.png'; img.alt=''; img.draggable=false;
    if(forward){img.style.cssText='position:absolute;z-index:30;right:0;bottom:0;width:15%;height:auto;display:block;opacity:0;pointer-events:none;transition:opacity 125ms ease-in'}
    else{holder.style.cssText='position:absolute;z-index:30;left:0;bottom:0;width:15%;height:auto;opacity:0;pointer-events:none;transition:opacity 125ms ease-in;overflow:visible';img.style.cssText='display:block;width:100%;height:auto;transform:scaleX(-1);transform-origin:center center;pointer-events:none';holder.append(img)}
    viewport.append(holder);
    requestAnimationFrame(()=>{holder.style.opacity='1'});
    setTimeout(()=>done(),switchAt);
    setTimeout(()=>{holder.style.transition='opacity 115ms ease-out';holder.style.opacity='0'},switchAt);
    setTimeout(()=>holder.remove(),duration);
  };
})();
