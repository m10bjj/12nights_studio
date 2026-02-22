// ===========================
// 별 배경 생성
// ===========================
function createStars() {
  const container = document.getElementById('stars');
  if (!container) return;

  for (let i = 0; i < 120; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    const size = Math.random() * 2.5 + 0.5;
    star.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      --d: ${Math.random() * 4 + 2}s;
      --delay: ${Math.random() * 4}s;
    `;
    container.appendChild(star);
  }
}

// ===========================
// 네비게이션 스크롤 효과
// ===========================
function initNavbar() {
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

// ===========================
// 모바일 메뉴
// ===========================
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });
}

// ===========================
// 스크롤 등장 애니메이션
// ===========================
function initAOS() {
  const elements = document.querySelectorAll('[data-aos]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        // 카드 그리드일 경우 순차적 딜레이
        const siblings = entry.target.parentElement.querySelectorAll('[data-aos]');
        let delay = 0;
        siblings.forEach((el, i) => {
          if (el === entry.target) delay = i * 100;
        });

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}

// ===========================
// 부드러운 앵커 스크롤
// ===========================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();

      const navH = document.getElementById('navbar').offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

// ===========================
// 현재 섹션 네비 하이라이트
// ===========================
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.style.color = 'var(--accent)';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
}

// ===========================
// 초기화
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  createStars();
  initNavbar();
  initMobileMenu();
  initAOS();
  initSmoothScroll();
  initActiveNav();
});
