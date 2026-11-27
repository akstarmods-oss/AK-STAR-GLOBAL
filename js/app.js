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

// Optional Live CMS Sync from Firebase (Published Portfolio & FAQs)
if (firebaseEnabled) {
  (async () => {
    try {
      const { initializeApp, getApps, getApp } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js");
      const { getDatabase, ref, get } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js");
      const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
      const db = getDatabase(app);

      const portfolioGrid = document.querySelector("#portfolioGrid");
      if (portfolioGrid) {
        const snap = await get(ref(db, "portfolio"));
        if (snap.exists()) {
          const items = Object.values(snap.val()).filter((p) => p && p.published);
          items.forEach((item) => {
            const card = document.createElement("article");
            card.className = "project-card";
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
            item.className = "faq-item";
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
