// سيرفر بسيط لعرض الموقع فقط - لا قاعدة بيانات، لا لوحة تحكم، لا AI.
// الموقع بالكامل static، فتقدر أيضاً تفتح index.html مباشرة لو حاب،
// لكن الأفضل دايماً تشغيله عبر: node server.js ثم فتح http://localhost:3000

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

// أي رابط غير معروف يرجّع الصفحة الرئيسية
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`نادي الهندسة والحاسبات بالليث - الموقع يعمل على http://0.0.0.0:${PORT}`);
});
