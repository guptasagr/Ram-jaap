const V='jaap-shell-v1';
const SHELL=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/maskable-512.png'];
const MSGS=['राम नाम की एक माला हो जाए? 🙏','एक घंटा बीता — अब कुछ पल राम के नाम 🌸','राम राम! थोड़ा जाप कर लें, मन शांत रहेगा।','जहाँ राम, वहाँ विश्राम — आइए, जाप करें 🚩','सीता राम! आज का लक्ष्य आपका इंतज़ार कर रहा है।'];

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

function dk(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
async function remind(){
  const c=await caches.open('jaap-settings');
  const key=new URL('settings.json',self.registration.scope).href;
  const r=await c.match(key);if(!r)return;
  const s=await r.json();
  const d=new Date(),h=d.getHours(),hk=dk(d)+'-'+h;
  if(!s.notif||h<s.from||h>s.to||s.last===hk)return;
  s.last=hk;await c.put(key,new Response(JSON.stringify(s)));
  const t=s.date===dk(d)?s.today:0,left=Math.max(0,s.goal-t);
  const body=MSGS[Math.floor(Math.random()*MSGS.length)]+(left>0?' आज '+t+' जाप हुए, लक्ष्य में '+left+' बाकी।':' आज का लक्ष्य पूरा है, और भी करें! 🎉');
  await self.registration.showNotification('राम नाम जाप',{body,icon:'icons/icon-192.png',badge:'icons/icon-192.png',tag:'ram-jaap',renotify:true});
}
self.addEventListener('periodicsync',e=>{if(e.tag==='hourly-jaap')e.waitUntil(remind());});
self.addEventListener('notificationclick',e=>{
  e.notification.close();
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{for(const c of l){if('focus' in c)return c.focus();}return self.clients.openWindow('./');}));
});
