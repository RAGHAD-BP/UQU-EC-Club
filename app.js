// =====================================================================
// نادي الهندسة والحاسبات بالليث - جامعة أم القرى
// موقع عرض فقط (Showcase) - لا يوجد تسجيل، لا لوحة تحكم، لا اتصال بأي سيرفر.
// كل البيانات ثابتة هنا وتقدر تعدلها مباشرة.
// =====================================================================

// ---------------------------------------------------------------------
// 1) رابط نموذج الانضمام (Google Form)
//    غيّر الرابط بالأسفل لرابط الفورم اللي بتسويه، وبس. ما تحتاج تعدل أي شي ثاني.
// ---------------------------------------------------------------------
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf2FAA8qp5VYMW8QSPlwmbMPQkGVet53NufZCUtHt_PN-PUdA/viewform?usp=header";

// ---------------------------------------------------------------------
// 2) بيانات الفعاليات - عدّل / أضف / احذف من هذه القائمة براحتك
// ---------------------------------------------------------------------
const EVENTS = [
  {
    title: "مخيم تطوير تطبيقات الويب الحديثة باستخدام React و Node.js",
    description: "ورشة عمل تدريبية مكثفة تستعرض بناء التطبيقات السحابية الكاملة، من تصميم واجهات المستخدم إلى ربط قواعد البيانات ورفع المشاريع على السيرفرات.",
    category: "ورشة عمل",
    date: "2026-09-05",
    time: "10:00 ص - 01:00 م",
    location: "الكلية الجامعية بالليث - معمل الحاسب 2",
    locationType: "حضوري",
    instructor: "م. عبد الرحمن الزهراني",
    instructorTitle: "مهندس برمجيات ومستشار تقني",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "مقدمة عملية في تعلم الآلة والذكاء الاصطناعي التوليدي",
    description: "جلسة تطبيقية للتعرف على أحدث نماذج الذكاء الاصطناعي وكيفية توظيفها في حل المشكلات الهندسية وبناء أنظمة ذكية في سوق العمل السعودي.",
    category: "دورة تدريبية",
    date: "2026-09-12",
    time: "07:00 م - 09:30 م",
    location: "عن بعد عبر منصة Zoom",
    locationType: "عن بعد",
    instructor: "د. هتان القرشي",
    instructorTitle: "أستاذ الذكاء الاصطناعي المساعد - جامعة أم القرى",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "هاكاثون الليث للابتكار والحلول الذكية 2026",
    description: "تحدٍّ برمجي وهندسي على مدار 48 ساعة للتنافس على ابتكار حلول تقنية تخدم محافظة الليث وتطلعات رؤية السعودية 2030 بجوائز نقدية قيمة.",
    category: "هاكاثون",
    date: "2026-09-20",
    time: "09:00 ص - 08:00 م",
    location: "مسرح الكلية الجامعية بالليث",
    locationType: "حضوري",
    instructor: "لجنة التحكيم برعاية عمادة الكلية",
    instructorTitle: "نخبة من الأكاديميين وقادة الصناعة التقنية",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "أساسيات الأمن السيبراني واختبار الاختراق الأخلاقي",
    description: "محاضرة تطبيقية تسلط الضوء على الدفاع السيبراني وحماية البنى التحتية وفهم ثغرات الويب الشائعة وكيفية تفاديها.",
    category: "محاضرة تقنية",
    date: "2026-09-28",
    time: "11:00 ص - 01:00 م",
    location: "القاعة الكبرى - مبنى الهندسة",
    locationType: "حضوري",
    instructor: "أ. ماجد الحربي",
    instructorTitle: "أخصائي أمن سيبراني معتمد (OSCP, CISSP)",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
  },
];

