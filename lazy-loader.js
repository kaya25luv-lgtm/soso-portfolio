(()=>{
  'use strict';
  const book=document.querySelector('#book');
  if(!book)return;
  const loaded=new Set();
  const source=img=>img.dataset.src||img.getAttribute('src');
  function load(img){
    if(!img||loaded.has(img))return Promise.resolve();
    const src=source(img); if(!src)return Promise.resolve();
    loaded.add(img);
    return new Promise(resolve=>{img.addEventListener('load',resolve,{once:true});img.addEventListener('error',resolve,{once:true});img.src=src});
  }
  function pageImage(n){return book.querySelector(`.p${String(n).padStart(2,'0')} img[data-src]`)}
  function warm(n){const img=pageImage(n);if(img)load(img)}
  const idle=window.requestIdleCallback||((fn)=>setTimeout(fn,120));
  warm(2);warm(11);
  idle(()=>{[3,4,5,6,7,8,9,10].forEach((n,i)=>setTimeout(()=>warm(n),i*90))});
  new MutationObserver(()=>{
    const m=book.className.match(/state-p(\d{2})/);if(!m)return;
    const n=Number(m[1]);warm(n);
    const neighbors={2:[3,4,6,8],3:[2],4:[5,2],5:[4,2],6:[7,2],7:[6,2],8:[9,2],9:[8,10,2],10:[9,2],11:[1]};
    (neighbors[n]||[]).forEach(warm);
  }).observe(book,{attributes:true,attributeFilter:['class']});
})();
