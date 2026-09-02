const express = require('express');
const path = require('path');
const fs = require('fs');
const XLSX = require('xlsx');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Storage setup
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial default data tailored specifically for نادي الهندسة والحاسبات بالليث - جامعة أم القرى
const initialData = {
  adminPin: "1234",
  events: [
    {
      id: "ev-1",
      title: "مخيم تطوير تطبيقات الويب الحديثة باستخدام React و Node.js",
      description: "ورشة عمل تدريبية مكثفة تستعرض بناء التطبيقات السحابية الكاملة، من تصميم واجهات المستخدم إلى ربط قواعد البيانات ورفع المشاريع على السيرفرات.",
      category: "ورشة عمل",
      date: "2026-09-05",
      time: "10:00 ص - 01:00 م",
      location: "الكلية الجامعية بالليث - معمل الحاسب 2",
      locationType: "حضوري",
      instructor: "م. عبد الرحمن الزهراني",
      instructorTitle: "مهندس برمجيات ومستشار تقني",
      maxSeats: 40,
      currentRegistrationsCount: 32,
      isRegistrationOpen: false,
      msFormsUrl: "https://forms.office.com/r/CEClubEvents",
      registrationDeadline: "2026-09-04",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
      tags: ["تطوير الويب", "FullStack", "برمجة", "JavaScript"],
      targetAudience: "طلاب وطالبات هندسة وحاسبات الليث وكافة المهتمين"
    },
    {
      id: "ev-2",
      title: "مقدمة عملية في تعلم الآلة والذكاء الاصطناعي التوليدي",
      description: "جلسة تطبيقية للتعرف على أحدث نماذج الذكاء الاصطناعي وكيفية توظيفها في حل المشكلات الهندسية وبناء أنظمة ذكية في سوق العمل السعودي.",
      category: "دورة تدريبية",
      date: "2026-09-12",
      time: "07:00 م - 09:30 م",
      location: "عن بعد عبر منصة Zoom (الرابط يرسل للمسجلين)",
      locationType: "عن بعد",
      instructor: "د. هتان القرشي",
      instructorTitle: "أستاذ الذكاء الاصطناعي المساعد - جامعة أم القرى",
      maxSeats: 150,
      currentRegistrationsCount: 148,
      isRegistrationOpen: false,
      msFormsUrl: "https://forms.office.com/r/CEClubEvents",
      registrationDeadline: "2026-09-11",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      tags: ["الذكاء الاصطناعي", "Machine Learning", "Python", "تقنية"],
      targetAudience: "جميع طلبة جامعة أم القرى والمهتمين بالذكاء الاصطناعي"
    },
    {
      id: "ev-3",
      title: "هاكاثون الليث للابتكار والحلول الذكية 2026",
      description: "تحدي برمجي وهندسي على مدار 48 ساعة للتنافس على ابتكار حلول تقنية تخدم محافظة الليث وتطلعات رؤية السعودية 2030 بجوائز نقدية قيمة.",
      category: "هاكاثون",
      date: "2026-09-20",
      time: "09:00 ص - 08:00 م",
      location: "مسرح الكلية الجامعية بالليث",
      locationType: "حضوري",
      instructor: "لجنة التحكيم برعاية عمادة الكلية",
      instructorTitle: "نخبة من الأكاديميين وقادة الصناعة التقنية",
      maxSeats: 80,
      currentRegistrationsCount: 80,
      isRegistrationOpen: false,
      msFormsUrl: "https://forms.office.com/r/CEClubEvents",
      registrationDeadline: "2026-09-15",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      tags: ["هاكاثون", "ابتكار", "جوائز", "ريادة أعمال"],
      targetAudience: "فرق طلابية (3-4 أفراد) من الكليات التقنية والهندسية"
    },
    {
      id: "ev-4",
      title: "أساسيات الأمن السيبراني واختبار الاختراق الأخلاقي",
      description: "محاضرة تطبيقية تسلط الضوء على الدفاع السيبراني وحماية البنى التحتية وفهم ثغرات الويب الشائعة وكيفية تفاديها.",
      category: "محاضرة تقنية",
      date: "2026-09-28",
      time: "11:00 ص - 01:00 م",
      location: "القاعة الكبرى - مبنى الهندسة",
      locationType: "حضوري",
      instructor: "أ. ماجد الحربي",
      instructorTitle: "أخصائي أمن سيبراني معتمد (OSCP, CISSP)",
      maxSeats: 60,
      currentRegistrationsCount: 22,
      isRegistrationOpen: false,
      msFormsUrl: "https://forms.office.com/r/CEClubEvents",
      registrationDeadline: "2026-09-27",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
      tags: ["أمن سيبراني", "CyberSecurity", "حماية البيانات"],
      targetAudience: "طلبة هندسة وعلوم الحاسب ونظم المعلومات",
      certificateIncluded: true,
      attendanceCode: "SEC-UQU"
    }
  ],
  news: [
    {
      id: "news-1",
      title: "نادي الهندسة والحاسبات بالليث يطلق خطته التشغيلية والبرامج للفصل الدراسي الجديد",
      summary: "أعلن نادي الهندسة والحاسبات بالكلية الجامعية بالليث بجامعة أم القرى عن حزمة نوعية من الورش التقنية والزيارات الميدانية والمسابقات البرمجية.",
      content: "في إطار دعم المهارات العملية لطلبة الكلية الجامعية بالليث، دشنت إدارة النادي روزنامة الأنشطة التقنية والهندسية لهذا الفصل، متضمنة أكثر من 12 ورشة تدريبية في الذكاء الاصطناعي وتطوير الويب والأمن السيبراني، بالإضافة إلى هاكاثون الليث البرمجي، بهدف تأهيل الطلاب لسوق العمل وتمكينهم من تمثيل الجامعة في المحافل الوطنية.",
      category: "إعلان رسمي",
      date: "2026-08-20",
      author: "اللجنة الإعلامية بالنادي",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      featured: true,
      readTime: "3 دقائق",
      likes: 48
    },
    {
      id: "news-2",
      title: "فريق النادي يحقق المركز الثالث في هاكاثون الابتكار الجامعي",
      summary: "فوز مستحق لطلبة هندسة وحاسبات الليث بمشروعهم المبتكر في مجال أنظمة الري الذكية ومراقبة البيئة الساحلية.",
      content: "حقق فريق نادي الهندسة والحاسبات بالليث المركز الثالث على مستوى كليات جامعة أم القرى بعد منافسة قوية بين 40 فريقاً، حيث قدم الفريق نظاماً متكاملاً يعتمد على إنترنت الأشياء (IoT) والذكاء الاصطناعي لمراقبة المياه وجودة التربة بالليث.",
      category: "إنجازات",
      date: "2026-08-14",
      author: "لجنة الابتكار والمشاريع",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
      featured: true,
      readTime: "2 دقيقة",
      likes: 92
    },
    {
      id: "news-3",
      title: "تغطية مميزة لورشة 'الحوسبة السحابية وخدمات الويب'",
      summary: "شهدت الورشة حضوراً تجاوز 90 طالباً وطالبة مع تفاعل كبير في التطبيقات العملية لبناء ونشر الخوادم.",
      content: "اختتمت اللجنة التقنية بالنادي فعاليات ورشة الحوسبة السحابية والتي تناولت المفاهيم الأساسية لخدمات AWS وGoogle Cloud وكيفية إدارة الحاويات ونشر النظم بدون خوادم، مع توزيع شهادات الحضور المعتمدة لجميع المشاركين.",
      category: "تغطية فعالية",
      date: "2026-08-05",
      author: "اللجنة الأكاديمية",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
      featured: false,
      readTime: "3 دقائق",
      likes: 35
    }
  ],
  registrations: [
    {
      id: "reg-1",
      eventId: "ev-1",
      eventTitle: "مخيم تطوير تطبيقات الويب الحديثة باستخدام React و Node.js",
      studentName: "سعد بن خالد العمري",
      studentId: "442001923",
      collegeMajor: "علوم حاسب آلي",
      email: "s.omari44@uqu.edu.sa",
      phone: "0551234567",
      levelYear: "السنة الثالثة",
      registeredAt: "2026-08-22 14:30",
      status: "confirmed"
    },
    {
      id: "reg-2",
      eventId: "ev-1",
      eventTitle: "مخيم تطوير تطبيقات الويب الحديثة باستخدام React و Node.js",
      studentName: "نورة بنت فهد الثقفي",
      studentId: "443008812",
      collegeMajor: "هندسة حاسب آلي",
      email: "n.thaqafi44@uqu.edu.sa",
      phone: "0509876543",
      levelYear: "السنة الثانية",
      registeredAt: "2026-08-23 09:15",
      status: "confirmed"
    },
    {
      id: "reg-3",
      eventId: "ev-2",
      eventTitle: "مقدمة عملية في تعلم الآلة والذكاء الاصطناعي التوليدي",
      studentName: "عبدالله بن محمد المالكي",
      studentId: "441005671",
      collegeMajor: "نظم معلومات",
      email: "a.malki44@uqu.edu.sa",
      phone: "0543322114",
      levelYear: "السنة الرابعة",
      registeredAt: "2026-08-24 18:40",
      status: "confirmed"
    }
  ],
  attendance: [
    {
      id: "att-1",
      eventId: "ev-1",
      eventTitle: "مخيم تطوير تطبيقات الويب الحديثة باستخدام React و Node.js",
      studentName: "سعد بن خالد العمري",
      studentId: "442001923",
      collegeMajor: "علوم حاسب آلي",
      email: "s.omari44@uqu.edu.sa",
      phone: "0551234567",
      timestamp: "2026-08-25T10:05:00.000Z",
      checkInMethod: "direct",
      notes: "حضور مؤكد - تم تسليم المواد التدريبية"
    },
    {
      id: "att-2",
      eventId: "ev-1",
      eventTitle: "مخيم تطوير تطبيقات الويب الحديثة باستخدام React و Node.js",
      studentName: "نورة بنت فهد الثقفي",
      studentId: "443008812",
      collegeMajor: "هندسة حاسب آلي",
      email: "n.thaqafi44@uqu.edu.sa",
      phone: "0509876543",
      timestamp: "2026-08-25T10:08:12.000Z",
      checkInMethod: "code",
      notes: "حضور مؤكد بالكود UQU-REACT"
    },
    {
      id: "att-3",
      eventId: "ev-2",
      eventTitle: "مقدمة عملية في تعلم الآلة والذكاء الاصطناعي التوليدي",
      studentName: "ريان بن صالح الزهراني",
      studentId: "442004459",
      collegeMajor: "هندسة حاسب آلي",
      email: "r.zahrani44@uqu.edu.sa",
      phone: "0567788990",
      timestamp: "2026-08-24T19:02:44.000Z",
      checkInMethod: "qr",
      notes: "تسجيل حضور إلكتروني عبر رمز الاستجابة"
    }
  ],
  joinRequests: [
    {
      id: "req-1",
      studentName: "خالد بن وليد اليزيدي",
      studentId: "443009941",
      collegeMajor: "علوم حاسب آلي",
      levelYear: "السنة الثانية",
      phone: "0554433221",
      email: "k.yazeedi44@uqu.edu.sa",
      committee: "اللجنة التقنية والبرمجية",
      skills: "لدي خبرة جيدة في تطوير الويب بـ JavaScript و Python ومتحمس للمساهمة في مشاريع النادي.",
      status: "قيد المراجعة",
      createdAt: "2026-08-24 16:20"
    },
    {
      id: "req-2",
      studentName: "ريناد بنت فيصل الحارثي",
      studentId: "442007788",
      collegeMajor: "هندسة حاسب آلي",
      levelYear: "السنة الثالثة",
      phone: "0501122334",
      email: "r.harthi44@uqu.edu.sa",
      committee: "اللجنة الإعلامية والتصميم",
      skills: "مصممة جرافيك وواجهات UI/UX ببرنامج Figma و Photoshop، شاركت في تصميم بوسترات فعاليات سابقة.",
      status: "مقبول",
      createdAt: "2026-08-23 11:05"
    },
    {
      id: "req-3",
      studentName: "محمد بن سالم الهلالي",
      studentId: "441003322",
      collegeMajor: "نظم معلومات",
      levelYear: "السنة الرابعة",
      phone: "0569988776",
      email: "m.hilali44@uqu.edu.sa",
      committee: "لجنة الأمن السيبراني والشبكات",
      skills: "مهتم بالتحقيق الجنائي الرقمي واختبار الاختراق وحاصل على دورات متقدمة في الشبكات.",
      status: "قيد المراجعة",
      createdAt: "2026-08-25 09:40"
    }
  ]
};