// ---------------------------------------------------------------------
// 3) بيانات الأخبار
// ---------------------------------------------------------------------
const NEWS = [
  {
    title: "نادي الهندسة والحاسبات بالليث يطلق خطته التشغيلية للفصل الجديد",
    summary: "حزمة نوعية من الورش التقنية والزيارات الميدانية والمسابقات البرمجية لهذا الفصل الدراسي.",
    content: "في إطار دعم المهارات العملية لطلبة الكلية الجامعية بالليث، دشنت إدارة النادي روزنامة الأنشطة التقنية والهندسية لهذا الفصل، متضمنة أكثر من 12 ورشة تدريبية في الذكاء الاصطناعي وتطوير الويب والأمن السيبراني، بالإضافة إلى هاكاثون الليث البرمجي، بهدف تأهيل الطلاب لسوق العمل وتمكينهم من تمثيل الجامعة في المحافل الوطنية.",
    category: "إعلان رسمي",
    date: "2026-08-20",
    author: "اللجنة الإعلامية بالنادي",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "فريق النادي يحقق المركز الثالث في هاكاثون الابتكار الجامعي",
    summary: "فوز مستحق لطلبة هندسة وحاسبات الليث بمشروعهم المبتكر في أنظمة الري الذكية.",
    content: "حقق فريق نادي الهندسة والحاسبات بالليث المركز الثالث على مستوى كليات جامعة أم القرى بعد منافسة قوية بين 40 فريقاً، حيث قدم الفريق نظاماً متكاملاً يعتمد على إنترنت الأشياء (IoT) والذكاء الاصطناعي لمراقبة المياه وجودة التربة بالليث.",
    category: "إنجازات",
    date: "2026-08-14",
    author: "لجنة الابتكار والمشاريع",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "تغطية مميزة لورشة الحوسبة السحابية وخدمات الويب",
    summary: "حضور تجاوز 90 طالباً وطالبة مع تفاعل كبير في التطبيقات العملية لبناء ونشر الخوادم.",
    content: "اختتمت اللجنة التقنية بالنادي فعاليات ورشة الحوسبة السحابية والتي تناولت المفاهيم الأساسية لخدمات AWS وGoogle Cloud وكيفية إدارة الحاويات ونشر النظم بدون خوادم.",
    category: "تغطية فعالية",
    date: "2026-08-05",
    author: "اللجنة الأكاديمية",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
  },
];

// ---------------------------------------------------------------------
// 4) بيانات اللجان
// ---------------------------------------------------------------------
const COMMITTEES = [
  { name: "لجنة الابتكار والهاكاثونات", icon: "lightbulb", desc: "تنظيم المسابقات البرمجية والمشاركة في الهاكاثونات." },
  { name: "اللجنة الإعلامية والتصميم", icon: "palette", desc: "إدارة الهوية البصرية للنادي ومحتواه الإعلامي." },
  { name: "لجنة العلاقات والتنظيم", icon: "handshake", desc: "تنسيق الفعاليات والتواصل مع الجهات الداعمة." },
];

// =====================================================================
// عرض البيانات (Rendering)
// =====================================================================

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('ar-SA-u-nu-latn', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch (e) {
    return iso;
  }
}

function renderEvents() {
  const grid = document.getElementById('events-grid');
  grid.innerHTML = EVENTS.map((ev, i) => `
    <article class="fade-up card-hover bg-white rounded-2xl border border-brand-teal/10 overflow-hidden shadow-sm cursor-pointer" data-type="event" data-index="${i}">
      <div class="relative h-44">
        <img src="${ev.image}" alt="${ev.title}" class="w-full h-full object-cover" loading="lazy" />
        <span class="absolute top-3 right-3 text-[11px] font-bold bg-white/95 text-brand-darkTeal px-3 py-1 rounded-full">${ev.category}</span>
      </div>
      <div class="p-5">
        <h3 class="font-extrabold text-brand-ink text-base leading-snug mb-3 line-clamp-2">${ev.title}</h3>
        <div class="flex items-center gap-2 text-xs text-brand-ink/60 mb-1.5">
          <i data-lucide="calendar" class="w-3.5 h-3.5"></i>
          <span>${formatDate(ev.date)}</span>
        </div>
        <div class="flex items-center gap-2 text-xs text-brand-ink/60">
          <i data-lucide="map-pin" class="w-3.5 h-3.5"></i>
          <span>${ev.location}</span>
        </div>
      </div>
    </article>
  `).join('');
  attachModalHandlers();
  window.lucide?.createIcons();
  observeFadeUp();
}

function renderNews() {
  const grid = document.getElementById('news-grid');
  grid.innerHTML = NEWS.map((n, i) => `
    <article class="fade-up card-hover bg-white rounded-2xl border border-brand-teal/10 overflow-hidden shadow-sm cursor-pointer" data-type="news" data-index="${i}">
      <div class="relative h-40">
        <img src="${n.image}" alt="${n.title}" class="w-full h-full object-cover" loading="lazy" />
        <span class="absolute top-3 right-3 text-[11px] font-bold bg-white/95 text-brand-darkTeal px-3 py-1 rounded-full">${n.category}</span>
      </div>
      <div class="p-5">
        <h3 class="font-extrabold text-brand-ink text-sm leading-snug mb-2 line-clamp-2">${n.title}</h3>
        <p class="text-xs text-brand-ink/60 leading-relaxed line-clamp-2 mb-3">${n.summary}</p>
        <p class="text-[11px] text-brand-teal font-semibold">${formatDate(n.date)}</p>
      </div>
    </article>
  `).join('');
  attachModalHandlers();
  window.lucide?.createIcons();
  observeFadeUp();
}

