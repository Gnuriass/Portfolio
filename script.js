
/* ---------------- Loading screen ---------------- */
window.addEventListener("load", () => {
  const loader = document.getElementById("loading-screen");
  setTimeout(() => loader.classList.add("hidden"), 500);
});

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

/* ---------------- Header scroll state ---------------- */
const header = document.getElementById("site-header");
const backToTop = document.getElementById("back-to-top");
window.addEventListener("scroll", () => {
  const y = window.scrollY;
  header.classList.toggle("scrolled", y > 20);
  backToTop.classList.toggle("show", y > 500);
});
backToTop.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }),
);

/* ---------------- Mouse-following glow ---------------- */
if (!reduceMotion) {
  const glow = document.getElementById("bg-glow");
  window.addEventListener(
    "mousemove",
    (e) => {
      glow.style.setProperty("--mx", e.clientX + "px");
      glow.style.setProperty("--my", e.clientY + "px");
    },
    { passive: true },
  );
}

/* ---------------- Mobile menu ---------------- */
const navToggle = document.getElementById("nav-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const mobileClose = document.getElementById("mobile-close");
function openMenu() {
  mobileMenu.classList.add("open");
  navToggle.setAttribute("aria-expanded", "true");
}
function closeMenu() {
  mobileMenu.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
}
navToggle.addEventListener("click", openMenu);
mobileClose.addEventListener("click", closeMenu);
mobileMenu
  .querySelectorAll("a")
  .forEach((a) => a.addEventListener("click", closeMenu));

/* ---------------- Active nav highlight on scroll ---------------- */
const navSections = ["home", "about", "portfolio", "experience", "contact"];
const navLinkEls = document.querySelectorAll("[data-nav]");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinkEls.forEach((a) =>
          a.classList.toggle("active", a.dataset.nav === id),
        );
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
);
navSections.forEach((id) => {
  const el = document.getElementById(id);
  if (el) observer.observe(el);
});

/* ---------------- Scroll-reveal for cards ---------------- */
const revealEls = document.querySelectorAll(".reveal");
if (reduceMotion) {
  revealEls.forEach((el) => el.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
  );
  revealEls.forEach((el) => revealObserver.observe(el));
}

/* ---------------- Portfolio tabs ---------------- */
const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");
tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabButtons.forEach((b) => {
      b.classList.remove("active");
      b.setAttribute("aria-selected", "false");
    });
    tabPanels.forEach((p) => p.classList.remove("active"));
    btn.classList.add("active");
    btn.setAttribute("aria-selected", "true");
    const panel = document.getElementById("tab-" + btn.dataset.tab);
    panel.classList.add("active");
    panel
      .querySelectorAll(".reveal")
      .forEach((el) => el.classList.add("is-visible"));
  });
});

