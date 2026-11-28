import { firebaseConfig, firebaseEnabled } from "./firebase-config.js";

// Yahan apna Cloudinary LOGO.png URL paste karein (jaise: "https://res.cloudinary.com/.../LOGO.png")
const DEFAULT_LOGO_URL = "LOGO.png";

const DB_URL = (firebaseConfig.databaseURL || "").replace(/\/$/, "");

function optimizeCloudinaryUrl(url) {
  const clean = String(url || "").trim();
  if (clean.includes("res.cloudinary.com") && clean.includes("/image/upload/") && !clean.includes("f_auto")) {
    return clean.replace("/image/upload/", "/image/upload/f_auto,q_auto/");
  }
  return clean;
}

function applyBrandLogo(customUrl) {
  const rawUrl = (customUrl && String(customUrl).trim()) || DEFAULT_LOGO_URL;
  const targetUrl = optimizeCloudinaryUrl(rawUrl);
  if (!targetUrl) return;

  document.querySelectorAll("img").forEach((img) => {
    const srcAttr = img.getAttribute("src") || "";
    if (img.dataset.brandLogo === "true" || srcAttr === "LOGO.png" || srcAttr.endsWith("/LOGO.png")) {
      img.dataset.brandLogo = "true";
      if (img.classList.contains("brand-logo")) {
        img.fetchPriority = "high";
        img.loading = "eager";
      }
      if (img.getAttribute("src") !== targetUrl) {
        img.src = targetUrl;
      }
    }
  });

  document.querySelectorAll('link[rel="icon"], link[rel="apple-touch-icon"]').forEach((link) => {
    if (link.getAttribute("href") !== targetUrl) {
      link.setAttribute("href", targetUrl);
    }
  });
}

// Run immediately before anything else loads
applyBrandLogo();

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

// Mobile menu toggle & outside-click close
const toggle = document.querySelector("#menuToggle");
const nav = document.querySelector("#mainNav");

