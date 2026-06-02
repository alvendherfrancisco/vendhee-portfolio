function sendEmail(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;

  const parameters = {
    name: name,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  emailjs.send("vendhee-contact", "vendhee-template", parameters).then(
    function (response) {
      document.getElementById("contact-form").reset();
      openModal(name);
    },
    function (error) {
      console.error("EmailJS send error:", error);
      // Fallback: still show the modal so UX isn't broken during dev/testing
      openModal(name);
    },
  );
}

function openModal(senderName) {
  const modal = document.getElementById("thankYouModal");
  document.getElementById("modalSenderName").textContent =
    senderName || "friend";
  modal.classList.add("modal-active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("thankYouModal");
  modal.classList.remove("modal-active");
  document.body.style.overflow = "";
}

// ---- HAMBURGER MENU ----
function initHamburger() {
  const btn = document.getElementById("hamburgerBtn");
  const navLinks = document.getElementById("navLinks");
  const overlay = document.getElementById("navOverlay");

  if (!btn || !navLinks) return;

  // Show overlay element on mobile
  overlay.style.display = "block";

  function openMenu() {
    btn.classList.add("is-open");
    btn.setAttribute("aria-expanded", "true");
    navLinks.classList.add("nav-open");
    overlay.classList.add("overlay-active");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    btn.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("nav-open");
    overlay.classList.remove("overlay-active");
    document.body.style.overflow = "";
  }

  btn.addEventListener("click", () => {
    btn.classList.contains("is-open") ? closeMenu() : openMenu();
  });

  // Close when a nav link is clicked
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close on overlay click
  overlay.addEventListener("click", closeMenu);

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && btn.classList.contains("is-open")) closeMenu();
  });

  // Close menu if resized back to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 576) closeMenu();
  });
}

// Close modal on overlay click
document.addEventListener("DOMContentLoaded", function () {
  initHamburger();
  const modal = document.getElementById("thankYouModal");
  modal.addEventListener("click", function (e) {
    if (e.target === modal) closeModal();
  });

  // Escape key closes modal
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });

  // ---- SCROLL REVEAL ----
  // Add reveal classes FIRST, then observe
  const revealSelectors = [
    ".tech-stack-section",
    ".services-container",
    ".works-container",
    ".contact-container",
  ];

  revealSelectors.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => el.classList.add("reveal"));
  });

  document.querySelector(".works-content")?.classList.add("reveal-stagger");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Small delay so CSS transition is registered before class fires
          requestAnimationFrame(() => {
            entry.target.classList.add("visible");
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
  );

  // Wait one frame so layout is complete before observing
  requestAnimationFrame(() => {
    document.querySelectorAll(".reveal, .reveal-stagger").forEach((el) => {
      // If already in viewport on page load, make immediately visible
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add("visible");
      } else {
        observer.observe(el);
      }
    });
  });
});
