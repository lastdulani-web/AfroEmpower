const V='afroempower-v1.2';
const A=['./','index.html','manifest.json','logo.png','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(A)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>clients.claim()))});
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 e.respondWith(caches.open(V).then(c=>c.match(e.request).then(r=>{
  const f=fetch(e.request).then(n=>{if(n&&n.ok)c.put(e.request,n.clone());return n}).catch(()=>r);
  return r||f;
 })));
});