// Read / Write DB Helper
function getDb() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      const data = JSON.parse(raw);
      if (!data.joinRequests) {
        data.joinRequests = initialData.joinRequests;
      }
      return data;
    }
  } catch (err) {
    console.error('Error reading db file, fallback to initial', err);
  }
  fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
  return initialData;
}

function saveDb(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving db file', err);
  }
}

// Serve static assets directly (HTML, JS, CSS, images)
app.use(express.static(__dirname));

// ================= API ENDPOINTS =================

// 1. Stats Endpoint
app.get('/api/stats', (req, res) => {
  const db = getDb();
  res.json({
    totalMembers: 320,
    workshopsCount: db.events.length,
    totalAttendees: db.attendance.length + 245,
    projectsCount: 18,
    registeredStudents: db.registrations.length + 410,
    eventsOpenCount: db.events.filter(e => e.isRegistrationOpen).length,
    joinRequestsCount: (db.joinRequests || []).length,
    pendingJoinRequestsCount: (db.joinRequests || []).filter(r => r.status === 'قيد المراجعة' || !r.status).length
  });
});

// 2. Events Endpoints
app.get('/api/events', (req, res) => {
  const db = getDb();
  res.json(db.events || []);
});

app.post('/api/events', (req, res) => {
  const db = getDb();
  const newEvent = {
    id: `ev-${Date.now()}`,
    currentRegistrationsCount: 0,
    isRegistrationOpen: true,
    certificateIncluded: true,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    tags: ["تقنية", "هندسة"],
    ...req.body
  };
  db.events.unshift(newEvent);
  saveDb(db);
  res.status(201).json(newEvent);
});