toggle?.addEventListener("click", (event) => {
  event.stopPropagation();
  nav?.classList.toggle("open");
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

document.addEventListener("click", (event) => {
  if (nav?.classList.contains("open") && !nav.contains(event.target) && event.target !== toggle) {
    nav.classList.remove("open");
  }
});

// Lazy-load below-the-fold images for instant mobile paint
document.querySelectorAll(".usage-card img, .footer-logo").forEach((img) => {
  img.loading = "lazy";
  img.decoding = "async";
});

// 10 Official Brand Kit Circular Social Media Icons
const SOCIAL_PLATFORMS = [
  {
    key: "youtube",
    label: "YouTube",
    defaultUrl: "https://www.youtube.com",
    svg: `<svg viewBox="0 0 24 24"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/></svg>`
  },
  {
    key: "instagram",
    label: "Instagram",
    defaultUrl: "https://www.instagram.com",
    svg: `<svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1.1.4 2.2.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1.1.4-2.2.4-1.3.1-1.6.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1.1-.4-2.2-.1-1.3-.1-1.6-.1-4.9s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1.1-.4 2.2-.4 1.3-.1 1.6-.1 4.9-.1zm0-2.2C8.7 0 8.3 0 7 .1 5.7.1 4.8.3 4 .6c-.8.3-1.5.7-2.2 1.4C1.1 2.7.7 3.4.4 4.2.1 5 0 5.9 0 7.2 0 8.5 0 8.9 0 12.2s0 3.7.1 5c.1 1.3.2 2.2.5 3 .3.8.7 1.5 1.4 2.2.7.7 1.4 1.1 2.2 1.4.8.3 1.7.5 3 .5 1.3.1 1.7.1 5 .1s3.7 0 5-.1c1.3-.1 2.2-.2 3-.5.8-.3 1.5-.7 2.2-1.4.7-.7 1.1-1.4 1.4-2.2.3-.8.5-1.7.5-3 .1-1.3.1-1.7.1-5s0-3.7-.1-5c-.1-1.3-.2-2.2-.5-3-.3-.8-.7-1.5-1.4-2.2C21.5 1.3 20.8.9 20 .6c-.8-.3-1.7-.5-3-.5C15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.9 1.4 1.4 0 0 0 0-2.9z"/></svg>`
  },
  {
    key: "facebook",
    label: "Facebook",
    defaultUrl: "https://www.facebook.com",
    svg: `<svg viewBox="0 0 24 24"><path d="M13.5 22v-8.2h2.8l.4-3.2h-3.2V8.5c0-.9.3-1.6 1.6-1.6h1.7V4.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.3H7.3v3.2h2.8V22h3.4z"/></svg>`
  },
  {
    key: "x",
    label: "X (Twitter)",
    defaultUrl: "https://x.com",
    svg: `<svg viewBox="0 0 24 24"><path d="M18.2 2.25h3.3l-7.2 8.23 8.5 11.27h-6.6l-5.2-6.8-5.9 6.8H1.8l7.7-8.8L1.3 2.25h6.8l4.7 6.2 5.4-6.2zm-1.2 17.5h1.8L7.1 4.1H5.2l11.8 15.65z"/></svg>`
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    defaultUrl: "https://www.linkedin.com",
    svg: `<svg viewBox="0 0 24 24"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM2.8 9.8h4.3V21H2.8V9.8zm7 0h4.1v1.5h.1c.6-1.1 2-2.2 4.1-2.2 4.4 0 5.2 2.9 5.2 6.6V21h-4.3v-4.7c0-1.1 0-2.6-1.6-2.6s-1.8 1.2-1.8 2.5V21H9.8V9.8z"/></svg>`
  },
  {
    key: "telegram",
    label: "Telegram",
    defaultUrl: "https://t.me/akstarmods",
    svg: `<svg viewBox="0 0 24 24"><path d="M21.9 4.6c.3-1.2-.5-1.7-1.5-1.3L2.7 10.1c-1.2.5-1.2 1.2-.2 1.5l4.5 1.4 10.5-6.6c.5-.3 1-.1.6.2l-8.5 7.7-.3 4.6c.5 0 .7-.2 1-.5l2.2-2.1 4.5 3.3c.8.5 1.4.2 1.6-.8l3.3-14.2z"/></svg>`
  },
  {
    key: "whatsapp",
    label: "WhatsApp Channel",
    defaultUrl: "https://whatsapp.com/channel/0029VbCWnLiK5cDFgzgPH017",
    svg: `<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm5.8 14.1c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.5-.1-1.1-.4-1.8-.7-3.2-1.4-5.3-4.6-5.5-4.8-.2-.2-1.3-1.7-1.3-3.3 0-1.5.8-2.3 1.1-2.6.3-.3.6-.4.8-.4h.6c.2 0 .5-.1.7.5.3.7.9 2.2 1 2.4.1.2.1.4 0 .6-.1.2-.2.4-.4.6l-.4.5c-.2.2-.3.4-.1.7.2.3.9 1.5 2 2.4 1.4 1.2 2.5 1.6 2.9 1.8.3.1.5.1.7-.1.2-.2.9-1 1.1-1.4.2-.3.5-.3.8-.2.3.1 2 .9 2.3 1.1.3.2.6.3.6.4.1.2.1.9-.1 1.6z"/></svg>`
  },
  {
    key: "pinterest",
    label: "Pinterest",
    defaultUrl: "https://www.pinterest.com",
    svg: `<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.2-2 .1-2.9l1.3-5.4s-.3-.7-.3-1.6c0-1.5.9-2.6 2-2.6.9 0 1.4.7 1.4 1.5 0 .9-.6 2.3-.9 3.6-.3 1.1.5 2 1.6 2 1.9 0 3.4-2 3.4-4.9 0-2.6-1.8-4.4-4.5-4.4-3.1 0-4.9 2.3-4.9 4.7 0 .9.4 1.9.8 2.4.1.1.1.2.1.3l-.3 1.2c0 .2-.2.2-.4.1-1.3-.6-2.1-2.5-2.1-4 0-3.3 2.4-6.3 6.9-6.3 3.6 0 6.4 2.6 6.4 6 0 3.6-2.3 6.5-5.4 6.5-1.1 0-2.1-.6-2.4-1.2l-.7 2.5c-.2.9-.9 2.1-1.3 2.8A10 10 0 1 0 12 2z"/></svg>`
  },
  {
    key: "tiktok",
    label: "TikTok",
    defaultUrl: "https://www.tiktok.com",
    svg: `<svg viewBox="0 0 24 24"><path d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 1 1-1.8-2.5V9.7a5.8 5.8 0 1 0 4.9 5.7V9.1a7.4 7.4 0 0 0 4.3 1.4V7.4a4.3 4.3 0 0 1-3.2-1.6z"/></svg>`
  },
  {
    key: "website",
    label: "AK Star App Hub & Web",
    defaultUrl: "https://ak-star-store-app-hub-website.vercel.app/",
    svg: `<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.9 6h-3a15.3 15.3 0 0 0-1.4-3.6A8 8 0 0 1 18.9 8zM12 4c.8 1.2 1.5 2.6 1.9 4h-3.8c.4-1.4 1.1-2.8 1.9-4zM4.3 14a7.8 7.8 0 0 1 0-4h3.4a16.5 16.5 0 0 0 0 4H4.3zm.8 2h3a15.3 15.3 0 0 0 1.4 3.6A8 8 0 0 1 5.1 16zm3-8h-3a8 8 0 0 1 4.4-3.6A15.3 15.3 0 0 0 8.1 8zM12 20c-.8-1.2-1.5-2.6-1.9-4h3.8c-.4 1.4-1.1 2.8-1.9 4zm2.3-6H9.7a14.4 14.4 0 0 1 0-4h4.6a14.4 14.4 0 0 1 0 4zm.2 5.6A15.3 15.3 0 0 0 15.9 16h3a8 8 0 0 1-4.4 3.6zm1.8-5.6a16.5 16.5 0 0 0 0-4h3.4a7.8 7.8 0 0 1 0 4h-3.4z"/></svg>`
  }
];

const SERVICE_ID_TO_NAME = {
  photo: "Photo Studio",
  film: "Film Studio",
  design: "Design Studio",
  apps: "Apps Development",
  web: "Web Development",
  ai: "AI Solutions",
  music: "Music Production",
  software: "Software Solutions",
  products: "Digital Products",
  business: "Business Services"
};

function renderSocialCircles(socialsData = {}) {
  const visibleItems = SOCIAL_PLATFORMS.filter((item) => {
    const cfg = socialsData[item.key];
    if (typeof cfg === "object" && cfg !== null) return cfg.enabled !== false;
    return true;
  });

  document.querySelectorAll("[data-social-circles]").forEach((container) => {
    const wrapper = container.closest(".footer-social-box") || container.parentElement;
    if (!visibleItems.length) {
      if (wrapper) wrapper.style.display = "none";
      return;
    }
    if (wrapper) wrapper.style.display = "";
    container.className = visibleItems.length <= 5 ? "social-circles-flex" : "social-circles-grid";
    container.innerHTML = visibleItems.map((item) => {
      const cfg = socialsData[item.key];
      const url = (typeof cfg === "object" && cfg?.url) ? cfg.url : (typeof cfg === "string" && cfg ? cfg : item.defaultUrl);
      return `<a class="social-circle" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" title="${item.label}" aria-label="${item.label}">${item.svg}</a>`;
    }).join("");
  });
}

function renderFloatingWhatsapp(waCfg = {}) {
  if (document.body.dataset.admin) return;
  let waBtn = document.querySelector(".whatsapp-float");
  if (waCfg.enabled === false) {
    waBtn?.remove();
    return;
  }
  if (!waBtn) {
    waBtn = document.createElement("a");
    waBtn.className = "whatsapp-float";
    waBtn.target = "_blank";
    waBtn.rel = "noopener noreferrer";
    waBtn.setAttribute("aria-label", "Connect with AK STAR GLOBAL");
    document.body.appendChild(waBtn);
  }
  waBtn.href = waCfg.url || "https://whatsapp.com/channel/0029VbCWnLiK5cDFgzgPH017";
  waBtn.innerHTML = `<span class="whatsapp-dot"></span> ${escapeHtml(waCfg.label || "WhatsApp Channel ↗")}`;
}

function syncText(el, val, isHtml = false) {
  if (!el) return;
  if (el.dataset.orig === undefined) {
    el.dataset.orig = isHtml ? el.innerHTML : el.textContent;
  }
  if (val) {
    if (isHtml) el.innerHTML = val;
    else el.textContent = val;
  } else {
    if (isHtml) el.innerHTML = el.dataset.orig;
    else el.textContent = el.dataset.orig;
  }
}

function applySiteSettings(settings = {}) {
  // 0. Apply Cloudinary Brand Logo if configured
  applyBrandLogo(settings.logoUrl || "");

  // 1. Floating WhatsApp Button
  renderFloatingWhatsapp(settings.floatingWhatsapp || {});

  // 2. Sections Visibility
  const secs = settings.sections || {};
  const toggleSection = (selector, key) => {
    document.querySelectorAll(selector).forEach((el) => {
      el.style.display = secs[key] === false ? "none" : "";
    });
  };
  toggleSection(".hero-art", "heroArt");
  toggleSection(".intro", "intro");
  toggleSection(".services-section", "services");
  toggleSection(".brand-usage-section, .brand-usage-grid", "brandUsage");
  toggleSection(".process-section", "process");
  toggleSection(".faq-section", "faq");
  toggleSection(".manifesto", "manifesto");
  toggleSection(".cta-wrap", "cta");

  document.querySelectorAll("#portfolioGrid .project-card:not([data-cms])").forEach((c) => {
    c.style.display = secs.defaultPortfolio === false ? "none" : "";
  });

  // 3. Individual 10 Services Visibility
  const srvs = settings.services || {};
  Object.entries(SERVICE_ID_TO_NAME).forEach(([key, label]) => {
    const isHidden = srvs[key] === false;
    document.querySelectorAll(`a.brand-service-box[href$="#${key}"]`).forEach((card) => {
      card.style.display = isHidden ? "none" : "";
    });
    const article = document.getElementById(key);
    if (article) article.style.display = isHidden ? "none" : "";
    const select = document.querySelector('select[name="service"]');
    if (select) {
      Array.from(select.options).forEach((opt) => {
        if (opt.text.toLowerCase() === label.toLowerCase()) {
          opt.hidden = isHidden;
          opt.disabled = isHidden;
        }
      });
    }
  });

  // 4. Hero & Footer Text CMS
  const text = settings.text || {};
  syncText(
    document.querySelector(".hero-copy .eyebrow"),
    text.eyebrow ? `<i></i> ${escapeHtml(text.eyebrow)}` : "",
    true
  );
  syncText(document.querySelector(".hero-copy .hero-lead"), text.heroLead || "");

  const primaryBtn = document.querySelector(".hero-actions .btn-gold");
  if (primaryBtn) {
    syncText(primaryBtn, text.primaryBtnText || "");
    if (primaryBtn.dataset.origHref === undefined) {
      primaryBtn.dataset.origHref = primaryBtn.getAttribute("href") || "services.html";
    }
    primaryBtn.setAttribute("href", text.primaryBtnLink || primaryBtn.dataset.origHref);
  }

  syncText(document.querySelector(".footer-bottom span:first-child"), text.footerText || "");
}

// Instant Zero-Millisecond Render from Local Cache
try {
  const cached = JSON.parse(localStorage.getItem("akstar_cms_cache") || "null");
  renderSocialCircles(cached?.socials || {});
  applySiteSettings(cached?.settings || {});
} catch {
  renderSocialCircles({});
  applySiteSettings({});
}

// Fail-Safe Scroll-Reveal Animations
function initScrollReveal() {
  const targets = document.querySelectorAll(
    ".intro, .section-heading, .brand-service-box, .usage-card, .process-step, .faq-item, .manifesto, .cta-band, .project-card, .value-grid article, .service-list article, .channel-card"
  );
  if (!targets.length) return;

  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -20px 0px" }
  );

  targets.forEach((el, index) => {
    el.classList.add("reveal");
    el.style.transitionDelay = `${(index % 4) * 50}ms`;
    observer.observe(el);
  });

  setTimeout(() => {
    targets.forEach((el) => el.classList.add("is-visible"));
  }, 1200);
}
initScrollReveal();

// FAQ Accordion
function bindFaqEvents() {
  document.querySelectorAll(".faq-question").forEach((btn) => {
    if (btn.dataset.bound) return;
    btn.dataset.bound = "true";
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      item?.classList.toggle("open");
    });
  });
}
bindFaqEvents();

