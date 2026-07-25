import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

def create_page(filename, active_id, page_title, tagline, heading, subtitle, bg_image, content_html):
    navbar_links = [
        ("index.html", "الرئيسية"),
        ("about.html", "عن الطالبة"),
        ("cv.html", "السيرة الذاتية"),
        ("goals.html", "الأهداف"),
        ("achievements.html", "الإنجازات"),
        ("observations.html", "المشاهدات"),
        ("lesson-plans.html", "الدروس"),
        ("evaluations.html", "التقييمات"),
        ("projects.html", "المشاريع"),
        ("theories.html", "النظرية والتطبيق"),
        ("reflections.html", "التأملات"),
        ("skills.html", "المهارات"),
        ("gallery.html", "المعرض"),
        ("future-plan.html", "خطة المستقبل"),
        ("philosophy.html", "فلسفتي"),
        ("references.html", "المراجع"),
        ("contact.html", "تواصل معي")
    ]

    nav_items_html = ""
    for url, label in navbar_links:
        is_act = "active" if url == filename else ""
        nav_items_html += f'<a href="{url}" class="nav-link {is_act}">{label}</a>\n'

    header_section_html = ""
    if filename == "index.html":
        header_section_html = """
  <!-- Hero Section -->
  <header id="hero" class="hero-section">
    <div id="heroContainer"></div>
  </header>
        """
    else:
        header_section_html = f"""
  <!-- Page Header Banner -->
  <header class="section-padding section-with-bg" style="background-image: url('{bg_image}'); padding-top: 8.5rem; padding-bottom: 4rem;">
    <div class="container text-center">
      <span class="section-tagline">{tagline}</span>
      <h1 class="section-title" style="color: var(--primary-dark); font-size: clamp(2rem, 4vw, 3.2rem);">{heading}</h1>
      <p class="section-subtitle">{subtitle}</p>
    </div>
  </header>
        """

    html = f"""<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{page_title} - بورتفوليو بيلار رعد</title>
  
  <meta name="description" content="{heading} - بورتفوليو بيلار رعد الرقمي في التربية غير المنهجية والتربية الخاصة.">
  <meta name="author" content="بيلار رعد">

  <!-- Google Fonts: Alexandria & Tajawal -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Alexandria:wght@400;500;600;700;800&family=Tajawal:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- FontAwesome Icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  
  <!-- CSS Stylesheet -->
  <link rel="stylesheet" href="./css/styles.css">
</head>
<body>

  <!-- Scroll Progress Indicator Bar -->
  <div class="scroll-progress-container">
    <div class="scroll-progress-bar" id="scrollProgressBar"></div>
  </div>

  <!-- Sticky Translucent Navbar with Scroll Controls -->
  <nav class="navbar">
    <div class="navbar-container">
      <a href="index.html" class="nav-brand">
        <i class="fa-solid fa-tree"></i>
        <span>بيلار رعد</span>
      </a>

      <!-- Navigation Links Container with Scroll Arrows -->
      <div class="nav-menu-wrapper" id="navMenuWrapper">
        <button class="nav-scroll-btn" onclick="scrollNavRight()" title="إلى اليمين"><i class="fa-solid fa-chevron-right"></i></button>
        <div class="nav-menu" id="navMenu">
          {nav_items_html}
        </div>
        <button class="nav-scroll-btn" onclick="scrollNavLeft()" title="إلى اليسار"><i class="fa-solid fa-chevron-left"></i></button>
      </div>

      <!-- Live Search Box -->
      <div class="search-wrapper">
        <div class="search-input-box">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" id="searchInput" placeholder="ابحث في الموقع..." aria-label="البحث">
        </div>
        <div class="search-results-dropdown" id="searchResultsDropdown"></div>
      </div>

      <!-- Hamburger Menu for Mobile -->
      <button class="hamburger-btn" id="hamburgerBtn" aria-label="قائمة التصفح">
        <i class="fa-solid fa-bars"></i>
      </button>
    </div>
  </nav>

  {header_section_html}

  <!-- Page Main Content Section -->
  <main class="section-padding" style="background-color: var(--bg-beige); min-height: 60vh;">
    <div class="container">
      {content_html}
    </div>
  </main>

  <!-- Footer -->
  <footer class="footer">
    <div class="footer-content">
      <div>
        <div class="footer-brand"><i class="fa-solid fa-tree"></i> بورتفوليو بيلار رعد الرقمي</div>
        <p style="font-size: 0.95rem; color: var(--primary-light); margin-top: 0.35rem;">تخصص التربية الخاصة والتربية غير المنهجية - أكاديمية القاسمي</p>
      </div>
      <div style="font-size: 0.95rem; color: var(--primary-light);">
        السنة الدراسية الثانية (2025 - 2026) | مدرسة الأندلس الثانوية الشاملة
      </div>
    </div>
    <div class="footer-bottom">
      &copy; 2026 بيلار رعد. جميع الحقوق محفوظة | بورتفوليو التطبيقات العملية في التربية غير المنهجية
    </div>
  </footer>

  <!-- Detail Modal Card -->
  <div class="modal-backdrop" id="detailModal">
    <div class="modal-card">
      <button class="modal-close-btn" id="modalCloseBtn" aria-label="إغلاق"><i class="fa-solid fa-xmark"></i></button>
      <div id="modalBody"></div>
    </div>
  </div>

  <!-- Lightbox Modal -->
  <div class="modal-backdrop" id="lightboxModal">
    <div class="modal-card lightbox-content" style="background: rgba(20, 28, 23, 0.96); max-width: 950px; padding: 2.5rem;">
      <button class="modal-close-btn" id="lightboxCloseBtn" aria-label="إغلاق"><i class="fa-solid fa-xmark"></i></button>
      <div id="lightboxContent"></div>
      <div class="lightbox-nav">
        <button onclick="prevLightbox()" class="btn-secondary" style="color: #fff; border-color: rgba(255,255,255,0.4);"><i class="fa-solid fa-arrow-right"></i> السابق</button>
        <button onclick="nextLightbox()" class="btn-secondary" style="color: #fff; border-color: rgba(255,255,255,0.4);">التالي <i class="fa-solid fa-arrow-left"></i></button>
      </div>
    </div>
  </div>

  <!-- Back to Top Button -->
  <button class="back-to-top-btn" id="backToTopBtn" aria-label="العودة إلى الأعلى">
    <i class="fa-solid fa-arrow-up"></i>
  </button>

  <!-- Application Scripts -->
  <script src="./js/data.js"></script>
  <script src="./js/app.js"></script>
</body>
</html>
"""

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'Generated page: {filename}')


