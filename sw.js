const V='jaap-shell-v3';
const SHELL=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./maskable-512.png'];

self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith('jaap-shell-')&&x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});

self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const u=new URL(r.url);
  if(u.origin===location.origin){
    e.respondWith(fetch(r).then(n=>{const cp=n.clone();caches.open(V).then(c=>c.put(r,cp));return n;}).catch(()=>caches.match(r,{ignoreSearch:true})));
  }else if(u.hostname.endsWith('googleapis.com')||u.hostname.endsWith('gstatic.com')){
    e.respondWith(caches.open('jaap-fonts').then(c=>c.match(r).then(hit=>hit||fetch(r).then(n=>{c.put(r,n.clone());return n;}).catch(()=>hit))));
  }
});