/* ---------------- Project detail modal ---------------- */
const projectData = {
  "proj-0": {
    src: "images/project/pj0-1.jpg",
    title: "Mr.Guide: AI-Powered Travel Recommendation Platform",
    meta: "Automation",
    desc: "AI-powered travel chatbot built with n8n and Google Gemini, integrated with LINE Messaging API to provide personalized travel recommendations. The system automates travel planning, booking workflows, conversation logging, and user data management using Google Sheets, with Docker and Ngrok for deployment and webhook connectivity.",
    badges: ["n8n", "LINE Messaging API", "Google Gemini", "Docker", "Ngrok"],
    github: "https://github.com/Gnuriass/n8n-project",
  },
  "proj-1": {
    src: "images/project/pj1.png",
    title:
      "Automatic Network Device Backup and Monitoring System (NetworkTool)",
    desc: "Automated network device backup and monitoring system built with Python. Implements SSH-based device communication, data parsing, and a reporting dashboard for network device management.",
    badges: ["Python", "SSH", "Automation"],
    github: "https://github.com/Gnuriass/Project_Internship",
  },
  "proj-2": {
    src: "images/project/pj2.png",
    title: "LowkeyTech Learning Platform",
    desc: "A full-stack learning platform created as a business project, combining web development, business planning, and the experience of building a business from the ground up.",
    badges: [
      "React",
      "JavaScript",
      "HTML",
      "CSS",
      "Node.js",
      "MySQL",
      "Express",
    ],
    github: "https://github.com/Gnuriass/Project_Lowkey-Tech",
  },
  "proj-3": {
    src: "images/project/pj3.png",
    title: "Book Recommendation Platform",
    desc: "A web-based book recommendation platform that helps users discover books by category, view summaries and details, and connect with online bookstores for purchasing.",
    badges: ["React", "JavaScript", "HTML", "CSS", "Bootstrap", "MySQL"],
    github: "https://github.com/Gnuriass/Project_web_react",
  },
  "proj-4": {
    src: "images/project/pj4.png",
    title: "The Locked Diary",
    desc: "A console-based personal diary application built in C++ to practice object-oriented programming, featuring password protection, diary management, emotion and meeting logs, and dynamic password settings.",
    badges: ["C++", "OOP", "Console"],
    github: "https://github.com/Gnuriass/Project_My-Diary",
  },
  "proj-5": {
    src: "images/project/pj5-1.png",
    title: "Automatic Cat Feeder",
    desc: "An automatic cat feeder built with ESP32 and Arduino IoT Cloud, featuring scheduled feeding, remote control, food-level monitoring, and real-time alerts through a connected dashboard.",
    badges: ["ESP32", "MicroPython", "Arduino IoT Cloud", "IoT"],
    github: "https://github.com/Gnuriass/Project_Microprocessor",
  },
  "proj-6": {
    src: "images/project/pj6.png",
    title: "Electricity & Water Billing System",
    desc: "A console-based utility bill calculator written in C that calculates electricity and water bills using progressive rates, service charges, Ft, and VAT, with expense summaries and comparisons.",
    badges: ["C", "Functions", "Loops", "Conditional Logic"],
    github:
      "https://github.com/Gnuriass/Project_C_Electric-bill-and-Water-bill",
  },
};
const projModal = document.getElementById("proj-modal");

function openProjectModal(id) {
  const d = projectData[id];
  if (!d) return;

  // Project image
  const visual = document.getElementById("proj-modal-visual");
  visual.innerHTML = "";

  if (d.src) {
    const img = document.createElement("img");
    img.src = d.src;
    img.alt = d.title;
    visual.appendChild(img);
  }

  document.getElementById("proj-modal-title").textContent = d.title;
  document.getElementById("proj-modal-meta").textContent = d.meta;
  document.getElementById("proj-modal-desc").textContent = d.desc;
  document.getElementById("proj-modal-github").href = d.github;

  const badgeWrap = document.getElementById("proj-modal-badges");
  badgeWrap.innerHTML = "";

  d.badges.forEach((b) => {
    const span = document.createElement("span");
    span.className = "chip";
    span.style.setProperty("--sc-bg", "var(--sky-soft)");
    span.style.setProperty("--sc-fg", "var(--sky)");
    span.style.background = "var(--sky-soft)";
    span.style.color = "var(--sky)";
    span.textContent = b;
    badgeWrap.appendChild(span);
  });

  projModal.classList.add("open");
}
document.querySelectorAll(".view-details-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    openProjectModal(btn.dataset.detail);
  });
});
document.querySelectorAll(".proj-card").forEach((card) => {
  card.addEventListener("click", (e) => {
    if (e.target.closest("a") || e.target.closest("button")) return;
    openProjectModal(card.dataset.detail);
  });
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter") openProjectModal(card.dataset.detail);
  });
});
document
  .getElementById("proj-modal-close")
  .addEventListener("click", () => projModal.classList.remove("open"));
projModal.addEventListener("click", (e) => {
  if (e.target === projModal) projModal.classList.remove("open");
});

/* ---------------- Certificate lightbox ---------------- */
// Certificate Image Lightbox
const certImageLightbox = document.getElementById("cert-image-lightbox");
const certLightboxImage = document.getElementById("cert-lightbox-image");
const certImageLightboxClose = document.getElementById(
  "cert-image-lightbox-close",
);

