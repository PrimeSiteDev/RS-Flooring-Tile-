/* ============================================================
   RS Flooring & Tile — main.js
   Plain JavaScript — no frameworks
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Navbar scroll effect ---------- */
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }, { passive: true });

  /* ---------- Smooth scroll for all anchor links ---------- */
  document.querySelectorAll('a[href^="#"], button[data-scroll]').forEach(el => {
    el.addEventListener("click", (e) => {
      const target = el.getAttribute("href") || el.dataset.scroll;
      if (target && target.startsWith("#")) {
        e.preventDefault();
        const section = document.querySelector(target);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  /* ---------- Scroll to top (logo click) ---------- */
  document.querySelectorAll("[data-scroll-top]").forEach(el => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  /* ---------- Mobile menu ---------- */
  const mobileBtn = document.querySelector(".mobile-menu-btn");
  const mobileOverlay = document.querySelector(".mobile-overlay");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link, .mobile-phone");

  if (mobileBtn && mobileOverlay) {
    mobileBtn.addEventListener("click", () => {
      const isOpen = mobileOverlay.classList.toggle("open");
      mobileBtn.innerHTML = isOpen ? closeSVG : menuSVG;
    });
    mobileLinks.forEach(link => {
      link.addEventListener("click", () => {
        mobileOverlay.classList.remove("open");
        mobileBtn.innerHTML = menuSVG;
      });
    });
  }

  /* ---------- Intersection Observer for scroll animations ---------- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "-50px" });

  document.querySelectorAll(".animate-on-scroll").forEach(el => {
    observer.observe(el);
  });

  /* ---------- Gallery Lightbox ---------- */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCategory = document.getElementById("lightbox-category");
  const galleryItems = document.querySelectorAll(".gallery-item");
  let currentIndex = 0;

  const projectData = [];
  galleryItems.forEach((item, i) => {
    const img = item.querySelector("img");
    const cat = item.dataset.category || "";
    projectData.push({ src: img.src, alt: img.alt, category: cat });
    item.addEventListener("click", () => openLightbox(i));
  });

  function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }

  function updateLightbox() {
    const p = projectData[currentIndex];
    if (p) {
      lightboxImg.src = p.src;
      lightboxImg.alt = p.alt;
      lightboxCategory.textContent = p.category;
    }
  }

  document.querySelector(".lightbox-close")?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.querySelector(".lightbox-prev")?.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + projectData.length) % projectData.length;
    updateLightbox();
  });
  document.querySelector(".lightbox-next")?.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % projectData.length;
    updateLightbox();
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + projectData.length) % projectData.length;
      updateLightbox();
    }
    if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % projectData.length;
      updateLightbox();
    }
  });
});

/* ---------- SVG icon strings ---------- */
const menuSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`;
const closeSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;