// Portfolio Category Filter
const filterBtns = document.querySelectorAll(".filter-btn");
if (filterBtns.length) {
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      document.querySelectorAll(".project-card").forEach((card) => {
        const match = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("hidden", !match);
      });
    });
  });
}

// Smart Service Pre-Select on contact.html (?service=...)
const serviceSelect = document.querySelector('select[name="service"]');
if (serviceSelect) {
  const requestedService = new URLSearchParams(window.location.search).get("service");
  if (requestedService) {
    const match = Array.from(serviceSelect.options).find(
      (opt) => opt.text.toLowerCase() === requestedService.toLowerCase()
    );
    if (match) serviceSelect.value = match.value || match.text;
  }
}

// Ultra-Fast Contact Form Submission via Firebase REST API
const form = document.querySelector("#contactForm");
const status = document.querySelector("#formStatus");

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!firebaseEnabled || !DB_URL) {
      status.dataset.state = "error";
      status.textContent = "Firebase is not configured yet.";
      return;
    }
    const submit = form.querySelector('button[type="submit"]');
    submit.disabled = true;
    status.dataset.state = "";
    status.textContent = "Sending your enquiry…";
    try {
      const raw = Object.fromEntries(new FormData(form).entries());
      const res = await fetch(`${DB_URL}/publicEnquiries.json`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(raw.name || "").trim(),
          email: String(raw.email || "").trim(),
          service: String(raw.service || "").trim(),
          message: String(raw.message || "").trim(),
          status: "new",
          createdAt: { ".sv": "timestamp" },
          source: "website"
        })
      });
      if (!res.ok) throw new Error("Failed to submit");
      form.reset();
      status.dataset.state = "success";
      status.textContent = "Thank you. Your enquiry has been sent.";
    } catch (error) {
      console.error(error);
      status.dataset.state = "error";
      status.textContent = "We couldn't send your enquiry. Please try again later.";
    } finally {
      submit.disabled = false;
    }
  });
}