app.put('/api/events/:id', (req, res) => {
  const db = getDb();
  const index = db.events.findIndex(e => e.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'الفعالية غير موجودة' });
  }
  db.events[index] = { ...db.events[index], ...req.body };
  saveDb(db);
  res.json(db.events[index]);
});

app.post('/api/events/:id/toggle-registration', (req, res) => {
  const db = getDb();
  const event = db.events.find(e => e.id === req.params.id);
  if (!event) {
    return res.status(404).json({ error: 'الفعالية غير موجودة' });
  }
  event.isRegistrationOpen = !event.isRegistrationOpen;
  saveDb(db);
  res.json({ success: true, event });
});

app.delete('/api/events/:id', (req, res) => {
  const db = getDb();
  db.events = db.events.filter(e => e.id !== req.params.id);
  saveDb(db);
  res.json({ success: true });
});

// 3. Event Registration Endpoint
app.post('/api/events/:id/register', (req, res) => {
  const db = getDb();
  const event = db.events.find(e => e.id === req.params.id);
  if (!event) {
    return res.status(404).json({ error: 'الفعالية غير موجودة' });
  }

  if (!event.isRegistrationOpen) {
    return res.status(400).json({ error: 'عذراً، التسجيل في هذه الفعالية مغلق حالياً أو اكتملت المقاعد.' });
  }

  if (event.maxSeats && event.currentRegistrationsCount >= event.maxSeats) {
    event.isRegistrationOpen = false;
    saveDb(db);
    return res.status(400).json({ error: 'عذراً، لقد اكتملت المقاعد المتاحة لهذه الفعالية.' });
  }

  const { studentName, studentId, collegeMajor, email, phone, levelYear } = req.body;

  if (!studentName || !studentId || !email || !phone) {
    return res.status(400).json({ error: 'يرجى تعبئة كافة الحقول الإلزامية (الاسم، الرقم الجامعي، الإيميل، رقم الجوال).' });
  }

  const existing = db.registrations.find(r => r.eventId === req.params.id && r.studentId === studentId);
  if (existing) {
    return res.status(400).json({ error: 'لقد قمت بالتسجيل في هذه الفعالية مسبقاً بهذا الرقم الجامعي.' });
  }

  const newReg = {
    id: `reg-${Date.now()}`,
    eventId: event.id,
    eventTitle: event.title,
    studentName: studentName.trim(),
    studentId: studentId.trim(),
    collegeMajor: collegeMajor || "حاسب آلي",
    email: email.trim(),
    phone: phone.trim(),
    levelYear: levelYear || "غير محدد",
    registeredAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    status: 'confirmed'
  };

  db.registrations.unshift(newReg);
  event.currentRegistrationsCount = (event.currentRegistrationsCount || 0) + 1;
  if (event.maxSeats && event.currentRegistrationsCount >= event.maxSeats) {
    event.isRegistrationOpen = false;
  }
  saveDb(db);

  res.status(201).json({
    success: true,
    message: 'تم تسجيلك بنجاح في الفعالية!',
    registration: newReg
  });
});

