// Club Portal - Pure Vanilla JavaScript Engine
// نادي الهندسة والحاسبات بالليث - جامعة أم القرى

const state = {
  activeTab: 'home',
  events: [],
  news: [],
  stats: {
    totalMembers: 320,
    workshopsCount: 4,
    totalAttendees: 280,
    projectsCount: 18
  },
  selectedCategory: 'all'
};

const committeesData = [
  {
    id: 'tech',
    name: 'اللجنة التقنية والبرمجية',
    head: 'م. عبد العزيز المالكي',
    membersCount: 18,
    description: 'تطوير المنصات البرمجية، تنظيم معسكرات تطوير الويب، الحوسبة السحابية، وورش البرمجة بلغات Python و JavaScript.',
    achievements: ['بناء بوابة النادي الرقمية', 'تنظيم معسكر FullStack لـ 90 طالباً', 'إطلاق مجتمع الليث للبرمجة']
  },
  {
    id: 'academic',
    name: 'اللجنة الأكاديمية والتدريب',
    head: 'م. ريان الثقفي',
    membersCount: 14,
    description: 'تنسيق الخطط التدريبية الأسبوعية، استقطاب المدربين المعتمدين، ومتابعة المحتوى العلمي لجميع الورش.',
    achievements: ['إعداد روزنامة 12 ورشة تخصصية', 'مراجعة المناهج التدريبية', 'تنسيق ساعات الاعتماد الأكاديمي']
  },
  {
    id: 'hackathons',
    name: 'لجنة الابتكار والهاكاثونات',
    head: 'م. فيصل الزهراني',
    membersCount: 12,
    description: 'تدريب الفرق الطلابية وتأهيلها للمشاركة في الهاكاثونات المحلية والوطنية وحاضنات الأعمال.',
    achievements: ['المركز الثالث في هاكاثون الابتكار الجامعي', 'تأهيل 6 مشاريع تخرج للنمذجة', 'تنظيم هاكاثون الليث 2026']
  },
  {
    id: 'media',
    name: 'اللجنة الإعلامية والتصميم',
    head: 'أ. سارة الحربي',
    membersCount: 16,
    description: 'صناعة الهوية البصرية، التغطيات المصورة، المونتاج، وإدارة حسابات النادي عبر شبكات التواصل الاجتماعي.',
    achievements: ['تغطية وتوثيق كافة الفعاليات', 'تصميم أكثر من 40 بوستر رسمي', 'إصدار التقرير الفصلي للنادي']
  },
  {
    id: 'relations',
    name: 'لجنة العلاقات والتنظيم',
    head: 'م. عاصم العتيبي',
    membersCount: 20,
    description: 'إدارة الفعاليات الميدانية بالكلية، تجهيز القاعات ومعامل الحاسب، استقبال الضيوف وإدارة شؤون الأعضاء.',
    achievements: ['تنظيم الحفل السنوي للنادي', 'إدارة تسجيل الحضور لأكثر من 500 طالب', 'شراكات مع القطاع التقني']
  },
  {
    id: 'cyber',
    name: 'لجنة الأمن السيبراني والشبكات',
    head: 'م. طارق الهذلي',
    membersCount: 11,
    description: 'ورش الدفاع السيبراني، مسابقات التقاط العلم (CTF)، وتأمين البنية التحتية والشبكات.',
    achievements: ['تنظيم مسابقة CTF داخلية بالكلية', 'محاضرات الوعي السيبراني لأكثر من 150 مستفيداً']
  }
];

// Fallback initial data in case server is starting up
const fallbackEvents = [
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
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    tags: ["أمن سيبراني", "CyberSecurity", "حماية البيانات"],
    targetAudience: "طلبة هندسة وعلوم الحاسب ونظم المعلومات"
  }
];

const fallbackNews = [
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
    readTime: "3 دقائق"
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
    readTime: "2 دقيقة"
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
    readTime: "3 دقائق"
  }
];

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

async function initApp() {
  await fetchAllData();
  renderAll();
  setupEventListeners();
}