index_content = """
<div style="margin-top: 1rem;">
  <div class="section-header">
    <span class="section-tagline">استكشف أقسام الموقع</span>
    <h2 class="section-title">أقسام بورتفوليو بيلار رعد</h2>
    <p class="section-subtitle">تصفح أقسام بورتفوليو التطبيقات العملية بالضغط على أي من البطاقات التالية:</p>
  </div>

  <div class="cards-grid">
    <div class="nature-card text-center">
      <img src="./assets/forest-section.jpg" alt="نبذة عن الطالبة" style="width:100%; height:160px; object-fit:cover; border-radius:var(--radius-sm); margin-bottom:1rem;">
      <h3 style="font-size: 1.25rem; color: var(--primary-dark); font-weight: 700; margin-bottom: 0.5rem;"><i class="fa-solid fa-user-graduate"></i> عن الطالبة</h3>
      <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 1.25rem;">تعرف على الطالبة بيلار رعد ورسالتها الميدانية وأكاديمية القاسمي.</p>
      <a href="about.html" class="btn-primary" style="justify-content: center;"><i class="fa-solid fa-arrow-left"></i> دخول الصفحة</a>
    </div>

    <div class="nature-card text-center">
      <img src="./assets/mountains-background.jpg" alt="السيرة الذاتية" style="width:100%; height:160px; object-fit:cover; border-radius:var(--radius-sm); margin-bottom:1rem;">
      <h3 style="font-size: 1.25rem; color: var(--primary-dark); font-weight: 700; margin-bottom: 0.5rem;"><i class="fa-solid fa-id-card"></i> السيرة الذاتية</h3>
      <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 1.25rem;">البيانات الشخصية، والخبرات الميدانية، والتعليم الأكاديمي.</p>
      <a href="cv.html" class="btn-primary" style="justify-content: center;"><i class="fa-solid fa-arrow-left"></i> دخول الصفحة</a>
    </div>

    <div class="nature-card text-center">
      <img src="./assets/lake-background.jpg" alt="الأهداف والتطلعات" style="width:100%; height:160px; object-fit:cover; border-radius:var(--radius-sm); margin-bottom:1rem;">
      <h3 style="font-size: 1.25rem; color: var(--primary-dark); font-weight: 700; margin-bottom: 0.5rem;"><i class="fa-solid fa-bullseye"></i> الأهداف والتطلعات</h3>
      <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 1.25rem;">الأهداف الأكاديمية والمهنية والشخصية قصيرة وطويلة المدى.</p>
      <a href="goals.html" class="btn-primary" style="justify-content: center;"><i class="fa-solid fa-arrow-left"></i> دخول الصفحة</a>
    </div>

    <div class="nature-card text-center">
      <img src="./assets/WhatsApp Image 2026-07-23 at 19.31.25.jpeg" alt="المشاهدات الصفية" style="width:100%; height:160px; object-fit:cover; border-radius:var(--radius-sm); margin-bottom:1rem;">
      <h3 style="font-size: 1.25rem; color: var(--primary-dark); font-weight: 700; margin-bottom: 0.5rem;"><i class="fa-solid fa-chalkboard-user"></i> المشاهدات الصفية</h3>
      <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 1.25rem;">مشاهدات الدروس في مدرسة الأندلس الثانوية وتحليل التفاعل الصفي.</p>
      <a href="observations.html" class="btn-primary" style="justify-content: center;"><i class="fa-solid fa-arrow-left"></i> دخول الصفحة</a>
    </div>

    <div class="nature-card text-center">
      <img src="./assets/WhatsApp Image 2026-07-23 at 19.31.26.jpeg" alt="تخطيطات الدروس" style="width:100%; height:160px; object-fit:cover; border-radius:var(--radius-sm); margin-bottom:1rem;">
      <h3 style="font-size: 1.25rem; color: var(--primary-dark); font-weight: 700; margin-bottom: 0.5rem;"><i class="fa-solid fa-book-open"></i> تخطيطات الدروس</h3>
      <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 1.25rem;">خطط الدروس المخططة والمنفذة للصف 11 بالمدرسة.</p>
      <a href="lesson-plans.html" class="btn-primary" style="justify-content: center;"><i class="fa-solid fa-arrow-left"></i> دخول الصفحة</a>
    </div>

    <div class="nature-card text-center">
      <img src="./assets/ChatGPT Image 18 مايو 2026، 09_43_15 م.png" alt="المشاريع والأعمال" style="width:100%; height:160px; object-fit:cover; border-radius:var(--radius-sm); margin-bottom:1rem;">
      <h3 style="font-size: 1.25rem; color: var(--primary-dark); font-weight: 700; margin-bottom: 0.5rem;"><i class="fa-solid fa-laptop-code"></i> المشاريع والأعمال</h3>
      <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 1.25rem;">مشروع رفيق، Canva ريادة الأعمال، وشات بوت الذكاء الاصطناعي.</p>
      <a href="projects.html" class="btn-primary" style="justify-content: center;"><i class="fa-solid fa-arrow-left"></i> دخول الصفحة</a>
    </div>

    <div class="nature-card text-center">
      <img src="./assets/WhatsApp Image 2026-07-23 at 19.31.26 (3).jpeg" alt="التأملات الانعكاسية" style="width:100%; height:160px; object-fit:cover; border-radius:var(--radius-sm); margin-bottom:1rem;">
      <h3 style="font-size: 1.25rem; color: var(--primary-dark); font-weight: 700; margin-bottom: 0.5rem;"><i class="fa-solid fa-feather"></i> التأملات الانعكاسية</h3>
      <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 1.25rem;">التأمل الذاتي، سيرورة التطور الإنساني، والتغذية المرتدة.</p>
      <a href="reflections.html" class="btn-primary" style="justify-content: center;"><i class="fa-solid fa-arrow-left"></i> دخول الصفحة</a>
    </div>

    <div class="nature-card text-center">
      <img src="./assets/PHOTO-2025-07-02-19-57-45.jpg" alt="معرض الصور والفيديوهات" style="width:100%; height:160px; object-fit:cover; border-radius:var(--radius-sm); margin-bottom:1rem;">
      <h3 style="font-size: 1.25rem; color: var(--primary-dark); font-weight: 700; margin-bottom: 0.5rem;"><i class="fa-solid fa-images"></i> المعرض التفاعلي</h3>
      <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 1.25rem;">الصور والفيديوهات الميدانية وتنزيل الملف الكامل ZIP.</p>
      <a href="gallery.html" class="btn-primary" style="justify-content: center;"><i class="fa-solid fa-arrow-left"></i> دخول الصفحة</a>
    </div>
  </div>
</div>
"""