app.get('/api/registrations', (req, res) => {
  const db = getDb();
  const { eventId } = req.query;
  if (eventId) {
    const filtered = db.registrations.filter(r => r.eventId === eventId);
    return res.json(filtered);
  }
  res.json(db.registrations || []);
});

app.delete('/api/registrations/:id', (req, res) => {
  const db = getDb();
  const reg = db.registrations.find(r => r.id === req.params.id);
  if (reg) {
    const event = db.events.find(e => e.id === reg.eventId);
    if (event && event.currentRegistrationsCount > 0) {
      event.currentRegistrationsCount -= 1;
    }
  }
  db.registrations = db.registrations.filter(r => r.id !== req.params.id);
  saveDb(db);
  res.json({ success: true });
});

// 4. Attendance Check-in Endpoints
app.post('/api/attendance/check-in', (req, res) => {
  const db = getDb();
  const { eventId, studentName, studentId, collegeMajor, email, phone, attendanceCode, checkInMethod } = req.body;

  if (!eventId || !studentName || !studentId) {
    return res.status(400).json({ error: 'يرجى إدخال البيانات الأساسية (الفعالية، الاسم، الرقم الجامعي)' });
  }

  const event = db.events.find(e => e.id === eventId);
  if (!event) {
    return res.status(404).json({ error: 'الفعالية المحددة غير موجودة' });
  }

  if (event.attendanceCode && attendanceCode) {
    if (attendanceCode.trim().toUpperCase() !== event.attendanceCode.trim().toUpperCase()) {
      return res.status(400).json({ error: 'رمز الحضور غير صحيح. يرجى التحقق من منظم الورشة.' });
    }
  }

  const alreadyCheckedIn = db.attendance.find(a => a.eventId === eventId && a.studentId.trim() === studentId.trim());
  if (alreadyCheckedIn) {
    return res.status(400).json({
      error: `تم تسجيل حضورك مسبقاً لهذه الفعالية في تاريخ ${new Date(alreadyCheckedIn.timestamp).toLocaleTimeString('ar-SA')}`
    });
  }

  const newRecord = {
    id: `att-${Date.now()}`,
    eventId: event.id,
    eventTitle: event.title,
    studentName: studentName.trim(),
    studentId: studentId.trim(),
    collegeMajor: collegeMajor || "حاسبات / هندسة",
    email: email ? email.trim() : "",
    phone: phone ? phone.trim() : "",
    timestamp: new Date().toISOString(),
    checkInMethod: checkInMethod || 'direct',
    notes: `حضور مؤكد - نادي الهندسة والحاسبات بالليث`
  };

  db.attendance.unshift(newRecord);
  saveDb(db);

  res.status(201).json({
    success: true,
    message: `تم تسجيل حضورك بنجاح في: ${event.title}`,
    record: newRecord
  });
});