// Fetch all available public data
async function fetchAllData() {
  try {
    const [eventsRes, newsRes, statsRes] = await Promise.allSettled([
      fetch('/api/events').then(r => r.json()),
      fetch('/api/news').then(r => r.json()),
      fetch('/api/stats').then(r => r.json())
    ]);

    if (eventsRes.status === 'fulfilled' && Array.isArray(eventsRes.value) && eventsRes.value.length > 0) {
      state.events = eventsRes.value;
    } else {
      state.events = fallbackEvents;
    }

    if (newsRes.status === 'fulfilled' && Array.isArray(newsRes.value) && newsRes.value.length > 0) {
      state.news = newsRes.value;
    } else {
      state.news = fallbackNews;
    }

    if (statsRes.status === 'fulfilled' && statsRes.value) {
      state.stats = statsRes.value;
    }
  } catch (err) {
    console.warn('Backend API connection warning, using default local data', err);
    state.events = fallbackEvents;
    state.news = fallbackNews;
  }
}

// Render Master
function renderAll() {
  renderStats();
  renderEvents();
  renderNews();
  renderCommittees();
  if (window.lucide) {
    lucide.createIcons();
  }
}

// Navigation Tab Switcher
function switchTab(tabId) {
  state.activeTab = tabId;
  
  // Hide all tabs
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  
  // Show target tab
  const target = document.getElementById(`tab-${tabId}`);
  if (target) target.classList.add('active');

  // Update Desktop Nav Button Styles
  document.querySelectorAll('.nav-btn').forEach(btn => {
    const isTarget = btn.getAttribute('data-tab') === tabId;
    if (isTarget) {
      btn.className = "nav-btn flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all bg-[#1BA7A5] text-white border-2 border-[#0E6160] shadow-teal-sm min-h-[44px]";
    } else {
      btn.className = "nav-btn flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all text-slate-800 hover:bg-[#E8F8F8] border-2 border-transparent min-h-[44px]";
    }
  });

  // Update Mobile Bottom Nav Items
  document.querySelectorAll('.mobile-nav-item').forEach(btn => {
    const itemTab = btn.getAttribute('data-mobile-tab');
    if (!itemTab) return;
    
    if (itemTab === tabId) {
      btn.classList.add('text-[#0E6160]', 'font-black');
      btn.classList.remove('text-slate-600', 'font-bold');
      const icon = btn.querySelector('i');
      if (icon) icon.classList.add('text-[#1BA7A5]');
    } else {
      btn.classList.remove('text-[#0E6160]', 'font-black');
      btn.classList.add('text-slate-600', 'font-bold');
      const icon = btn.querySelector('i');
      if (icon) icon.classList.remove('text-[#1BA7A5]');
    }
  });

  // Close mobile menu if open
  const menu = document.getElementById('mobile-menu');
  const backdrop = document.getElementById('mobile-menu-backdrop');
  if (menu && !menu.classList.contains('hidden')) {
    menu.classList.add('hidden');
  }
  if (backdrop && !backdrop.classList.contains('hidden')) {
    backdrop.classList.add('hidden');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (window.lucide) {
    lucide.createIcons();
  }
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const backdrop = document.getElementById('mobile-menu-backdrop');
  if (menu) menu.classList.toggle('hidden');
  if (backdrop) backdrop.classList.toggle('hidden');
  if (window.lucide) {
    lucide.createIcons();
  }
}

// 1. Render Stats
function renderStats() {
  const openEventsCount = state.events.filter(e => e.isRegistrationOpen).length;
  
  const m = document.getElementById('stat-members');
  const w = document.getElementById('stat-workshops');
  const a = document.getElementById('stat-attendees');
  const p = document.getElementById('stat-projects');
  const navBadge = document.getElementById('nav-events-badge');

  if (m) m.textContent = `${state.stats.totalMembers || 320}+`;
  if (w) w.textContent = `${state.events.length || 4}+`;
  if (a) a.textContent = `${(state.stats.totalAttendees || 280)}+`;
  if (p) p.textContent = `${state.stats.projectsCount || 18}+`;

  if (navBadge) {
    if (openEventsCount > 0) {
      navBadge.className = "bg-emerald-50 text-emerald-700 font-black text-[10px] px-1.5 py-0.5 rounded border border-emerald-300";
      navBadge.textContent = `${openEventsCount} متاح`;
    } else {
      navBadge.className = "bg-red-50 text-red-700 font-black text-[10px] px-1.5 py-0.5 rounded border border-red-200";
      navBadge.textContent = "مغلق حالياً";
    }
  }
}

// 2. Render Events Cards
function renderEvents() {
  const homeGrid = document.getElementById('home-events-grid');
  const fullGrid = document.getElementById('events-grid-full');

  let filtered = state.events;
  if (state.selectedCategory !== 'all') {
    filtered = filtered.filter(e => e.category === state.selectedCategory);
  }

  const searchInput = document.getElementById('events-search-input');
  if (searchInput && searchInput.value.trim()) {
    const q = searchInput.value.toLowerCase().trim();
    filtered = filtered.filter(e => 
      e.title.toLowerCase().includes(q) || 
      e.description.toLowerCase().includes(q) ||
      (e.instructor && e.instructor.toLowerCase().includes(q))
    );
  }

  const createEventCard = (event) => {
    const isOpen = !!event.isRegistrationOpen;
    const msFormsUrl = event.msFormsUrl || 'https://forms.office.com/r/CEClubEvents';

    return `
      <div class="bg-white rounded-2xl border-2 border-slate-200 hover:border-[#1BA7A5] shadow-sm hover:shadow-teal transition-all overflow-hidden flex flex-col justify-between group">
        <div>
          <div class="relative h-44 overflow-hidden bg-slate-100">
            <img src="${event.image}" alt="${event.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <div class="absolute top-3 right-3 bg-[#0E6160] text-white text-[11px] font-black px-2.5 py-1 rounded-md border border-[#1BA7A5] shadow-sm">
              ${event.category}
            </div>
            <div class="absolute top-3 left-3 ${event.locationType === 'حضوري' ? 'bg-[#FCF6EA] text-[#B88528] border-[#D9A441]' : 'bg-[#E8F8F8] text-[#0E6160] border-[#1BA7A5]'} border text-[11px] font-black px-2.5 py-1 rounded-md shadow-sm">
              ${event.locationType}
            </div>
            ${!isOpen ? `
              <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center">
                <span class="bg-red-600 text-white font-black text-xs px-3 py-1.5 rounded-xl border-2 border-white shadow-lg flex items-center gap-1.5">
                  <i data-lucide="lock" class="w-3.5 h-3.5"></i>
                  <span>التسجيل مغلق حالياً</span>
                </span>
              </div>
            ` : ''}
          </div>

          <div class="p-5 space-y-3">
            <h3 class="font-black text-sm text-[#0E6160] leading-snug line-clamp-2">${event.title}</h3>
            <p class="text-xs text-slate-600 font-semibold line-clamp-2">${event.description}</p>
            
            <div class="space-y-1.5 pt-2 border-t border-slate-100 text-xs font-semibold text-slate-700">
              <div class="flex items-center gap-2">
                <i data-lucide="user" class="w-3.5 h-3.5 text-[#1BA7A5]"></i>
                <span>${event.instructor || 'أعضاء النادي'}</span>
              </div>
              <div class="flex items-center gap-2">
                <i data-lucide="calendar" class="w-3.5 h-3.5 text-[#D9A441]"></i>
                <span class="font-mono">${event.date} | ${event.time}</span>
              </div>
              <div class="flex items-center gap-2">
                <i data-lucide="map-pin" class="w-3.5 h-3.5 text-[#1BA7A5]"></i>
                <span class="truncate">${event.location}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
          ${isOpen ? `
            <a 
              href="${msFormsUrl}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="flex-1 bg-[#1BA7A5] hover:bg-[#0E6160] text-white font-black text-xs py-2.5 rounded-xl border border-[#0E6160] shadow-teal-sm transition-all flex items-center justify-center gap-1.5"
            >
              <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
              <span>التسجيل (Microsoft Forms)</span>
            </a>
          ` : `
            <div class="flex-1 bg-slate-100 border border-slate-200 text-slate-500 font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 cursor-not-allowed select-none">
              <i data-lucide="lock" class="w-3.5 h-3.5 text-slate-400"></i>
              <span>التسجيل مغلق حالياً</span>
            </div>
          `}
          <button 
            onclick="openEventDetailsModal('${event.id}')" 
            class="px-3 py-2.5 bg-[#FCF6EA] hover:bg-[#D9A441] text-[#0E6160] hover:text-white font-black text-xs rounded-xl border border-[#D9A441] shadow-gold-sm transition-all" 
            title="عرض التفاصيل"
          >
            <i data-lucide="info" class="w-4 h-4"></i>
          </button>
        </div>
      </div>
    `;
  };

  if (homeGrid) {
    homeGrid.innerHTML = state.events.slice(0, 3).map(createEventCard).join('');
  }

  if (fullGrid) {
    if (filtered.length === 0) {
      fullGrid.innerHTML = `
        <div class="col-span-full py-12 text-center text-slate-500 font-bold">
          لا توجد فعاليات مطابقة للتصنيف أو البحث حالياً.
        </div>
      `;
    } else {
      fullGrid.innerHTML = filtered.map(createEventCard).join('');
    }
  }

  if (window.lucide) {
    lucide.createIcons();
  }
}

function setEventCategory(cat) {
  state.selectedCategory = cat;
  document.querySelectorAll('#events-category-filters .cat-btn').forEach(btn => {
    if (btn.getAttribute('data-cat') === cat) {
      btn.className = "cat-btn px-3 py-1.5 rounded-lg text-xs font-black bg-[#1BA7A5] text-white border border-[#0E6160]";
    } else {
      btn.className = "cat-btn px-3 py-1.5 rounded-lg text-xs font-black bg-slate-100 text-slate-700 hover:bg-slate-200";
    }
  });
  renderEvents();
}

function filterEvents() {
  renderEvents();
}

// Event Details Modal Handlers
function openEventDetailsModal(eventId) {
  const event = state.events.find(e => e.id === eventId);
  if (!event) return;

  const modal = document.getElementById('event-details-modal');
  const container = document.getElementById('event-details-content');
  if (!modal || !container) return;

  const isOpen = !!event.isRegistrationOpen;
  const msFormsUrl = event.msFormsUrl || 'https://forms.office.com/r/CEClubEvents';

  container.innerHTML = `
    <div class="relative h-44 sm:h-52 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
      <img src="${event.image}" alt="${event.title}" class="w-full h-full object-cover" />
      <div class="absolute top-3 right-3 bg-[#0E6160] text-white text-xs font-black px-2.5 py-1 rounded-md border border-[#1BA7A5]">
        ${event.category}
      </div>
      <div class="absolute top-3 left-3 bg-white text-[#0E6160] text-xs font-black px-2.5 py-1 rounded-md border border-slate-200 shadow-sm">
        ${event.locationType}
      </div>
    </div>

    <div class="space-y-3">
      <div class="flex items-center justify-between gap-2">
        <h3 class="font-black text-base sm:text-lg text-[#0E6160] leading-snug">${event.title}</h3>
      </div>
      
      <p class="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">${event.description}</p>

      <div class="bg-[#F4FBFB] p-3.5 rounded-xl border border-[#1BA7A5]/30 space-y-2 text-xs font-semibold text-slate-700">
        <div class="flex items-center gap-2">
          <i data-lucide="user" class="w-4 h-4 text-[#1BA7A5]"></i>
          <span><strong>المحاضر / المدرب:</strong> ${event.instructor || 'أعضاء النادي'} (${event.instructorTitle || 'مقدم الورشة'})</span>
        </div>
        <div class="flex items-center gap-2">
          <i data-lucide="calendar" class="w-4 h-4 text-[#D9A441]"></i>
          <span><strong>التاريخ والوقت:</strong> ${event.date} | ${event.time}</span>
        </div>
        <div class="flex items-center gap-2">
          <i data-lucide="map-pin" class="w-4 h-4 text-[#1BA7A5]"></i>
          <span><strong>المكان:</strong> ${event.location}</span>
        </div>
        ${event.targetAudience ? `
          <div class="flex items-center gap-2">
            <i data-lucide="target" class="w-4 h-4 text-[#0E6160]"></i>
            <span><strong>الفئة المستهدفة:</strong> ${event.targetAudience}</span>
          </div>
        ` : ''}
      </div>

      <div class="pt-3 border-t border-slate-200 space-y-2">
        ${isOpen ? `
          <a 
            href="${msFormsUrl}" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="w-full bg-[#1BA7A5] hover:bg-[#0E6160] text-white font-black text-xs sm:text-sm py-3.5 rounded-xl border-2 border-[#0E6160] shadow-teal flex items-center justify-center gap-2 transition-all"
          >
            <span>التسجيل في الفعالية عبر Microsoft Forms</span>
            <i data-lucide="external-link" class="w-4 h-4"></i>
          </a>
        ` : `
          <div class="w-full bg-red-50 border-2 border-red-200 text-red-700 font-black text-xs sm:text-sm py-3 rounded-xl flex items-center justify-center gap-2 text-center select-none">
            <i data-lucide="lock" class="w-4 h-4 text-red-500"></i>
            <span>التسجيل في هذه الفعالية مغلق حالياً</span>
          </div>
          <p class="text-[11px] text-slate-500 text-center font-semibold">
            سيتم فتح باب التسجيل ونشر رابط فورم مايكروسوفت عند اقتراب موعد الورشة.
          </p>
        `}
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  if (window.lucide) {
    lucide.createIcons();
  }
}

function closeEventDetailsModal() {
  const modal = document.getElementById('event-details-modal');
  if (modal) modal.classList.add('hidden');
}

// 3. News & Articles Rendering
function renderNews() {
  const homeGrid = document.getElementById('home-news-grid');
  const fullGrid = document.getElementById('news-grid-full');

  const createNewsCard = (item) => `
    <div class="bg-white rounded-2xl border-2 border-slate-200 hover:border-[#1BA7A5] shadow-sm hover:shadow-teal-sm overflow-hidden flex flex-col justify-between transition-all">
      <div>
        <img src="${item.image}" alt="${item.title}" class="w-full h-40 object-cover" />
        <div class="p-5 space-y-2.5">
          <div class="flex items-center justify-between text-[11px] font-bold">
            <span class="bg-[#FCF6EA] text-[#B88528] px-2 py-0.5 rounded border border-[#D9A441] font-black">${item.category}</span>
            <span class="text-slate-500 font-mono">${item.date}</span>
          </div>
          <h3 class="font-black text-sm text-[#0E6160] leading-snug">${item.title}</h3>
          <p class="text-xs text-slate-600 font-semibold leading-relaxed line-clamp-3">${item.summary || item.content}</p>
        </div>
      </div>
      <div class="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs font-black text-[#1BA7A5]">
        <span>${item.author || 'إعلامي النادي'}</span>
        <span>⏱️ ${item.readTime || '3 دقائق'}</span>
      </div>
    </div>
  `;

  if (homeGrid) homeGrid.innerHTML = state.news.slice(0, 3).map(createNewsCard).join('');
  if (fullGrid) fullGrid.innerHTML = state.news.map(createNewsCard).join('');

  if (window.lucide) {
    lucide.createIcons();
  }
}

// 4. Committees Rendering
function renderCommittees() {
  const grid = document.getElementById('committees-grid');
  if (!grid) return;

  grid.innerHTML = committeesData.map(c => `
    <div class="bg-white rounded-2xl border-2 border-[#1BA7A5]/40 hover:border-[#1BA7A5] p-6 shadow-sm hover:shadow-teal-sm space-y-4 transition-all">
      <div class="flex items-center justify-between">
        <div class="w-12 h-12 rounded-xl bg-[#E8F8F8] border border-[#1BA7A5] flex items-center justify-center text-[#0E6160]">
          <i data-lucide="users" class="w-6 h-6"></i>
        </div>
        <span class="bg-[#FCF6EA] text-[#B88528] text-xs font-black px-2.5 py-1 rounded-md border border-[#D9A441]">
          ${c.membersCount} عضواً
        </span>
      </div>
      <div>
        <h3 class="font-black text-base text-[#0E6160]">${c.name}</h3>
        <p class="text-xs text-[#1BA7A5] font-black mt-0.5">رئيس اللجنة: ${c.head}</p>
      </div>
      <p class="text-xs text-slate-600 font-semibold leading-relaxed">${c.description}</p>
      
      <div class="space-y-1.5 pt-2 border-t border-slate-100">
        <h5 class="text-[11px] font-black text-[#0E6160]">أبرز إنجازات اللجنة:</h5>
        ${c.achievements.map(a => `
          <div class="flex items-center gap-1.5 text-xs text-slate-700 font-semibold">
            <span class="w-1.5 h-1.5 bg-[#D9A441] rounded-full"></span>
            <span>${a}</span>
          </div>
        `).join('')}
      </div>

      <div class="pt-2">
        <a 
          href="https://forms.office.com/r/CEClubJoin" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="w-full bg-[#FCF6EA] hover:bg-[#D9A441] text-[#0E6160] hover:text-white font-black text-xs py-2 px-3 rounded-xl border border-[#D9A441] transition-all flex items-center justify-center gap-1.5"
        >
          <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
          <span>التقديم للانضمام إلى ${c.name}</span>
        </a>
      </div>
    </div>
  `).join('');

  if (window.lucide) {
    lucide.createIcons();
  }
}

// 5. Setup General Listeners
function setupEventListeners() {
  // ESC to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeEventDetailsModal();
    }
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
