import { initShell, submitToGoogleForm, showToast } from "./shared.js";
import { GOOGLE_FORMS } from "./data.js";

function setupForm() {
  const form = document.getElementById("repForm");
  const card = form?.closest(".form-card");
  const success = document.getElementById("repSuccess");
  const btn = document.getElementById("repSubmitBtn");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }

    btn.disabled = true;
    btn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Submitting…`;

    const fd = new FormData(form);
    const values = {
      name:       fd.get("name"),
      email:      fd.get("email"),
      phone:      fd.get("phone"),
      college:    fd.get("college"),
      course:     fd.get("course"),
      year:       fd.get("year"),
      instagram:  fd.get("instagram") || "",
      whyJoin:    fd.get("whyJoin"),
      experience: fd.get("experience") || "",
    };

    await submitToGoogleForm(
      GOOGLE_FORMS.campusRep.formId,
      GOOGLE_FORMS.campusRep.fields,
      values,
    );

    card.style.display = "none";
    success.style.display = "block";
    showToast({ title: "Submitted", message: "Your application has been received." });
    window.scrollTo({ top: success.offsetTop - 80, behavior: "smooth" });
  });
}

initShell({ withLoader: false }).then(() => {
  setupForm();
});