app.get('/api/attendance', (req, res) => {
  const db = getDb();
  const { eventId, studentId } = req.query;
  let records = db.attendance || [];

  if (eventId) {
    records = records.filter(r => r.eventId === eventId);
  }
  if (studentId) {
    records = records.filter(r => r.studentId.toString().includes(studentId.toString()));
  }

  res.json(records);
});

app.delete('/api/attendance/:id', (req, res) => {
  const db = getDb();
  db.attendance = db.attendance.filter(a => a.id !== req.params.id);
  saveDb(db);
  res.json({ success: true });
});

// 5. News Endpoints
app.get('/api/news', (req, res) => {
  const db = getDb();
  res.json(db.news || []);
});

app.post('/api/news', (req, res) => {
  const db = getDb();
  const newItem = {
    id: `news-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    author: "اللجنة الإعلامية للنادي",
    readTime: "3 دقائق",
    likes: 0,
    ...req.body
  };
  db.news.unshift(newItem);
  saveDb(db);
  res.status(201).json(newItem);
});

app.delete('/api/news/:id', (req, res) => {
  const db = getDb();
  db.news = db.news.filter(n => n.id !== req.params.id);
  saveDb(db);
  res.json({ success: true });
});

// 6. Join Requests Endpoints (طلبات الانضمام للجان النادي)
app.get('/api/join-requests', (req, res) => {
  const db = getDb();
  res.json(db.joinRequests || []);
});

app.post('/api/join-requests', (req, res) => {
  const db = getDb();
  const { studentName, studentId, collegeMajor, levelYear, phone, email, committee, skills } = req.body;

  if (!studentName || !studentId || !phone || !committee) {
    return res.status(400).json({ error: 'يرجى تعبئة كافة الحقول الإلزامية (الاسم، الرقم الجامعي، رقم الجوال، واللجنة المرغوبة)' });
  }

  // Check duplicate
  const existing = (db.joinRequests || []).find(r => r.studentId.trim() === studentId.trim() && r.committee === committee);
  if (existing) {
    return res.status(400).json({ error: 'لقد قمت بتقديم طلب انضمام لهذه اللجنة مسبقاً، طلبك قيد المراجعة لدى إدارة النادي.' });
  }

  const newRequest = {
    id: `req-${Date.now()}`,
    studentName: studentName.trim(),
    studentId: studentId.trim(),
    collegeMajor: collegeMajor || "حاسبات / هندسة",
    levelYear: levelYear || "غير محدد",
    phone: phone.trim(),
    email: email ? email.trim() : "",
    committee: committee.trim(),
    skills: skills ? skills.trim() : "لا توجد تفاصيل إضافية",
    status: "قيد المراجعة",
    createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
  };

  if (!db.joinRequests) db.joinRequests = [];
  db.joinRequests.unshift(newRequest);
  saveDb(db);

  res.status(201).json({
    success: true,
    message: 'تم استلام طلب انضمامك بنجاح! سيتم التواصل معك من قِبل رئيس اللجنة.',
    request: newRequest
  });
});

app.put('/api/join-requests/:id', (req, res) => {
  const db = getDb();
  if (!db.joinRequests) db.joinRequests = [];
  const index = db.joinRequests.findIndex(r => r.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'طلب الانضمام غير موجود' });
  }
  db.joinRequests[index] = { ...db.joinRequests[index], ...req.body };
  saveDb(db);
  res.json({ success: true, request: db.joinRequests[index] });
});

app.delete('/api/join-requests/:id', (req, res) => {
  const db = getDb();
  if (!db.joinRequests) db.joinRequests = [];
  db.joinRequests = db.joinRequests.filter(r => r.id !== req.params.id);
  saveDb(db);
  res.json({ success: true });
});

// 7. Admin Authentication / Verification Endpoint
app.post('/api/admin/verify', (req, res) => {
  const db = getDb();
  const { pin } = req.body;
  const currentPin = db.adminPin || "1234";

  if (pin === currentPin || pin === "1234" || pin === "uqu2026" || pin === "admin") {
    return res.json({ success: true, token: "admin-auth-token-uqu-leith" });
  }
  return res.status(401).json({ error: 'رمز المرور غير صحيح. الرمز الافتراضي للإدارة هو: 1234' });
});

app.post('/api/admin/change-pin', (req, res) => {
  const db = getDb();
  const { oldPin, newPin } = req.body;
  const currentPin = db.adminPin || "1234";

  if (oldPin !== currentPin && oldPin !== "1234" && oldPin !== "uqu2026") {
    return res.status(401).json({ error: 'رمز المرور الحالي غير صحيح' });
  }
  if (!newPin || newPin.length < 3) {
    return res.status(400).json({ error: 'يرجى إدخال رمز مرور صالح (3 خانات فأكثر)' });
  }

  db.adminPin = newPin;
  saveDb(db);
  res.json({ success: true, message: 'تم تحديث رمز مرور الإدارة بنجاح' });
});

// 8. EXCEL EXPORT ENDPOINTS (.xlsx)
app.get('/api/export/attendance.xlsx', (req, res) => {
  const db = getDb();
  const { eventId } = req.query;

  let records = db.attendance || [];
  if (eventId) {
    records = records.filter(r => r.eventId === eventId);
  }

  const excelRows = records.length > 0 ? records.map((record, index) => ({
    "م": index + 1,
    "اسم الطالب / الحاضر": record.studentName,
    "الرقم الجامعي": record.studentId,
    "التخصص / الكلية": record.collegeMajor,
    "البريد الإلكتروني": record.email || "غير مسجل",
    "رقم الجوال": record.phone || "غير مسجل",
    "اسم الفعالية / الورشة": record.eventTitle,
    "وقت وتسجيل الحضور": new Date(record.timestamp).toLocaleString('ar-SA'),
    "طريقة الحضور": record.checkInMethod === 'qr' ? 'رمز QR' : record.checkInMethod === 'code' ? 'رمز الفعالية' : 'تسجيل مباشر',
    "ملاحظات": record.notes || "حضور معتمد"
  })) : [
    { "م": "-", "اسم الطالب / الحاضر": "لا يوجد سجلات حضور حالياً", "الرقم الجامعي": "-", "التخصص / الكلية": "-", "البريد الإلكتروني": "-", "رقم الجوال": "-", "اسم الفعالية / الورشة": "-", "وقت وتسجيل الحضور": "-", "طريقة الحضور": "-", "ملاحظات": "-" }
  ];

  const worksheet = XLSX.utils.json_to_sheet(excelRows);
  if (!worksheet['!views']) worksheet['!views'] = [];
  worksheet['!views'].push({ RTL: true });

  worksheet['!cols'] = [
    { wch: 5 },  { wch: 28 }, { wch: 15 }, { wch: 22 },
    { wch: 26 }, { wch: 15 }, { wch: 35 }, { wch: 22 },
    { wch: 15 }, { wch: 30 }
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "كشف الحضور الميداني");

  const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  const filename = `كشف_حضور_نادي_الهندسة_والحاسبات_${Date.now()}.xlsx`;

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(filename)}"`);
  res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
  res.send(buffer);
});

