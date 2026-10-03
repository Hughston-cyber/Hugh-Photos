const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxYear = document.getElementById("lightbox-year");
const closeButton = document.querySelector(".lightbox-close");
const previousButton = document.querySelector(".lightbox-prev");
const nextButton = document.querySelector(".lightbox-next");

const photoButtons = Array.from(document.querySelectorAll(".photo-button"));
let currentPhotoIndex = -1;

function showPhoto(index) {
  if (index < 0 || index >= photoButtons.length) return;

  const button = photoButtons[index];
  const image = button.dataset.src;
  const caption = button.dataset.caption;
  const year = button.dataset.year;

  lightboxImage.src = image;
  lightboxImage.alt = caption;
  lightboxCaption.textContent = caption;
  lightboxYear.textContent = `Year: ${year}`;
  currentPhotoIndex = index;
}

photoButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    showPhoto(index);

    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
  });
});

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";

  setTimeout(() => {
    lightboxImage.src = "";
  }, 200);
}

closeButton.addEventListener("click", closeLightbox);

previousButton.addEventListener("click", () => {
  showPhoto((currentPhotoIndex - 1 + photoButtons.length) % photoButtons.length);
});

nextButton.addEventListener("click", () => {
  showPhoto((currentPhotoIndex + 1) % photoButtons.length);
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("open")) return;

  if (event.key === "Escape") {
    closeLightbox();
  } else if (event.key === "ArrowRight") {
    showPhoto((currentPhotoIndex + 1) % photoButtons.length);
  } else if (event.key === "ArrowLeft") {
    showPhoto((currentPhotoIndex - 1 + photoButtons.length) % photoButtons.length);
  }
});

document.getElementById("year").textContent = new Date().getFullYear();



/* Subtle fade-in without moving page content */
const revealItems = document.querySelectorAll(".intro, .gallery, .about, .contact, footer");
revealItems.forEach((item) => item.classList.add("reveal"));

const fadeObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.05, rootMargin: "0px 0px -30px 0px" });

revealItems.forEach((item) => fadeObserver.observe(item));






/* Active navigation */
const navLinks = Array.from(document.querySelectorAll('nav a'));
const navSections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

function updateActiveNav() {
  const marker = window.scrollY + window.innerHeight * 0.35;
  let activeSection = navSections[0];

  navSections.forEach((section) => {
    if (section.offsetTop <= marker) activeSection = section;
  });

  navLinks.forEach((link) => {
    link.classList.toggle(
      'active',
      link.getAttribute('href') === '#' + activeSection.id
    );
  });
}

let navTicking = false;
window.addEventListener('scroll', () => {
  if (navTicking) return;
  navTicking = true;
  requestAnimationFrame(() => {
    updateActiveNav();
    navTicking = false;
  });
}, { passive: true });

window.addEventListener('resize', updateActiveNav);
updateActiveNav();
