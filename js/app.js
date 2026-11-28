import { firebaseConfig, firebaseEnabled } from "./firebase-config.js";

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

// 10 Official Brand Kit Circular Social Media Icons (5x2 Grid)
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

function renderSocialCircles(customUrls = {}) {
  document.querySelectorAll("[data-social-circles]").forEach((container) => {
    container.className = "social-circles-grid";
    container.innerHTML = SOCIAL_PLATFORMS.map((item) => {
      const url = customUrls[item.key] || item.defaultUrl;
      return `<a class="social-circle" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" title="${item.label}" aria-label="${item.label}">${item.svg}</a>`;
    }).join("");
  });
}
renderSocialCircles();

// Floating WhatsApp Channel Quick-Connect Button on all public pages
if (!document.body.dataset.admin) {
  const waBtn = document.createElement("a");
  waBtn.className = "whatsapp-float";
  waBtn.href = "https://whatsapp.com/channel/0029VbCWnLiK5cDFgzgPH017";
  waBtn.target = "_blank";
  waBtn.rel = "noopener noreferrer";
  waBtn.setAttribute("aria-label", "Connect with AK STAR GLOBAL on WhatsApp");
  waBtn.innerHTML = `<span class="whatsapp-dot"></span> WhatsApp Channel ↗`;
  document.body.appendChild(waBtn);
}

// Smooth Scroll-Reveal Animations
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
    { threshold: 0.1, rootMargin: "0px 0px -25px 0px" }
  );

  targets.forEach((el, index) => {
    el.classList.add("reveal");
    el.style.transitionDelay = `${(index % 5) * 60}ms`;
    observer.observe(el);
  });
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

// Contact Form Submission to Firebase Realtime Database
const form = document.querySelector("#contactForm");
const status = document.querySelector("#formStatus");

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!firebaseEnabled) {
      status.dataset.state = "error";
      status.textContent = "Firebase is not configured yet. Add your project settings in js/firebase-config.js.";
      return;
    }
    const submit = form.querySelector('button[type="submit"]');
    submit.disabled = true;
    status.dataset.state = "";
    status.textContent = "Sending your enquiry…";
    try {
      const { initializeApp, getApps, getApp } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js");
      const { getDatabase, ref, push, serverTimestamp } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js");
      const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
      const db = getDatabase(app);
      const raw = Object.fromEntries(new FormData(form).entries());
      await push(ref(db, "publicEnquiries"), {
        name: String(raw.name || "").trim(),
        email: String(raw.email || "").trim(),
        service: String(raw.service || "").trim(),
        message: String(raw.message || "").trim(),
        status: "new",
        createdAt: serverTimestamp(),
        source: "website"
      });
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

// Live CMS Sync from Firebase (Social URLs, Published Portfolio & FAQs)
if (firebaseEnabled) {
  (async () => {
    try {
      const { initializeApp, getApps, getApp } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js");
      const { getDatabase, ref, get } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js");
      const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
      const db = getDatabase(app);

      // Sync custom social media URLs if saved in Admin Panel
      const socialsSnap = await get(ref(db, "siteContent/socials"));
      if (socialsSnap.exists()) {
        renderSocialCircles(socialsSnap.val() || {});
      }

      const portfolioGrid = document.querySelector("#portfolioGrid");
      if (portfolioGrid) {
        const snap = await get(ref(db, "portfolio"));
        if (snap.exists()) {
          const items = Object.values(snap.val()).filter((p) => p && p.published);
          items.forEach((item) => {
            const card = document.createElement("article");
            card.className = "project-card is-visible";
            card.dataset.category = item.category || "apps-web";
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

      const faqList = document.querySelector("#faqList");
      if (faqList) {
        const faqSnap = await get(ref(db, "siteContent/faqs"));
        if (faqSnap.exists()) {
          Object.values(faqSnap.val()).forEach((faq) => {
            if (!faq || !faq.question || !faq.answer) return;
            const item = document.createElement("div");
            item.className = "faq-item is-visible";
            item.innerHTML = `<button class="faq-question" type="button"><span>${escapeHtml(faq.question)}</span><span class="faq-icon">+</span></button><div class="faq-answer">${escapeHtml(faq.answer)}</div>`;
            faqList.appendChild(item);
          });
          bindFaqEvents();
        }
      }
    } catch (e) {
      console.warn("CMS sync skipped:", e);
    }
  })();
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
