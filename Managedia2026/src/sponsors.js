import { initShell, submitToGoogleForm, showToast } from "./shared.js";
import { GOOGLE_FORMS, CONTACTS } from "./data.js";

function renderSkeletons() {
  const powered = document.getElementById("poweredGrid");
  const associate = document.getElementById("associateGrid");
  const skel = (label) => `<div class="sponsor-card skeleton"><span class="sponsor-label">${label}</span></div>`;
  if (powered) powered.innerHTML = Array.from({ length: 4 }, () => skel("Coming Soon")).join("");
  if (associate) associate.innerHTML = Array.from({ length: 8 }, () => skel("Coming Soon")).join("");
}

function setupContactLinks() {
  const emailLink = document.getElementById("emailLink");
  const emailVal = document.getElementById("emailVal");
  const waLink = document.getElementById("whatsappLink");
  const waVal = document.getElementById("whatsappVal");
  const instaLink = document.getElementById("instaLink");
  if (emailLink) emailLink.href = `mailto:${CONTACTS.email}`;
  if (emailVal) emailVal.textContent = CONTACTS.email;
  if (waLink) waLink.href = CONTACTS.whatsappLink;
  if (waVal) waVal.textContent = CONTACTS.whatsapp;
  if (instaLink) instaLink.href = CONTACTS.instagram;
}

function setupForm() {
  const form = document.getElementById("sponsorFormEl");
  const card = form?.closest(".form-card");
  const success = document.getElementById("sponsorSuccess");
  const btn = document.getElementById("sponsorSubmitBtn");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    btn.disabled = true;
    btn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Sending…`;

    const fd = new FormData(form);
    const values = {
      companyName:     fd.get("companyName"),
      contactName:     fd.get("contactName"),
      email:           fd.get("email"),
      phone:           fd.get("phone"),
      sponsorshipType: fd.get("sponsorshipType"),
      message:         fd.get("message"),
    };

    await submitToGoogleForm(
      GOOGLE_FORMS.sponsor.formId,
      GOOGLE_FORMS.sponsor.fields,
      values,
    );

    card.style.display = "none";
    success.style.display = "block";
    showToast({ title: "Inquiry sent", message: "We'll get back to you within 2 business days." });
    window.scrollTo({ top: success.offsetTop - 80, behavior: "smooth" });
  });
}

initShell({ withLoader: false }).then(() => {
  renderSkeletons();
  setupContactLinks();
  setupForm();
});
