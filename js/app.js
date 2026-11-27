import { firebaseConfig, firebaseEnabled } from "./firebase-config.js";

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const toggle = document.querySelector("#menuToggle");
const nav = document.querySelector("#mainNav");
toggle?.addEventListener("click", () => nav?.classList.toggle("open"));

const form = document.querySelector("#contactForm");
const status = document.querySelector("#formStatus");

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!firebaseEnabled) {
      status.textContent = "Firebase is not configured yet. Add your project settings in js/firebase-config.js.";
      return;
    }
    const submit = form.querySelector('button[type="submit"]');
    submit.disabled = true;
    status.textContent = "Sending your enquiry…";
    try {
      const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js");
      const { getDatabase, ref, push, serverTimestamp } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js");
      const app = initializeApp(firebaseConfig);
      const db = getDatabase(app);
      const data = Object.fromEntries(new FormData(form).entries());
      await push(ref(db, "publicEnquiries"), {
        ...data, status: "new", createdAt: serverTimestamp(), source: "website"
      });
      form.reset();
      status.textContent = "Thank you. Your enquiry has been sent.";
    } catch (error) {
      console.error(error);
      status.textContent = "We couldn't send your enquiry. Please try again later.";
    } finally {
      submit.disabled = false;
    }
  });
}