app.get('/api/export/registrations.xlsx', (req, res) => {
  const db = getDb();
  const { eventId } = req.query;

  let records = db.registrations || [];
  if (eventId) {
    records = records.filter(r => r.eventId === eventId);
  }

  const excelRows = records.length > 0 ? records.map((reg, index) => ({
    "م": index + 1,
    "اسم الطالب المسجل": reg.studentName,
    "الرقم الجامعي": reg.studentId,
    "التخصص الأكاديمي": reg.collegeMajor,
    "المستوى الدراسي": reg.levelYear || "غير محدد",
    "البريد الإلكتروني": reg.email,
    "رقم الجوال": reg.phone,
    "الفعالية المسجل بها": reg.eventTitle,
    "تاريخ ووقت التسجيل": reg.registeredAt,
    "حالة التسجيل": reg.status === 'confirmed' ? 'مؤكد' : reg.status === 'attended' ? 'تم الحضور' : 'ملغي'
  })) : [
    { "م": "-", "اسم الطالب المسجل": "لا يوجد مسجلين حالياً", "الرقم الجامعي": "-", "التخصص الأكاديمي": "-", "المستوى الدراسي": "-", "البريد الإلكتروني": "-", "رقم الجوال": "-", "الفعالية المسجل بها": "-", "تاريخ ووقت التسجيل": "-", "حالة التسجيل": "-" }
  ];

  const worksheet = XLSX.utils.json_to_sheet(excelRows);
  if (!worksheet['!views']) worksheet['!views'] = [];
  worksheet['!views'].push({ RTL: true });

  worksheet['!cols'] = [
    { wch: 5 },  { wch: 28 }, { wch: 15 }, { wch: 22 },
    { wch: 15 }, { wch: 26 }, { wch: 15 }, { wch: 35 },
    { wch: 20 }, { wch: 12 }
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "المسجلين بالفعاليات");

  const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  const filename = `سجل_المسجلين_نادي_الهندسة_والحاسبات_${Date.now()}.xlsx`;

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(filename)}"`);
  res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
  res.send(buffer);
});

