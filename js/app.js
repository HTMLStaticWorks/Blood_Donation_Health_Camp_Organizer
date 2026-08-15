// Hospital Outpatient Appointment Portal - MPA Engine & State Manager

// Core Application State
let state = {
  activePage: "index",
  theme: "light",
  language: "en",
  currentUser: null,
  dashboardSubView: "overview",
  appointments: [],
  prescriptions: [],
  labReports: [],
  searchDoctorQuery: "",
  filterDoctorDept: "all"
};

// Arabic Translation Dictionary
const TRANSLATIONS = {
  en: {
    navHome1: "Home 1",
    navHome2: "Home 2",
    navDepts: "Camps",
    navDocs: "Specialists",
    navAbout: "About Us",
    navContact: "Contact",
    navLogin: "Donor Login",
    navBook: "Register for Camp",
    navDashboard: "Dashboard",
    navSignup: "Sign Up",
    heroTitle1: "Saving Lives. Supporting Communities.",
    heroSub1: "Register for upcoming blood donation drives, check health camp schedules, view eligibility requirements, and sign up as a volunteer or donor.",
    heroTitle2: "Community Care & Life-Saving Action.",
    heroSub2: "Register for local blood donation drives, schedule free health checkups, and get details on upcoming camps.",
    btnBookNow: "Register for Camp",
    btnFindDoc: "Find Specialists",
    secDeptsTitle: "Camps",
    secDocsTitle: "Specialists",
    whyUsTitle: "Why Join Our Drives & Camps?",
    footerText: "Coordinating community-driven blood donation drives and free health screening camps to make healthcare accessible to all.",
    loginTitle: "Access Donor Portal",
    signupTitle: "Register Volunteer/Donor Account",
    emergencyCall: "Emergency Blood Request Hotline: +1 (800) 555-0199"
  },
  ar: {
    navHome1: "الرئيسية ١",
    navHome2: "الرئيسية ٢",
    navDepts: "الحملات",
    navDocs: "الأخصائيون",
    navAbout: "من نحن",
    navContact: "اتصل بنا",
    navLogin: "دخول المتبرع",
    navBook: "التسجيل في الحملة",
    navDashboard: "لوحة التحكم",
    navSignup: "تسجيل جديد",
    heroTitle1: "إنقاذ الأرواح. دعم المجتمعات.",
    heroSub1: "سجل في حملات التبرع بالدم القادمة، وتحقق من جداول المخيمات الصحية، واطلع على شروط الأهلية، وسجل كمتطوع أو متبرع.",
    heroTitle2: "الرعاية المجتمعية والعمل لإنقاذ الحياة.",
    heroSub2: "سجل في حملات التبرع بالدم المحلية، وحدد مواعيد الفحوصات الطبية المجانية، واحصل على تفاصيل المخيمات القادمة.",
    btnBookNow: "التسجيل في الحملة",
    btnFindDoc: "البحث عن الأخصائيين",
    secDeptsTitle: "الحملات",
    secDocsTitle: "الأخصائيون",
    whyUsTitle: "لماذا تشارك في حملاتنا؟",
    footerText: "تنسيق حملات التبرع بالدم والمخيمات الصحية المجانية لجعل الرعاية الصحية في متناول الجميع.",
    loginTitle: "الدخول لبوابة المتبرع",
    signupTitle: "تسجيل حساب متبرع/متطوع جديد",
    emergencyCall: "خط طوارئ طلب الدم: ٠١٩٩-٥٥٥ (٨٠٠) ١+"
  }
};

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  detectActivePage();
  initTheme();
  initLanguage();
  initSession();
  setupEventListeners();
  initBackToTopButton();
  
  // Page Specific Lifecycles
  runPageLifecycles();

  // Highlight active link in header
  highlightActiveNavLink();

  // Render any pending toasts carried across redirects
  checkPendingToasts();

  if (window.lucide) window.lucide.createIcons();
});

// Detect which HTML file is open
function detectActivePage() {
  const path = window.location.pathname;
  const filename = path.substring(path.lastIndexOf('/') + 1) || "index.html";
  state.activePage = filename.replace(".html", "");
  if (state.activePage === "") state.activePage = "index";
}

// Highlight current page nav link
function highlightActiveNavLink() {
  document.querySelectorAll(".nav-link").forEach(link => {
    const href = link.getAttribute("href");
    if (href && (href === `${state.activePage}.html` || (state.activePage === "index" && href === "index.html"))) {
      link.classList.add("text-primary", "font-semibold");
      link.classList.remove("text-darkSlate/80", "dark:text-white/80");
    } else {
      link.classList.remove("text-primary", "font-semibold");
      link.classList.add("text-darkSlate/80", "dark:text-white/80");
    }
  });
}

// Theme Management
function initTheme() {
  const savedTheme = localStorage.getItem("hospital-theme");
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    // Respect OS / browser dark-mode preference
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
  }

  // Listen for live OS theme changes so the site reacts immediately
  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      // Only auto-follow the OS when the user hasn't explicitly overridden
      if (!localStorage.getItem("hospital-theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    });
  }
}

function setTheme(theme) {
  state.theme = theme;
  localStorage.setItem("hospital-theme", theme);
  const htmlElement = document.documentElement;
  
  const themeIcon = document.getElementById("theme-toggle-icon");
  const mobileThemeIcon = document.getElementById("mobile-theme-icon");
  if (theme === "dark") {
    htmlElement.classList.add("dark");
    if (themeIcon) themeIcon.setAttribute("data-lucide", "sun");
    if (mobileThemeIcon) mobileThemeIcon.setAttribute("data-lucide", "sun");
  } else {
    htmlElement.classList.remove("dark");
    if (themeIcon) themeIcon.setAttribute("data-lucide", "moon");
    if (mobileThemeIcon) mobileThemeIcon.setAttribute("data-lucide", "moon");
  }
  if (window.lucide) window.lucide.createIcons();
}

function toggleTheme() {
  setTheme(state.theme === "light" ? "dark" : "light");
}

// Language/RTL Management
function initLanguage() {
  const savedDir = localStorage.getItem("hospital-dir") || "ltr";
  setDirection(savedDir);
}

function setDirection(dir) {
  state.direction = dir;
  localStorage.setItem("hospital-dir", dir);
  const htmlElement = document.documentElement;
  
  if (dir === "rtl") {
    htmlElement.setAttribute("dir", "rtl");
  } else {
    htmlElement.setAttribute("dir", "ltr");
  }
  
  const langBtn = document.getElementById("lang-toggle-btn");
  if (langBtn) {
    langBtn.setAttribute("title", dir === "rtl" ? "Switch to LTR" : "Switch to RTL");
  }
  
  // Keep English lang parameters to prevent translating text to Arabic
  state.language = "en";
  htmlElement.setAttribute("lang", "en");
  
  updateNavbarState();
  if (window.lucide) window.lucide.createIcons();
}