// Lightweight Real-Time Sync via Firebase REST API
let lastContentHash = "";
let lastPortfolioHash = "";

async function syncRealtimeData() {
  if (!firebaseEnabled || !DB_URL || document.hidden) return;
  try {
    const portfolioGrid = document.querySelector("#portfolioGrid");
    const [contentRes, portfolioRes] = await Promise.all([
      fetch(`${DB_URL}/siteContent.json`, { cache: "no-store" }),
      portfolioGrid ? fetch(`${DB_URL}/portfolio.json`, { cache: "no-store" }) : Promise.resolve(null)
    ]);

    if (contentRes && contentRes.ok) {
      const contentText = await contentRes.text();
      if (contentText !== lastContentHash) {
        lastContentHash = contentText;
        const siteContent = JSON.parse(contentText) || {};
        try {
          localStorage.setItem("akstar_cms_cache", JSON.stringify({
            socials: siteContent.socials || {},
            settings: siteContent.settings || {}
          }));
        } catch {}

        renderSocialCircles(siteContent.socials || {});
        applySiteSettings(siteContent.settings || {});

        const faqList = document.querySelector("#faqList");
        if (faqList) {
          faqList.querySelectorAll("[data-cms-faq]").forEach((el) => el.remove());
          if (siteContent.faqs) {
            Object.values(siteContent.faqs).forEach((faq) => {
              if (!faq || !faq.question || !faq.answer) return;
              const item = document.createElement("div");
              item.className = "faq-item is-visible";
              item.dataset.cmsFaq = "true";
              item.innerHTML = `<button class="faq-question" type="button"><span>${escapeHtml(faq.question)}</span><span class="faq-icon">+</span></button><div class="faq-answer">${escapeHtml(faq.answer)}</div>`;
              faqList.appendChild(item);
            });
            bindFaqEvents();
          }
        }
      }
    }

    if (portfolioRes && portfolioRes.ok && portfolioGrid) {
      const portfolioText = await portfolioRes.text();
      if (portfolioText !== lastPortfolioHash) {
        lastPortfolioHash = portfolioText;
        const rawPortfolio = JSON.parse(portfolioText) || {};
        portfolioGrid.querySelectorAll("[data-cms]").forEach((el) => el.remove());
        const activeFilter = document.querySelector(".filter-btn.active")?.dataset.filter || "all";
        const items = Object.values(rawPortfolio).filter((p) => p && p.published);
        items.forEach((item) => {
          const card = document.createElement("article");
          card.className = "project-card is-visible";
          card.dataset.cms = "true";
          card.dataset.category = item.category || "apps-web";
          if (activeFilter !== "all" && card.dataset.category !== activeFilter) {
            card.classList.add("hidden");
          }
          const safeTitle = escapeHtml(item.title || "Project");
          const safeDivision = escapeHtml(item.division || "AK STAR GLOBAL");
          const safeDesc = escapeHtml(item.description || "");
          const linkHtml = item.url
            ? `<a class="project-link" href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">View live project ↗</a>`
            : `<a class="project-link" href="contact.html">Request details ↗</a>`;
          card.innerHTML = `<div><span class="project-tag">${safeDivision}</span><h3>${safeTitle}</h3><p>${safeDesc}</p></div>${linkHtml}`;
          portfolioGrid.prepend(card);
        });
      }
    }
  } catch (e) {
    // Silent retry
  }
}

if (firebaseEnabled && DB_URL) {
  syncRealtimeData();
  setInterval(syncRealtimeData, 4000);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) syncRealtimeData();
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