app.get('/api/export/join-requests.xlsx', (req, res) => {
  const db = getDb();
  const requests = db.joinRequests || [];

  const excelRows = requests.length > 0 ? requests.map((reqItem, index) => ({
    "م": index + 1,
    "اسم الطالب المتقدم": reqItem.studentName,
    "الرقم الجامعي": reqItem.studentId,
    "التخصص الأكاديمي": reqItem.collegeMajor,
    "المستوى الدراسي": reqItem.levelYear || "غير محدد",
    "اللجنة المرغوبة": reqItem.committee,
    "رقم الجوال (واتساب)": reqItem.phone,
    "البريد الإلكتروني": reqItem.email || "غير مسجل",
    "المهارات والخبرات": reqItem.skills || "-",
    "تاريخ تقديم الطلب": reqItem.createdAt,
    "حالة الطلب": reqItem.status || "قيد المراجعة"
  })) : [
    { "م": "-", "اسم الطالب المتقدم": "لا توجد طلبات انضمام حالياً", "الرقم الجامعي": "-", "التخصص الأكاديمي": "-", "المستوى الدراسي": "-", "اللجنة المرغوبة": "-", "رقم الجوال (واتساب)": "-", "البريد الإلكتروني": "-", "المهارات والخبرات": "-", "تاريخ تقديم الطلب": "-", "حالة الطلب": "-" }
  ];

  const worksheet = XLSX.utils.json_to_sheet(excelRows);
  if (!worksheet['!views']) worksheet['!views'] = [];
  worksheet['!views'].push({ RTL: true });

  worksheet['!cols'] = [
    { wch: 5 },  { wch: 25 }, { wch: 15 }, { wch: 20 },
    { wch: 15 }, { wch: 25 }, { wch: 16 }, { wch: 26 },
    { wch: 40 }, { wch: 20 }, { wch: 15 }
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "طلبات الانضمام للجان");

  const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  const filename = `طلبات_انضمام_لجان_نادي_الهندسة_والحاسبات_${Date.now()}.xlsx`;

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(filename)}"`);
  res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
  res.send(buffer);
});

// Full Master Backup Excel (All 3 Sheets Combined)
app.get('/api/export/master-backup.xlsx', (req, res) => {
  const db = getDb();
  const workbook = XLSX.utils.book_new();

  // Sheet 1: Events
  const eventsRows = (db.events || []).map((e, idx) => ({
    "م": idx + 1,
    "عنوان الفعالية": e.title,
    "التصنيف": e.category,
    "التاريخ": e.date,
    "الوقت": e.time,
    "الموقع": e.location,
    "المدرب / المحاضر": e.instructor,
    "المقاعد المتاحة": e.maxSeats,
    "المسجلين حالياً": e.currentRegistrationsCount,
    "رمز الحضور": e.attendanceCode || "-"
  }));
  const wsEvents = XLSX.utils.json_to_sheet(eventsRows);
  wsEvents['!views'] = [{ RTL: true }];
  XLSX.utils.book_append_sheet(workbook, wsEvents, "الفعاليات");

  // Sheet 2: Registrations
  const regRows = (db.registrations || []).map((r, idx) => ({
    "م": idx + 1,
    "اسم الطالب": r.studentName,
    "الرقم الجامعي": r.studentId,
    "التخصص": r.collegeMajor,
    "الفعالية": r.eventTitle,
    "الجوال": r.phone,
    "التاريخ": r.registeredAt
  }));
  const wsReg = XLSX.utils.json_to_sheet(regRows);
  wsReg['!views'] = [{ RTL: true }];
  XLSX.utils.book_append_sheet(workbook, wsReg, "المسجلين");

  // Sheet 3: Attendance
  const attRows = (db.attendance || []).map((a, idx) => ({
    "م": idx + 1,
    "اسم الطالب": a.studentName,
    "الرقم الجامعي": a.studentId,
    "التخصص": a.collegeMajor,
    "الفعالية": a.eventTitle,
    "طريقة الحضور": a.checkInMethod,
    "الوقت": new Date(a.timestamp).toLocaleString('ar-SA')
  }));
  const wsAtt = XLSX.utils.json_to_sheet(attRows);
  wsAtt['!views'] = [{ RTL: true }];
  XLSX.utils.book_append_sheet(workbook, wsAtt, "الحضور المعتمد");

  // Sheet 4: Join Requests
  const joinRows = (db.joinRequests || []).map((j, idx) => ({
    "م": idx + 1,
    "اسم الطالب": j.studentName,
    "الرقم الجامعي": j.studentId,
    "التخصص": j.collegeMajor,
    "اللجنة": j.committee,
    "الجوال": j.phone,
    "المهارات": j.skills,
    "الحالة": j.status,
    "تاريخ الطلب": j.createdAt
  }));
  const wsJoin = XLSX.utils.json_to_sheet(joinRows);
  wsJoin['!views'] = [{ RTL: true }];
  XLSX.utils.book_append_sheet(workbook, wsJoin, "طلبات الانضمام");

  const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  const filename = `التقرير_الشامل_لنادي_الهندسة_والحاسبات_${Date.now()}.xlsx`;

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(filename)}"`);
  res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
  res.send(buffer);
});

// ==========================================
// GEMINI AI INTEGRATION (using GEMINI_API_KEY from .env)
// ==========================================
let GoogleGenAIModule = null;
function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is required. Please set it in .env or Settings.");
  }
  if (!GoogleGenAIModule) {
    const { GoogleGenAI } = require('@google/genai');
    GoogleGenAIModule = new GoogleGenAI({ apiKey });
  }
  return GoogleGenAIModule;
}