function toggleLanguage() {
  setDirection(state.direction === "ltr" ? "rtl" : "ltr");
}

function applyTranslations() {
  const dict = TRANSLATIONS[state.language];
  document.querySelectorAll("[data-translate]").forEach(elem => {
    const key = elem.getAttribute("data-translate");
    if (dict[key]) {
      if (elem.tagName === "INPUT" && (elem.type === "submit" || elem.type === "button")) {
        elem.value = dict[key];
      } else {
        elem.innerText = dict[key];
      }
    }
  });
}

// Session Management
function initSession() {
  const savedUser = localStorage.getItem("hospital-session");
  if (savedUser) {
    state.currentUser = JSON.parse(savedUser);
    syncPatientDataFromStorage();
  }
  
  // Auth Guard for Dashboard Page (redirect since dashboard is removed)
  if (state.activePage === "dashboard") {
    window.location.href = "index.html";
    return;
  }

  updateNavbarState();
}

function syncPatientDataFromStorage() {
  if (!state.currentUser) return;
  const mockUsers = JSON.parse(localStorage.getItem("hospital-users") || "[]");
  const userRecord = mockUsers.find(u => u.email === state.currentUser.email);
  if (userRecord) {
    state.currentUser = userRecord;
    state.appointments = userRecord.appointments || [];
    state.prescriptions = userRecord.prescriptions || [];
    state.labReports = userRecord.labReports || [];
  }
}

function updateNavbarState() {
  const loginBtn = document.getElementById("nav-login-btn");
  const mobileLoginBtn = document.getElementById("mobile-login-btn");
  const signupBtn = document.getElementById("nav-signup-btn");
  const mobileSignupBtn = document.getElementById("mobile-signup-btn");
  
  if (loginBtn) loginBtn.classList.add("hidden");
  if (mobileLoginBtn) mobileLoginBtn.classList.add("hidden");
  
  if (state.currentUser) {
    if (signupBtn) {
      signupBtn.innerText = state.language === "ar" ? "تسجيل الخروج" : "Log Out";
      signupBtn.href = "#";
      signupBtn.onclick = (e) => { e.preventDefault(); handleLogout(); };
    }
    if (mobileSignupBtn) {
      mobileSignupBtn.innerText = state.language === "ar" ? "تسجيل الخروج" : "Log Out";
      mobileSignupBtn.href = "#";
      mobileSignupBtn.onclick = (e) => { e.preventDefault(); handleLogout(); };
    }
  } else {
    if (signupBtn) {
      signupBtn.innerText = state.language === "ar" ? "تسجيل جديد" : "Sign Up";
      signupBtn.href = "signup.html";
      signupBtn.onclick = null;
    }
    if (mobileSignupBtn) {
      mobileSignupBtn.innerText = state.language === "ar" ? "تسجيل جديد" : "Sign Up";
      mobileSignupBtn.href = "signup.html";
      mobileSignupBtn.onclick = null;
    }
  }
}

// Run page-specific logic
function runPageLifecycles() {
  if (state.activePage === "index") {
    // Populate drop-down filter cascades
    populateDropdowns();
  } else if (state.activePage === "home2") {
    // Timings or search box hooks
  } else if (state.activePage === "departments") {
    renderDepartmentsList();
  } else if (state.activePage === "doctors") {
    // Read query filters
    const params = new URLSearchParams(window.location.search);
    state.filterDoctorDept = params.get("dept") || "all";
    renderDoctorsList();
    populateDropdowns();
  } else if (state.activePage === "contact") {
    populateDropdowns();
    const params = new URLSearchParams(window.location.search);
    const docId = params.get("doc");
    if (docId) {
      const doc = window.DOCTORS.find(d => d.id === docId);
      if (doc) {
        const deptSelect = document.getElementById("enquiry-dept");
        const docSelect = document.getElementById("enquiry-doctor");
        if (deptSelect && docSelect) {
          deptSelect.value = doc.deptId;
          const filteredDocs = window.DOCTORS.filter(d => d.deptId === doc.deptId);
          docSelect.innerHTML = `<option value="">Select Doctor</option>` +
            filteredDocs.map(d => `<option value="${d.id}">${d.name}</option>`).join("");
          docSelect.value = doc.id;
        }
      }
    }
  } else if (state.activePage === "dashboard") {
    // Read sub view parameters
    const params = new URLSearchParams(window.location.search);
    state.dashboardSubView = params.get("sub") || "overview";
    
    populateDropdowns();
    renderDashboard();
    
    // Bind dashboard sub navigation clicks
    document.querySelectorAll(".dash-nav-item").forEach(item => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const sub = item.getAttribute("data-sub");
        state.dashboardSubView = sub;
        
        // Update URL query state without full reload
        const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + `?sub=${sub}`;
        window.history.pushState({path:newurl}, '', newurl);
        
        // Auto-close sidebar on mobile
        const dashSidebar = document.getElementById("dashboard-sidebar");
        const dashOverlay = document.getElementById("sidebar-overlay");
        if (dashSidebar && !dashSidebar.classList.contains("-translate-x-full")) {
          dashSidebar.classList.add("-translate-x-full");
          if (dashOverlay) dashOverlay.classList.add("hidden");
        }

        renderDashboard();
      });
    });
  }
}

// Render Departments lists (departments.html)
function renderDepartmentsList() {
  const container = document.getElementById("depts-grid");
  if (!container) return;
  
  container.innerHTML = window.DEPARTMENTS.map(dept => {
    let iconName = dept.icon;
    if (iconName === "female") iconName = "users";
    
    return `
      <div class="bg-white dark:bg-cardWhite rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden premium-shadow premium-shadow-hover transition duration-300 flex flex-col justify-between">
        <div>
          <div class="relative h-56 bg-gray-50 dark:bg-gray-800 overflow-hidden">
            <img src="${dept.image}" alt="${dept.name}" class="w-full h-full object-cover transition duration-500 hover:scale-105">
            <div class="absolute top-4 left-4 w-10 h-10 bg-white/95 dark:bg-cardWhite/95 backdrop-blur rounded-lg flex items-center justify-center text-primary shadow">
              <i data-lucide="${iconName}" class="w-5 h-5"></i>
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-secondary dark:text-white mb-2">${dept.name}</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">${dept.desc}</p>
          </div>
        </div>
        <div class="px-6 pb-6 pt-4 border-t border-gray-50 dark:border-gray-800 flex flex-col gap-2">
          <div class="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
            <span>Volunteers Active:</span>
            <span class="font-semibold text-secondary dark:text-white">${dept.doctorsCount} Specialists</span>
          </div>
          <div class="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
            <span>Camp Timings:</span>
            <span class="font-semibold text-secondary dark:text-white text-right">${dept.timing}</span>
          </div>
          <a href="doctors.html?dept=${dept.id}" class="mt-2 text-primary font-semibold text-sm hover:underline flex items-center gap-1">
            <span>View Specialists</span>
            <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </a>
        </div>
      </div>
    `;
  }).join("");
}

