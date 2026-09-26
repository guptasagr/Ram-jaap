# राम नाम जाप (PWA + Cloud Sync)

## GitHub Pages पर डालने के स्टेप
1. GitHub पर नई repository बनाइए (Public), जैसे `ram-jaap`.
2. इस folder की सारी files — index.html, manifest.webmanifest, sw.js, icon-192.png, icon-512.png, maskable-512.png — repo के root में उसी नाम से upload कीजिए (कोई subfolder नहीं).
3. Settings → Pages → Source: "Deploy from a branch" → Branch: `main` / root → Save.
4. 1-2 मिनट बाद `https://<username>.github.io/ram-jaap/` खोलिए।
5. फ़ोन में ब्राउज़र मेन्यू → Install app / Add to Home screen.

## ऑटोमैटिक सिंक (कई डिवाइस पर एक जैसा डेटा)
हेडर में ऊपर ☁ बटन है।
1. पहली बार दबाने पर Firebase Database URL और एक Sync Code मांगेगा (Firebase सेटअप के लिए ऐप में मिली गाइड देखें)।
2. दूसरे फ़ोन/ब्राउज़र में भी वही URL और वही Sync Code डालें — बस, अब डेटा अपने आप सिंक होगा।
3. सेटिंग बदलनी हो तो ☁ बटन को 1 सेकंड दबाकर रखें (long-press)।

नोट: ऐप बदलने पर `sw.js` में `jaap-shell-v4` का version number बढ़ा दें, ताकि पुराना cache हट जाए।
