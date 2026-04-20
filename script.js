const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    document.body.classList.toggle("is-menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      document.body.classList.remove("is-menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (document.body.dataset.page === "inicio") {
  document.querySelectorAll('a[href="./index.html#contacto"]').forEach((link) => {
    link.setAttribute("href", "#contacto");
  });
}

const slides = Array.from(document.querySelectorAll(".slide"));
const dotsRoot = document.querySelector(".carousel-dots");
let slideIndex = 0;

const renderSlide = (index) => {
  slides.forEach((slide, position) => {
    slide.classList.toggle("is-active", position === index);
  });

  document.querySelectorAll(".carousel-dot").forEach((dot, position) => {
    dot.classList.toggle("is-active", position === index);
  });
};

if (slides.length && dotsRoot) {
  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = `carousel-dot${index === 0 ? " is-active" : ""}`;
    dot.setAttribute("aria-label", `Slide ${index + 1}`);
    dot.addEventListener("click", () => {
      slideIndex = index;
      renderSlide(slideIndex);
    });
    dotsRoot.appendChild(dot);
  });

  document.querySelectorAll("[data-slide-dir]").forEach((button) => {
    button.addEventListener("click", () => {
      slideIndex = button.dataset.slideDir === "next"
        ? (slideIndex + 1) % slides.length
        : (slideIndex - 1 + slides.length) % slides.length;
      renderSlide(slideIndex);
    });
  });

  window.setInterval(() => {
    slideIndex = (slideIndex + 1) % slides.length;
    renderSlide(slideIndex);
  }, 7000);
}

const capabilityButtons = document.querySelectorAll(".capability-button");
const capabilityPanels = document.querySelectorAll(".capability-panel");

capabilityButtons.forEach((button) => {
  button.addEventListener("mouseenter", () => activateCapability(button));
  button.addEventListener("click", () => activateCapability(button));
});

function activateCapability(button) {
  const target = button.dataset.capability;

  capabilityButtons.forEach((item) => item.classList.remove("is-active"));
  capabilityPanels.forEach((panel) => panel.classList.remove("is-active"));

  button.classList.add("is-active");
  const panel = document.getElementById(target);
  if (panel) {
    panel.classList.add("is-active");
  }
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }

    document.querySelectorAll("[data-count]").forEach((counter) => {
      const target = Number(counter.dataset.count || "0");
      const start = performance.now();
      const duration = target === 230 ? 2000 : target === 50 ? 1500 : 1000;

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const value = Math.ceil(target * progress);
        counter.textContent = String(value);

        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      };

      requestAnimationFrame(tick);
    });

    counterObserver.disconnect();
  });
}, { threshold: 0.5 });

const counterBand = document.querySelector("[data-counter-band]");
if (counterBand) {
  counterObserver.observe(counterBand);
}

const navLinks = Array.from(document.querySelectorAll(".site-nav a[href^='#']"));
const sections = Array.from(document.querySelectorAll("main section[id]"));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }

    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });

sections.forEach((section) => sectionObserver.observe(section));

const pageKey = document.body.dataset.page;
document.querySelectorAll("[data-nav]").forEach((link) => {
  if (link.dataset.nav === pageKey) {
    link.classList.add("is-active");
  }
});

document.querySelectorAll(".accordion-button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".accordion-item");
    if (item) {
      item.classList.toggle("is-open");
    }
  });
});

const optionButtons = document.querySelectorAll(".option-button");
const optionOutput = document.querySelector("[data-option-output]");

optionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    optionButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");

    if (optionOutput) {
      optionOutput.textContent = button.dataset.copy || "";
    }
  });
});

const industrySlides = Array.from(document.querySelectorAll(".industry-slide"));
let industryIndex = 0;

const renderIndustry = (index) => {
  industrySlides.forEach((slide, position) => {
    slide.classList.toggle("is-active", position === index);
  });

  document.querySelectorAll(".industry-thumb, .industry-thumbs > img").forEach((thumb, position) => {
    const isActive = position === index;
    thumb.classList.toggle("is-active", isActive);
    if (thumb.matches("button")) {
      thumb.setAttribute("aria-pressed", String(isActive));
    }
  });
};

if (industrySlides.length) {
  document.querySelectorAll("[data-industry-dir]").forEach((button) => {
    button.addEventListener("click", () => {
      industryIndex = button.dataset.industryDir === "next"
        ? (industryIndex + 1) % industrySlides.length
        : (industryIndex - 1 + industrySlides.length) % industrySlides.length;
      renderIndustry(industryIndex);
    });
  });

  document.querySelectorAll(".industry-thumb, .industry-thumbs > img").forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      industryIndex = index;
      renderIndustry(industryIndex);
    });
  });
}

const form = document.querySelector("[data-form]");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.reset();
  });
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

if (document.body.dataset.page === "inicio") {
  document.querySelectorAll([
    ".capabilities-grid",
    ".counter-band",
    ".vision-header-box",
    ".vision-grid",
    ".logos-partners",
    ".industries-section .section-title",
    ".industry-card",
    ".formulario-header-row",
    ".contact-form"
  ].join(",")).forEach((item) => item.classList.add("reveal"));
}

document.querySelectorAll(".reveal").forEach((item) => {
  revealObserver.observe(item);
});

const canTilt = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const tiltItems = document.querySelectorAll(".solution-card, .industry-card, .arcgis-card, .partner-card, .info-card, .support-card, .accordion-item");

if (canTilt) {
  tiltItems.forEach((item) => {
    item.classList.add("tilt-card");

    item.addEventListener("mousemove", (event) => {
      const rect = item.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      item.style.transform = `perspective(900px) rotateX(${y * -4}deg) rotateY(${x * 5}deg) translateY(-4px)`;
    });

    item.addEventListener("mouseleave", () => {
      item.style.transform = "";
    });
  });
}