function renderDoctorsList() {
  const container = document.getElementById("doctors-grid");
  if (!container) return;
  
  const cards = container.querySelectorAll(".doctor-card");
  if (cards.length === 0) return;

  const deptSelect = document.getElementById("doctor-dept-filter");
  if (deptSelect) deptSelect.value = state.filterDoctorDept;

  let visibleCount = 0;
  
  cards.forEach(card => {
    const name = card.getAttribute("data-name").toLowerCase();
    const dept = card.getAttribute("data-dept");
    const bioText = card.querySelector(".doctor-bio") ? card.querySelector(".doctor-bio").textContent.toLowerCase() : "";
    const qualText = card.querySelector(".doctor-qualification") ? card.querySelector(".doctor-qualification").textContent.toLowerCase() : "";
    
    const matchDept = (state.filterDoctorDept === "all" || dept === state.filterDoctorDept);
    let matchSearch = true;
    
    if (state.searchDoctorQuery) {
      const q = state.searchDoctorQuery.toLowerCase();
      matchSearch = name.includes(q) || bioText.includes(q) || qualText.includes(q) || dept.includes(q);
    }
    
    if (matchDept && matchSearch) {
      card.style.display = "";
      visibleCount++;
    } else {
      card.style.display = "none";
    }
  });

  // Handle "No results found" block
  let noDocsMsg = document.getElementById("no-doctors-msg");
  if (visibleCount === 0) {
    if (!noDocsMsg) {
      noDocsMsg = document.createElement("div");
      noDocsMsg.id = "no-doctors-msg";
      noDocsMsg.className = "col-span-full text-center py-12";
      noDocsMsg.innerHTML = `
        <i data-lucide="user-x" class="w-12 h-12 text-gray-400 mx-auto mb-4"></i>
        <h3 class="text-lg font-semibold text-gray-600 dark:text-gray-400">No specialists found matching the filter criteria.</h3>
      `;
      container.appendChild(noDocsMsg);
      if (window.lucide) window.lucide.createIcons();
    } else {
      noDocsMsg.style.display = "";
    }
  } else {
    if (noDocsMsg) noDocsMsg.style.display = "none";
  }
}

function viewDoctorProfile(docId) {
  const doc = window.DOCTORS.find(d => d.id === docId);
  if (!doc) return;
  
  const modal = document.getElementById("doctor-modal");
  const content = document.getElementById("doctor-modal-content");
  
  content.innerHTML = `
    <div class="flex flex-col md:flex-row gap-6">
      <div class="w-full md:w-1/3 bg-gray-50 rounded-xl overflow-hidden h-72 md:h-auto">
        <img src="${doc.image}" alt="${doc.name}" class="w-full h-full object-cover object-top">
      </div>
      <div class="w-full md:w-2/3 flex flex-col justify-between">
        <div>
          <div class="flex justify-between items-start">
            <div>
              <h2 class="text-2xl font-bold text-secondary dark:text-white">${doc.name}</h2>
              <span class="text-primary font-medium text-sm block mt-1">${doc.deptName} • ${doc.qualification}</span>
            </div>
            <span class="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 text-xs px-2.5 py-1 rounded-full font-medium">Available</span>
          </div>
          <p class="text-gray-600 dark:text-gray-400 text-sm mt-4 leading-relaxed">${doc.bio}</p>
          
          <div class="mt-6 grid grid-cols-2 gap-4 text-xs">
            <div class="p-3 bg-gray-50 dark:bg-gray-800/40 rounded-lg">
              <span class="text-gray-400 block mb-1">Registration</span>
              <strong class="text-sm text-secondary dark:text-white font-bold">${doc.fee}</strong>
            </div>
            <div class="p-3 bg-gray-50 dark:bg-gray-800/40 rounded-lg">
              <span class="text-gray-400 block mb-1">Experience</span>
              <strong class="text-sm text-secondary dark:text-white font-bold">${doc.experience}</strong>
            </div>
          </div>
          
          <div class="mt-4 text-xs text-gray-500 dark:text-gray-400 space-y-2">
            <div class="flex items-center gap-2">
              <i data-lucide="clock" class="w-4 h-4 text-primary"></i>
              <span>Camp Timings: <strong>${doc.timing}</strong></span>
            </div>
            <div class="flex items-center gap-2">
              <i data-lucide="calendar" class="w-4 h-4 text-primary"></i>
              <span>Available Days: <strong>${doc.availableDays.join(", ")}</strong></span>
            </div>
          </div>
        </div>
        
        <div class="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3">
          <button onclick="closeDoctorModal()" class="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 text-sm rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition">
            Close
          </button>
          <button onclick="closeDoctorModal(); bookDoctorApt('${doc.id}')" class="px-5 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primaryHover transition">
            Join Health Camp
          </button>
        </div>
      </div>
    </div>
  `;
  
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  if (window.lucide) window.lucide.createIcons();
}