// Open image fullscreen
document.querySelectorAll(".cert-thumb img").forEach((img) => {
  img.addEventListener("click", (e) => {
    e.stopPropagation();

    certLightboxImage.src = img.src;
    certLightboxImage.alt = img.alt;

    certImageLightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  });
});

// Close button
certImageLightboxClose.addEventListener("click", () => {
  closeCertImageLightbox();
});

// Click outside image
certImageLightbox.addEventListener("click", (e) => {
  if (e.target === certImageLightbox) {
    closeCertImageLightbox();
  }
});

// Close with Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeCertImageLightbox();
  }
});

function closeCertImageLightbox() {
  certImageLightbox.classList.remove("open");
  certLightboxImage.src = "";
  document.body.style.overflow = "";
}

/* ---------------- Contact form validation + local message board ---------------- */
// Contact Form

const form = document.getElementById("contact-form");
const sendBtn = document.getElementById("send-btn");
const formStatus = document.getElementById("form-status");

// Stop if contact form doesn't exist
if (form && sendBtn && formStatus) {
  function setError(field, msg) {
    const wrap = document.getElementById("field-" + field);
    const err = document.getElementById("err-" + field);

    if (wrap) {
      wrap.classList.toggle("has-error", !!msg);
    }

    if (err) {
      err.textContent = msg || "";
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("cf-name").value.trim();
    const email = document.getElementById("cf-email").value.trim();
    const message = document.getElementById("cf-message").value.trim();

    let valid = true;

    // Validate Name

    if (!name) {
      setError("name", "Name is required.");
      valid = false;
    } else {
      setError("name", "");
    }

    // Validate Email

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setError("email", "Email is required.");
      valid = false;
    } else if (!emailPattern.test(email)) {
      setError("email", "Enter a valid email address.");
      valid = false;
    } else {
      setError("email", "");
    }

    // Validate Message

    if (!message) {
      setError("message", "Message is required.");
      valid = false;
    } else {
      setError("message", "");
    }

    // Stop if validation fails

    if (!valid) {
      formStatus.textContent = "Please fix the errors above.";
      formStatus.className = "form-status error";
      return;
    }

    // Sending state

    sendBtn.disabled = true;
    sendBtn.textContent = "Sending…";

    formStatus.textContent = "";
    formStatus.className = "form-status";

    // Add current time

    let timeInput = form.querySelector('input[name="time"]');

    if (!timeInput) {
      timeInput = document.createElement("input");
      timeInput.type = "hidden";
      timeInput.name = "time";
      form.appendChild(timeInput);
    }

    timeInput.value = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Bangkok",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    // Send Email

    emailjs
      .sendForm(
        "service_ie2275g",
        "template_e1af3vo",
        form
      )
      .then(
        (response) => {
          console.log("EmailJS SUCCESS:", response);

          // Reset form
          form.reset();

          sendBtn.disabled = false;
          sendBtn.textContent = "Send Message";

          formStatus.textContent =
            "Message sent successfully! I'll get back to you soon.";

          formStatus.className = "form-status success";
        },
        (error) => {
          console.error("EmailJS ERROR:", error);

          sendBtn.disabled = false;
          sendBtn.textContent = "Send Message";

          formStatus.textContent =
            "Failed to send message. Please try again.";

          formStatus.className = "form-status error";
        }
      );
  });
}

/* ---------------- Node network hero animation ---------------- */
const canvas = document.getElementById("node-canvas");
const ctx = canvas.getContext("2d");
let W, H, DPR;

function resize() {
  const rect = canvas.parentElement.getBoundingClientRect();
  DPR = Math.min(window.devicePixelRatio || 1, 2);
  W = rect.width;
  H = rect.height;
  canvas.width = W * DPR;
  canvas.height = H * DPR;
  canvas.style.width = W + "px";
  canvas.style.height = H + "px";
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
}

const labels = [
  { text: "AI", color: "#539d6b" },
  { text: "Automation", color: "#aa2ff2" },
  { text: "3D Avatar", color: "#E7B968" },
];
let nodes = [];
let center;

