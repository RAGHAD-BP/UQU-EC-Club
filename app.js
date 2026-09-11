// Club Portal - Pure Vanilla JavaScript Engine
// نادي الهندسة والحاسبات بالليث - جامعة أم القرى

const state = {
  activeTab: 'home',
  events: [],
  news: [],
  stats: {
    totalMembers: 6,
    workshopsCount: 4,
    totalAttendees: 20,
    projectsCount: 1
  },
  selectedCategory: 'all'
};

const committeesData = [
 {
  id: 'EVENT',
  name: 'لجنة الفعاليات',
  head: ' الرئيسة : رغد السويحي  نائبة الرئيسة : أرياف السيد',
  membersCount: 2,
  description: 'تنظيم وإدارة الفعاليات داخل الكلية، ابتكار أنشطة طلابية نوعية، الإشراف على تجهيز المعارض، وضمان تنفيذ الفعاليات وفق أعلى معايير التنظيم.',
  achievements: ['جارٍ العمل على أولى مبادرات اللجنة، وسيتم نشر الإنجازات قريباً']
},
{
  id: 'relations',
  name: 'لجنة العلاقات العامة',
  head: ' الرئيس : محمد حميده   نائب الرئيس : دخيل الله الزويهري',
  membersCount: 2,
  description: 'تعزيز التواصل الداخلي والخارجي للنادي، بناء شراكات مع الجهات الأكاديمية والتقنية، إدارة استقبال الضيوف، وتنسيق حضور الأعضاء في الفعاليات.',
  achievements: ['جارٍ العمل على أولى مبادرات اللجنة، وسيتم نشر الإنجازات قريباً']
},
{
  id: 'media',
  name: 'اللجنة الإعلامية',
  head: ' الرئيسة : اجوان الكناني  نائبة الرئيسة : دارين المنديلي',
  membersCount: 2,
  description: 'إنتاج المحتوى الإعلامي للنادي، تغطية الفعاليات، إدارة منصات التواصل الاجتماعي، وتصميم المواد البصرية والهوية الإعلامية.',
  achievements: ['جارٍ العمل على أولى مبادرات اللجنة، وسيتم نشر الإنجازات قريباً']
}
];

const fallbackEvents = [
  {
    id: "ev-1",
    title: "ورشة أساسيات البرمجة (Java – Python)",
    description: "ورشة تدريبية تهدف إلى تعريف الطلاب بأساسيات البرمجة باستخدام لغتي Java وPython، مع تطبيقات عملية تساعدهم على بناء مهاراتهم التقنية.",
    category: "ورشة عمل",
    date: "2026-10-01",
    time: "10:00 ص - 12:00 م",
    location: "عن بعد عبر منصة Webex",
    locationType: "عن بعد",
    instructor: "طالب من كلية الحاسبات",
    instructorTitle: "مدرب تقني",
    maxSeats: 40,
    currentRegistrationsCount: 0,
    isRegistrationOpen: false,
    msFormsUrl: "https://forms.office.com/r/CEClubEvents",
    image: "https://images.unsplash.com/photo-1581091012184-5c1d7b3c1f5b?auto=format&fit=crop&w=800&q=80",
    tags: ["Java", "Python", "برمجة", "تقنية"],
    targetAudience: "طلاب وطالبات هندسة وحاسبات الليث"
  },
  {
    id: "ev-2",
    title: "ورشة تصميم واجهات المستخدم (UI/UX)",
    description: "جلسة تدريبية تركز على مبادئ تصميم تجربة المستخدم وواجهات التطبيقات، مع تطبيقات عملية على أدوات التصميم الحديثة.",
    category: "ورشة عمل",
    date: "2026-10-05",
    time: "04:00 م - 06:00 م",
    location: "عن بعد عبر منصة Webex",
    locationType: "عن بعد",
    instructor: "طالب من كلية الحاسبات",
    instructorTitle: "مصمم واجهات وتجربة مستخدم",
    maxSeats: 35,
    currentRegistrationsCount: 0,
    isRegistrationOpen: false,
    msFormsUrl: "https://forms.office.com/r/CEClubEvents",
    image: "https://images.unsplash.com/photo-1559027615-8d0396c6f3c6?auto=format&fit=crop&w=800&q=80",
    tags: ["UI", "UX", "تصميم", "واجهات"],
    targetAudience: "المهتمون بتصميم التطبيقات والمواقع"
  },
  {
    id: "ev-3",
    title: "ورشة الأمن السيبراني",
    description: "ورشة تعريفية بأساسيات الأمن السيبراني، تهدف إلى رفع الوعي الأمني وفهم أهم التهديدات وكيفية التعامل معها.",
    category: "ورشة عمل",
    date: "2026-10-10",
    time: "11:00 ص - 01:00 م",
    location: "عن بعد عبر منصة Webex",
    locationType: "عن بعد",
    instructor: "طالب من كلية الحاسبات",
    instructorTitle: "أخصائي أمن سيبراني مبتدئ",
    maxSeats: 60,
    currentRegistrationsCount: 0,
    isRegistrationOpen: false,
    msFormsUrl: "https://forms.office.com/r/CEClubEvents",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    tags: ["CyberSecurity", "أمن سيبراني", "حماية"],
    targetAudience: "طلاب وطالبات التقنية والمهتمون بالأمن السيبراني"
  },
  {
    id: "ev-4",
    title: "استضافة متحدث مختص",
    description: "جلسة حوارية مع متحدث مختص في المجال التقني لمناقشة أحدث التوجهات والمهارات المطلوبة في سوق العمل.",
    category: "لقاء تقني",
    date: "2026-10-15",
    time: "07:00 م - 08:30 م",
    location: "عن بعد عبر منصة Zoom",
    locationType: "عن بعد",
    instructor: "متحدث متخصص",
    instructorTitle: "خبير تقني",
    maxSeats: 200,
    currentRegistrationsCount: 0,
    isRegistrationOpen: false,
    msFormsUrl: "https://forms.office.com/r/CEClubEvents",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    tags: ["تقنية", "تطوير", "سوق العمل"],
    targetAudience: "جميع المهتمين بالتقنية"
  }
];

const fallbackNews = [
  {
    id: "news-1",
    title: "نادي الهندسة والحاسبات بالليث يطلق خطته التشغيلية والبرامج للفصل الدراسي الجديد",
    summary: "أعلن نادي الهندسة والحاسبات بالكلية الجامعية بالليث بجامعة أم القرى عن حزمة نوعية من الورش التقنية والزيارات الميدانية والمسابقات البرمجية.",
    content: "أقام نادي الهندسة والحاسبات بالليث اللقاء التعريفي الأول لطالبات قسم الحاسبات، والذي هدف إلى تقديم نظرة شاملة حول أهداف النادي وبرامجه ولجانه التطوعية. تضمن اللقاء عرضاً تفصيلياً لخطة النادي التشغيلية للفصل الدراسي، إضافة إلى شرح آلية الانضمام والمشاركة في المبادرات التقنية القادمة. شهد اللقاء حضوراً مميزاً وتفاعلاً كبيراً من الطالبات، مما يعكس اهتمامهن بالمجال التقني ورغبتهن في تطوير مهاراتهن والمشاركة في الأنشطة الطلابية.",
    category: "إعلان رسمي",
    date: "2026-08-20",
    author: "لجنة الفعاليات والإعلام",  
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    featured: true,
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