function closeDoctorModal() {
  const modal = document.getElementById("doctor-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

function bookDoctorApt(docId) {
  if (!state.currentUser) {
    queuePendingToast("Please sign up or log in to register for upcoming health camps and blood drives.", "info");
    window.location.href = "signup.html";
    return;
  }
  
  window.location.href = `contact.html?doc=${docId}`;
}

// Populate cascade drop downs
function populateDropdowns() {
  const deptSelects = [
    document.getElementById("enquiry-dept"),
    document.getElementById("dash-booking-dept")
  ];
  
  const deptsHTML = `<option value="">Select Camp Program</option>` + 
    window.DEPARTMENTS.map(d => `<option value="${d.id}">${d.name}</option>`).join("");
    
  deptSelects.forEach(select => {
    if (select) {
      select.innerHTML = deptsHTML;
    }
  });

  const enquiryDeptSelect = document.getElementById("enquiry-dept");
  const enquiryDocSelect = document.getElementById("enquiry-doctor");
  
  if (enquiryDeptSelect && enquiryDocSelect) {
    enquiryDeptSelect.addEventListener("change", (e) => {
      const deptId = e.target.value;
      if (!deptId) {
        enquiryDocSelect.innerHTML = `<option value="">Select Specialist (Choose Program first)</option>`;
        return;
      }
      const filteredDocs = window.DOCTORS.filter(d => d.deptId === deptId);
      enquiryDocSelect.innerHTML = `<option value="">Select Specialist</option>` +
        filteredDocs.map(d => `<option value="${d.id}">${d.name}</option>`).join("");
    });
  }

  const dashDeptSelect = document.getElementById("dash-booking-dept");
  const dashDocSelect = document.getElementById("dash-booking-doctor");
  
  if (dashDeptSelect && dashDocSelect) {
    dashDeptSelect.addEventListener("change", (e) => {
      const deptId = e.target.value;
      if (!deptId) {
        dashDocSelect.innerHTML = `<option value="">Select Specialist (Choose Program first)</option>`;
        return;
      }
      const filteredDocs = window.DOCTORS.filter(d => d.deptId === deptId);
      dashDocSelect.innerHTML = `<option value="">Select Specialist</option>` +
        filteredDocs.map(d => `<option value="${d.id}">${d.name}</option>`).join("");
      
      const timeSelect = document.getElementById("dash-booking-time");
      if (timeSelect) timeSelect.innerHTML = `<option value="">Select Time Slot</option>`;
    });

    dashDocSelect.addEventListener("change", (e) => {
      const docId = e.target.value;
      const timeSelect = document.getElementById("dash-booking-time");
      if (!docId || !timeSelect) return;
      
      const doc = window.DOCTORS.find(d => d.id === docId);
      if (doc && doc.slots) {
        timeSelect.innerHTML = `<option value="">Select Time Slot</option>` +
          doc.slots.map(s => `<option value="${s}">${s}</option>`).join("");
      }
    });
  }
}

// Dashboard Page Renderer
function renderDashboard() {
  syncPatientDataFromStorage();
  
  // Highlight active sidebar item
  document.querySelectorAll(".dash-nav-item").forEach(item => {
    const sub = item.getAttribute("data-sub");
    if (sub === state.dashboardSubView) {
      item.classList.add("bg-primary/10", "text-primary", "font-semibold");
      item.classList.remove("text-gray-600", "dark:text-gray-400");
    } else {
      item.classList.remove("bg-primary/10", "text-primary", "font-semibold");
      item.classList.add("text-gray-600", "dark:text-gray-400");
    }
  });

  // Switch Sub-View Panels
  const subViews = ["overview", "book", "appointments", "prescriptions", "reports", "profile"];
  subViews.forEach(v => {
    const section = document.getElementById(`dash-view-${v}`);
    if (section) {
      if (v === state.dashboardSubView) {
        section.classList.remove("hidden");
      } else {
        section.classList.add("hidden");
      }
    }
  });

  // Load Subview Contents
  if (state.dashboardSubView === "overview") {
    renderDashboardOverview();
  } else if (state.dashboardSubView === "appointments") {
    renderDashboardAppointments();
  } else if (state.dashboardSubView === "prescriptions") {
    renderDashboardPrescriptions();
  } else if (state.dashboardSubView === "reports") {
    renderDashboardReports();
  } else if (state.dashboardSubView === "profile") {
    renderDashboardProfile();
  } else if (state.dashboardSubView === "book") {
    setupDashboardBookingPreselection();
  }
}

function renderDashboardOverview() {
  const user = state.currentUser;
  if (!user) return;

  const upcomingApt = state.appointments.find(a => a.status === "Upcoming");
  const upcomingPanel = document.getElementById("dash-overview-upcoming");
  
  if (upcomingPanel) {
    if (upcomingApt) {
      upcomingPanel.innerHTML = `
        <div class="flex items-start gap-4">
          <div class="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <i data-lucide="calendar" class="w-5 h-5"></i>
          </div>
          <div>
            <h4 class="font-bold text-secondary dark:text-white text-base">${upcomingApt.doctorName}</h4>
            <p class="text-xs text-primary font-medium">${upcomingApt.deptName} • OPD</p>
            <div class="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
              <span class="flex items-center gap-1"><i data-lucide="calendar" class="w-3.5 h-3.5"></i> ${upcomingApt.date}</span>
              <span class="flex items-center gap-1"><i data-lucide="clock" class="w-3.5 h-3.5"></i> ${upcomingApt.time}</span>
            </div>
            <span class="mt-3 inline-block bg-primary/15 text-primary text-2xs uppercase tracking-wider font-extrabold px-2 py-0.5 rounded">
              Confirmed
            </span>
          </div>
        </div>
      `;
    } else {
      upcomingPanel.innerHTML = `
        <div class="text-center py-6 text-gray-500 dark:text-gray-400 text-sm">
          <i data-lucide="calendar-x" class="w-8 h-8 mx-auto mb-2 text-gray-400"></i>
          <p>No upcoming appointments found.</p>
          <button onclick="window.location.href='contact.html';" class="text-primary font-semibold hover:underline mt-2 inline-block">Register for Camp Now</button>
        </div>
      `;
    }
  }

  const nextConsultationPanel = document.getElementById("dash-overview-next-consult");
  if (nextConsultationPanel) {
    if (upcomingApt) {
      nextConsultationPanel.innerHTML = `
        <div class="flex justify-between items-center">
          <div>
            <span class="text-2xs uppercase tracking-wider text-gray-400 block mb-1">Assigned Specialist</span>
            <strong class="text-secondary dark:text-white font-bold block">${upcomingApt.doctorName}</strong>
            <span class="text-xs text-gray-500">${upcomingApt.deptName} Department</span>
          </div>
          <div class="text-right">
            <span class="text-2xs uppercase tracking-wider text-gray-400 block mb-1">Appointment ID</span>
            <strong class="text-xs text-secondary dark:text-white font-mono">${upcomingApt.id}</strong>
          </div>
        </div>
      `;
    } else {
      nextConsultationPanel.innerHTML = `
        <div class="text-xs text-gray-400 text-center py-4">No scheduled consults</div>
      `;
    }
  }

  const recentRx = state.prescriptions[0];
  const rxPanel = document.getElementById("dash-overview-rx");
  if (rxPanel) {
    if (recentRx) {
      rxPanel.innerHTML = `
        <div class="flex items-start gap-4">
          <div class="w-10 h-10 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <i data-lucide="file-text" class="w-5 h-5"></i>
          </div>
          <div class="flex-1">
            <div class="flex justify-between">
              <h4 class="font-bold text-secondary dark:text-white text-sm">${recentRx.doctorName}</h4>
              <span class="text-xs text-gray-400">${recentRx.date}</span>
            </div>
            <p class="text-2xs text-gray-500 dark:text-gray-400 mt-1">${recentRx.medicines.map(m => m.name).join(", ")}</p>
            <div class="mt-3 flex gap-2">
              <button onclick="viewPrescriptionDetail('${recentRx.id}')" class="text-primary font-semibold text-xs hover:underline flex items-center gap-1">
                View Details
              </button>
            </div>
          </div>
        </div>
      `;
    } else {
      rxPanel.innerHTML = `<div class="text-center py-6 text-gray-400 text-xs">No prescriptions recorded.</div>`;
    }
  }

  const recentLab = state.labReports[0];
  const labPanel = document.getElementById("dash-overview-lab");
  if (labPanel) {
    if (recentLab) {
      labPanel.innerHTML = `
        <div class="flex items-start gap-4">
          <div class="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <i data-lucide="activity" class="w-5 h-5"></i>
          </div>
          <div class="flex-1">
            <div class="flex justify-between">
              <h4 class="font-bold text-secondary dark:text-white text-sm">${recentLab.testName}</h4>
              <span class="text-xs text-gray-400">${recentLab.testDate}</span>
            </div>
            <div class="flex justify-between items-center mt-2">
              <span class="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400 text-2xs uppercase tracking-wider font-extrabold px-2 py-0.5 rounded">
                ${recentLab.status}
              </span>
              <button onclick="viewLabReportDetail('${recentLab.id}')" class="text-primary font-semibold text-xs hover:underline">
                Open Report
              </button>
            </div>
          </div>
        </div>
      `;
    } else {
      labPanel.innerHTML = `<div class="text-center py-6 text-gray-400 text-xs">No lab reports available.</div>`;
    }
  }

  if (window.lucide) window.lucide.createIcons();
}

function renderDashboardAppointments() {
  const container = document.getElementById("dash-appointments-list");
  if (!container) return;

  if (state.appointments.length === 0) {
    container.innerHTML = `
      <tr>
        <td colspan="6" class="px-6 py-12 text-center text-gray-500">
          <i data-lucide="calendar" class="w-10 h-10 mx-auto mb-2 text-gray-400"></i>
          <p>You haven't scheduled any appointments yet.</p>
          <button onclick="state.dashboardSubView='book'; renderDashboard();" class="mt-2 text-primary font-bold hover:underline inline-block">Book Your First OPD Appointment</button>
        </td>
      </tr>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  container.innerHTML = state.appointments.map(apt => {
    const badgeColor = apt.status === "Upcoming" 
      ? "bg-primary/10 text-primary border-primary/20" 
      : "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700";

    return `
      <tr class="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/10 text-xs">
        <td class="px-6 py-4 whitespace-nowrap font-semibold text-secondary dark:text-white">${apt.doctorName}</td>
        <td class="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">${apt.deptName}</td>
        <td class="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">${apt.date}</td>
        <td class="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">${apt.time}</td>
        <td class="px-6 py-4 whitespace-nowrap">
          <span class="px-2.5 py-0.5 rounded-full text-2xs font-semibold border ${badgeColor}">
            ${apt.status}
          </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">${apt.type}</td>
      </tr>
    `;
  }).join("");
  
  if (window.lucide) window.lucide.createIcons();
}

function renderDashboardPrescriptions() {
  const container = document.getElementById("dash-prescriptions-list");
  if (!container) return;

  if (state.prescriptions.length === 0) {
    container.innerHTML = `<div class="col-span-full text-center py-12 text-gray-400 text-sm">No prescriptions found.</div>`;
    return;
  }

  container.innerHTML = state.prescriptions.map(rx => {
    return `
      <div class="bg-white dark:bg-cardWhite rounded-xl border border-gray-100 dark:border-gray-800 p-6 premium-shadow flex flex-col justify-between">
        <div>
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="text-lg font-bold text-secondary dark:text-white">${rx.doctorName}</h3>
              <p class="text-xs text-primary font-medium">${rx.deptName}</p>
            </div>
            <span class="text-xs text-gray-400">${rx.date}</span>
          </div>
          
          <div class="space-y-3 mt-4">
            <h4 class="text-xs uppercase tracking-wider text-gray-400 font-bold">Prescribed Medicines:</h4>
            <div class="divide-y divide-gray-50 dark:divide-gray-800 text-xs">
              ${rx.medicines.map(med => `
                <div class="py-2 flex justify-between">
                  <div>
                    <strong class="text-secondary dark:text-white">${med.name}</strong>
                    <p class="text-xs text-gray-400 mt-0.5">${med.dosage}</p>
                  </div>
                  <span class="text-xs text-gray-500 font-medium">${med.duration}</span>
                </div>
              `).join("")}
            </div>
          </div>
        </div>

        <div class="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex gap-2">
          <button onclick="viewPrescriptionDetail('${rx.id}')" class="flex-1 text-center py-2 border border-primary text-primary text-xs font-semibold rounded-lg hover:bg-primary/5 transition">
            View Instructions
          </button>
          <button onclick="downloadMockPDF('Prescription', '${rx.id}')" class="flex-1 text-center py-2 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary/95 transition flex items-center justify-center gap-1.5 shadow-sm">
            <i data-lucide="download" class="w-3.5 h-3.5"></i>
            <span>PDF Download</span>
          </button>
        </div>
      </div>
    `;
  }).join("");
  
  if (window.lucide) window.lucide.createIcons();
}

function renderDashboardReports() {
  const container = document.getElementById("dash-reports-list");
  if (!container) return;

  if (state.labReports.length === 0) {
    container.innerHTML = `<div class="col-span-full text-center py-12 text-gray-400 text-sm">No laboratory reports available.</div>`;
    return;
  }

  container.innerHTML = state.labReports.map(report => {
    return `
      <div class="bg-white dark:bg-cardWhite rounded-xl border border-gray-100 dark:border-gray-800 p-6 premium-shadow flex flex-col justify-between">
        <div>
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="text-lg font-bold text-secondary dark:text-white">${report.testName}</h3>
              <p class="text-xs text-gray-400 mt-0.5">Ordered by: <strong class="text-primary font-medium">${report.doctorName}</strong></p>
            </div>
            <span class="text-xs text-gray-400">${report.testDate}</span>
          </div>

          <div class="flex items-center gap-2 mt-4">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 status-glow-active"></span>
            <span class="text-xs font-semibold text-emerald-600 dark:text-emerald-400">${report.status}</span>
          </div>
        </div>

        <div class="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex gap-2">
          <button onclick="viewLabReportDetail('${report.id}')" class="flex-1 text-center py-2 border border-primary text-primary text-xs font-semibold rounded-lg hover:bg-primary/5 transition">
            View Report
          </button>
          <button onclick="downloadMockPDF('Lab Report', '${report.id}')" class="flex-1 text-center py-2 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary/95 transition flex items-center justify-center gap-1.5 shadow-sm">
            <i data-lucide="download" class="w-3.5 h-3.5"></i>
            <span>PDF Download</span>
          </button>
        </div>
      </div>
    `;
  }).join("");

  if (window.lucide) window.lucide.createIcons();
}

function renderDashboardProfile() {
  const user = state.currentUser;
  if (!user) return;

  const fields = {
    "profile-name": user.name || "",
    "profile-email": user.email || "",
    "profile-phone": user.phone || "",
    "profile-dob": user.dob || "",
    "profile-gender": user.gender || "Female",
    "profile-blood": user.bloodGroup || "",
    "profile-allergies": user.allergies || "",
    "profile-conditions": user.conditions || "",
    "profile-emergency": user.emergencyContact || ""
  };

  for (const [id, value] of Object.entries(fields)) {
    const el = document.getElementById(id);
    if (el) el.value = value;
  }
}

// Pre-fill Dashboard Doctor Booking when redirected
function setupDashboardBookingPreselection() {
  const params = new URLSearchParams(window.location.search);
  const docId = params.get("doc");
  
  if (docId) {
    const doc = window.DOCTORS.find(d => d.id === docId);
    if (doc) {
      const deptSelect = document.getElementById("dash-booking-dept");
      const docSelect = document.getElementById("dash-booking-doctor");
      const timeSelect = document.getElementById("dash-booking-time");
      
      if (deptSelect && docSelect && timeSelect) {
        deptSelect.value = doc.deptId;
        
        // Force cascade update
        const filteredDocs = window.DOCTORS.filter(d => d.deptId === doc.deptId);
        docSelect.innerHTML = `<option value="">Select Specialist</option>` +
          filteredDocs.map(d => `<option value="${d.id}">${d.name}</option>`).join("");
        docSelect.value = doc.id;
        
        if (doc.slots) {
          timeSelect.innerHTML = `<option value="">Select Time Slot</option>` +
            doc.slots.map(s => `<option value="${s}">${s}</option>`).join("");
        }
      }
    }
  }
}

// View Prescription detail modal
function viewPrescriptionDetail(rxId) {
  const rx = state.prescriptions.find(r => r.id === rxId);
  if (!rx) return;

  const modal = document.getElementById("general-modal");
  const title = document.getElementById("general-modal-title");
  const body = document.getElementById("general-modal-body");

  if (title) title.innerText = `Prescription Details - ${rx.id}`;
  if (body) {
    body.innerHTML = `
      <div class="space-y-4 text-xs">
        <div class="flex justify-between text-sm pb-4 border-b border-gray-100 dark:border-gray-800">
          <div>
            <span class="text-gray-400 block">Prescribing Doctor</span>
            <strong class="text-secondary dark:text-white">${rx.doctorName}</strong>
            <span class="text-xs text-gray-500 block">${rx.deptName}</span>
          </div>
          <div class="text-right">
            <span class="text-gray-400 block">Date Issued</span>
            <strong class="text-secondary dark:text-white">${rx.date}</strong>
          </div>
        </div>
        
        <div>
          <h4 class="text-sm font-bold text-secondary dark:text-white mb-2">Prescribed Medicines</h4>
          <div class="space-y-3 bg-gray-50 dark:bg-gray-800/45 p-4 rounded-lg">
            ${rx.medicines.map(med => `
              <div class="flex justify-between border-b border-gray-100 dark:border-gray-800 last:border-b-0 py-2">
                <div>
                  <strong class="text-sm text-secondary dark:text-white">${med.name}</strong>
                  <p class="text-xs text-gray-500">${med.dosage}</p>
                </div>
                <span class="text-xs font-semibold text-primary">${med.duration}</span>
              </div>
            `).join("")}
          </div>
        </div>

        <div class="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg border border-amber-200/50 dark:border-amber-900/35 text-amber-800 dark:text-amber-300">
          <strong>Special Instructions:</strong>
          <p class="mt-1">${rx.instructions}</p>
        </div>

        <div class="flex justify-end pt-4 border-t border-gray-100 dark:border-gray-800">
          <button onclick="closeGeneralModal()" class="px-5 py-2 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-hover transition">
            Close
          </button>
        </div>
      </div>
    `;
  }

  if (modal) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  }
}

// View Lab Report details
function viewLabReportDetail(labId) {
  const lab = state.labReports.find(l => l.id === labId);
  if (!lab) return;

  const modal = document.getElementById("general-modal");
  const title = document.getElementById("general-modal-title");
  const body = document.getElementById("general-modal-body");

  if (title) title.innerText = `${lab.testName}`;
  if (body) {
    body.innerHTML = `
      <div class="space-y-4 text-xs">
        <div class="flex justify-between text-sm pb-4 border-b border-gray-100 dark:border-gray-800">
          <div>
            <span class="text-gray-400 block">Referred By</span>
            <strong class="text-secondary dark:text-white">${lab.doctorName}</strong>
          </div>
          <div class="text-right">
            <span class="text-gray-400 block">Test Date</span>
            <strong class="text-secondary dark:text-white">${lab.testDate}</strong>
          </div>
        </div>
        
        <div>
          <h4 class="text-sm font-bold text-secondary dark:text-white mb-2">Test Results</h4>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-100 dark:divide-gray-800">
              <thead>
                <tr class="text-left text-2xs uppercase tracking-wider text-gray-400">
                  <th class="py-2">Test Parameter</th>
                  <th class="py-2 text-center">Value</th>
                  <th class="py-2">Reference Range</th>
                  <th class="py-2">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
                ${lab.results.map(res => `
                  <tr>
                    <td class="py-2.5 font-medium text-secondary dark:text-white">${res.parameter}</td>
                    <td class="py-2.5 text-center font-bold text-secondary dark:text-white">${res.value}</td>
                    <td class="py-2.5 text-gray-500">${res.referenceRange}</td>
                    <td class="py-2.5">
                      <span class="px-2 py-0.5 rounded text-3xs font-extrabold uppercase bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400">
                        ${res.status}
                      </span>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>

        <div class="flex justify-end pt-4 border-t border-gray-100 dark:border-gray-800">
          <button onclick="closeGeneralModal()" class="px-5 py-2 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-hover transition">
            Close
          </button>
        </div>
      </div>
    `;
  }

  if (modal) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  }
}

function closeGeneralModal() {
  const modal = document.getElementById("general-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

// Download PDF
function downloadMockPDF(type, id) {
  showToast(`Initiating download for ${type} PDF (${id})...`, "success");
  setTimeout(() => {
    showToast(`${type} PDF downloaded successfully.`, "success");
  }, 1200);
}

// Redirection Toast helper
function queuePendingToast(message, type = "success") {
  sessionStorage.setItem("pending-toast", JSON.stringify({ message, type }));
}

function checkPendingToasts() {
  const data = sessionStorage.getItem("pending-toast");
  if (data) {
    const { message, type } = JSON.parse(data);
    showToast(message, type);
    sessionStorage.removeItem("pending-toast");
  }
}

// Event Listeners setup
function setupEventListeners() {
  const themeBtn = document.getElementById("theme-toggle-btn");
  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);
  
  const langBtn = document.getElementById("lang-toggle-btn");
  if (langBtn) langBtn.addEventListener("click", toggleLanguage);

  // Logout hooks
  const logoutBtns = [
    document.getElementById("nav-logout-action"),
    document.getElementById("dash-logout-action")
  ];
  logoutBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        handleLogout();
      });
    }
  });

  // Mobile menu drawer
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Dashboard Mobile Sidebar
  const dashSidebarToggle = document.getElementById("mobile-sidebar-toggle");
  const dashSidebarClose = document.getElementById("mobile-sidebar-close");
  const dashSidebar = document.getElementById("dashboard-sidebar");
  const dashOverlay = document.getElementById("sidebar-overlay");

  function closeDashSidebar() {
    if (dashSidebar && dashOverlay) {
      dashSidebar.classList.add("-translate-x-full");
      dashOverlay.classList.add("hidden");
    }
  }

  if (dashSidebarToggle) {
    dashSidebarToggle.addEventListener("click", () => {
      if (dashSidebar && dashOverlay) {
        dashSidebar.classList.remove("-translate-x-full");
        dashOverlay.classList.remove("hidden");
      }
    });
  }
  if (dashSidebarClose) dashSidebarClose.addEventListener("click", closeDashSidebar);
  if (dashOverlay) dashOverlay.addEventListener("click", closeDashSidebar);

  // Doctor search inputs
  const searchInput = document.getElementById("doctor-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.searchDoctorQuery = e.target.value;
      renderDoctorsList();
    });
  }

  const deptFilter = document.getElementById("doctor-dept-filter");
  if (deptFilter) {
    deptFilter.addEventListener("change", (e) => {
      state.filterDoctorDept = e.target.value;
      renderDoctorsList();
      
      // Update URL query parameter
      const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + `?dept=${state.filterDoctorDept}`;
      window.history.pushState({path:newurl}, '', newurl);
    });
  }

  // Public Booking / Contact Form
  const publicForm = document.getElementById("public-booking-form");
  if (publicForm) {
    publicForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const name = document.getElementById("enquiry-name").value;
      const phone = document.getElementById("enquiry-phone").value;
      const email = document.getElementById("enquiry-email").value;
      const deptId = document.getElementById("enquiry-dept").value;
      const docId = document.getElementById("enquiry-doctor").value;
      const date = document.getElementById("enquiry-date").value;
      const time = document.getElementById("enquiry-time").value;
      
      if (!name || !phone || !email || !deptId || !docId || !date || !time) {
        showToast("Please fill in all mandatory fields.", "error");
        return;
      }

      const doctor = window.DOCTORS.find(d => d.id === docId);
      const department = window.DEPARTMENTS.find(d => d.id === deptId);
      
      const newApt = {
        id: "apt-" + Math.floor(100 + Math.random() * 900),
        doctorName: doctor ? doctor.name : "Specialist",
        deptName: department ? department.name : "Outpatient",
        date: date,
        time: time,
        status: "Upcoming",
        type: "Enquiry Requested"
      };

      if (state.currentUser) {
        saveAppointmentToUser(newApt);
        queuePendingToast("Camp Registration Enquiry submitted successfully. We will contact you shortly.", "success");
        window.location.href = "index.html";
      } else {
        showToast(`Request submitted! Our team will contact you shortly to confirm your booking with ${newApt.doctorName} on ${date}.`, "success");
        publicForm.reset();
      }
    });
  }

  // Dashboard Booking Form
  const dashForm = document.getElementById("dash-booking-form");
  if (dashForm) {
    dashForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const deptId = document.getElementById("dash-booking-dept").value;
      const docId = document.getElementById("dash-booking-doctor").value;
      const date = document.getElementById("dash-booking-date").value;
      const time = document.getElementById("dash-booking-time").value;
      
      if (!deptId || !docId || !date || !time) {
        showToast("Please fill all booking selection boxes.", "error");
        return;
      }

      const doctor = window.DOCTORS.find(d => d.id === docId);
      const department = window.DEPARTMENTS.find(d => d.id === deptId);

      const newApt = {
        id: "apt-" + Math.floor(100 + Math.random() * 900),
        doctorName: doctor.name,
        deptName: department.name,
        date: date,
        time: time,
        status: "Upcoming",
        type: "OPD Consultation"
      };

      saveAppointmentToUser(newApt);
      showToast("Appointment booked successfully!", "success");
      dashForm.reset();
      
      state.dashboardSubView = "appointments";
      renderDashboard();
    });
  }

  // Profile Form submit
  const profileForm = document.getElementById("dash-profile-form");
  if (profileForm) {
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!state.currentUser) return;

      const updatedUser = {
        ...state.currentUser,
        name: document.getElementById("profile-name").value,
        phone: document.getElementById("profile-phone").value,
        dob: document.getElementById("profile-dob").value,
        gender: document.getElementById("profile-gender").value,
        bloodGroup: document.getElementById("profile-blood").value,
        allergies: document.getElementById("profile-allergies").value,
        conditions: document.getElementById("profile-conditions").value,
        emergencyContact: document.getElementById("profile-emergency").value,
      };

      updateUserRecord(updatedUser);
      showToast("Patient medical profile updated successfully.", "success");
      state.dashboardSubView = "overview";
      renderDashboard();
    });
  }

  // Login handler
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const email = document.getElementById("login-email").value;
      const pass = document.getElementById("login-password").value;
      
      if (!email || !pass) {
        showToast("Please fill in email and password.", "error");
        return;
      }

      const mockUsers = JSON.parse(localStorage.getItem("hospital-users") || "[]");
      let matchedUser = mockUsers.find(u => u.email === email);
      
      if (!matchedUser && email === window.INITIAL_PATIENT.email) {
        matchedUser = window.INITIAL_PATIENT;
      }
      
      if (matchedUser) {
        state.currentUser = matchedUser;
        localStorage.setItem("hospital-session", JSON.stringify(matchedUser));
        queuePendingToast(`Welcome back, ${matchedUser.name}!`, "success");
        window.location.href = "index.html";
      } else {
        // Auto sign-up mode for any new address
        const newUser = {
          name: email.split("@")[0].replace(".", " "),
          email: email,
          phone: "+1 (555) 012-3456",
          dob: "1992-01-01",
          gender: "Male",
          bloodGroup: "O+",
          allergies: "None",
          conditions: "None",
          appointments: [],
          prescriptions: [],
          labReports: []
        };
        
        mockUsers.push(newUser);
        localStorage.setItem("hospital-users", JSON.stringify(mockUsers));
        
        state.currentUser = newUser;
        localStorage.setItem("hospital-session", JSON.stringify(newUser));
        queuePendingToast(`Account generated & Logged In! Welcome, ${newUser.name}.`, "success");
        window.location.href = "index.html";
      }
    });
  }

  // Signup Form
  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const name = document.getElementById("signup-name").value;
      const email = document.getElementById("signup-email").value;
      const phone = document.getElementById("signup-phone").value;
      const dob = document.getElementById("signup-dob").value;
      const gender = document.getElementById("signup-gender").value;
      const blood = document.getElementById("signup-blood").value;
      const role = document.getElementById("signup-role").value;
      const pass = document.getElementById("signup-password").value;
      const confirmPass = document.getElementById("signup-confirm-password").value;
      const agree = document.getElementById("signup-agree").checked;

      if (!name || !email || !phone || !dob || !gender || !blood || !role || !pass) {
        showToast("Please fill in all details.", "error");
        return;
      }

      if (pass !== confirmPass) {
        showToast("Passwords do not match.", "error");
        return;
      }

      if (!agree) {
        showToast("Please agree to terms and conditions.", "error");
        return;
      }

      const mockUsers = JSON.parse(localStorage.getItem("hospital-users") || "[]");
      const userExists = mockUsers.find(u => u.email === email);
      
      if (userExists) {
        showToast("An account with this email already exists. Please login.", "error");
        return;
      }

      const newUser = {
        name: name,
        email: email,
        phone: phone,
        dob: dob,
        gender: gender,
        bloodGroup: blood,
        roleInterest: role,
        allergies: "None",
        conditions: "None",
        appointments: [],
        prescriptions: [],
        labReports: []
      };

      mockUsers.push(newUser);
      localStorage.setItem("hospital-users", JSON.stringify(mockUsers));
      
      state.currentUser = newUser;
      localStorage.setItem("hospital-session", JSON.stringify(newUser));
      queuePendingToast(`Account created! Welcome, ${name}.`, "success");
      window.location.href = "index.html";
    });
  }
}