function layout() {
  center = { x: W * 0.5, y: H * 0.5, r: 30 };
  const radius = Math.min(W, H) * 0.36;
  nodes = labels.map((l, i) => {
    const angle = ((Math.PI * 2) / labels.length) * i - Math.PI / 2;
    return {
      x: center.x + Math.cos(angle) * radius,
      y: center.y + Math.sin(angle) * radius,
      baseX: center.x + Math.cos(angle) * radius,
      baseY: center.y + Math.sin(angle) * radius,
      r: 8,
      color: l.color,
      text: l.text,
      phase: Math.random() * Math.PI * 2,
    };
  });
}

function drawCurve(x1, y1, x2, y2, color, alpha) {
  const mx = (x1 + x2) / 2,
    my = (y1 + y2) / 2;
  const dx = x2 - x1,
    dy = y2 - y1;
  const nx = -dy,
    ny = dx;
  const bend = 0.12;
  const cx = mx + nx * bend,
    cy = my + ny * bend;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.quadraticCurveTo(cx, cy, x2, y2);
  ctx.strokeStyle = color;
  ctx.globalAlpha = alpha;
  ctx.lineWidth = 1.6;
  ctx.stroke();
  ctx.globalAlpha = 1;
}

let t = 0;
function frame() {
  ctx.clearRect(0, 0, W, H);

  nodes.forEach((n) => {
    if (!reduceMotion) {
      n.x = n.baseX + Math.sin(t * 0.6 + n.phase) * 6;
      n.y = n.baseY + Math.cos(t * 0.5 + n.phase) * 6;
    } else {
      n.x = n.baseX;
      n.y = n.baseY;
    }
    drawCurve(n.x, n.y, center.x, center.y, n.color, 0.4);
  });

  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i],
      b = nodes[(i + 1) % nodes.length];
    drawCurve(a.x, a.y, b.x, b.y, "rgba(255,255,255,0.14)", 0.7);
  }

  ctx.beginPath();
  ctx.arc(center.x, center.y, center.r, 0, Math.PI * 2);
  ctx.fillStyle = "#141821";
  ctx.strokeStyle = "rgba(169,194,214,0.5)";
  ctx.lineWidth = 1.5;
  ctx.fill();
  ctx.stroke();
  ctx.font = "600 12px 'JetBrains Mono', monospace";
  ctx.fillStyle = "#F2F3F6";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("SB", center.x, center.y);

  nodes.forEach((n) => {
    const pulse = reduceMotion ? 0 : Math.sin(t * 2 + n.phase) * 1.5;
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r + pulse, 0, Math.PI * 2);
    ctx.fillStyle = n.color;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r + pulse + 5, 0, Math.PI * 2);
    ctx.strokeStyle = n.color;
    ctx.globalAlpha = 0.3;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.globalAlpha = 1;

    ctx.font = "600 12px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#E7EAEF";
    ctx.textAlign = "center";
    const labelY = n.y < center.y ? n.y - 16 : n.y + 22;
    ctx.fillText(n.text, n.x, labelY);
  });

  t += 0.016;
  if (!reduceMotion) requestAnimationFrame(frame);
}

function init() {
  resize();
  layout();
  ctx.clearRect(0, 0, W, H);
  frame();
  if (reduceMotion) {
    requestAnimationFrame(frame);
  }
}

window.addEventListener("resize", () => {
  resize();
  layout();
});
init();
/* ---------------- Language Switcher ---------------- */

const langEN = document.getElementById("lang-en");
const langTH = document.getElementById("lang-th");

function setLanguage(lang) {
  document.querySelectorAll("[data-en][data-th]").forEach((el) => {
    el.textContent = el.dataset[lang];
  });

  if (lang === "en") {
    langEN.classList.add("active");
    langTH.classList.remove("active");
  } else {
    langTH.classList.add("active");
    langEN.classList.remove("active");
  }

  localStorage.setItem("portfolio-language", lang);
}

langEN.addEventListener("click", () => setLanguage("en"));
langTH.addEventListener("click", () => setLanguage("th"));

const savedLang = localStorage.getItem("portfolio-language") || "en";
setLanguage(savedLang);