create_page("index.html", "hero", "الرئيسية", "", "", "", "./assets/nature-hero.jpg", index_content)
create_page("about.html", "aboutStudent", "عن الطالبة", "تعرّف عليّ", "نبذة قصيرة عن الطالبة بيلار رعد", "شغف بالتربية الخاصة والتربية غير المنهجية وتمكين الشباب", "./assets/forest-section.jpg", '<div id="aboutStudentContainer"></div>')
create_page("cv.html", "cv", "السيرة الذاتية", "مسيرتي الأكاديمية", "السيرة الذاتية والخبرات الميدانية", "ملخص المسار التعليمي والعملي والمهارات المكتسبة", "./assets/mountains-background.jpg", '<div class="cv-container" id="cvContainer"></div>')
create_page("goals.html", "goals", "الأهداف والتطلعات", "تجاربي وتطلعاتي", "الأهداف والتطلعات المستقبليّة", "الأهداف الأكاديمية والمهنية والشخصية واستراتيجيات تحقيقها", "./assets/lake-background.jpg", '<div id="goalsContainer"></div>')
create_page("achievements.html", "achievements", "الإنجازات والمشاركات", "أبرز أعمالي", "الإنجازات والمشاركات التربوية", "توثيق للمبادرات والمشاركات الميدانية بترتيب زمني", "./assets/forest-section.jpg", '<div id="achievementsContainer"></div>')
create_page("observations.html", "observations", "المشاهدات الصفية", "تطبيقاتي الميدانية", "المشاهدات الصفية في المدرسة", "تحليل وملاحظات دروس التربية غير المنهجية بثانوية الأندلس", "./assets/mountains-background.jpg", '<div class="filter-bar" id="obsFilterContainer"></div><div class="cards-grid" id="obsGrid"></div>')
create_page("lesson-plans.html", "lessonPlans", "تخطيطات الدروس", "خطط العمل", "تخطيطات الدروس النموذجية", "الدروس المخططة والمنفذة للصف الحادي عشر وفق المعايير", "./assets/lake-background.jpg", '<div class="cards-grid" id="lessonPlansGrid"></div>')
create_page("evaluations.html", "evaluations", "تقييمات الدروس", "مؤشرات الأداء", "نماذج وتقييمات المرشدات", "تقييمات د. دعاء مقاري والأستاذة شذى عنبوسي", "./assets/forest-section.jpg", '<div id="evaluationsGrid"></div>')
create_page("projects.html", "projects", "المشاريع والأعمال", "الابتكارات والمبادرات", "المشاريع والأعمال المبتكرة", "مشروع رفيق، Canva ريادة الأعمال، وشات بوت الذكاء الاصطناعي", "./assets/lake-background.jpg", '<div class="cards-grid" id="projectsGrid"></div>')
create_page("theories.html", "theories", "النظرية والتطبيق", "الأسس التربوية", "التكامل بين النظرية والتطبيق", "النظريات التربوية (PBL, NFE, Freire, SEL) وتطبيقاتها", "./assets/mountains-background.jpg", '<div class="cards-grid" id="theoriesGrid"></div>')
create_page("reflections.html", "reflections", "التأملات وقصص النجاح", "رحلة التعلم والتطور", "التأملات الشخصية والانعكاسات", "سيرورة التفكير الانعكاسي والتطوير الذاتي وملاحظات المرشدين", "./assets/forest-section.jpg", '<div id="reflectionsContainer"></div>')
create_page("skills.html", "skills", "المهارات والخبرات", "قدرات ومؤهلات", "المهارات والكفاءات التربوية", "المهارات البيداغوجية والبيانات الرقمية والقيادة الميدانية", "./assets/lake-background.jpg", '<div class="cards-grid" id="skillsGrid"></div>')
create_page("gallery.html", "gallery", "معرض الصور والفيديوهات", "التوثيق البصري", "معرض الصور والفيديوهات التفاعلي", "توثيق بصري شامل للتطبيقات العملية وتنزيل الملف الكامل", "./assets/mountains-background.jpg", '<div id="zipBtnContainer" class="text-center"></div><div class="gallery-grid" id="galleryGrid"></div>')
create_page("future-plan.html", "futurePlan", "خطة التطوير المستقبلي", "الخطة الاستراتيجية", "خطة التطوير المهني المستقبلي", "خارطة طريق الأهداف المستهدفة والموارد ومؤشرات النجاح", "./assets/forest-section.jpg", '<div id="futurePlanContainer"></div>')
create_page("philosophy.html", "philosophy", "فلسفتي التربوية", "رؤيتي التربوية", "فلسفتي التربوية الشخصية", "المعتقدات الأساسية والتطوير الميداني للمربية بيلار رعد", "./assets/lake-background.jpg", '<div id="philosophyContainer"></div>')
create_page("references.html", "references", "المراجع والمصادر", "التوثيق الأكاديمي", "المراجع وقائمة المصادر (APA 7)", "قائمة التوثيق الأكاديمي والكتب والمنصات الرقمية المستعملة", "./assets/mountains-background.jpg", '<div class="references-grid" id="referencesGrid"></div>')
create_page("contact.html", "contact", "تواصل معي", "تواصل مباشر", "تواصل مع المربية بيلار رعد", "نموذج تواصل مباشر لمشاركة المبادرات والأفكار التربوية", "./assets/forest-section.jpg", '<div id="contactContainer"></div>')

print('All 17 pages updated with scroll controls!')