function handleLogout() {
  state.currentUser = null;
  state.appointments = [];
  state.prescriptions = [];
  state.labReports = [];
  localStorage.removeItem("hospital-session");
  updateNavbarState();
  queuePendingToast("Logged out successfully.", "success");
  window.location.href = "index.html";
}

function saveAppointmentToUser(apt) {
  if (!state.currentUser) return;
  
  const mockUsers = JSON.parse(localStorage.getItem("hospital-users") || "[]");
  const index = mockUsers.findIndex(u => u.email === state.currentUser.email);
  
  if (index !== -1) {
    if (!mockUsers[index].appointments) {
      mockUsers[index].appointments = [];
    }
    mockUsers[index].appointments.unshift(apt);
    localStorage.setItem("hospital-users", JSON.stringify(mockUsers));
    
    state.currentUser = mockUsers[index];
    localStorage.setItem("hospital-session", JSON.stringify(state.currentUser));
    syncPatientDataFromStorage();
  }
}

function updateUserRecord(updatedUser) {
  const mockUsers = JSON.parse(localStorage.getItem("hospital-users") || "[]");
  const index = mockUsers.findIndex(u => u.email === updatedUser.email);
  
  if (index !== -1) {
    mockUsers[index] = {
      ...mockUsers[index],
      ...updatedUser
    };
    localStorage.setItem("hospital-users", JSON.stringify(mockUsers));
    
    state.currentUser = mockUsers[index];
    localStorage.setItem("hospital-session", JSON.stringify(state.currentUser));
    syncPatientDataFromStorage();
    updateNavbarState();
  }
}

