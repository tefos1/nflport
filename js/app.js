/**
 * Application Logic for Pilar Raad Digital Portfolio - Multi-Page System
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initNavbar();
  renderCurrentPageContent();
  initSearch();
  initModals();
  initBackToTop();
});

function getSafeAssetPath(filename) {
  if (!filename) return '#';
  if (filename.startsWith('http://') || filename.startsWith('https://')) return filename;
  let cleanName = filename.replace(/^\.\/assets\//, '').replace(/^assets\//, '');
  return `./assets/${encodeURIComponent(cleanName)}`;
}

function scrollNavLeft() {
  const menu = document.getElementById('navMenu');
  if (menu) menu.scrollBy({ left: -220, behavior: 'smooth' });
}

function scrollNavRight() {
  const menu = document.getElementById('navMenu');
  if (menu) menu.scrollBy({ left: 220, behavior: 'smooth' });
}

function initScrollProgress() {
  const progressBar = document.getElementById('scrollProgressBar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${scrollPercent}%`;
  });
}

function initNavbar() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenuWrapper = document.getElementById('navMenuWrapper');

  if (hamburgerBtn && navMenuWrapper) {
    hamburgerBtn.addEventListener('click', () => {
      navMenuWrapper.classList.toggle('mobile-active');
      const icon = hamburgerBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    navMenuWrapper.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenuWrapper.classList.remove('mobile-active');
        if (hamburgerBtn.querySelector('i')) {
          hamburgerBtn.querySelector('i').className = 'fa-solid fa-bars';
        }
      });
    });
  }

  // Highlight current active page link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
      // Scroll into view in navbar
      link.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    } else {
      link.classList.remove('active');
    }
  });
}

function renderCurrentPageContent() {
  const data = PORTFOLIO_DATA;
  if (!data) return;

  if (document.getElementById('heroContainer')) renderHero(data.student);
  if (document.getElementById('aboutStudentContainer')) renderAboutStudent(data.aboutStudent);
  if (document.getElementById('cvContainer')) renderCV(data.cv);
  if (document.getElementById('goalsContainer')) renderGoals(data.goals);
  if (document.getElementById('achievementsContainer')) renderAchievements(data.achievements);
  if (document.getElementById('obsGrid')) renderObservations(data.observations);
  if (document.getElementById('lessonPlansGrid')) renderLessonPlans(data.lessonPlans);
  if (document.getElementById('evaluationsGrid')) renderEvaluations(data.evaluations);
  if (document.getElementById('projectsGrid')) renderProjects(data.projects);
  if (document.getElementById('theoriesGrid')) renderTheories(data.theories);
  if (document.getElementById('reflectionsContainer')) renderReflections(data.reflections);
  if (document.getElementById('skillsGrid')) renderSkillsSection(data.skillsSection);
  if (document.getElementById('galleryGrid')) renderGallery(data.gallery);
  if (document.getElementById('futurePlanContainer')) renderFuturePlan(data.futurePlan);
  if (document.getElementById('philosophyContainer')) renderPhilosophy(data.philosophy);
  if (document.getElementById('referencesGrid')) renderReferences(data.references);
  if (document.getElementById('contactContainer')) renderContact(data.student);
}

// 1. Hero
function renderHero(student) {
  const heroContainer = document.getElementById('heroContainer');
  if (!heroContainer) return;

  heroContainer.innerHTML = `
    <div class="hero-card">
      <div class="hero-badge">
        <i class="fa-solid fa-graduation-cap"></i> ${student.academicYear}
      </div>
      <h1 class="hero-title">${student.name}</h1>
      <div class="hero-subtitle">بورتفوليو التطبيقات العملية في التربية غير المنهجية والتربية الخاصة</div>
      
      <div class="hero-meta-grid">
        <div class="meta-item"><i class="fa-solid fa-book-open-reader"></i> <span><strong>التخصص:</strong> ${student.specialty}</span></div>
        <div class="meta-item"><i class="fa-solid fa-id-card"></i> <span><strong>رقم الهوية:</strong> ${student.id}</span></div>
        <div class="meta-item"><i class="fa-solid fa-building-columns"></i> <span><strong>المؤسسة:</strong> ${student.institution}</span></div>
        <div class="meta-item"><i class="fa-solid fa-user-tie"></i> <span><strong>المحاضرة:</strong> ${student.instructor}</span></div>
        <div class="meta-item"><i class="fa-solid fa-school"></i> <span><strong>مكان التدريب:</strong> ${student.school} (${student.targetGrade})</span></div>
        <div class="meta-item"><i class="fa-solid fa-location-dot"></i> <span><strong>المكان:</strong> ${student.residence}</span></div>
      </div>

      <div class="hero-actions">
        <a href="about.html" class="btn-primary"><i class="fa-solid fa-compass"></i> ابدأ الرحلة</a>
        <a href="projects.html" class="btn-secondary"><i class="fa-solid fa-folder-open"></i> تصفح أعمالي</a>
      </div>
    </div>
  `;
}

// 2. About Student
function renderAboutStudent(about) {
  const container = document.getElementById('aboutStudentContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="nature-card">
      <div class="about-grid">
        <div class="about-card-left">
          <img src="${getSafeAssetPath(PORTFOLIO_DATA.student.profileImg)}" alt="${PORTFOLIO_DATA.student.name}" class="about-avatar">
          <h3 style="font-size: 1.3rem; color: var(--primary-dark); font-weight: 700;">${PORTFOLIO_DATA.student.name}</h3>
          <p style="font-size: 0.95rem; color: var(--text-muted);">${PORTFOLIO_DATA.student.specialty}</p>
        </div>

        <div>
          <h3 style="font-size: 1.4rem; color: var(--primary-dark); margin-bottom: 1rem;">الرسالة والرؤية الميدانية</h3>
          <p style="margin-bottom: 1.25rem; font-size: 1.05rem;">${about.bio}</p>
          
          <div class="about-highlights-grid">
            ${about.highlights.map(h => `
              <div class="highlight-box">
                <div class="highlight-icon"><i class="fa-solid ${h.icon}"></i></div>
                <div>
                  <strong style="color: var(--primary-dark); font-size: 0.98rem; display: block;">${h.title}</strong>
                  <span style="font-size: 0.85rem; color: var(--text-muted);">${h.desc}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

// 3. CV
function renderCV(cv) {
  const cvContainer = document.getElementById('cvContainer');
  if (!cvContainer) return;

  cvContainer.innerHTML = `
    <div class="cv-sidebar">
      <div class="nature-card">
        <h3 class="cv-block-title"><i class="fa-solid fa-user-gear"></i> البيانات الشخصية</h3>
        <div class="cv-info-list" style="display: flex; flex-direction: column; gap: 0.85rem; font-size: 0.95rem;">
          <div class="cv-info-item"><i class="fa-solid fa-user" style="color: var(--primary);"></i> <span><strong>الاسم:</strong> ${cv.personalInfo.name}</span></div>
          <div class="cv-info-item"><i class="fa-solid fa-id-badge" style="color: var(--primary);"></i> <span><strong>رقم الهوية:</strong> ${cv.personalInfo.id}</span></div>
          <div class="cv-info-item"><i class="fa-solid fa-graduation-cap" style="color: var(--primary);"></i> <span><strong>التخصص:</strong> ${cv.personalInfo.specialty}</span></div>
          <div class="cv-info-item"><i class="fa-solid fa-calendar" style="color: var(--primary);"></i> <span><strong>السنة:</strong> ${cv.personalInfo.year}</span></div>
          <div class="cv-info-item"><i class="fa-solid fa-house-chimney" style="color: var(--primary);"></i> <span><strong>السكن:</strong> ${cv.personalInfo.residence}</span></div>
        </div>
        <div style="margin-top: 1.5rem;">
          <a href="${getSafeAssetPath(cv.cvFile)}" download class="btn-primary" style="width: 100%; justify-content: center;">
            <i class="fa-solid fa-download"></i> تحميل السيرة الذاتية (Word)
          </a>
        </div>
      </div>

      <div class="nature-card">
        <h3 class="cv-block-title"><i class="fa-solid fa-wand-magic-sparkles"></i> المهارات الأساسية</h3>
        <div class="skills-tags">
          ${cv.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
        </div>
      </div>
    </div>

    <div class="cv-main-content" style="display: flex; flex-direction: column; gap: 2rem;">
      <div class="nature-card">
        <h3 class="cv-block-title"><i class="fa-solid fa-quote-right"></i> المقدمة والهدف المهني</h3>
        <p style="margin-bottom: 1rem;">${cv.introduction}</p>
        <p><strong>الهدف المهني:</strong> ${cv.careerGoal}</p>
      </div>

      <div class="nature-card">
        <h3 class="cv-block-title"><i class="fa-solid fa-briefcase"></i> الخبرات الميدانية والتطبيقية</h3>
        <div class="timeline">
          ${cv.experience.map(exp => `
            <div class="timeline-item">
              <div class="timeline-role">${exp.role}</div>
              <div class="timeline-org">${exp.organization} (${exp.period})</div>
              <p style="font-size: 0.95rem; color: var(--text-muted); margin-top: 0.25rem;">${exp.description}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="nature-card">
        <h3 class="cv-block-title"><i class="fa-solid fa-eye-low-vision"></i> الرؤية المهنية المستقبلية</h3>
        <p>${cv.futureVision}</p>
      </div>
    </div>
  `;
}

// 4. Goals
function renderGoals(goals) {
  const goalsContainer = document.getElementById('goalsContainer');
  if (!goalsContainer) return;

  const goalCategories = [
    { title: "أهداف قصيرة المدى", icon: "fa-stopwatch", items: goals.shortTerm },
    { title: "أهداف طويلة المدى", icon: "fa-flag-checkered", items: goals.longTerm },
    { title: "أهداف أكاديمية", icon: "fa-book", items: goals.academic },
    { title: "أهداف مهنية", icon: "fa-briefcase", items: goals.professional },
    { title: "أهداف شخصية", icon: "fa-heart", items: goals.personal },
    { title: "استراتيجيات تحقيق الأهداف", icon: "fa-gears", items: goals.strategies }
  ];

  goalsContainer.innerHTML = `
    <div class="goals-grid">
      ${goalCategories.map(cat => `
        <div class="nature-card">
          <div class="goal-card-header">
            <div class="goal-icon"><i class="fa-solid ${cat.icon}"></i></div>
            <div class="goal-card-title">${cat.title}</div>
          </div>
          <ul class="goal-list">
            ${cat.items.map(item => `
              <li class="goal-item"><i class="fa-solid fa-leaf"></i> <span>${item}</span></li>
            `).join('')}
          </ul>
        </div>
      `).join('')}
    </div>
  `;
}

// 5. Achievements
function renderAchievements(achievements) {
  const container = document.getElementById('achievementsContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="cards-grid">
      ${achievements.map(ach => `
        <div class="nature-card">
          ${ach.img ? `<img src="${getSafeAssetPath(ach.img)}" alt="${ach.title}" style="width: 100%; height: 180px; object-fit: cover; border-radius: var(--radius-sm); margin-bottom: 1.25rem;">` : ''}
          <div>
            <span class="obs-badge">${ach.date}</span>
            <h3 class="obs-title">${ach.title}</h3>
            <div class="obs-meta">
              <span><i class="fa-solid fa-building"></i> ${ach.institution}</span>
              <span><i class="fa-solid fa-user-tag"></i> ${ach.role}</span>
            </div>
            <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 1rem;">${ach.description}</p>
            <div style="font-size: 0.9rem; color: var(--primary-dark); font-weight: 600;">
              <i class="fa-solid fa-lightbulb"></i> المهارات المكتسبة: ${ach.skills}
            </div>
          </div>
          <div class="card-actions">
            <a href="${getSafeAssetPath(ach.file)}" download class="btn-fill">
              <i class="fa-solid fa-download"></i> تحميل المستند
            </a>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// 6. Observations
let currentObsFilter = 'all';

function renderObservations(observations) {
  const filterContainer = document.getElementById('obsFilterContainer');
  const obsGrid = document.getElementById('obsGrid');
  if (!obsGrid) return;

  if (filterContainer) {
    filterContainer.innerHTML = `
      <button class="filter-btn ${currentObsFilter === 'all' ? 'active' : ''}" onclick="setObsFilter('all')">عرض الكل</button>
      <button class="filter-btn ${currentObsFilter === 'obs1' ? 'active' : ''}" onclick="setObsFilter('obs1')">المشاهدة الأولى</button>
      <button class="filter-btn ${currentObsFilter === 'obs2' ? 'active' : ''}" onclick="setObsFilter('obs2')">المشاهدة الثانية</button>
      <button class="filter-btn ${currentObsFilter === 'obs3' ? 'active' : ''}" onclick="setObsFilter('obs3')">المشاهدة الثالثة</button>
    `;
  }

  const filtered = currentObsFilter === 'all' ? observations : observations.filter(o => o.category === currentObsFilter);

  obsGrid.innerHTML = filtered.map(obs => `
    <div class="nature-card">
      ${obs.img ? `<img src="${getSafeAssetPath(obs.img)}" alt="${obs.title}" style="width: 100%; height: 180px; object-fit: cover; border-radius: var(--radius-sm); margin-bottom: 1.25rem;">` : ''}
      <div>
        <span class="obs-badge">${obs.categoryTitle} - ${obs.date}</span>
        <h3 class="obs-title">${obs.title}</h3>
        <div class="obs-meta">
          <span><i class="fa-solid fa-school"></i> ${obs.school}</span>
          <span><i class="fa-solid fa-users"></i> ${obs.grade}</span>
        </div>
        <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 0.75rem;"><strong>الموضوع:</strong> ${obs.topic}</p>
        <p style="font-size: 0.92rem; color: var(--text-dark); margin-bottom: 1rem;"><strong>الأهداف:</strong> ${obs.objectives}</p>
      </div>

      <div class="card-actions">
        <button onclick="openObsModal('${obs.id}')" class="btn-outline">
          <i class="fa-solid fa-expand"></i> التفاصيل
        </button>
        <a href="${getSafeAssetPath(obs.file)}" download class="btn-fill">
          <i class="fa-solid fa-download"></i> تحميل المستند (Word)
        </a>
      </div>
    </div>
  `).join('');
}

function setObsFilter(filter) {
  currentObsFilter = filter;
  renderObservations(PORTFOLIO_DATA.observations);
}

// 7. Lesson Plans
function renderLessonPlans(plans) {
  const container = document.getElementById('lessonPlansGrid');
  if (!container) return;

  container.innerHTML = plans.map(lp => `
    <div class="nature-card">
      ${lp.img ? `<img src="${getSafeAssetPath(lp.img)}" alt="${lp.title}" style="width: 100%; height: 180px; object-fit: cover; border-radius: var(--radius-sm); margin-bottom: 1.25rem;">` : ''}
      <div>
        <span class="obs-badge">${lp.date} - ${lp.grade}</span>
        <h3 class="obs-title">${lp.title}</h3>
        <div class="obs-meta">
          <span><i class="fa-solid fa-school"></i> ${lp.school}</span>
          <span><i class="fa-solid fa-book"></i> ${lp.domain}</span>
        </div>
        <div style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 1rem;">
          <strong>الافتتاحية:</strong> ${lp.opening}
        </div>
      </div>

      <div class="card-actions">
        <button onclick="openLpModal('${lp.id}')" class="btn-outline">
          <i class="fa-solid fa-eye"></i> عرض التخطيط
        </button>
        <a href="${getSafeAssetPath(lp.file)}" download class="btn-fill">
          <i class="fa-solid fa-download"></i> تحميل التخطيط (Word)
        </a>
      </div>
    </div>
  `).join('');
}

// 8. Evaluations
function renderEvaluations(evals) {
  const container = document.getElementById('evaluationsGrid');
  if (!container) return;

  container.innerHTML = evals.map(ev => `
    <div class="nature-card" style="margin-bottom: 2rem;">
      ${ev.img ? `<img src="${getSafeAssetPath(ev.img)}" alt="${ev.title}" style="width: 100%; height: 220px; object-fit: cover; border-radius: var(--radius-sm); margin-bottom: 1.5rem;">` : ''}
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; margin-bottom: 1rem;">
        <div>
          <span class="obs-badge">${ev.date}</span>
          <h3 class="obs-title">${ev.title}</h3>
          <div class="obs-meta">
            <span><i class="fa-solid fa-user-check"></i> <strong>المرشد/ة:</strong> ${ev.evaluator}</span>
            <span><i class="fa-solid fa-school"></i> ${ev.school} (${ev.grade})</span>
          </div>
        </div>
        <a href="${getSafeAssetPath(ev.file)}" download class="btn-fill">
          <i class="fa-solid fa-download"></i> تحميل نموذج التقييم (Word)
        </a>
      </div>

      <div class="rubric-table-wrapper">
        <table class="rubric-table">
          <thead>
            <tr>
              <th>المعيار / التقييم</th>
              <th>التقدير</th>
              <th>ملاحظات تفصيلية</th>
            </tr>
          </thead>
          <tbody>
            ${ev.rubric.map(r => `
              <tr>
                <td><strong>${r.criterion}</strong></td>
                <td><span class="rating-badge rating-excellent">${r.rating}</span></td>
                <td>${r.notes}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div style="margin-top: 1.25rem; background: var(--primary-soft); padding: 1.25rem; border-radius: var(--radius-sm);">
        <strong style="color: var(--primary-dark);"><i class="fa-solid fa-comment-dots"></i> ملاحظات المرشد/ة العامة:</strong>
        <p style="font-size: 0.98rem; margin-top: 0.35rem; color: var(--text-dark);">${ev.generalNotes}</p>
      </div>
    </div>
  `).join('');
}

// 9. Projects
function renderProjects(projects) {
  const container = document.getElementById('projectsGrid');
  if (!container) return;

  container.innerHTML = projects.map(proj => `
    <div class="nature-card">
      ${proj.img ? `<img src="${getSafeAssetPath(proj.img)}" alt="${proj.title}" style="width: 100%; height: 200px; object-fit: cover; border-radius: var(--radius-sm); margin-bottom: 1.25rem;">` : ''}
      <div>
        <span class="obs-badge">${proj.subtitle}</span>
        <h3 class="obs-title">${proj.title}</h3>
        <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 0.75rem;"><strong>المشكلة التربوية:</strong> ${proj.problem}</p>
        <p style="font-size: 0.95rem; color: var(--text-dark); margin-bottom: 1rem;"><strong>الهدف التربوي:</strong> ${proj.goal}</p>
      </div>

      <div class="card-actions">
        <button onclick="openProjModal('${proj.id}')" class="btn-outline">
          <i class="fa-solid fa-folder-open"></i> عرض التفاصيل
        </button>
        ${proj.chatbotUrl ? `
          <a href="${proj.chatbotUrl}" target="_blank" class="btn-primary" style="padding: 10px 18px;">
            <i class="fa-solid fa-robot"></i> فتح الشات بوت
          </a>
        ` : ''}
        <a href="${getSafeAssetPath(proj.file)}" download class="btn-fill">
          <i class="fa-solid fa-download"></i> تحميل المستند
        </a>
      </div>
    </div>
  `).join('');
}

// 10. Theories
function renderTheories(theories) {
  const container = document.getElementById('theoriesGrid');
  if (!container) return;

  container.innerHTML = theories.map(th => `
    <div class="nature-card theory-card">
      ${th.img ? `<img src="${getSafeAssetPath(th.img)}" alt="${th.name}" style="width: 100%; height: 160px; object-fit: cover; border-radius: var(--radius-sm); margin-bottom: 1.25rem;">` : ''}
      <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--primary-dark); margin-bottom: 0.5rem;">${th.name}</h3>
      <p style="font-size: 0.88rem; color: var(--text-light); margin-bottom: 1rem;"><i class="fa-solid fa-link"></i> المصدر: ${th.source}</p>
      
      <div style="display: flex; flex-direction: column; gap: 0.85rem; font-size: 0.98rem;">
        <div><strong>الشرح:</strong> ${th.explanation}</div>
        <div><strong>موقعه في التطبيق:</strong> ${th.application}</div>
        <div><strong>مثال حقيقي:</strong> ${th.example}</div>
        <div><strong>الأثر على الطلاب:</strong> ${th.impact}</div>
      </div>
    </div>
  `).join('');
}

// 11. Reflections (NO PDF IFRAME)
function renderReflections(reflections) {
  const container = document.getElementById('reflectionsContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="nature-card">
      ${reflections.img ? `<img src="${getSafeAssetPath(reflections.img)}" alt="التفكير الانعكاسي" style="width: 100%; height: 260px; object-fit: cover; border-radius: var(--radius-sm); margin-bottom: 1.75rem;">` : ''}
      <h3 class="cv-block-title"><i class="fa-solid fa-feather"></i> التفكير الانعكاسي</h3>
      <p style="font-size: 1.1rem; margin-bottom: 1.75rem;">${reflections.overview}</p>
      
      <div class="cards-grid" style="margin-bottom: 2rem;">
        ${reflections.categories.map(cat => `
          <div style="background: rgba(255,255,255,0.7); padding: 1.35rem; border-radius: var(--radius-sm); border: 1px solid rgba(94, 140, 97, 0.15);">
            <h4 style="color: var(--primary-dark); margin-bottom: 0.85rem; font-size: 1.05rem;"><i class="fa-solid ${cat.icon}"></i> ${cat.title}</h4>
            <ul class="goal-list">
              ${cat.points.map(pt => `<li class="goal-item"><i class="fa-solid fa-check"></i> <span>${pt}</span></li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>

      <div style="display: flex; gap: 1.25rem; flex-wrap: wrap;">
        <a href="${getSafeAssetPath(reflections.docxFile)}" download class="btn-primary">
          <i class="fa-solid fa-download"></i> تحميل ملف التفكير الانعكاسي (Word)
        </a>
        <a href="${getSafeAssetPath(reflections.pdfFile)}" target="_blank" class="btn-secondary">
          <i class="fa-solid fa-file-pdf"></i> فتح أسئلة التغذية المرتدة (PDF في تبويب جديد)
        </a>
        <a href="${getSafeAssetPath(reflections.pdfFile)}" download class="btn-outline">
          <i class="fa-solid fa-file-arrow-down"></i> تحميل ملف PDF
        </a>
      </div>
    </div>
  `;
}

// 12. Skills Section
function renderSkillsSection(skillsData) {
  const container = document.getElementById('skillsGrid');
  if (!container) return;

  container.innerHTML = skillsData.categories.map(cat => `
    <div class="skills-category-card">
      <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--primary-dark); margin-bottom: 1rem;">
        <i class="fa-solid fa-award"></i> ${cat.name}
      </h3>
      <div class="skills-tags">
        ${cat.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

// 13. Gallery
function renderGallery(gallery) {
  const container = document.getElementById('galleryGrid');
  const zipBtnContainer = document.getElementById('zipBtnContainer');
  if (!container) return;

  if (zipBtnContainer) {
    zipBtnContainer.innerHTML = `
      <a href="${getSafeAssetPath(gallery.zipFile)}" download class="btn-primary" style="margin-bottom: 2rem;">
        <i class="fa-solid fa-file-zipper"></i> تحميل ملف الوسائط الكامل (ZIP)
      </a>
    `;
  }

  container.innerHTML = gallery.items.map((item, index) => `
    <div class="gallery-item" onclick="openLightbox(${index})">
      ${item.type === 'image' ? `
        <img src="${getSafeAssetPath(item.src)}" alt="${item.title}" loading="lazy">
      ` : `
        <video src="${getSafeAssetPath(item.src)}" preload="metadata"></video>
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 2.5rem; color: #fff; text-shadow: 0 2px 10px rgba(0,0,0,0.5);">
          <i class="fa-solid fa-circle-play"></i>
        </div>
      `}
      <div class="gallery-overlay">
        <div style="font-weight: 700; font-size: 0.98rem; font-family: 'Alexandria', sans-serif;">${item.title}</div>
        <p style="font-size: 0.82rem; color: #EAEFE9;">${item.description}</p>
      </div>
    </div>
  `).join('');
}

let currentGalleryIndex = 0;
function openLightbox(index) {
  currentGalleryIndex = index;
  const items = PORTFOLIO_DATA.gallery.items;
  const item = items[index];
  const modal = document.getElementById('lightboxModal');
  const content = document.getElementById('lightboxContent');
  if (!modal || !content) return;

  content.innerHTML = `
    ${item.type === 'image' ? `
      <img src="${getSafeAssetPath(item.src)}" class="lightbox-img" alt="${item.title}">
    ` : `
      <video src="${getSafeAssetPath(item.src)}" controls autoplay class="lightbox-video"></video>
    `}
    <h3 style="margin-top: 1rem; color: var(--bg-warm-white);">${item.title}</h3>
    <p style="font-size: 0.95rem; color: var(--primary-light);">${item.description}</p>
  `;

  modal.classList.add('active');
}

function prevLightbox() {
  const items = PORTFOLIO_DATA.gallery.items;
  currentGalleryIndex = (currentGalleryIndex - 1 + items.length) % items.length;
  openLightbox(currentGalleryIndex);
}

function nextLightbox() {
  const items = PORTFOLIO_DATA.gallery.items;
  currentGalleryIndex = (currentGalleryIndex + 1) % items.length;
  openLightbox(currentGalleryIndex);
}

// 14. Future Plan
function renderFuturePlan(plan) {
  const container = document.getElementById('futurePlanContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="roadmap-container">
      ${plan.roadmap.map(s => `
        <div class="roadmap-step">
          <div class="roadmap-number">${s.step}</div>
          <div>
            <h3 style="font-size: 1.3rem; font-weight: 700; color: var(--primary-dark);">${s.goal}</h3>
            <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 1.25rem;"><strong>سبب الإقدام:</strong> ${s.reason}</p>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.25rem; font-size: 0.92rem;">
              <div>
                <strong style="color: var(--primary-dark);"><i class="fa-solid fa-list-check"></i> الخطوات المطلوب تنفيذها:</strong>
                <ul style="list-style: disc; padding-right: 1.25rem; margin-top: 0.35rem;">
                  ${s.requiredSteps.map(rs => `<li>${rs}</li>`).join('')}
                </ul>
              </div>
              <div>
                <p><strong><i class="fa-solid fa-wrench"></i> الموارد والأدوات:</strong> ${s.toolsNeeded}</p>
                <p style="margin-top: 0.5rem;"><strong><i class="fa-solid fa-clock"></i> الإطار الزمني:</strong> ${s.timeframe}</p>
                <p style="margin-top: 0.5rem;"><strong><i class="fa-solid fa-chart-line"></i> مؤشر النجاح:</strong> ${s.successIndicator}</p>
                <p style="margin-top: 0.5rem;"><strong><i class="fa-solid fa-graduation-cap"></i> المهارات المستهدفة:</strong> ${s.skillsToDevelop}</p>
              </div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// 15. Philosophy
function renderPhilosophy(phil) {
  const container = document.getElementById('philosophyContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="philosophy-card">
      ${phil.paragraphs.map((p, idx) => `
        ${idx === 1 ? `<img src="./assets/WhatsApp Image 2026-07-23 at 19.31.26.jpeg" alt="فلسفتي التربوية" style="width: 100%; max-height: 340px; object-fit: cover; border-radius: var(--radius-card); margin-bottom: 1.75rem;">` : ''}
        <p class="philosophy-paragraph">${p}</p>
      `).join('')}
    </div>
  `;
}

// 16. References
function renderReferences(refs) {
  const container = document.getElementById('referencesGrid');
  if (!container) return;

  container.innerHTML = refs.map(cat => `
    <div class="nature-card">
      <div class="ref-category-title">${cat.type}</div>
      <ul class="goal-list">
        ${cat.items.map(item => `
          <li style="display: flex; gap: 0.6rem;"><i class="fa-solid fa-bookmark" style="color: var(--primary); margin-top: 0.3rem;"></i> <span>${item.text}</span></li>
        `).join('')}
      </ul>
    </div>
  `).join('');
}

// 17. Contact
function renderContact(student) {
  const container = document.getElementById('contactContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="contact-container">
      <div class="nature-card">
        <h3 class="cv-block-title"><i class="fa-solid fa-address-book"></i> معلومات التواصل</h3>
        <p style="font-size: 1rem; margin-bottom: 1.5rem;">يسعدني التواصل والتعاون في المبادرات والأعمال التربوية والميدانية.</p>
        
        <div class="cv-info-list" style="display: flex; flex-direction: column; gap: 1rem; font-size: 1rem;">
          <div class="cv-info-item"><i class="fa-solid fa-user" style="color: var(--primary);"></i> <span><strong>الاسم:</strong> ${student.name}</span></div>
          <div class="cv-info-item"><i class="fa-solid fa-graduation-cap" style="color: var(--primary);"></i> <span><strong>التخصص:</strong> ${student.specialty}</span></div>
          <div class="cv-info-item"><i class="fa-solid fa-building-columns" style="color: var(--primary);"></i> <span><strong>المؤسسة:</strong> ${student.institution}</span></div>
          <div class="cv-info-item"><i class="fa-solid fa-location-dot" style="color: var(--primary);"></i> <span><strong>السكن:</strong> ${student.residence}</span></div>
        </div>
      </div>

      <div class="nature-card">
        <form class="contact-form" onsubmit="handleContactSubmit(event)">
          <div class="form-group">
            <label>الاسم الكامل</label>
            <input type="text" required class="form-control" placeholder="أدخل اسمك هنا">
          </div>
          <div class="form-group">
            <label>البريد الإلكتروني</label>
            <input type="email" required class="form-control" placeholder="example@domain.com">
          </div>
          <div class="form-group">
            <label>موضوع الرسالة</label>
            <input type="text" required class="form-control" placeholder="موضوع التواصل">
          </div>
          <div class="form-group">
            <label>نص الرسالة</label>
            <textarea required class="form-control" placeholder="اكتب رسالتك هنا..."></textarea>
          </div>
          <button type="submit" class="btn-primary" style="justify-content: center; margin-top: 0.5rem;">
            <i class="fa-solid fa-paper-plane"></i> إرسال الرسالة
          </button>
        </form>
      </div>
    </div>
  `;
}

function handleContactSubmit(e) {
  e.preventDefault();
  alert('شكراً لتواصلك! تم استلام رسالتك بنجاح وسأقوم بالرد عليك في أقرب وقت.');
  e.target.reset();
}

function initModals() {
  const modalBackdrop = document.getElementById('detailModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');

  if (modalCloseBtn && modalBackdrop) {
    modalCloseBtn.addEventListener('click', () => modalBackdrop.classList.remove('active'));
  }
  if (lightboxCloseBtn && lightboxModal) {
    lightboxCloseBtn.addEventListener('click', () => lightboxModal.classList.remove('active'));
  }
}

function openObsModal(id) {
  const obs = PORTFOLIO_DATA.observations.find(o => o.id === id);
  if (!obs) return;

  const backdrop = document.getElementById('detailModal');
  const body = document.getElementById('modalBody');
  if (!backdrop || !body) return;

  body.innerHTML = `
    <span class="obs-badge">${obs.categoryTitle}</span>
    <h2 style="color: var(--primary-dark); font-size: 1.6rem; margin: 0.5rem 0;">${obs.title}</h2>
    <p style="color: var(--text-muted); margin-bottom: 1.5rem;"><i class="fa-solid fa-calendar"></i> ${obs.date} | ${obs.school} (${obs.grade})</p>
    
    <div style="display: flex; flex-direction: column; gap: 1rem; font-size: 1rem;">
      <div><strong>الموضوع والهدف:</strong> ${obs.topic} - ${obs.objectives}</div>
      <div><strong>المهارات الإدراكية:</strong> ${obs.cognitiveSkills}</div>
      <div><strong>المهارات الشخصية:</strong> ${obs.personalSkills}</div>
      <div><strong>المهارات الاجتماعية:</strong> ${obs.socialSkills}</div>
      <div><strong>القيم المستهدفة:</strong> ${obs.values}</div>
      <div style="background: var(--primary-soft); padding: 1.25rem; border-radius: var(--radius-sm);">
        <strong style="color: var(--primary-dark);">نقاط القوة:</strong> ${obs.strengths}
      </div>
      <div><strong>نقاط للتحسين:</strong> ${obs.improvements}</div>
      <div><strong>ملاحظات نهائية:</strong> ${obs.notes}</div>
    </div>

    <div style="display: flex; gap: 1rem; margin-top: 2rem;">
      <a href="${getSafeAssetPath(obs.file)}" download class="btn-fill"><i class="fa-solid fa-download"></i> تحميل الملف (Word)</a>
    </div>
  `;

  backdrop.classList.add('active');
}

function openLpModal(id) {
  const lp = PORTFOLIO_DATA.lessonPlans.find(l => l.id === id);
  if (!lp) return;

  const backdrop = document.getElementById('detailModal');
  const body = document.getElementById('modalBody');
  if (!backdrop || !body) return;

  body.innerHTML = `
    <span class="obs-badge">${lp.date}</span>
    <h2 style="color: var(--primary-dark); font-size: 1.6rem; margin: 0.5rem 0;">${lp.title}</h2>
    <p style="color: var(--text-muted); margin-bottom: 1.5rem;"><i class="fa-solid fa-school"></i> ${lp.school} | ${lp.grade}</p>
    
    <div style="display: flex; flex-direction: column; gap: 1rem; font-size: 1rem;">
      <div><strong>الأهداف الإدراكية:</strong> ${lp.cognitiveObjectives.join(' ')}</div>
      <div><strong>الأهداف العاطفية:</strong> ${lp.emotionalObjectives.join(' ')}</div>
      <div><strong>الأهداف الاجتماعية:</strong> ${lp.socialObjectives.join(' ')}</div>
      <div><strong>وسائل الإيضاح:</strong> ${lp.aids}</div>
      <div><strong>الافتتاحية:</strong> ${lp.opening}</div>
      <div><strong>سير اللقاء:</strong> ${lp.flow}</div>
      <div><strong>النشاط الرئيسي:</strong> ${lp.activity}</div>
      <div><strong>الإجمال والتقويم:</strong> ${lp.summary}</div>
    </div>

    <div style="display: flex; gap: 1rem; margin-top: 2rem;">
      <a href="${getSafeAssetPath(lp.file)}" download class="btn-fill"><i class="fa-solid fa-download"></i> تحميل تخطيط الدرس (Word)</a>
    </div>
  `;

  backdrop.classList.add('active');
}

function openProjModal(id) {
  const proj = PORTFOLIO_DATA.projects.find(p => p.id === id);
  if (!proj) return;

  const backdrop = document.getElementById('detailModal');
  const body = document.getElementById('modalBody');
  if (!backdrop || !body) return;

  body.innerHTML = `
    <span class="obs-badge">${proj.subtitle}</span>
    <h2 style="color: var(--primary-dark); font-size: 1.6rem; margin: 0.5rem 0;">${proj.title}</h2>
    
    <div style="display: flex; flex-direction: column; gap: 1rem; font-size: 1rem; margin-top: 1rem;">
      <div><strong>المشكلة التربوية:</strong> ${proj.problem}</div>
      <div><strong>الفئة المستهدفة:</strong> ${proj.targetGroup}</div>
      <div><strong>الهدف التربوي:</strong> ${proj.goal}</div>
      <div><strong>فكرة النشاط والأنشطة:</strong> ${proj.idea}</div>
      <div><strong>المنتج النهائي:</strong> ${proj.product}</div>
      <div><strong>دمج STEM/التكنولوجيا:</strong> ${proj.stemIntegration}</div>
      <div><strong>الأثر المتوقع:</strong> ${proj.expectedImpact}</div>
      <div><strong>الإطار النظري:</strong> ${proj.theoreticalFramework}</div>
    </div>

    <div style="display: flex; gap: 1rem; margin-top: 2rem; flex-wrap: wrap;">
      ${proj.chatbotUrl ? `
        <a href="${proj.chatbotUrl}" target="_blank" class="btn-primary"><i class="fa-solid fa-robot"></i> فتح الشات بوت</a>
      ` : ''}
      <a href="${getSafeAssetPath(proj.file)}" download class="btn-fill"><i class="fa-solid fa-download"></i> تحميل المستند</a>
    </div>
  `;

  backdrop.classList.add('active');
}

function initSearch() {
  const searchInput = document.getElementById('searchInput');
  const dropdown = document.getElementById('searchResultsDropdown');
  if (!searchInput || !dropdown) return;

  const searchIndex = [
    { title: "الرئيسية", category: "صفحة", link: "index.html" },
    { title: "عن الطالبة", category: "صفحة", link: "about.html" },
    { title: "السيرة الذاتية", category: "صفحة", link: "cv.html" },
    { title: "الأهداف والتطلعات", category: "صفحة", link: "goals.html" },
    { title: "الإنجازات والمشاركات", category: "صفحة", link: "achievements.html" },
    { title: "المشاهدات الصفية", category: "صفحة", link: "observations.html" },
    { title: "تخطيطات الدروس", category: "صفحة", link: "lesson-plans.html" },
    { title: "تقييمات الدروس", category: "صفحة", link: "evaluations.html" },
    { title: "المشاريع والأعمال", category: "صفحة", link: "projects.html" },
    { title: "التكامل بين النظرية والتطبيق", category: "صفحة", link: "theories.html" },
    { title: "التأملات الانعكاسية", category: "صفحة", link: "reflections.html" },
    { title: "المهارات والخبرات", category: "صفحة", link: "skills.html" },
    { title: "معرض الصور والفيديوهات", category: "صفحة", link: "gallery.html" },
    { title: "خطة التطوير المستقبلي", category: "صفحة", link: "future-plan.html" },
    { title: "فلسفتي التربوية", category: "صفحة", link: "philosophy.html" },
    { title: "المراجع وقائمة المصادر", category: "صفحة", link: "references.html" },
    { title: "تواصل معي", category: "صفحة", link: "contact.html" }
  ];

  const data = PORTFOLIO_DATA;
  if (data) {
    data.projects.forEach(p => searchIndex.push({ title: p.title, category: "مشروع", link: "projects.html" }));
    data.observations.forEach(o => searchIndex.push({ title: o.title, category: "مشاهدة صفية", link: "observations.html" }));
    data.lessonPlans.forEach(l => searchIndex.push({ title: l.title, category: "تخطيط درس", link: "lesson-plans.html" }));
  }

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    if (query.length === 0) {
      dropdown.classList.remove('active');
      return;
    }

    const matches = searchIndex.filter(item => item.title.toLowerCase().includes(query));
    if (matches.length > 0) {
      dropdown.innerHTML = matches.map(m => `
        <div class="search-item" onclick="selectSearchResult('${m.link}')">
          <div class="search-item-title">${m.title}</div>
          <div class="search-item-category">${m.category}</div>
        </div>
      `).join('');
      dropdown.classList.add('active');
    } else {
      dropdown.innerHTML = '<div class="search-item"><div class="search-item-category">لا توجد نتائج مطابقة</div></div>';
      dropdown.classList.add('active');
    }
  });

  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove('active');
    }
  });
}

function selectSearchResult(link) {
  const dropdown = document.getElementById('searchResultsDropdown');
  if (dropdown) dropdown.classList.remove('active');
  window.location.href = link;
}

function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