function renderCommittees() {
  const grid = document.getElementById('committees-grid');
  grid.innerHTML = COMMITTEES.map(c => `
    <div class="fade-up bg-white rounded-2xl p-6 border border-brand-teal/10 flex items-start gap-4">
      <div class="w-11 h-11 rounded-xl bg-brand-teal/10 flex items-center justify-center shrink-0">
        <i data-lucide="${c.icon}" class="w-5 h-5 text-brand-teal"></i>
      </div>
      <div>
        <p class="font-extrabold text-brand-ink text-sm mb-1">${c.name}</p>
        <p class="text-xs text-brand-ink/60 leading-relaxed">${c.desc}</p>
      </div>
    </div>
  `).join('');
  window.lucide?.createIcons();
  observeFadeUp();
}

// =====================================================================
// المودال (نافذة التفاصيل - عرض فقط، بدون أي نموذج تسجيل)
// =====================================================================
function attachModalHandlers() {
  document.querySelectorAll('[data-type]').forEach(card => {
    card.addEventListener('click', () => {
      const type = card.dataset.type;
      const index = Number(card.dataset.index);
      openModal(type === 'event' ? EVENTS[index] : NEWS[index], type);
    });
  });
}

function openModal(item, type) {
  const modal = document.getElementById('detail-modal');
  document.getElementById('modal-image').src = item.image;
  document.getElementById('modal-image').alt = item.title;
  document.getElementById('modal-badge').textContent = item.category;
  document.getElementById('modal-title').textContent = item.title;
  document.getElementById('modal-body').textContent = type === 'event' ? item.description : (item.content || item.summary);

  const meta = document.getElementById('modal-meta');
  if (type === 'event') {
    meta.innerHTML = `
      <div class="flex items-center gap-2"><i data-lucide="calendar" class="w-4 h-4 text-brand-teal"></i> ${formatDate(item.date)} · ${item.time}</div>
      <div class="flex items-center gap-2"><i data-lucide="map-pin" class="w-4 h-4 text-brand-teal"></i> ${item.location}</div>
      <div class="flex items-center gap-2"><i data-lucide="user" class="w-4 h-4 text-brand-teal"></i> ${item.instructor} - ${item.instructorTitle}</div>
    `;
  } else {
    meta.innerHTML = `
      <div class="flex items-center gap-2"><i data-lucide="calendar" class="w-4 h-4 text-brand-teal"></i> ${formatDate(item.date)}</div>
      <div class="flex items-center gap-2"><i data-lucide="user" class="w-4 h-4 text-brand-teal"></i> ${item.author}</div>
    `;
  }
  window.lucide?.createIcons();
  modal.showModal();
}

document.getElementById('modal-close').addEventListener('click', () => {
  document.getElementById('detail-modal').close();
});
document.getElementById('detail-modal').addEventListener('click', (e) => {
  if (e.target.id === 'detail-modal') e.target.close();
});

// =====================================================================
// أشياء عامة: القائمة على الجوال، رابط نموذج الانضمام، سنة الفوتر، سكرول التلاشي
// =====================================================================
document.getElementById('menu-btn').addEventListener('click', () => {
  document.getElementById('mobile-menu').classList.toggle('hidden');
});
document.querySelectorAll('#mobile-menu a').forEach(a => {
  a.addEventListener('click', () => document.getElementById('mobile-menu').classList.add('hidden'));
});

document.getElementById('join-form-link').href = GOOGLE_FORM_URL;
document.getElementById('year').textContent = new Date().getFullYear();

function observeFadeUp() {
  const items = document.querySelectorAll('.fade-up:not(.in-view)');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  items.forEach(item => io.observe(item));
}

// =====================================================================
// تشغيل الموقع
// =====================================================================
document.addEventListener('DOMContentLoaded', () => {
  renderEvents();
  renderNews();
  renderCommittees();
  window.lucide?.createIcons();
  observeFadeUp();
});