// Show toast notification
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border text-sm transition-all duration-300 transform translate-y-2 opacity-0 font-medium `;
  
  if (type === "success") {
    toast.className += "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300 border-emerald-100 dark:border-emerald-900/30";
  } else if (type === "error") {
    toast.className += "bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-300 border-rose-100 dark:border-rose-900/30";
  } else {
    toast.className += "bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-900/30";
  }

  const icon = type === "success" ? "check-circle" : (type === "error" ? "alert-circle" : "info");
  toast.innerHTML = `
    <i data-lucide="${icon}" class="w-4 h-4 shrink-0"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  if (window.lucide) window.lucide.createIcons();

  setTimeout(() => {
    toast.classList.remove("translate-y-2", "opacity-0");
  }, 10);

  setTimeout(() => {
    toast.classList.add("translate-y-2", "opacity-0");
    setTimeout(() => {
      if (container.contains(toast)) container.removeChild(toast);
    }, 300);
  }, 4000);
}

// Back to Top Button
function initBackToTopButton() {
  const btn = document.createElement("button");
  btn.id = "back-to-top-btn";
  btn.className = "fixed bottom-6 right-6 z-50 p-3 bg-primary text-white rounded-full shadow-lg opacity-0 translate-y-10 pointer-events-none transition-all duration-300 hover:bg-primaryHover hover:scale-110 flex items-center justify-center";
  btn.setAttribute("title", "Back to Top");
  btn.innerHTML = `<i data-lucide="chevron-up" class="w-6 h-6"></i>`;
  document.body.appendChild(btn);

  if (window.lucide) window.lucide.createIcons();

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      btn.classList.remove("opacity-0", "translate-y-10", "pointer-events-none");
      btn.classList.add("opacity-100", "translate-y-0");
    } else {
      btn.classList.add("opacity-0", "translate-y-10", "pointer-events-none");
      btn.classList.remove("opacity-100", "translate-y-0");
    }
  });

  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  const observer = new MutationObserver(() => {
    const isRtl = document.documentElement.getAttribute("dir") === "rtl";
    if (isRtl) {
      btn.classList.remove("right-6");
      btn.classList.add("left-6");
    } else {
      btn.classList.remove("left-6");
      btn.classList.add("right-6");
    }
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["dir"] });
  
  if (document.documentElement.getAttribute("dir") === "rtl") {
    btn.classList.remove("right-6");
    btn.classList.add("left-6");
  }
}

// Expose functions globally
window.viewDoctorProfile = viewDoctorProfile;
window.closeDoctorModal = closeDoctorModal;
window.bookDoctorApt = bookDoctorApt;
window.viewPrescriptionDetail = viewPrescriptionDetail;
window.viewLabReportDetail = viewLabReportDetail;
window.closeGeneralModal = closeGeneralModal;
window.downloadMockPDF = downloadMockPDF;
window.handleLogout = handleLogout;
window.showToast = showToast;
window.toggleTheme = toggleTheme;
window.toggleLanguage = toggleLanguage;