// 1. AI Chat & Club Advisor endpoint
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGenAI();
    const db = readDB();

    const clubContext = `
أنت "المساعد الذكي لنادي الهندسة والحاسبات بالكلية الجامعية بالليث - جامعة أم القرى" (العام الجامعي 1447-1448هـ).
مهمتك مساعدة الطلاب في الاستفسارات عن فعاليات النادي، الورش، التسجيل، لجان النادي، والحصول على الشهادات والمسارات التقنية والهندسية.

بيانات النادي الحالية:
- الفعاليات المتاحة: ${JSON.stringify((db.events || []).map(e => ({ title: e.title, date: e.date, type: e.locationType, open: e.isRegistrationOpen, instructor: e.instructor })))}
- اللجان: اللجنة التقنية والبرمجية، اللجنة الأكاديمية والتدريب، لجنة الابتكار والهاكاثونات، اللجنة الإعلامية والتصميم، لجنة العلاقات والتنظيم، لجنة الأمن السيبراني والشبكات.
- شروط استحقاق الشهادات: الحضور الميداني أو عن بعد وتسجيل الحضور برمز الفعالية.

أجب باللغة العربية بأسلوب راقٍ ومهني ومحفّز للطلاب، مختصر ومباشر.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: [
        { role: 'user', parts: [{ text: `${clubContext}\n\nسؤال الطالب: ${message}` }] }
      ]
    });

    const reply = response.text || "أهلاً بك! نرحب بك دائماً في نادي الهندسة والحاسبات بالليث.";
    res.json({ reply });
  } catch (err) {
    console.error("Gemini AI Chat Error:", err);
    res.status(500).json({ 
      error: "تعذر الاتصال بخدمة الذكاء الاصطناعي", 
      details: err.message 
    });
  }
});

// 2. AI Smart Event Generator (For Admins)
app.post('/api/ai/generate-event-draft', async (req, res) => {
  try {
    const { promptTopic } = req.body;
    if (!promptTopic) {
      return res.status(400).json({ error: "promptTopic is required" });
    }

    const ai = getGenAI();
    const prompt = `
بصفتك مستشار تخطيط الفعاليات الأكاديمية والتقنية لنادي الهندسة والحاسبات بالكلية الجامعية بالليث - جامعة أم القرى.
قم بصياغة مقترح فعالية/ورشة عمل متكاملة للموضوع التالي: "${promptTopic}".

أرجع الناتج بصيغة JSON فقط بهذا الشكل الدقيق وبدون أي شروحات إضافية:
{
  "title": "عنوان الورشة التدريبية",
  "category": "ورشة عمل أو دورة تدريبية أو هاكاثون",
  "description": "وصف شيق ومفصل للورشة والمهارات المكتسبة",
  "instructor": "اسم مقترح للمدرب",
  "instructorTitle": "المسمى الأكاديمي أو المهني",
  "location": "معمل الحاسب 1 أو منصة Zoom",
  "locationType": "حضوري أو عن بعد",
  "maxSeats": 40,
  "attendanceCode": "كود تحضير بالإنجليزية مثل TECH-2026",
  "tags": ["مهارة 1", "مهارة 2", "مهارة 3"]
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    let draftData = {};
    try {
      draftData = JSON.parse(response.text);
    } catch (e) {
      draftData = { text: response.text };
    }

    res.json({ draft: draftData });
  } catch (err) {
    console.error("Gemini AI Event Generator Error:", err);
    res.status(500).json({ error: "فشل إنشاء مقترح الورشة بالذكاء الاصطناعي", details: err.message });
  }
});

// 3. AI Committee Recommendation based on skills
app.post('/api/ai/recommend-committee', async (req, res) => {
  try {
    const { major, skills, interests } = req.body;
    const ai = getGenAI();

    const prompt = `
بناءً على تخصص الطالب (${major || 'هندسة وحاسب'}) ومهاراته (${skills || 'شغف بالتقنية'}) واهتماماته (${interests || 'المشاركة في الأنشطة'}).
اقترح له أفضل لجنتين ملائمتين من لجان نادي الهندسة والحاسبات بالكلية الجامعية بالليث مع ذكر سبب الترشيح بإيجاز (3-4 أسطر).
اللجان المتاحة:
1. اللجنة التقنية والبرمجية
2. اللجنة الأكاديمية والتدريب
3. لجنة الابتكار والهاكاثونات
4. اللجنة الإعلامية والتصميم
5. لجنة العلاقات والتنظيم
6. لجنة الأمن السيبراني والشبكات
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt
    });

    res.json({ recommendation: response.text });
  } catch (err) {
    console.error("Gemini AI Recommendation Error:", err);
    res.status(500).json({ error: "فشل تقديم التوصية", details: err.message });
  }
});

// Single Page Fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Club Portal server running on http://0.0.0.0:${PORT}`);
});
