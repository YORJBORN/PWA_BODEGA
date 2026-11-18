const C='inv-v36',A=['./','index.html','manifest.json','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>Promise.all(A.map(u=>fetch(new Request(u,{cache:'reload'})).then(r=>{if(!r.ok)throw new Error(u);return c.put(u,r)}))))
 .then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x))))));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
 if(r.mode==='navigate'){
  e.respondWith(Promise.race([fetch(r,{cache:'no-cache'}),new Promise((_,j)=>setTimeout(j,3500))])
   .then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put('index.html',cp))}return res})
   .catch(()=>caches.match('index.html').then(x=>x||caches.match('./')).then(x=>x||new Response('Sin conexión',{status:503}))));
  return}
 e.respondWith(caches.match(r).then(x=>x||fetch(r)))});
