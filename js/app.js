import { firebaseConfig, firebaseEnabled } from "./firebase-config.js";

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

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
